import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { X, UploadCloud } from 'lucide-react'; // Import UploadCloud icon
import ImageUploadForm from '../Forms/ImageUploadForm'; // Import ImageUploadForm
import AddButton from '../components/AddButton'; // Import AddButton component

const Images = () => {
  const [images, setImages] = useState<string[]>([]);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null); // State for preview modal
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false); // State to control form visibility

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.storage.from('images').list();
      if (error) {
        console.error('Error fetching images:', error);
      } else {
        const publicUrls = data.map(image => getPublicUrl(image.name));
        setImages(publicUrls);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const getPublicUrl = (imageName: string) => {
    let publicUrl = `${supabase.storageUrl}/object/public/images/${imageName}`;
   return publicUrl;
  };


  const openPreviewModal = (imageUrl: string) => {
    setPreviewImageUrl(imageUrl);
  };

  const closePreviewModal = () => {
    setPreviewImageUrl(null);
  };

  const handleOpenUploadForm = () => {
    setIsUploadFormVisible(true);
  };

  const handleCloseUploadForm = () => {
    setIsUploadFormVisible(false);
  };

  const handleImageUploadSuccess = () => {
    fetchImages(); // Refresh images after successful upload in modal
    setIsUploadFormVisible(false); // Close the modal after upload
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Galerie d'images</h1>

      {/* Add Image Button */}
      <div className="flex justify-end mb-4">
        <AddButton onClick={handleOpenUploadForm} /> {/* Use AddButton component */}
      </div>

      {/* Image List */}
      <div className="overflow-hidden max-h-[calc(100vh-180px)] overflow-y-auto"> {/* ADDED max-h and overflow-y-auto */}
        {/* Subtitle Removed (already removed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer" onClick={() => openPreviewModal(imageUrl)}>
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <p className="text-sm text-gray-600 truncate">{imageUrl.split('/').pop()}</p>
              </div>
            </div>
          ))}
        </div>
        {images.length === 0 && <p className="text-gray-500 mt-2">Aucune image uploadée pour le moment.</p>}
      </div>

      {/* Preview Modal */}
      {previewImageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-md p-6 max-w-3xl max-h-screen overflow-auto">
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
              onClick={closePreviewModal}
            >
              <X size={20} />
            </button>
            <img
              src={previewImageUrl}
              alt="Image Preview"
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* Image Upload Form Modal */}
      <ImageUploadForm
        isOpen={isUploadFormVisible}
        onClose={handleCloseUploadForm}
        onImageUploadSuccess={handleImageUploadSuccess}
      />
    </div>
  );
};

export default Images;

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { X, UploadCloud, Trash } from 'lucide-react'; // Import Trash icon
import ImageUploadForm from '../Forms/ImageUploadForm';
import AddButton from '../components/AddButton';

const Images = () => {
  const [images, setImages] = useState<string[]>([]);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);

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
    fetchImages();
    setIsUploadFormVisible(false);
  };

  const handleDeleteImage = async (imageUrl: string) => {
    const imageName = imageUrl.split('/').pop() || ''; // Extract filename from URL
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'image "${imageName}"?`)) {
      return; // User cancelled deletion
    }

    try {
      const { error } = await supabase.storage
        .from('images')
        .remove([imageName]); // Delete object using filename

      if (error) {
        console.error('Error deleting image:', error);
        alert('Erreur lors de la suppression de l\'image.');
      } else {
        alert('Image supprimée avec succès!');
        setImages(images.filter(imgUrl => imgUrl !== imageUrl)); // Update local state
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Erreur inattendue lors de la suppression de l\'image.');
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Galerie d'images</h1>

      {/* Add Image Button */}
      <div className="flex justify-end mb-4">
        <AddButton onClick={handleOpenUploadForm} />
      </div>

      {/* Image List */}
      <div className="overflow-hidden max-h-[calc(100vh-180px)] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer relative"> {/* Added relative for positioning delete button */}
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                className="w-full h-48 object-cover"
                onClick={() => openPreviewModal(imageUrl)} // Make image clickable for preview
              />
              <div className="p-3 flex justify-between items-center"> {/* Flex container for filename and delete icon */}
                <p className="text-sm text-gray-600 truncate">{imageUrl.split('/').pop()}</p>
                <button
                  onClick={() => handleDeleteImage(imageUrl)}
                  className="hover:text-red-500 focus:outline-none"
                  aria-label={`Supprimer l'image ${imageUrl.split('/').pop()}`} // Aria label for accessibility
                >
                  <Trash className="h-4 w-4" /> {/* Delete icon */}
                </button>
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

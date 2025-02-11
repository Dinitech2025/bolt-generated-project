import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { X } from 'lucide-react'; // Import close icon

const Images = () => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null); // State for preview modal

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


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    setUploading(true);

    try {
      const timestamp = Date.now();
      const fileExt = file.name.split('.').pop();
      const fileName = `image_${timestamp}.${fileExt}`;

      const { error } = await supabase.storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading image:', error);
        alert('Erreur lors de l\'upload de l\'image.');
      } else {
        alert('Image uploadée avec succès!');
        fetchImages(); // Refresh image list after upload
        setFile(null); // Reset file input
        // Reset file input value (tricky in React, better to control the input)
        const fileInput = document.getElementById('image-upload-input') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur inattendue lors de l\'upload.');
    } finally {
      setUploading(false);
    }
  };

  const openPreviewModal = (imageUrl: string) => {
    setPreviewImageUrl(imageUrl);
  };

  const closePreviewModal = () => {
    setPreviewImageUrl(null);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Images</h1>

      {/* Upload Form */}
      <div className="mb-6 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-3">Upload Image</h2>
        <div className="mb-4">
          <label htmlFor="image-upload-input" className="block text-gray-700 text-sm font-bold mb-2">
            Choisir une image:
          </label>
          <input
            id="image-upload-input"
            type="file"
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading || !file ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      {/* Image List */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Liste des Images</h2>
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
    </div>
  );
};

export default Images;

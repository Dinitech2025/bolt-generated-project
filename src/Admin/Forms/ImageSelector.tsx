import React, { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '../../supabase';
import { UploadCloud, Image } from 'lucide-react';
import ImageListModal from './ImageListModal';

interface ImageSelectorProps {
  onImageSelect: (imageUrl: string) => void;
  selectedImageUrl?: string | null; // Make selectedImageUrl prop optional
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect, selectedImageUrl: propSelectedImageUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(propSelectedImageUrl || null); // Initialize from prop
  const [isImageListModalOpen, setIsImageListModalOpen] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    setSelectedImageUrl(propSelectedImageUrl || null); // Update local state when prop changes
  }, [propSelectedImageUrl]);


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
    return `${supabase.storageUrl}/object/public/images/${imageName}`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (fileToUpload: File) => {
    setUploading(true);
    try {
      const timestamp = Date.now();
      const fileExt = fileToUpload.name.split('.').pop();
      const fileName = `offre_image_${timestamp}.${fileExt}`;
      // NOTE: Filename prefix 'offre_image' is kept, adjust if you want it more generic

      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, fileToUpload, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading offre image:', error);
        alert('Erreur lors de l\'upload de l\'image de l\'offre.');
      } else {
        const publicURL = getPublicUrl(fileName);
        onImageSelect(publicURL);
        setSelectedImageUrl(publicURL); // Set selected image URL after upload
        setFile(null);
        alert('Image de l\'offre uploadée avec succès!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur inattendue lors de l\'upload de l\'image de l\'offre.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];
      setFile(droppedFile);
      handleUpload(droppedFile);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    onImageSelect(imageUrl);
  };

  const handleFileInputClick = () => {
    document.getElementById('offre-image-upload-input')?.click();
  };

  const openImageListModal = () => {
    setIsImageListModalOpen(true);
  };

  const closeImageListModal = () => {
    setIsImageListModalOpen(false);
  };


  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
        Image de l'offre:
      </label>

      <div className="flex mb-4">
        {/* Selected Image Preview */}
        <div className="w-1/3 mr-4">
          {selectedImageUrl && ( // Check if selectedImageUrl exists before rendering preview
            <div className="border rounded-md overflow-hidden">
              <img src={selectedImageUrl} alt="Selected Image" className="w-full h-32 object-cover" />
            </div>
          )}
          {!selectedImageUrl && (
            <div className="w-full h-32 bg-gray-100 border border-dashed rounded-md flex items-center justify-center text-gray-500">
              Aucune image sélectionnée
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          {/* Upload New Image Section */}
          <div
            className="p-4 border-2 border-dashed rounded-md cursor-pointer"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleFileInputClick}
          >
            <div className="flex flex-col items-center justify-center">
              <UploadCloud className="h-8 w-8 text-gray-500 mb-2" />
              <p className="text-gray-600 text-sm text-center">
                {file ? file.name : 'Glisser-déposer ou cliquer pour uploader une image'}
              </p>
            </div>
            {isDragging && (
              <div className="absolute inset-0 border-2 border-dashed border-blue-500 bg-blue-50 bg-opacity-25 rounded-md pointer-events-none"></div>
            )}
            <input
              id="offre-image-upload-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Select Existing Image Button - Opens Modal */}
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12"
            onClick={openImageListModal}
          >
            Choisir image {/* Changed button text to "Choisir image" */}
          </button>
        </div>
      </div>
      {uploading && <p className="text-center">Uploading image...</p>}

      {/* Image List Modal */}
      <ImageListModal
        isOpen={isImageListModalOpen}
        onClose={closeImageListModal}
        images={images}
        selectedImageUrl={selectedImageUrl}
        onImageClick={handleImageClick}
      />
    </div>
  );
};

export default ImageSelector;

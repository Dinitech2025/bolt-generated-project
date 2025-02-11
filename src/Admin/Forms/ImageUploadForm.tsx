import React, { useState, useCallback, useRef } from 'react';
import { supabase } from '../../supabase';
import { X, UploadCloud } from 'lucide-react'; // Import UploadCloud icon

interface ImageUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUploadSuccess: () => void; // Callback for successful upload
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ isOpen, onClose, onImageUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null); // Changed to File[] | null for multiple files
  const [isDragging, setIsDragging] = useState(false); // State for drag and drop visual feedback
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden file input

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) { // event.target.files is already a FileList, no need to check length > 0
      // Convert FileList to File array
      const fileArray = Array.from(event.target.files);
      setFiles(fileArray);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) { // Check if files array is empty or null
      alert("Veuillez sélectionner au moins une image.");
      return;
    }

    setUploading(true);
    let uploadCount = 0; // Track successful uploads
    let uploadErrors = 0;  // Track upload errors

    for (const file of files) { // Iterate over the files array
      try {
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const fileName = `image_${timestamp}_${uploadCount}.${fileExt}`; // Add index to filename for multiple uploads

        const { error } = await supabase.storage
          .from('images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          console.error('Error uploading image:', file.name, error);
          uploadErrors++;
        } else {
          uploadCount++;
        }
      } catch (error) {
        console.error('Upload error for file:', file.name, error);
        uploadErrors++;
      }
    }

    setUploading(false);

    if (uploadErrors === 0) {
      alert(`${uploadCount} image(s) uploadées avec succès!`);
      onImageUploadSuccess(); // Call the success callback
      onClose(); // Close the modal
    } else {
      alert(`Upload terminé avec ${uploadErrors} erreur(s) et ${uploadCount} succès.`);
    }
  };


  // Drag and Drop Handlers (no changes needed here)
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Convert FileList to File array
      const fileArray = Array.from(files);
      setFiles(fileArray);
    }
  }, []);

  // Function to trigger file input click (no changes needed here)
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const displayFileNames = () => {
    if (!files || files.length === 0) {
      return 'Glisser-déposer des images ici ou cliquer pour parcourir';
    } else if (files.length === 1) {
      return files[0].name;
    } else {
      return `${files.length} images sélectionnées`; // Display count for multiple files
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Télécharger une Image</h3>
          <div className="mt-2 px-7 py-3">
            <div className="mb-4">
              <label htmlFor="image-upload-input" className="block text-gray-700 text-sm font-bold mb-2 text-left sr-only">
                Choisir une image:
              </label>
              {/* Custom Drop Zone Area */}
              <div
                className={`w-full p-6 border-2 border-dashed rounded-md cursor-pointer ${isDragging ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
                onClick={triggerFileInput} // Click to open file dialog
              >
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud className="h-8 w-8 text-gray-500 mb-2" />
                  <p className="text-gray-600 text-sm">
                    {displayFileNames()} {/* Display dynamic text based on file selection */}
                  </p>
                </div>
                {/* Drag and Drop Visual Feedback */}
                {isDragging && (
                  <div className="absolute inset-0 border-2 border-dashed border-blue-500 bg-blue-50 bg-opacity-25 rounded-md pointer-events-none"></div>
                )}
              </div>
              {/* Hidden File Input - IMPORTANT: Added 'multiple' attribute */}
              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                className="hidden" // Hide the actual file input
                onChange={handleFileChange}
                ref={fileInputRef} // Attach ref
                multiple // IMPORTANT: Allow multiple file selection
              />
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={handleUpload}
                disabled={uploading || !files || files.length === 0} // Disable if no files or uploading
                className={`px-4 py-2 bg-custom-blue text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-300 ${uploading || !files || files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {uploading ? 'Uploading...' : 'Upload Images'} {/* Changed button text */}
              </button>
            </div>
          </div>
          <button
            className="absolute top-0 right-0 m-2 px-2 py-1 rounded-full hover:bg-gray-200"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadForm;

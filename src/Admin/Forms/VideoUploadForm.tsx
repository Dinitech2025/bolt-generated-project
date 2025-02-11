import React, { useState, useCallback, useRef } from 'react';
import { supabase } from '../../supabase';
import { X, UploadCloud } from 'lucide-react';

interface VideoUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoUploadSuccess: () => void; // Changed prop name to be video-specific
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({ isOpen, onClose, onVideoUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      setFiles(fileArray);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      alert("Veuillez sélectionner au moins une vidéo."); // Changed alert message
      return;
    }

    setUploading(true);
    let uploadCount = 0;
    let uploadErrors = 0;

    for (const file of files) {
      try {
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const fileName = `video_${timestamp}_${uploadCount}.${fileExt}`; // Changed filename prefix to 'video'

        const { error } = await supabase.storage
          .from('videos') // Changed bucket name to 'videos'
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          console.error('Error uploading video:', file.name, error); // Changed error log message
          uploadErrors++;
        } else {
          uploadCount++;
        }
      } catch (error) {
        console.error('Upload error for video:', file.name, error); // Changed error log message
        uploadErrors++;
      }
    }

    setUploading(false);

    if (uploadErrors === 0) {
      alert(`${uploadCount} vidéo(s) uploadées avec succès!`); // Changed success alert message
      onVideoUploadSuccess(); // Changed callback name to be video-specific
      onClose();
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
      const fileArray = Array.from(files);
      setFiles(fileArray);
    }
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const displayFileNames = () => {
    if (!files || files.length === 0) {
      return 'Glisser-déposer des vidéos ici ou cliquer pour parcourir'; // Changed placeholder text
    } else if (files.length === 1) {
      return files[0].name;
    } else {
      return `${files.length} vidéos sélectionnées`; // Changed file count text
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Télécharger une Vidéo</h3> {/* Changed title to Video */}
          <div className="mt-2 px-7 py-3">
            <div className="mb-4">
              <label htmlFor="video-upload-input" className="block text-gray-700 text-sm font-bold mb-2 text-left sr-only">
                Choisir une vidéo: {/* Changed label text */}
              </label>
              <div
                className={`w-full p-6 border-2 border-dashed rounded-md cursor-pointer ${isDragging ? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
                onClick={triggerFileInput}
              >
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud className="h-8 w-8 text-gray-500 mb-2" />
                  <p className="text-gray-600 text-sm">
                    {displayFileNames()}
                  </p>
                </div>
                {isDragging && (
                  <div className="absolute inset-0 border-2 border-dashed border-blue-500 bg-blue-50 bg-opacity-25 rounded-md pointer-events-none"></div>
                )}
              </div>
              <input
                id="video-upload-input" // Changed input id
                type="file"
                accept="video/*" // Changed accept type to video/*
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
                multiple
              />
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={handleUpload}
                disabled={uploading || !files || files.length === 0}
                className={`px-4 py-2 bg-custom-blue text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-300 ${uploading || !files || files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {uploading ? 'Uploading...' : 'Upload Videos'} {/* Changed button text to Upload Videos */}
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

export default VideoUploadForm;

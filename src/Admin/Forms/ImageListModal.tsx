import React from 'react';
import { X } from 'lucide-react';

interface ImageListModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  selectedImageUrl: string | null;
  onImageClick: (imageUrl: string) => void;
}

const ImageListModal: React.FC<ImageListModalProps> = ({ isOpen, onClose, images, selectedImageUrl, onImageClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Choisir une image existante</h3>
          <div className="px-7 py-3">
            <div className="h-64 overflow-y-auto pr-2 mb-4"> {/* Added mb-4 for spacing */}
              <div className="grid grid-cols-2 gap-2">
                {images.map((imageUrl) => (
                  <div
                    key={imageUrl}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${selectedImageUrl === imageUrl ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => onImageClick(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt="Existing Image"
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
                {images.length === 0 && <p className="text-gray-500 mt-2">Aucune image dans la galerie.</p>}
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" // Added button styling
            >
              Terminer la sélection
            </button>
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

export default ImageListModal;

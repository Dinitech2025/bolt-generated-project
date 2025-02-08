import React, { useState } from 'react';

interface PlatformFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlatformForm: React.FC<PlatformFormProps> = ({ isOpen, onClose }) => {
  const [platformName, setPlatformName] = useState('');
  const [maxProfiles, setMaxProfiles] = useState<number | ''>('');
  const [pinLength, setPinLength] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., API call)
    console.log('Form submitted:', {
      platformName,
      maxProfiles,
      pinLength,
    });
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Ajouter une Nouvelle Plateforme
          </h3>
          <div className="mt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="platformName" className="block text-gray-700 text-sm font-bold mb-2">
                  Nom de la Plateforme:
                </label>
                <input
                  type="text"
                  id="platformName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="maxProfiles" className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre Maximum de Profils:
                </label>
                <input
                  type="number"
                  id="maxProfiles"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={maxProfiles}
                  onChange={(e) => setMaxProfiles(e.target.value === '' ? '' : parseInt(e.target.value))}
                  required
                />
              </div>
              <div>
                <label htmlFor="pinLength" className="block text-gray-700 text-sm font-bold mb-2">
                  Longueur du Code PIN:
                </label>
                <input
                  type="number"
                  id="pinLength"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={pinLength}
                  onChange={(e) => setPinLength(e.target.value === '' ? '' : parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Ajouter la Plateforme
                </button>
              </div>
            </form>
          </div>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformForm;

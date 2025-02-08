import React, { useState } from 'react';
import { Monitor, X } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  maxProfiles: number;
  pinCodeLength: number;
}

interface PlatformFormProps {
  platform?: Platform;
  onSave: (platform: Platform) => void;
  onCancel: () => void;
}

const PlatformForm: React.FC<PlatformFormProps> = ({ platform, onSave, onCancel }) => {
  const [name, setName] = useState(platform?.name || '');
  const [maxProfiles, setMaxProfiles] = useState(platform?.maxProfiles?.toString() || '');
  const [pinCodeLength, setPinCodeLength] = useState(platform?.pinCodeLength?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlatform = {
      id: platform?.id || Math.random().toString(36).substring(2, 15),
      name,
      maxProfiles: parseInt(maxProfiles, 10),
      pinCodeLength: parseInt(pinCodeLength, 10),
    };

    onSave(newPlatform);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {platform ? 'Modifier la Plateforme' : 'Ajouter une Plateforme'}
            </h3>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-7 py-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Nom de la Plateforme:
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setMaxProfiles(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="pinCodeLength" className="block text-gray-700 text-sm font-bold mb-2">
                  Longueur du Code PIN:
                </label>
                <input
                  type="number"
                  id="pinCodeLength"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={pinCodeLength}
                  onChange={(e) => setPinCodeLength(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {platform ? 'Enregistrer' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformForm;

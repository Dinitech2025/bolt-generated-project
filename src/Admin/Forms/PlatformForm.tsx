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
      <div className="relative top-20 mx-auto p-5 border shadow-lg rounded-xl bg-white w-96">
        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {platform ? 'Ajouter une Plateforme' : 'Modifier la Plateforme'}
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
              <div className="mt-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Nom
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
                <label htmlFor="maxProfiles" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Nombre Maximum de Profils
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
                <label htmlFor="pinCodeLength" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Longueur du code PIN
                </label>
                <input
                  type="number"
                  id="pinCodeLength"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={pinCodeLength}
                  onChange={(e) => setPinCodeLength(e.target.value)}
                  required
                />
                <p className="text-gray-500 text-xs italic text-left">Entre 4 et 8 chiffres</p>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {platform ? 'Enregistrer' : 'Ajouter'}
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

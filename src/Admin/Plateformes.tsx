import React, { useState } from 'react';
import PlatformForm from './Forms/PlatformForm';
import { Pencil, Trash2, Monitor } from 'lucide-react';

interface Platform {
  id: number;
  name: string;
  maxProfiles: number;
  pinCodeLength: number;
}

const Plateformes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 1, name: 'NETFLIX', maxProfiles: 5, pinCodeLength: 4 },
    { id: 2, name: 'PRIME VIDEO', maxProfiles: 6, pinCodeLength: 6 },
  ]);

  const openModal = () => {
    setEditingPlatform(null);
    setIsModalOpen(true);
  };

  const openEditModal = (platform: Platform) => {
    setEditingPlatform(platform);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlatform(null);
  };

  const handleSavePlatform = (platform: Platform) => {
    if (platform.id) {
      // Update existing platform
      setPlatforms(
        platforms.map((p) => (p.id === platform.id ? platform : p))
      );
    } else {
      // Add new platform
      setPlatforms([...platforms, { ...platform, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDeletePlatform = (id: number) => {
    setPlatforms(platforms.filter((platform) => platform.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Plateformes de Streaming</h1>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Ajouter une Plateforme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <Monitor className="mr-2 text-gray-500" />
              <h2 className="text-lg font-semibold">{platform.name}</h2>
            </div>
            <p className="text-gray-600">{platform.maxProfiles} profils max</p>
            <p className="text-gray-600">Code PIN: {platform.pinCodeLength} chiffres</p>
            <div className="flex justify-end mt-4">
              <button
                className="text-gray-500 hover:text-gray-700 mr-2"
                onClick={() => openEditModal(platform)}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeletePlatform(platform.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <PlatformForm
              platform={editingPlatform}
              onSave={handleSavePlatform}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Plateformes;

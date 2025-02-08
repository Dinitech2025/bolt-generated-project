import React, { useState } from 'react';
import { Plus, Edit, Trash2, Monitor } from 'lucide-react';
import PlatformForm from './Forms/PlatformForm';

interface Platform {
  id: string;
  name: string;
  maxProfiles: number;
  pinCodeLength: number;
}

const Plateformes: React.FC = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: '1', name: 'NETFLIX', maxProfiles: 5, pinCodeLength: 4 },
    { id: '2', name: 'PRIME VIDEO', maxProfiles: 6, pinCodeLength: 6 },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  const handleAddPlatform = () => {
    setSelectedPlatform(null);
    setIsFormOpen(true);
  };

  const handleEditPlatform = (platform: Platform) => {
    setSelectedPlatform(platform);
    setIsFormOpen(true);
  };

  const handleDeletePlatform = (id: string) => {
    setPlatforms(platforms.filter((platform) => platform.id !== id));
  };

  const handleSavePlatform = (platform: Platform) => {
    if (platform.id) {
      // Update existing platform
      setPlatforms(
        platforms.map((p) => (p.id === platform.id ? platform : p))
      );
    } else {
      // Add new platform
      setPlatforms([...platforms, platform]);
    }
    setIsFormOpen(false);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Plateformes de Streaming</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddPlatform}
        >
          <Plus className="mr-2 inline-block" size={16} />
          Ajouter une Plateforme
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <Monitor className="mr-2 text-gray-500" size={20} />
              <h2 className="text-lg font-semibold">{platform.name}</h2>
            </div>
            <p className="text-gray-600">{platform.maxProfiles} profils max</p>
            <p className="text-gray-600">Code PIN: {platform.pinCodeLength} chiffres</p>
            <div className="flex justify-end mt-4">
              <button
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => handleEditPlatform(platform)}
              >
                <Edit size={16} />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeletePlatform(platform.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <PlatformForm
          platform={selectedPlatform || undefined}
          onSave={handleSavePlatform}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

export default Plateformes;

import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import PlatformForm from '../Forms/PlatformForm';
import { supabase } from '../../supabase';
import { Pencil, Trash, Monitor } from 'lucide-react';

const Plateformes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platforms, setPlatforms] = useState<
    {
      id: number;
      platform_name: string;
      max_profiles: number | null;
      pin_code_length: number | null;
    }[]
  >([]);
  const [selectedPlatform, setSelectedPlatform] = useState<
    | {
        id: number;
        platform_name: string;
        max_profiles: number | null;
        pin_code_length: number | null;
      }
    | null
  >(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const { data, error } = await supabase.from('platforms').select('*');
      if (error) {
        console.error('Error fetching platforms:', error);
      } else {
        setPlatforms(data || []);
      }
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlatform(null);
  };

  const handleDeletePlatform = async (id: number) => {
    try {
      const { error } = await supabase.from('platforms').delete().eq('id', id);
      if (error) {
        console.error('Error deleting platform:', error);
        alert('Failed to delete platform.');
      } else {
        setPlatforms(platforms.filter((platform) => platform.id !== id));
        alert('Platform deleted successfully!');
        fetchPlatforms(); // Refresh the platform list after deletion
      }
    } catch (error) {
      console.error('Error deleting platform:', error);
      alert('An unexpected error occurred.');
    }
  };

  const handleOpenModifyModal = (platform: {
    id: number;
    platform_name: string;
    max_profiles: number | null;
    pin_code_length: number | null;
  }) => {
    setSelectedPlatform(platform);
    setIsModifyModalOpen(true);
  };

  const handleCloseModifyModal = () => {
    setIsModifyModalOpen(false);
    setSelectedPlatform(null);
  };

  const handlePlatformUpdate = (updatedPlatform: {
    id: number;
    platform_name: string;
    max_profiles: number | null;
    pin_code_length: number | null;
  }) => {
    setPlatforms(
      platforms.map((platform) =>
        platform.id === updatedPlatform.id ? updatedPlatform : platform
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Plateformes</h1>
      <AddButton onClick={handleOpenModal} />

      {/* Table-row-like Responsive Layout */}
      <div className="flex flex-col gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-white shadow-md rounded-md p-4 flex items-center justify-between md:flex-row flex-col"
          >
            {/* Platform Info */}
            <div className="flex items-center mb-2 md:mb-0 md:flex-row md:justify-between">
              <div className="mr-4">
                <Monitor color="blue" size={32} />
              </div>
              <div className="md:flex md:items-center">
                <h2 className="text-lg font-semibold">{platform.platform_name}</h2>
                <p className="text-gray-500 text-xs md:ml-4">
                  <span className="text-sm">
                    {platform.max_profiles} profils max, Code PIN: {platform.pin_code_length} chiffres
                  </span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleOpenModifyModal(platform)}
                className="transition-all transform hover:scale-110 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <Pencil color="black" size={16} />
              </button>
              <button
                onClick={() => handleDeletePlatform(platform.id)}
                className="transition-all transform hover:scale-110 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <Trash color="red" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Platform Modal */}
      <PlatformForm isOpen={isModalOpen} onClose={handleCloseModal} fetchPlatforms={fetchPlatforms} />

      {/* Modify Platform Modal */}
      {selectedPlatform && (
        <PlatformForm
          isOpen={isModifyModalOpen}
          onClose={handleCloseModifyModal}
          platform={selectedPlatform}
          onPlatformUpdate={handlePlatformUpdate}
          fetchPlatforms={fetchPlatforms}
        />
      )}
    </div>
  );
};

export default Plateformes;

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../supabase';

interface PlatformFormProps {
  isOpen: boolean;
  onClose: () => void;
  platform?: {
    id: number;
    platform_name: string;
    max_profiles: number | null;
    pin_code_length: number | null;
  };
  onPlatformUpdate?: (updatedPlatform: {
    id: number;
    platform_name: string;
    max_profiles: number | null;
    pin_code_length: number | null;
  }) => void;
  fetchPlatforms: () => Promise<void>;
}

const PlatformForm: React.FC<PlatformFormProps> = ({ isOpen, onClose, platform, onPlatformUpdate, fetchPlatforms }) => {
  const [platformName, setPlatformName] = useState(platform?.platform_name || '');
  const [maxProfiles, setMaxProfiles] = useState<number | ''>(platform?.max_profiles?.toString() || '');
  const [pinLength, setPinLength] = useState<number | ''>(platform?.pin_code_length?.toString() || '');

  const isUpdateMode = !!platform;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const insertData = {
        platform_name: platformName,
        max_profiles: maxProfiles === '' ? null : parseInt(maxProfiles),
        pin_code_length: pinLength === '' ? null : parseInt(pinLength),
      };

      console.log('Data being sent to Supabase:', insertData);

      let response;

      if (isUpdateMode && platform) {
        response = await supabase
          .from('platforms')
          .update(insertData)
          .eq('id', platform.id);
      } else {
        response = await supabase
          .from('platforms')
          .insert([insertData]);
      }

      if (response.error) {
        console.error('Supabase insertion error:', response.error);
        alert('Failed to add/update platform. Please check the console for details.');
        return;
      }

      console.log('Platform added/updated successfully:', response.data);
      onClose();
      setPlatformName('');
      setMaxProfiles('');
      setPinLength('');

      if (isUpdateMode && platform && onPlatformUpdate) {
        onPlatformUpdate({
          id: platform.id,
          platform_name: platformName,
          max_profiles: maxProfiles === '' ? null : parseInt(maxProfiles),
          pin_code_length: pinLength === '' ? null : parseInt(pinLength),
        });
      }

      fetchPlatforms(); // Refresh the platform list after adding/updating
    } catch (error) {
      console.error('Error adding/updating platform:', error);
      alert('An unexpected error occurred. Please check the console for details.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {isUpdateMode ? 'Modifier la Plateforme' : 'Ajouter une Nouvelle Plateforme'}
          </h3>
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="platformName" className="block text-gray-700 text-sm font-bold mb-2 text-left">
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
                <label htmlFor="maxProfiles" className="block text-gray-700 text-sm font-bold mb-2 text-left">
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
                <label htmlFor="pinLength" className="block text-gray-700 text-sm font-bold mb-2 text-left">
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
                  className="px-4 py-2 bg-custom-blue text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  {isUpdateMode ? 'Modifier la Plateforme' : 'Ajouter la Plateforme'}
                </button>
              </div>
            </form>
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

export default PlatformForm;

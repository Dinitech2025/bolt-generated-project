import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import OffreForm from '../Forms/OffreForm';
import { supabase } from '../../supabase';

const Offres = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platforms, setPlatforms] = useState<
    {
      id: number;
      platform_name: string;
    }[]
  >([]);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const { data, error } = await supabase.from('platforms').select('id, platform_name');
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
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Offres</h1>
      <AddButton onClick={handleOpenModal} />
      <OffreForm isOpen={isModalOpen} onClose={handleCloseModal} platforms={platforms} />
    </div>
  );
};

export default Offres;

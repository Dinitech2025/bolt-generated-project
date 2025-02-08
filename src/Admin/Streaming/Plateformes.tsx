import React, { useState } from 'react';
import AddButton from '../components/AddButton';
import PlatformForm from '../Forms/PlatformForm';

const Plateformes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log('Modal should open'); // Add this line
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Plateformes</h1>
      <AddButton onClick={handleOpenModal} />
      <PlatformForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Plateformes;

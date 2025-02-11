import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import OffreForm from '../Forms/OffreForm';
import { supabase } from '../../supabase';
import { Pencil, Trash, Tag } from 'lucide-react'; // Import icons

const Offres = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offres, setOffres] = useState([]); // State to hold offres
  const [platforms, setPlatforms] = useState([]); // State to hold platforms for OffreForm

  useEffect(() => {
    fetchOffres();
    fetchPlatforms(); // Fetch platforms for the form
  }, []);

  const fetchOffres = async () => {
    try {
      const { data, error } = await supabase
        .from('offres')
        .select('*, platforms(platform_name)') // Fetch offers and join with platforms table
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching offres:', error);
      } else {
        setOffres(data || []);
      }
    } catch (error) {
      console.error('Error fetching offres:', error);
    }
  };

  const fetchPlatforms = async () => {
    try {
      const { data, error } = await supabase
        .from('platforms')
        .select('id, platform_name');
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

  const handleOffreAdded = async () => {
    await fetchOffres();
  };

  const handleDeleteOffre = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette offre?")) {
      return;
    }
    try {
      const { error } = await supabase.from('offres').delete().eq('id', id);
      if (error) {
        console.error("Error deleting offre:", error);
        alert("Erreur lors de la suppression de l'offre.");
      } else {
        alert("Offre supprimée avec succès!");
        fetchOffres(); // Refresh offres list
      }
    } catch (error) {
      console.error("Error deleting offre:", error);
      alert("Erreur inattendue lors de la suppression de l'offre.");
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Offres</h1>
      <AddButton onClick={handleOpenModal} />
      <OffreForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        platforms={platforms} // Pass platforms to OffreForm
        onOffreAdded={handleOffreAdded}
      />

      {/* Offers List Display */}
      <div className="flex flex-col gap-4">
        {offres.map((offre) => (
          <div key={offre.id} className="bg-white shadow-md rounded-md p-4 flex items-center justify-between md:flex-row flex-col">
            {/* Offer Info */}
            <div className="flex items-center mb-2 md:mb-0 md:flex-row md:justify-between">
              <div className="mr-4">
                <Tag color="blue" size={32} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{offre.offre_name}</h2>
                <p className="text-gray-500 text-xs md:ml-4">
                  <span className="text-sm">
                    Plateforme: {offre.platforms?.platform_name || 'N/A'}
                  </span>
                </p>
                <p className="text-gray-600">{offre.description}</p>
                <p className="text-gray-600">Mois: {offre.number_of_months || 'N/A'}, Prix: {offre.offre_price || 'N/A'}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                className="transition-all transform hover:scale-110 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <Pencil color="black" size={16} />
              </button>
              <button
                onClick={() => handleDeleteOffre(offre.id)}
                className="transition-all transform hover:scale-110 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <Trash color="red" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {offres.length === 0 && <p className="text-gray-500 mt-2">Aucune offre ajoutée pour le moment.</p>}
    </div>
  );
};

export default Offres;

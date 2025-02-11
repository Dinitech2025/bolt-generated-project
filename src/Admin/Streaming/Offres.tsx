import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import OffreForm from '../Forms/OffreForm';
import { supabase } from '../../supabase';
import { Pencil, Trash, Tag } from 'lucide-react'; // Import icons

const Offres = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offres, setOffres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    fetchOffres();
    fetchPlatforms();
  }, []);

  const fetchOffres = async () => {
    try {
      const { data, error } = await supabase
        .from('offres')
        .select('*, platforms(platform_name)')
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
        fetchOffres();
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
        platforms={platforms}
        onOffreAdded={handleOffreAdded}
      />

      {/* Offers Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"> {/* Added grid layout */}
        {offres.map((offre) => (
          <div key={offre.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <Tag className="mr-2 text-gray-500" />
              <h2 className="text-lg font-semibold">{offre.offre_name}</h2>
            </div>
            <p className="text-gray-600">Plateforme: {offre.platforms?.platform_name || 'N/A'}</p>
            <p className="text-gray-600">{offre.description}</p>
            <p className="text-gray-600">Mois: {offre.number_of_months || 'N/A'}, Prix: {offre.offre_price || 'N/A'}</p>
            <div className="flex justify-end mt-4">
              <button className="text-gray-500 hover:text-gray-700 mr-2">
                <Pencil className="h-4 w-4" />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteOffre(offre.id)}
              >
                <Trash className="h-4 w-4" />
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

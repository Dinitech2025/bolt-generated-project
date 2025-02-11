import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import OffreForm from '../Forms/OffreForm';
import { supabase } from '../../supabase';
import { Pencil, Trash, Tag, Monitor } from 'lucide-react';

const Offres = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offres, setOffres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedOffre, setSelectedOffre] = useState<any | null>(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);

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
    setSelectedOffre(null);
    setIsModifyModalOpen(false);
  };

  const handleOffreAdded = async () => {
    fetchOffres();
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

  const handleModifyOffre = async (offreId: number) => {
    try {
      const { data, error } = await supabase
        .from('offres')
        .select('*, platforms(platform_name)')
        .eq('id', offreId)
        .single();

      if (error) {
        console.error("Error fetching offre for modification:", error);
        alert("Erreur lors de la récupération des détails de l'offre.");
      } else if (data) {
        setSelectedOffre(data);
        setIsModifyModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching offre for modification:", error);
      alert("Erreur inattendue lors de la récupération des détails de l'offre.");
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

      {isModifyModalOpen && selectedOffre && (
        <OffreForm
          isOpen={isModifyModalOpen}
          onClose={handleCloseModal}
          platforms={platforms}
          offre={selectedOffre}
          onOffreAdded={handleOffreAdded}
        />
      )}

      {/* Table-row-like Responsive Layout */}
      <div className="flex flex-col gap-4">
        {offres.map((offre) => (
          <div
            key={offre.id}
            className="bg-white shadow-md rounded-md p-4 flex md:flex-row flex-col items-center justify-between"
          >
            {/* Offer Image */}
            <div className="flex items-center md:mb-0 mb-4 md:flex-row flex-col md:justify-between">
              <div className="mr-4 md:mb-0 mb-2">
                {offre.offre_image_url ? (
                  <img
                    src={offre.offre_image_url}
                    alt={offre.offre_name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-md flex justify-center items-center">
                    <Tag className="text-gray-400 h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="md:flex md:items-center  md:text-left text-center">
                <h2 className="text-lg font-semibold">{offre.offre_name}</h2>
                <p className="text-gray-500 text-xs md:ml-4">
                  <span className="text-sm">
                    {offre.number_of_months} mois, {offre.offre_price} Ar
                  </span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleModifyOffre(offre.id)}
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
      {offres.length === 0 && <p className="text-gray-500 mt-4">Aucune offre ajoutée pour le moment.</p>}
    </div>
  );
};

export default Offres;

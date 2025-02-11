import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import OffreForm from '../Forms/OffreForm';
import { supabase } from '../../supabase';
import { Pencil, Trash, Tag, Monitor } from 'lucide-react'; // Import icons

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
    fetchOffres(); // Refresh offers after adding/modifying
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
      // Fetch specific offre by ID
      const { data, error } = await supabase
        .from('offres')
        .select('*, platforms(platform_name)')
        .eq('id', offreId)
        .single(); // Use single to get a single record

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
      {/* Add Offre Modal */}
      <OffreForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        platforms={platforms}
        onOffreAdded={handleOffreAdded}
      />
      {/* Modify Offre Modal */}
      {isModifyModalOpen && selectedOffre && ( // Conditional rendering and check for selectedOffre
        <OffreForm
          isOpen={isModifyModalOpen}
          onClose={handleCloseModal}
          platforms={platforms}
          offre={selectedOffre} // Now correctly passing selectedOffre as offre prop
          onOffreAdded={handleOffreAdded}
        />
      )}

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
                onClick={() => handleModifyOffre(offre.id)} // Pass offre.id to handleModifyOffre
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


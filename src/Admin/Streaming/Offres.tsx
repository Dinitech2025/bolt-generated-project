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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {offres.map((offre) => (
          <div key={offre.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {offre.offre_image_url ? (
              <img
                src={offre.offre_image_url}
                alt={offre.offre_name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="h-48 bg-gray-100 flex justify-center items-center">
                <Tag className="text-gray-400 h-12 w-12" />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 truncate">{offre.offre_name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-700 font-medium">{offre.offre_price} Ar</span>
                <span className="text-blue-500 text-sm">{offre.number_of_months} Mois</span>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 flex flex-col justify-between">
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleModifyOffre(offre.id)}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteOffre(offre.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {offres.length === 0 && <p className="text-gray-500 mt-4">Aucune offre ajoutée pour le moment.</p>}
    </div>
  );
};

export default Offres;

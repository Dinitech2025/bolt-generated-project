import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import CompteForm from '../Forms/CompteForm';
import { supabase } from '../../supabase';
import { Pencil, Trash, UserCircle, Mail, Lock, Calendar, Monitor } from 'lucide-react'; // Added Monitor icon to import

const Comptes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comptes, setComptes] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedCompte, setSelectedCompte] = useState<any | null>(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);

  useEffect(() => {
    fetchComptes();
    fetchPlatforms();
  }, []);

  const fetchComptes = async () => {
    try {
      const { data, error } = await supabase
        .from('comptes')
        .select('*, platforms(platform_name)')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching comptes:', error);
      } else {
        setComptes(data || []);
      }
    } catch (error) {
      console.error('Error fetching comptes:', error);
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
    setSelectedCompte(null);
    setIsModifyModalOpen(false);
  };

  const handleCompteAdded = async () => {
    fetchComptes();
  };

  const handleDeleteCompte = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce compte?")) {
      return;
    }
    try {
      const { error } = await supabase.from('comptes').delete().eq('id', id);
      if (error) {
        console.error("Error deleting compte:", error);
        alert("Erreur lors de la suppression du compte.");
      } else {
        alert("Compte supprimé avec succès!");
        fetchComptes();
      }
    } catch (error) {
      console.error("Error deleting compte:", error);
      alert("Erreur inattendue lors de la suppression du compte.");
    }
  };

  const handleModifyCompte = async (compteId: number) => {
    try {
      const { data, error } = await supabase
        .from('comptes')
        .select('*, platforms(platform_name)')
        .eq('id', compteId)
        .single();

      if (error) {
        console.error("Error fetching compte for modification:", error);
        alert("Erreur lors de la récupération des détails du compte.");
      } else if (data) {
        setSelectedCompte(data);
        setIsModifyModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching compte for modification:", error);
      alert("Erreur inattendue lors de la suppression du compte.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Comptes</h1>
      <AddButton onClick={handleOpenModal} />

      <CompteForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        platforms={platforms}
        onCompteAdded={handleCompteAdded}
      />

      {isModifyModalOpen && selectedCompte && (
        <CompteForm
          isOpen={isModifyModalOpen}
          onClose={handleCloseModal}
          platforms={platforms}
          compte={selectedCompte}
          onCompteAdded={handleCompteAdded}
        />
      )}

      {/* Table-row-like Responsive Layout */}
      <div className="flex flex-col gap-4">
        {comptes.map((compte) => (
          <div
            key={compte.id}
            className="bg-white shadow-md rounded-md p-4 flex md:flex-row flex-col items-center justify-between"
          >
            {/* Platform Info */}
            <div className="flex items-center md:mb-0 mb-4 md:flex-row flex-col md:justify-between">
              <div className="mr-4">
                <UserCircle color="blue" size={32} /> {/* Changed icon to UserCircle */}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{compte.account_name}</h2>
                <p className="text-gray-500 text-sm flex items-center"><Monitor className="mr-1 w-4 h-4"/> Plateforme: {compte.platforms?.platform_name}</p>
                <p className="text-gray-500 text-sm flex items-center"><Mail className="mr-1 w-4 h-4"/> Email: {compte.account_email}</p>
                <p className="text-gray-500 text-sm flex items-center"><Lock className="mr-1 w-4 h-4"/> Mot de passe: {compte.account_password}</p> {/* Added password display */}
                <p className="text-gray-500 text-sm flex items-center"><Calendar className="mr-1 w-4 h-4"/> Expiration: {new Date(compte.expiration_date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p> {/* Formatted date */}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleModifyCompte(compte.id)}
                className="transition-all transform hover:scale-110 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <Pencil color="black" size={16} />
              </button>
              <button
                onClick={() => handleDeleteCompte(compte.id)}
                className="transition-all transform hover:scale-110 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <Trash color="red" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {comptes.length === 0 && <p className="text-gray-500 mt-4">Aucun compte ajouté pour le moment.</p>}
    </div>
  );
};

export default Comptes;

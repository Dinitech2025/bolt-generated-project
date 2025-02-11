import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../supabase';

interface CompteFormProps {
  isOpen: boolean;
  onClose: () => void;
  platforms: { id: number; platform_name: string }[];
  onCompteAdded: () => void;
  compte?: any; // Optional: to handle edit mode
}

const CompteForm: React.FC<CompteFormProps> = ({ isOpen, onClose, platforms, onCompteAdded, compte }) => {
  const [platformId, setPlatformId] = useState<number | null>(null);
  const [accountName, setAccountName] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const isUpdateMode = !!compte; // Determine if it's update mode

  useEffect(() => {
    if (compte) {
      // Populate form with compte data when in update mode
      setPlatformId(compte.platform_id || null);
      setAccountName(compte.account_name || '');
      setAccountEmail(compte.account_email || '');
      setAccountPassword(compte.account_password || ''); // Be cautious about pre-filling passwords
      setExpirationDate(compte.expiration_date ? new Date(compte.expiration_date).toISOString().split('T')[0] : '');
    }
  }, [compte]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!platformId) {
      alert("Veuillez sélectionner une plateforme.");
      return;
    }

    try {
      const compteData = {
        platform_id: platformId,
        account_name: accountName,
        account_email: accountEmail,
        account_password: accountPassword,
        expiration_date: expirationDate,
      };

      let response;

      if (isUpdateMode && compte) {
        // Update existing compte
        response = await supabase
          .from('comptes')
          .update(compteData)
          .eq('id', compte.id)
          .select();
      } else {
        // Insert new compte
        response = await supabase
          .from('comptes')
          .insert([compteData])
          .select();
      }


      if (response.error) {
        console.error('Error inserting/updating compte:', response.error);
        alert('Failed to add/update compte. Please check the console for details.');
      } else {
        console.log('Compte added/updated successfully:', response.data);
        alert(`Compte ${isUpdateMode ? 'modifié' : 'ajouté'} avec succès!`);
        onCompteAdded();
        onClose();
      }
    } catch (error) {
      console.error('Error adding/updating compte:', error);
      alert('An unexpected error occurred. Please check the console for details.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {isUpdateMode ? 'Modifier Compte' : 'Ajouter un Nouveau Compte'}
          </h3>
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="platformId" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Plateforme:
                </label>
                <select
                  id="platformId"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={platformId || ''}
                  onChange={(e) => setPlatformId(parseInt(e.target.value))}
                  required
                  disabled={isUpdateMode} // Disable platform selection in edit mode
                >
                  <option value="">Sélectionner une plateforme</option>
                  {platforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.platform_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="accountName" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Nom du Compte:
                </label>
                <input
                  type="text"
                  id="accountName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="accountEmail" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Email du Compte:
                </label>
                <input
                  type="email"
                  id="accountEmail"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="accountPassword" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Mot de Passe du Compte:
                </label>
                <input
                  type="text"
                  id="accountPassword"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={accountPassword}
                  onChange={(e) => setAccountPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="expirationDate" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Date d'Expiration:
                </label>
                <input
                  type="date"
                  id="expirationDate"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-custom-blue text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  {isUpdateMode ? 'Modifier Compte' : 'Ajouter Compte'}
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

export default CompteForm;

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../supabase';
import ImageSelector from './ImageSelector';

interface OffreFormProps {
  isOpen: boolean;
  onClose: () => void;
  platforms: { id: number; platform_name: string }[];
  onOffreAdded: () => void;
}

const OffreForm: React.FC<OffreFormProps> = ({ isOpen, onClose, platforms, onOffreAdded }) => {
  const [offreName, setOffreName] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfMonths, setNumberOfMonths] = useState<number | ''>('');
  const [offrePrice, setOffrePrice] = useState<number | ''>('');
  const [selectedPlatformId, setSelectedPlatformId] = useState<number | null>(null);
  const [offreImageUrl, setOffreImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPlatformId) {
      alert("Veuillez sélectionner une plateforme.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('offres')
        .insert([
          {
            platform_id: selectedPlatformId,
            offre_name: offreName,
            description: description, // Description is now optional
            number_of_months: numberOfMonths === '' ? null : parseInt(numberOfMonths),
            offre_price: offrePrice === '' ? null : parseInt(offrePrice),
            offre_image_url: offreImageUrl,
          },
        ])
        .select();

      if (error) {
        console.error('Error inserting offre:', error);
        alert('Failed to add offre. Please check the console for details.');
      } else {
        console.log('Offre added successfully:', data);
        alert('Offre ajoutée avec succès!');
        onOffreAdded();
        onClose();
      }
    } catch (error) {
      console.error('Error adding offre:', error);
      alert('An unexpected error occurred. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setOffreImageUrl(imageUrl);
    console.log("Selected image URL:", imageUrl);
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Ajouter une Nouvelle Offre</h3>
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="platform" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Plateforme:
                </label>
                <select
                  id="platform"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedPlatformId || ''}
                  onChange={(e) => setSelectedPlatformId(parseInt(e.target.value))}
                  required
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
                <label htmlFor="offreName" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Nom de l'offre:
                </label>
                <input
                  type="text"
                  id="offreName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={offreName}
                  onChange={(e) => setOffreName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Description:
                </label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  /* required  <- REMOVED REQUIRED ATTRIBUTE */
                />
              </div>

              {/* Two-Column Layout for Nombre de mois and Prix de l'offre */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="numberOfMonths" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                    Nombre de mois:
                  </label>
                  <input
                    type="number"
                    id="numberOfMonths"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={numberOfMonths}
                    onChange={(e) => setNumberOfMonths(e.target.value === '' ? '' : parseInt(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="offrePrice" className="block text-gray-700 text-sm font-bold mb-2 text-left">
                    Prix de l'offre:
                  </label>
                  <input
                    type="number"
                    id="offrePrice"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={offrePrice}
                    onChange={(e) => setOffrePrice(e.target.value === '' ? '' : parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>

              {/* Image Selector Component */}
              <ImageSelector onImageSelect={handleImageSelect} />

              <div className="items-center px-4 py-3">
                <button
                  type="submit"
                  className={`px-4 py-2 bg-custom-blue text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Ajout de l\'offre...' : 'Ajouter l\'offre'}
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

export default OffreForm;

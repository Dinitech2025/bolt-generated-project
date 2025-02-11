import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { X, File as FileIcon, Trash } from 'lucide-react'; // Import Trash icon
import FileUploadForm from '../Forms/FileUploadForm';
import AddButton from '../components/AddButton';

const Fichiers = () => {
  const [fichiers, setFichiers] = useState<string[]>([]);
  const [previewFichierUrl, setPreviewFichierUrl] = useState<string | null>(null);
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);

  useEffect(() => {
    fetchFichiers();
  }, []);

  const fetchFichiers = async () => {
    try {
      const { data, error } = await supabase.storage.from('fichiers').list();
      if (error) {
        console.error('Error fetching fichiers:', error);
      } else {
        const publicUrls = data.map(fichier => getPublicUrl(fichier.name));
        setFichiers(publicUrls);
      }
    } catch (error) {
      console.error('Error fetching fichiers:', error);
    }
  };

  const getPublicUrl = (fichierName: string) => {
    let publicUrl = `${supabase.storageUrl}/object/public/fichiers/${fichierName}`;
    return publicUrl;
  };

  const openPreviewModal = (fichierUrl: string) => {
    setPreviewFichierUrl(fichierUrl);
  };

  const closePreviewModal = () => {
    setPreviewFichierUrl(null);
  };

  const handleOpenUploadForm = () => {
    setIsUploadFormVisible(true);
  };

  const handleCloseUploadForm = () => {
    setIsUploadFormVisible(false);
  };

  const handleFileUploadSuccess = () => {
    fetchFichiers();
    setIsUploadFormVisible(false);
  };

  const handleDeleteFichier = async (fichierUrl: string) => {
    const fichierName = fichierUrl.split('/').pop() || '';
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le fichier "${fichierName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase.storage
        .from('fichiers')
        .remove([fichierName]);

      if (error) {
        console.error('Error deleting fichier:', error);
        alert('Erreur lors de la suppression du fichier.');
      } else {
        alert('Fichier supprimé avec succès!');
        setFichiers(fichiers.filter(fileUrl => fileUrl !== fichierUrl));
      }
    } catch (error) {
      console.error('Error deleting fichier:', error);
      alert('Erreur inattendue lors de la suppression du fichier.');
    }
  };


  const getFileTypeIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    switch (extension) {
      case 'pdf':
        return <FileIcon className="h-12 w-12 text-red-500" />;
      case 'doc': case 'docx':
        return <FileIcon className="h-12 w-12 text-blue-500" />;
      case 'xls': case 'xlsx':
        return <FileIcon className="h-12 w-12 text-green-500" />;
      case 'ppt': case 'pptx':
        return <FileIcon className="h-12 w-12 text-orange-500" />;
      case 'zip': case 'rar':
        return <FileIcon className="h-12 w-12 text-yellow-500" />;
      default:
        return <FileIcon className="h-12 w-12 text-gray-500" />; // Default file icon
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Galerie de Fichiers</h1>

      {/* Add Fichier Button */}
      <div className="flex justify-end mb-4">
        <AddButton onClick={handleOpenUploadForm} />
      </div>

      {/* Fichier List */}
      <div className="overflow-hidden max-h-[calc(100vh-180px)] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fichiers.map((fichierUrl, index) => (
            <div key={index} className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer relative"> {/* Added relative */}
              {/* File Type Icon based on extension */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                {getFileTypeIcon(fichierUrl.split('/').pop() || '')}
              </div>
              <div className="p-3 flex justify-between items-center"> {/* Flex container */}
                <p className="text-sm text-gray-600 truncate">{fichierUrl.split('/').pop()}</p>
                <a href={fichierUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline block mt-2">
                  Télécharger
                </a>
                <button
                  onClick={() => handleDeleteFichier(fichierUrl)}
                  className="hover:text-red-500 focus:outline-none"
                  aria-label={`Supprimer le fichier ${fichierUrl.split('/').pop()}`}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {fichiers.length === 0 && <p className="text-gray-500 mt-2">Aucun fichier uploadé pour le moment.</p>}
      </div>

      {/* Preview Modal */}
      {previewFichierUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-md p-6 max-w-3xl max-h-screen overflow-auto">
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
              onClick={closePreviewModal}
            >
              <X size={20} />
            </button>
            {/* Download Link in Modal */}
            <div className="w-full max-h-[80vh] bg-gray-200 flex items-center justify-center text-gray-700 p-4 flex-col">
              <p className="mb-4">Ce type de fichier ne peut pas être prévisualisé.</p>
              <a href={previewFichierUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Télécharger le Fichier
              </a>
            </div>
          </div>
        </div>
      )}

      {/* File Upload Form Modal */}
      <FileUploadForm
        isOpen={isUploadFormVisible}
        onClose={handleCloseUploadForm}
        onFileUploadSuccess={handleFileUploadSuccess}
      />
    </div>
  );
};

export default Fichiers;

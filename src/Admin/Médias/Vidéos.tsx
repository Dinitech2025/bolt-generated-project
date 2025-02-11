import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { X, Film, Trash } from 'lucide-react'; // Import Trash icon
import VideoUploadForm from '../Forms/VideoUploadForm';
import AddButton from '../components/AddButton';

const Vidéos = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase.storage.from('videos').list();
      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        const publicUrls = data.map(video => getPublicUrl(video.name));
        setVideos(publicUrls);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const getPublicUrl = (videoName: string) => {
    let publicUrl = `${supabase.storageUrl}/object/public/videos/${videoName}`;
    return publicUrl;
  };

  const openPreviewModal = (videoUrl: string) => {
    setPreviewVideoUrl(videoUrl);
  };

  const closePreviewModal = () => {
    setPreviewVideoUrl(null);
  };

  const handleOpenUploadForm = () => {
    setIsUploadFormVisible(true);
  };

  const handleCloseUploadForm = () => {
    setIsUploadFormVisible(false);
  };

  const handleVideoUploadSuccess = () => {
    fetchVideos();
    setIsUploadFormVisible(false);
  };

  const handleDeleteVideo = async (videoUrl: string) => {
    const videoName = videoUrl.split('/').pop() || '';
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer la vidéo "${videoName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase.storage
        .from('videos')
        .remove([videoName]);

      if (error) {
        console.error('Error deleting video:', error);
        alert('Erreur lors de la suppression de la vidéo.');
      } else {
        alert('Vidéo supprimée avec succès!');
        setVideos(videos.filter(vidUrl => vidUrl !== videoUrl));
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Erreur inattendue lors de la suppression de la vidéo.');
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Galerie de Vidéos</h1>

      {/* Add Video Button */}
      <div className="flex justify-end mb-4">
        <AddButton onClick={handleOpenUploadForm} />
      </div>

      {/* Video List */}
      <div className="overflow-hidden max-h-[calc(100vh-180px)] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((videoUrl, index) => (
            <div key={index} className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer relative"> {/* Added relative */}
              <video
                src={videoUrl}
                alt={`Video ${index}`}
                className="w-full h-48 object-cover"
                controls
                onClick={() => openPreviewModal(videoUrl)} // Make video clickable for preview
              />
              <div className="p-3 flex justify-between items-center"> {/* Flex container */}
                <p className="text-sm text-gray-600 truncate">{videoUrl.split('/').pop()}</p>
                <button
                  onClick={() => handleDeleteVideo(videoUrl)}
                  className="hover:text-red-500 focus:outline-none"
                  aria-label={`Supprimer la vidéo ${videoUrl.split('/').pop()}`}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {videos.length === 0 && <p className="text-gray-500 mt-2">Aucune vidéo uploadée pour le moment.</p>}
      </div>

      {/* Preview Modal */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-md p-6 max-w-3xl max-h-screen overflow-auto">
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
              onClick={closePreviewModal}
            >
              <X size={20} />
            </button>
            <video
              src={previewVideoUrl}
              alt="Video Preview"
              className="w-full max-h-[80vh] object-contain"
              controls
            />
          </div>
        </div>
      )}

      {/* Video Upload Form Modal */}
      <VideoUploadForm
        isOpen={isUploadFormVisible}
        onClose={handleCloseUploadForm}
        onVideoUploadSuccess={handleVideoUploadSuccess}
      />
    </div>
  );
};

export default Vidéos;

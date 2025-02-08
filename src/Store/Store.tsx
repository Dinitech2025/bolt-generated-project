import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import AuthModal from '../AuthModal';

const Store: React.FC = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold mb-4">Page du Store</h1>
      <p>Bienvenue sur la page du store!</p>

      {user ? (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={logout}
        >
          Se Déconnecter
        </button>
      ) : (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={openAuthModal}
          >
            Se Connecter
          </button>
          {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
        </>
      )}
    </div>
  );
};

export default Store;

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { X } from 'lucide-react';
import { z } from 'zod';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  // Zod schema for form validation
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const handleSubmit = async (e: React.FormEvent | null = null) => {
    if (e) {
      e.preventDefault();
    }

    try {
      schema.parse({ email, password }); // Validate the form data
      await login(email, password); // Call the async login function
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Display validation errors (you can add specific error messages here)
        alert("Validation errors: " + error.errors.map(e => e.message).join(", "));
      } else {
        // Display other errors
        alert("Login failed. Please check the console for details.");
      }
    }
  };


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-white px-6 pt-5 pb-4 sm:p-8 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center w-full">
                Connexion
              </h3>
              <button
                onClick={onClose}
                className="focus:outline-none p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
                aria-label="Close"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <p className="text-lg text-gray-500 text-center mb-6">Connectez-vous à votre compte Supabase</p>


            <div className="">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-5">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 sr-only">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 bg-gray-50"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-7">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 sr-only">
                    Mot de passe:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="shadow-sm appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-200 bg-gray-50"
                    value={password}
                    placeholder="Mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline w-full transition-colors duration-200"
                    type="submit"
                  >
                    Se Connecter
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-6 text-center">
              <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-200">Pas encore de compte ? S'inscrire</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

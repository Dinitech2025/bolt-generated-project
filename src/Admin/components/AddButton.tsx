import React from 'react';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-4 right-4 bg-custom-blue hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-4xl flex items-center justify-center"
      onClick={onClick}
    >
      +
    </button>
  );
};

export default AddButton;

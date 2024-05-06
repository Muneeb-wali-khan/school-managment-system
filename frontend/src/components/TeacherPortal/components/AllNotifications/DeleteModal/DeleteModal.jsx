import React from 'react';

const DeleteModal = ({ isOpen, onRequestClose ,handleConfirmDelete,loadingNotifications}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 overflow-hidden transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>

      <div className="relative bg-white p-6 rounded-md shadow-lg transform transition-transform scale-100 rotate-0">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion?</h2>
        
        <p className="text-gray-700 mb-5">Are you sure you want to delete?</p>

        <div className="flex justify-end space-x-4 text-[1rem]">
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white px-4 py-[0.40rem] rounded-md hover:bg-red-600"
          >
           {loadingNotifications ? "Deleting...": 'Yes, Delete'}
          </button>
          <button
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-4 py-[0.40rem] rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

import React from "react";

const NotificationModal = ({ openNotify, singleNoti, onClose }) => {
  return (
    <>
      {openNotify && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-[#663399] border-gray-200 border-2 rounded-lg p-8 m-4 max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-100 ">
                Notification Details :
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            {/* Modal Body */}
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-200 mb-2 underline">
                  {singleNoti?.title}
                </h3>
                <p className="text-gray-300">{singleNoti?.desc}</p>
              </div>
            </div>
            {/* Modal Footer (Optional) */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;

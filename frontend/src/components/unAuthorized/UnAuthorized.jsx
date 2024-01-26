import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <i className="fa fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
        <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-600">
          Oops! It seems like you don't have the necessary permissions to access
          this page.
        </p>
        <p className="text-gray-600 mt-4">
          Please contact your administrator for assistance.
        </p>
        <Link to="/" className="text-blue-500 mt-4 block underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorized;

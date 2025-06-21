
import React from 'react';
import Navbar from '@/components/Navbar';

const Expert = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            1:1 with Expert
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This section will be designed separately as requested.
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <p className="text-gray-500">
              Expert consultation functionality will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;

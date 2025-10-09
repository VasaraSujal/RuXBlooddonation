import React from "react";

const FindDonor = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-red-600 mb-4 text-center">
          Find Blood Donors
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Search for blood donors by group, city, or location.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter city or location"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Search
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            Available Donors
          </h2>
          <div className="border-t border-gray-200 pt-4 text-gray-500 text-center">
            No donors found. Try searching above.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDonor;

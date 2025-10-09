import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

const FindBlood = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(true);
  const [locationDeniedMessage, setLocationDeniedMessage] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // ✅ Access user and token from Redux
  const { user, token } = useSelector((state) => state.auth);
  console.log("Logged in user:", user);
  console.log("Auth token:", token);
  const fetchDonors = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/donors/nearby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude, bloodGroup, distance: 10 }),
      });

      const data = await response.json();

      if (response.ok) {
        setDonors(data.donors);
      } else {
        alert(data.message || "No donors found");
        setDonors([]);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching donors");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!bloodGroup) {
      alert("Please select blood group");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationAllowed(true);
        setLocationDeniedMessage("");
        const { latitude, longitude } = position.coords;
        fetchDonors(latitude, longitude);
      },
      (error) => {
        console.error(error);
        setLocationAllowed(false);
        if (error.code === 1) {
          setLocationDeniedMessage("Location access denied. Please allow location to find donors nearby.");
        } else {
          setLocationDeniedMessage("Unable to fetch location. Please try again.");
        }
      }
    );
  };

  // ✅ Handle "Send Request"
  const handleSendRequest = (donor) => {
    if (!user || !token) {
      // not logged in → show popup
      setShowLoginPopup(true);
      return;
    }

    if (!user.isVerified) {
      alert("Your account is not verified. Please verify before sending requests.");
      return;
    }

    // ✅ If verified user → call API
    alert(`Request sent to ${donor.fullName}!`);
    // You can later add fetch POST call here to backend request API
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Find Blood Donors</h1>
        <p className="text-gray-600">Search for verified blood donors near your location.</p>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none"
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

          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 py-2 rounded-lg transition-colors"
          >
            <Search size={18} />
            {loading ? "Searching..." : "Search Donors"}
          </button>
        </div>
      </div>

      {/* Location Denied Warning */}
      {!locationAllowed && (
        <div className="max-w-4xl mx-auto mb-6 text-center text-red-600">
          <p>{locationDeniedMessage}</p>
          <button
            onClick={handleSearch}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Allow Location
          </button>
        </div>
      )}

      {/* Donor Results */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.length > 0 ? (
          donors.map((donor, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{donor.fullName}</h3>
                <p className="text-gray-600">{donor.city}</p>
                <p className="mt-2">
                  <span className="font-semibold text-red-600">Blood Group:</span> {donor.bloodGroup}
                </p>
                <p>
                  <span className="font-semibold">Age:</span> {donor.age}
                </p>
                <p>
                  <span className="font-semibold">Distance:</span> {donor.distanceFromYou}
                </p>
              </div>
              <button
                onClick={() => handleSendRequest(donor)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Send Request
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            {loading ? "Searching donors..." : "No donors found."}
          </div>
        )}
      </div>

      {/* 🔴 Popup for login/register */}
      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Login Required</h2>
            <p className="text-gray-600 mb-5">You need to log in or register to send a blood request.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => window.location.href = "/register"}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Register
              </button>
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  window.location.href = "/"; // You can replace with modal trigger
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBlood;

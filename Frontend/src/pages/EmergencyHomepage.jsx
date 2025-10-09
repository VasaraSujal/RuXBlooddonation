import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getCurrentRole } from "../utils/auth.js";
import BloodCompatibilityHomepageChart from "../components/BloodCompatibilityHomepageChart";
import { useLanguage } from "../utils/LanguageContext";
import { getTranslation } from "../utils/languages";
import LanguageSelector from "../components/LanguageSelector";
import Navbar from "../components/Navbar.jsx";
const EmergencyHomepage = ({ user }) => {
  const [showQuickReg, setShowQuickReg] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentLanguage } = useLanguage();

  // Helper function for translations
  const t = (key) => getTranslation(key, currentLanguage);
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check for existing role on component mount (no auto-redirect)
  useEffect(() => {
    const existingRole = getCurrentRole();
    if (existingRole) {
      console.log(
        `User has existing role: ${existingRole}, but staying on homepage`
      );
    }
  }, []);

  //   const handleRoleSelection = (role) => {
  //     // Simply navigate to the appropriate dashboard
  //     // RouteGuard will handle authentication and redirect to login if needed
  //     if (role === 'donor' || role === 'user') {
  //       navigate('/user');
  //     } else if (role === 'ngo') {
  //       navigate('/ngo');
  //     }
  //   };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Platform Header Bar */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-1">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <span>{t("headerSubtitle")}</span>
              <span>•</span>
              <span className="font-semibold">
                Fast. Reliable. Life-Saving.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span>
                Last Updated: {new Date().toLocaleDateString("en-IN")}
              </span>
              <span>•</span>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
      

      {/* Navigation Bar */}
      {/* <div className="bg-red-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-3 text-white text-sm font-medium">
            <Link to="/" className="hover:bg-red-700 px-3 py-2 rounded">
              {t("home")}
            </Link>
            <Link
              to="/blood-banks"
              className="hover:bg-red-700 px-3 py-2 rounded"
            >
              {t("bloodBanks")}
            </Link>
            <Link to="/camps" className="hover:bg-red-700 px-3 py-2 rounded">
              {t("donationCamps")}
            </Link>
            <Link
              to="/statistics"
              className="hover:bg-red-700 px-3 py-2 rounded"
            >
              {t("statistics")}
            </Link>
            <Link to="/about" className="hover:bg-red-700 px-3 py-2 rounded">
              {t("aboutUs")}
            </Link>
            <Link to="/contact" className="hover:bg-red-700 px-3 py-2 rounded">
              {t("contact")}
            </Link>
          </div>
        </div>
      </div> */}

      <Navbar />

      

      {/* Emergency Alert */}
      <div className="bg-orange-500 text-white py-2 px-4 text-center">
        <div className="flex items-center justify-center space-x-4">
          <span>🚨</span>
          <span className="font-semibold">{t("emergencyBloodHelpline")}</span>
          <span>🚨</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("heroTitle")}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("heroSubtitle")}
          </p>

          {/* Statistics Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t("statsHeading")}
            </h3>
            <p className="text-sm text-gray-600 mb-8">and growing daily 💪</p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-2xl font-bold text-red-600">28,945</div>
                <div className="text-sm text-gray-600">
                  Blood Units Available
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">3,847</div>
                <div className="text-sm text-gray-600">Active Blood Banks</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-2xl font-bold text-green-600">
                  1,45,67,234
                </div>
                <div className="text-sm text-gray-600">Registered Donors</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-2xl font-bold text-purple-600">12,456</div>
                <div className="text-sm text-gray-600">Camps Organized</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("accessHeading")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("accessSubtext") || "Choose your role below to continue."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Blood Donor Card */}
          <div className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Blood Donor</h3>
                  <p className="text-red-100">
                    For individual donors and blood seekers
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Register as blood donor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Search for blood availability
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Find nearby blood banks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Track donation history</span>
                </div>
              </div>
              <button
                onClick={() => handleRoleSelection("user")}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Access Donor Portal
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🩸</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Find Donor</h3>
                  <p className="text-pink-100">
                    Search for available blood donors nearby
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Search by blood group</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">
                    Filter by city or location
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">View donor availability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Contact donors directly</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/finddonor")}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Go to Find Donor
              </button>
            </div>
          </div>

          {/* Government Healthcare Institution Card */}
          <div className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">�️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Hospital/NGO</h3>
                  <p className="text-blue-100">
                    For hospitals and healthcare organizations
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-blue-50">
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-800 font-medium">
                    Government blood inventory management
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-gray-800 font-medium">
                    Official blood requests from donors
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-800 font-medium">
                    Organize government-approved camps
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-800 font-medium">
                    Generate official reports & analytics
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRoleSelection("ngo")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                🏥 Access Healthcare Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Registration */}
      <div className="bg-white py-16 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            New to BloodConnect+?
          </h3>
          <p className="text-gray-600 mb-8">
            Register yourself as a donor and become part of India's largest
            blood donation network. Every donation can save up to 3 lives.
          </p>

          <div className="bg-gray-50 rounded-xl p-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-6">
              Quick Registration Process
            </h4>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📋</span>
                </div>
                <h5 className="font-medium text-gray-800">Fill Details</h5>
                <p className="text-sm text-gray-600">
                  Name, age, contact information
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🩺</span>
                </div>
                <h5 className="font-medium text-gray-800">Health Check</h5>
                <p className="text-sm text-gray-600">
                  Medical eligibility verification
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">✅</span>
                </div>
                <h5 className="font-medium text-gray-800">Get Verified</h5>
                <p className="text-sm text-gray-600">
                  Receive donor certificate
                </p>
              </div>
            </div>

            <Link
              to="/register"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Register as Donor
            </Link>
          </div>
        </div>
      </div>

      {/* Blood Compatibility Chart */}
      <BloodCompatibilityHomepageChart />

      {/* Information Cards */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Important Information
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                  <span>📍</span>
                </div>
                <h4 className="font-semibold text-gray-800">
                  Find Blood Banks
                </h4>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Locate nearby blood banks and check real-time availability of
                blood units across all blood groups.
              </p>
              <Link
                to="/blood-banks"
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                View Blood Banks →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <span>🏕️</span>
                </div>
                <h4 className="font-semibold text-gray-800">Donation Camps</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Find upcoming blood donation camps in your area. Register to
                participate and save lives.
              </p>
              <Link
                to="/camps"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Camps →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <span>📊</span>
                </div>
                <h4 className="font-semibold text-gray-800">Statistics</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                View comprehensive statistics on blood donation trends,
                availability, and impact across India.
              </p>
              <Link
                to="/statistics"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                View Statistics →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Footer */}
      <footer className="bg-red-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">{t("platformTitle")}</h4>
              <p className="text-red-200 text-sm">{t("footerDescription")}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("quickLinks")}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/blood-banks"
                    className="text-red-200 hover:text-white"
                  >
                    {t("bloodBanks")}
                  </Link>
                </li>
                <li>
                  <Link to="/camps" className="text-red-200 hover:text-white">
                    {t("donationCamps")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/statistics"
                    className="text-red-200 hover:text-white"
                  >
                    {t("statistics")}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-red-200 hover:text-white">
                    {t("aboutUs")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("emergency")}</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-red-200">{t("helpline")}: 1800-11-4444</li>
                <li className="text-red-200">{t("emergency")}: 102, 108</li>
                <li className="text-red-200">Email: help@bloodconnect.in</li>
                <li className="text-red-200">{t("support247")}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("partnerLinks")}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-red-200 hover:text-white">
                    Red Cross Society
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-200 hover:text-white">
                    WHO Blood Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-200 hover:text-white">
                    Local Hospitals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-200 hover:text-white">
                    Health Organizations
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-700 mt-8 pt-8 text-center">
            <p className="text-red-200 text-sm mb-2">
              {t("footerNote") ||
                "© 2025 BloodConnect | A Public Initiative to Save Lives"}
            </p>
            <p className="text-red-100 text-xs">
              {t("footerLove") || "Developed with ❤️ for Emergency Response"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmergencyHomepage;

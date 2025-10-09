import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setShowUserDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-0 flex justify-between items-center py-3">
        {/* Logo & Header */}
        <div className="flex flex-col">
          <Link
            to="/"
            className="flex items-center space-x-2 text-red-600 font-bold text-2xl"
          >
            🩸 <span>BloodConnect+</span>
          </Link>
          <p className="text-gray-700 text-sm font-medium">Every Drop Counts</p>
          <p className="text-gray-500 text-xs">
            A Unified Network for Blood Management & Emergency Response
          </p>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <Link to="/blood-banks" className="hover:text-red-600">Blood Banks</Link>
          <Link to="/camps" className="hover:text-red-600">Donation Camps</Link>
          <Link to="/statistics" className="hover:text-red-600">Statistics</Link>
          <Link to="/about" className="hover:text-red-600">About Us</Link>
          <Link to="/contact" className="hover:text-red-600">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <Link
            to="/panic-mode"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            🚨 Emergency
          </Link>

          <div className="hidden md:block text-gray-700 font-medium">
            📞 Helpline: 1800-123-456
          </div>

          {/* Auth Section */}
          {!user ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Login / Register
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 bg-red-100 text-red-600 px-3 py-2 rounded font-medium transition-colors"
              >
                <span>👤</span>
                <span className="text-sm">{user.fullName}</span>
                <span className="text-xs">▼</span>
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserDropdown(false)}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    👤 Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
                  >
                    🔓 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </nav>
  );
};

export default Navbar;

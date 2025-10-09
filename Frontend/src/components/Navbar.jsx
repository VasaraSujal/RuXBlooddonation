import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setShowUserDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md border-b-4 border-red-600">
      {/* Top Section - Logo & Brand */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Brand */}
          <div className="flex items-center space-x-4">
            {/* Circular Indian Map Icon */}
            <Link to="/" className="flex-shrink-0">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-green-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-7 h-7 fill-orange-500">
                    <path
                      d="M50 10 C60 12 70 20 75 30 L78 35 C80 40 82 45 80 50 L75 60 C70 70 65 75 60 78 L55 80 C50 85 45 80 40 78 L35 75 C30 70 25 65 22 55 L20 50 C18 45 20 40 22 35 L25 30 C30 20 40 12 50 10 Z"
                      className="drop-shadow-sm"
                    />
                    <circle cx="45" cy="35" r="1.5" className="fill-red-600" />
                    <circle cx="55" cy="45" r="1.5" className="fill-red-600" />
                    <circle cx="40" cy="55" r="1.5" className="fill-red-600" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Brand Text */}
            <div>
              <Link to="/" className="block">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  BloodConnect+
                </h1>
              </Link>
              <p className="text-xs md:text-sm font-semibold text-red-600">
                Every Drop Counts
              </p>
              <p className="text-xs text-gray-600 hidden sm:block">
                A Unified Network for Blood Management & Emergency Response
              </p>
            </div>
          </div>

          {/* Right: Emergency & Contact Info */}
          <div className="flex items-center space-x-3">
            {/* Helpline Numbers - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-red-50 to-blue-50 px-4 py-2 rounded-lg border border-red-200">
              <div className="text-center">
                <div className="text-xs text-gray-600 font-medium">Helpline</div>
                <div className="text-base font-bold text-gray-800">104</div>
              </div>
              <div className="h-10 w-px bg-red-300"></div>
              <div className="text-center">
                <div className="text-xs text-gray-600 font-medium">Emergency</div>
                <div className="text-base font-bold text-red-600">108</div>
              </div>
            </div>

            {/* Emergency Button */}
            <Link
              to="/panic-mode"
              className="bg-red-600 hover:bg-red-700 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg flex items-center space-x-1 md:space-x-2"
            >
              <span className="text-lg">🚨</span>
              <span className="text-sm md:text-base">Emergency</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Navigation Links */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between py-3">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6 text-gray-700 font-medium text-sm">
              <Link to="/" className="hover:text-red-600 transition-colors">
                Home
              </Link>
              <Link to="/blood-banks" className="hover:text-red-600 transition-colors">
                Blood Banks
              </Link>
              <Link to="/camps" className="hover:text-red-600 transition-colors">
                Donation Camps
              </Link>
              <Link to="/statistics" className="hover:text-red-600 transition-colors">
                Statistics
              </Link>
              <Link to="/about" className="hover:text-red-600 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-red-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Auth Section */}
            {!user ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
              >
                Login / Register
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-3 bg-white border-2 border-red-500 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all hover:bg-red-50 hover:border-red-600 shadow-sm"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold">{user.fullName}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-50 to-blue-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{user.fullName}</div>
                          <div className="text-xs text-gray-600">Donor Account</div>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>My Profile</span>
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden py-4 space-y-3">
              {/* Mobile Helplines */}
              <div className="flex items-center justify-around bg-white px-4 py-3 rounded-lg border border-gray-200 mb-3">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Helpline</div>
                  <div className="text-sm font-bold text-gray-700">104</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Emergency</div>
                  <div className="text-sm font-bold text-red-600">108</div>
                </div>
              </div>

              {/* Mobile Links */}
              <Link
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-white hover:text-red-600 rounded transition-colors"
              >
                Home
              </Link>
              <Link
                to="/blood-banks"
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-white hover:text-red-600 rounded transition-colors"
              >
                Blood Banks
              </Link>
              <Link
                to="/camps"
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-white hover:text-red-600 rounded transition-colors"
              >
                Donation Camps
              </Link>
              <Link
                to="/statistics"
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-white hover:text-red-600 rounded transition-colors"
              >
                Statistics
              </Link>
              <Link
                to="/about"
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-white hover:text-red-600 rounded transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-white hover:text-red-600 rounded transition-colors"
              >
                Contact
              </Link>

              {/* Mobile Auth */}
              {!user ? (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors mt-2"
                >
                  Login / Register
                </button>
              ) : (
                <div className="space-y-2 mt-2 pt-3 border-t border-gray-200">
                  <div className="px-4 py-2 bg-red-50 rounded-lg">
                    <div className="text-xs text-gray-600">Logged in as</div>
                    <div className="text-sm font-medium text-red-600">
                      👤 {user.fullName}
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-white rounded transition-colors"
                  >
                    👤 My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-white rounded transition-colors"
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
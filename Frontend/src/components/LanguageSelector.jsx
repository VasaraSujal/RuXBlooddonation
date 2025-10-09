import React, { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '../utils/languages';
import { useLanguage } from '../utils/LanguageContext';

const LanguageSelector = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
    
    // Optional: Show a brief notification
    if (typeof window !== 'undefined' && window.toast) {
      window.toast(`Language changed to ${SUPPORTED_LANGUAGES[langCode].native}`);
    }
  };

  const currentLangData = SUPPORTED_LANGUAGES[currentLanguage];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Language Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-base">{currentLangData?.flag || '🌐'}</span>
        <span className="hidden sm:inline">{currentLangData?.native || 'English'}</span>
        <span className="sm:hidden">{currentLangData?.name?.substring(0, 3) || 'EN'}</span>
        <svg 
          className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
              भाषा चुनें • Select Language
            </div>
          </div>
          
          <div className="py-1 max-h-80 overflow-y-auto">
            {Object.entries(SUPPORTED_LANGUAGES).map(([langCode, langData]) => (
              <button
                key={langCode}
                onClick={() => handleLanguageSelect(langCode)}
                className={`group flex items-center w-full px-4 py-3 text-sm text-left hover:bg-red-50 hover:text-red-700 transition-colors duration-150 ${
                  currentLanguage === langCode
                    ? 'bg-red-100 text-red-800 font-medium'
                    : 'text-gray-700'
                }`}
              >
                <span className="text-lg mr-3">{langData.flag}</span>
                <div className="flex-1">
                  <div className={`font-medium ${currentLanguage === langCode ? 'text-red-800' : 'text-gray-900'}`}>
                    {langData.native}
                  </div>
                  <div className="text-xs text-gray-500">
                    {langData.name}
                  </div>
                </div>
                {currentLanguage === langCode && (
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          
          <div className="py-2 px-4 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              🌍 Supporting India's linguistic diversity
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Language Context
const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load saved language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('bloodconnect_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Try to detect user's preferred language from browser
      const browserLang = navigator.language || navigator.userLanguage;
      const langCode = browserLang.split('-')[0]; // Get language part (e.g., 'hi' from 'hi-IN')
      
      // Check if we support the detected language
      const supportedLangs = ['en', 'hi', 'gu', 'mr', 'ta', 'te', 'bn', 'pa', 'kn', 'ml'];
      if (supportedLangs.includes(langCode)) {
        setCurrentLanguage(langCode);
        localStorage.setItem('bloodconnect_language', langCode);
      }
    }
  }, []);

  // Function to change language
  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('bloodconnect_language', languageCode);
    
    // Optional: Reload page to apply language changes completely
    // window.location.reload();
  };

  // Context value
  const value = {
    currentLanguage,
    changeLanguage,
    isRTL: false // Add RTL support later if needed for Arabic/Urdu
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use Language Context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Higher-order component for language support
export const withLanguage = (Component) => {
  return function LanguageAwareComponent(props) {
    const languageProps = useLanguage();
    return <Component {...props} {...languageProps} />;
  };
};

export default LanguageContext;
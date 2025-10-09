import { useNavigate } from 'react-router-dom';

const BackButton = ({ 
  text = "Back to Homepage", 
  customPath = null,
  className = ""
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (customPath) {
      navigate(customPath);
    } else {
      // Check if there's history to go back to
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        // If no history, go to homepage
        navigate('/');
      }
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg transition-colors font-medium text-sm ${className}`}
    >
      <svg 
        className="w-4 h-4 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {text}
    </button>
  );
};

export default BackButton;
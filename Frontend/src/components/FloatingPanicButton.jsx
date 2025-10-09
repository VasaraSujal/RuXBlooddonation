import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FloatingPanicButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Hide button on certain pages where it might be intrusive
  useEffect(() => {
    const currentPath = window.location.pathname;
    const hiddenPaths = ['/panic-mode', '/'];
    setIsVisible(!hiddenPaths.includes(currentPath));
  }, []);

  const handlePanicClick = () => {
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }

    // Show confirmation dialog for emergency action
    const confirmEmergency = window.confirm(
      '🚨 EMERGENCY MODE\n\nThis will:\n• Send mass alerts to 1000+ donors\n• Notify nearby blood banks\n• Auto-call emergency services\n\nContinue?'
    );

    if (confirmEmergency) {
      // Navigate to panic mode
      navigate('/panic-mode');
      
      // Optional: Show immediate notification
      if (window.showNotification) {
        window.showNotification(
          'error',
          '🚨 EMERGENCY ACTIVATED',
          'Emergency blood request is being broadcast to all nearby donors and hospitals!'
        );
      }
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Panic Button */}
      <button
        onClick={handlePanicClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed bottom-6 right-6 z-50
          w-16 h-16 md:w-20 md:h-20
          bg-gradient-to-br from-red-500 to-red-600
          hover:from-red-600 hover:to-red-700
          text-white rounded-full
          shadow-2xl hover:shadow-red-500/25
          transform transition-all duration-300
          ${isHovered ? 'scale-110' : 'scale-100'}
          animate-pulse hover:animate-none
          flex items-center justify-center
          border-4 border-white
          group
        `}
        title="Emergency Panic Mode - Get Blood Immediately"
        aria-label="Activate Emergency Blood Request"
      >
        {/* Icon */}
        <div className="relative">
          <div className="text-2xl md:text-3xl font-bold">🚨</div>
          
          {/* Pulse Ring Effect */}
          <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30"></div>
          <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20 animation-delay-200"></div>
        </div>

        {/* Hover Tooltip */}
        <div className={`
          absolute right-full mr-4 top-1/2 transform -translate-y-1/2
          bg-gray-900 text-white px-4 py-2 rounded-lg
          text-sm font-medium whitespace-nowrap
          transition-all duration-200
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}
          shadow-xl
        `}>
          <div className="flex items-center space-x-2">
            <span>🚨</span>
            <span>EMERGENCY MODE</span>
          </div>
          <div className="text-xs text-gray-300 mt-1">
            Instant blood request
          </div>
          
          {/* Arrow pointing to button */}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2">
            <div className="w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-gray-900 border-t-transparent border-b-transparent"></div>
          </div>
        </div>
      </button>

      {/* Emergency Instructions Overlay (shown on hover) */}
      {isHovered && (
        <div className="fixed bottom-24 right-6 z-40 bg-white rounded-xl shadow-2xl border border-red-200 p-4 max-w-sm animate-fade-in">
          <div className="text-center">
            <div className="text-red-600 text-lg font-bold mb-2">⚡ PANIC MODE</div>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <span>📢</span>
                <span>Alert 1000+ donors</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>🏥</span>
                <span>Notify blood banks</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>☎️</span>
                <span>Auto-call emergency</span>
              </div>
            </div>
            <div className="text-xs text-red-600 font-medium mt-2">
              Only use in life-threatening emergencies
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-ping,
          .animate-fade-in {
            animation: none;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .floating-panic-button {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingPanicButton;
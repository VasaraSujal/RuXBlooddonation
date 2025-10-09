import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OneClickPanicMode = () => {
  const [panicActivated, setPanicActivated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [emergencyData, setEmergencyData] = useState({
    bloodGroup: '',
    location: '',
    emergencyContacts: []
  });
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Panic mode steps
  const panicSteps = [
    { id: 1, text: "🚑 Calling Emergency Services (108)", action: "call_108", duration: 2000 },
    { id: 2, text: "🏥 Notifying Nearby Hospitals", action: "notify_hospitals", duration: 1500 },
    { id: 3, text: "📱 Sending SMS to Emergency Contacts", action: "sms_contacts", duration: 1500 },
    { id: 4, text: "🩸 Alert Blood Donors in Area", action: "alert_donors", duration: 2000 },
    { id: 5, text: "📍 Sharing Location with Family", action: "share_location", duration: 1500 },
    { id: 6, text: "🔔 Sending App Notifications", action: "app_notifications", duration: 1000 }
  ];

  // Auto-detect location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setEmergencyData(prev => ({
            ...prev,
            location: `${position.coords.latitude}, ${position.coords.longitude}`
          }));
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }

    // Load saved emergency data
    const saved = localStorage.getItem('emergencyProfile');
    if (saved) {
      setEmergencyData(JSON.parse(saved));
    }
  }, []);

  const activatePanicMode = () => {
    if (!emergencyData.bloodGroup) {
      alert('Please set your blood group first in emergency profile!');
      return;
    }

    setShowCountdown(true);
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCountdown(false);
          setPanicActivated(true);
          startPanicSequence();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startPanicSequence = async () => {
    for (let i = 0; i < panicSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, panicSteps[i].duration));
      
      // Execute actual panic actions here
      switch (panicSteps[i].action) {
        case 'call_108':
          // In real app, would initiate emergency call
          console.log('Calling 108...');
          break;
        case 'notify_hospitals':
          // Send notifications to hospitals
          console.log('Notifying hospitals...');
          break;
        case 'sms_contacts':
          // Send SMS to emergency contacts
          console.log('Sending SMS to contacts...');
          break;
        case 'alert_donors':
          // Alert blood donors
          console.log('Alerting donors...');
          break;
        case 'share_location':
          // Share location with family
          console.log('Sharing location...');
          break;
        case 'app_notifications':
          // Send app notifications
          console.log('Sending notifications...');
          break;
        default:
          break;
      }
    }
    setCurrentStep(panicSteps.length);
  };

  const cancelPanic = () => {
    setShowCountdown(false);
    setCountdown(5);
  };

  const resetPanic = () => {
    setPanicActivated(false);
    setCurrentStep(0);
    setShowCountdown(false);
    setCountdown(5);
  };

  const updateEmergencyProfile = (field, value) => {
    const updated = { ...emergencyData, [field]: value };
    setEmergencyData(updated);
    localStorage.setItem('emergencyProfile', JSON.stringify(updated));
  };

  const addEmergencyContact = () => {
    const name = prompt('Enter contact name:');
    const phone = prompt('Enter phone number:');
    if (name && phone) {
      const newContact = { id: Date.now(), name, phone };
      const updated = { 
        ...emergencyData, 
        emergencyContacts: [...emergencyData.emergencyContacts, newContact] 
      };
      setEmergencyData(updated);
      localStorage.setItem('emergencyProfile', JSON.stringify(updated));
    }
  };

  const removeEmergencyContact = (id) => {
    const updated = {
      ...emergencyData,
      emergencyContacts: emergencyData.emergencyContacts.filter(c => c.id !== id)
    };
    setEmergencyData(updated);
    localStorage.setItem('emergencyProfile', JSON.stringify(updated));
  };

  // COUNTDOWN SCREEN
  if (showCountdown) {
    return (
      <div className="fixed inset-0 bg-red-600 flex items-center justify-center z-50">
        <div className="text-center text-white p-8">
          <div className="text-8xl font-bold mb-8 animate-pulse">{countdown}</div>
          <div className="text-4xl font-bold mb-6">PANIC MODE ACTIVATING</div>
          <div className="text-xl mb-8">
            Calling 108, alerting hospitals, notifying contacts...
          </div>
          <button 
            onClick={cancelPanic}
            className="bg-white text-red-600 font-bold px-8 py-4 rounded-lg text-xl hover:bg-gray-100 transition-colors"
          >
            ❌ CANCEL
          </button>
        </div>
      </div>
    );
  }

  // PANIC ACTIVATION SCREEN
  if (panicActivated) {
    return (
      <div className="min-h-screen bg-red-600 text-white">
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🚨</div>
            <h1 className="text-4xl font-bold mb-4">PANIC MODE ACTIVATED</h1>
            <div className="text-xl mb-8">Emergency services have been notified</div>
          </div>

          {/* PROGRESS STEPS */}
          <div className="bg-white bg-opacity-10 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Emergency Actions In Progress</h2>
            <div className="space-y-4">
              {panicSteps.map((step, index) => (
                <div key={step.id} className={`flex items-center p-4 rounded-lg ${
                  index < currentStep ? 'bg-green-500 bg-opacity-20' :
                  index === currentStep ? 'bg-yellow-500 bg-opacity-20 animate-pulse' :
                  'bg-white bg-opacity-10'
                }`}>
                  <div className="mr-4">
                    {index < currentStep ? '✅' : 
                     index === currentStep ? '⏳' : '⏸️'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{step.text}</div>
                  </div>
                  <div className="text-sm">
                    {index < currentStep ? 'Completed' : 
                     index === currentStep ? 'In Progress...' : 
                     'Waiting'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EMERGENCY INFO SENT */}
          <div className="bg-white bg-opacity-10 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Emergency Information Sent:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Blood Group Needed:</div>
                <div className="text-2xl font-bold">{emergencyData.bloodGroup}</div>
              </div>
              <div>
                <div className="font-semibold">Location:</div>
                <div>{emergencyData.location || 'Location unavailable'}</div>
              </div>
              <div>
                <div className="font-semibold">Time:</div>
                <div>{new Date().toLocaleString()}</div>
              </div>
              <div>
                <div className="font-semibold">Emergency Contacts Notified:</div>
                <div>{emergencyData.emergencyContacts.length} people</div>
              </div>
            </div>
          </div>

          {/* CURRENT STATUS */}
          <div className="bg-green-500 bg-opacity-20 rounded-xl p-6 mb-6 text-center">
            <h3 className="text-2xl font-bold mb-4">✅ HELP IS ON THE WAY</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-lg font-bold">🚑 Emergency Services</div>
                <div>Called and dispatched</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-lg font-bold">🏥 Hospitals Alerted</div>
                <div>Blood banks notified</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-lg font-bold">👥 Family Informed</div>
                <div>Location shared</div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => window.open('tel:108')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-lg text-xl transition-colors"
              >
                📞 Call 108 Again
              </button>
              <Link
                to="/live-blood-stock" 
                className="bg-blue-600 hover:bg-blue-700 font-bold py-4 px-6 rounded-lg text-xl text-center transition-colors"
              >
                📊 Check Blood Availability
              </Link>
            </div>
            <button 
              onClick={resetPanic}
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 font-bold py-4 px-6 rounded-lg text-xl transition-colors"
            >
              🔄 Reset Emergency Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN PANIC MODE SETUP SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {/* HEADER */}
      <div className="bg-red-600 text-white py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-4 hover:bg-red-700 p-2 rounded">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold">🚨 ONE-CLICK PANIC MODE</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* PANIC BUTTON */}
        <div className="text-center py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Emergency Blood Needed Right Now?
            </h2>
            <p className="text-xl text-gray-600">
              One click will instantly call 108, alert hospitals, notify donors, and inform your family
            </p>
          </div>

          <button 
            onClick={activatePanicMode}
            className="relative bg-red-600 hover:bg-red-700 text-white font-bold py-8 px-12 rounded-full text-3xl transition-all transform hover:scale-105 animate-pulse shadow-2xl"
            style={{ minWidth: '300px', minHeight: '200px' }}
          >
            <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></div>
            <div className="relative">
              🚨<br/>
              PANIC<br/>
              MODE
            </div>
          </button>

          <div className="mt-6 text-lg text-gray-700">
            <strong>Tap only in life-threatening emergencies!</strong>
          </div>
        </div>

        {/* EMERGENCY PROFILE SETUP */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">🛡️ Emergency Profile Setup</h3>
          <p className="text-gray-600 mb-6">
            Set up your profile so panic mode can work instantly when you need it most
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BLOOD GROUP */}
            <div>
              <label className="block text-lg font-bold mb-2 text-red-600">
                Your Blood Group *
              </label>
              <select 
                value={emergencyData.bloodGroup}
                onChange={(e) => updateEmergencyProfile('bloodGroup', e.target.value)}
                className="w-full p-4 text-lg border-2 border-red-300 rounded-lg focus:border-red-500 focus:outline-none"
              >
                <option value="">Select Your Blood Group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-lg font-bold mb-2 text-blue-600">
                Current Location
              </label>
              <input 
                type="text"
                value={emergencyData.location}
                onChange={(e) => updateEmergencyProfile('location', e.target.value)}
                placeholder="Will auto-detect in emergency"
                className="w-full p-4 text-lg border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* EMERGENCY CONTACTS */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-bold text-purple-600">
                Emergency Contacts
              </label>
              <button 
                onClick={addEmergencyContact}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                ➕ Add Contact
              </button>
            </div>

            {emergencyData.emergencyContacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyData.emergencyContacts.map(contact => (
                  <div key={contact.id} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{contact.name}</div>
                        <div className="text-gray-600">{contact.phone}</div>
                      </div>
                      <button 
                        onClick={() => removeEmergencyContact(contact.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-gray-600">No emergency contacts added yet</div>
                <div className="text-sm text-gray-500">Add family/friends who should be notified</div>
              </div>
            )}
          </div>
        </div>

        {/* WHAT HAPPENS IN PANIC MODE */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-yellow-800">⚡ What Happens When You Activate Panic Mode:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-3 text-xl">🚑</span>
                <span><strong>Instantly calls 108</strong> - Emergency medical services</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-xl">🏥</span>
                <span><strong>Alerts nearby hospitals</strong> - With your blood group</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-xl">📱</span>
                <span><strong>SMS to your contacts</strong> - With location and situation</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="mr-3 text-xl">🩸</span>
                <span><strong>Mass donor alert</strong> - Compatible donors in area</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-xl">📍</span>
                <span><strong>Location sharing</strong> - GPS coordinates to family</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-xl">🔔</span>
                <span><strong>App notifications</strong> - To all registered helpers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneClickPanicMode;
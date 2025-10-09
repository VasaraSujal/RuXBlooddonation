import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const QuickRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    gender: '',
    address: '',
    bloodGroup: '',
    city: '',
    coordinates: { lat: '', long: '' },
    role: 'donor',
    agreement: false
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];

  // 🔹 Update form field
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 🔹 Go to next step
  const nextStep = () => {
    if (step === 1) {
      const { fullName, email, phone, password, age, gender, city, address } = formData;
      if (!fullName  || !phone || !password || !age || !gender || !city || !address) {
        alert('Please fill all required fields before continuing.');
        return;
      }
    }
    setStep(step + 1);
  };

  // 🔹 Detect current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          handleInputChange('coordinates', {
            lat: position.coords.latitude,
            long: position.coords.longitude
          });
        },
        () => alert('Unable to fetch location. Please allow location access.')
      );
    } else {
      alert('Geolocation not supported in this browser.');
    }
  };

  // 🔹 Submit form to backend
  const handleSubmit = async () => {
    if (!formData.agreement) {
      alert('Please agree to the terms before submitting.');
      return;
    }

    if (!formData.coordinates.lat || !formData.coordinates.long) {
      alert('Please detect your location before submitting.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email || null,
          phone: formData.phone,
          password: formData.password,
          age: Number(formData.age),
          gender: formData.gender,
          address: formData.address,
          bloodGroup: formData.bloodGroup,
          city: formData.city,
          coordinates: formData.coordinates,
         
        })
      });

      const result = await response.json();
      if (response.ok) {
        alert('✅ Registration successful!');
        navigate('/login');
      } else {
        alert(`❌ Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-purple-600 text-white py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center">
          <Link to="/" className="mr-4 hover:bg-purple-700 p-2 rounded">← Back</Link>
          <h1 className="text-2xl font-bold">⚡ Quick Registration</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((number) => (
              <div key={number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= number ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > number ? '✓' : number}
                </div>
                {number < 3 && (
                  <div className={`w-12 h-1 ${step > number ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">Step {step} of 3</p>
        </div>

        {/* STEP 1 — Basic Info */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">🧾 Basic Information</h2>

            <input type="text" placeholder="Full Name *"
              value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg" />

            <input type="email" placeholder="Email *"
              value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg" />

            <input type="tel" placeholder="Phone *"
              value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg" />

            <input type="password" placeholder="Password *"
              value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg" />

            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Age *"
                value={formData.age} onChange={(e) => handleInputChange('age', e.target.value)}
                className="p-3 border-2 border-gray-300 rounded-lg" />
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="p-3 border-2 border-gray-300 rounded-lg"
              >
                <option value="">Select Gender *</option>
                {genders.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <input type="text" placeholder="City *"
              value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg" />

            <input type="text" placeholder="Full Address *"
              value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg" />

            <button onClick={nextStep}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg mt-4">
              Continue → Blood Group
            </button>
          </div>
        )}

        {/* STEP 2 — Blood Group Selection */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🩸</div>
              <h2 className="text-2xl font-bold mb-2">What's Your Blood Group?</h2>
              <p className="text-gray-600">This helps us match you with urgent requests</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {bloodGroups.map(group => (
                <button
                  key={group}
                  onClick={() => handleInputChange('bloodGroup', group)}
                  className={`p-4 text-xl font-bold rounded-lg border-2 transition-all ${
                    formData.bloodGroup === group
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {formData.bloodGroup && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-700">
                  <strong>Blood Group {formData.bloodGroup} selected!</strong>
                  {formData.bloodGroup === 'O-' && ' 🌟 You’re a universal donor - super hero!'}
                  {formData.bloodGroup === 'AB+' && ' 🌟 You can receive from anyone!'}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-lg font-bold py-4 rounded-lg">
                ← Back
              </button>
              <button onClick={nextStep}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold py-4 rounded-lg">
                Continue → Location
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Location + Agreement */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">📍 Detect Location & Confirm</h2>

            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="mb-2 text-gray-700">
                Click below to detect your location automatically.
              </p>
              <button
                onClick={getLocation}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Detect My Location
              </button>
            </div>

            {formData.coordinates.lat && (
              <div className="text-center text-green-600 font-semibold">
                ✅ Location Detected: {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.long.toFixed(4)}
              </div>
            )}

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreement}
                onChange={(e) => handleInputChange('agreement', e.target.checked)}
                className="mt-1 w-5 h-5 text-purple-600"
              />
              <div className="text-sm text-gray-600">
                <p>I agree to:</p>
                <ul className="ml-4 list-disc">
                  <li>Receive calls/SMS for urgent blood requests</li>
                  <li>Donate voluntarily when possible</li>
                  <li>Provide accurate info</li>
                </ul>
              </div>
            </label>

            <div className="flex space-x-3">
              <button onClick={() => setStep(2)} className="flex-1 bg-gray-300 py-3 rounded-lg">← Back</button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Registering...' : '🎯 Register Now'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickRegistration;
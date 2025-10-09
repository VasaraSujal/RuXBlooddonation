import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import { donorApi } from '../services/donorApi';

const QuickRegistration = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bloodGroup: '',
    role: 'donor',
    agreement: false
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.phone)) {
      alert('Please fill your name and phone number');
      return;
    }
    if (step === 2 && !formData.bloodGroup) {
      alert('Please select your blood group');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.agreement) {
      alert('Please agree to the terms to complete registration.');
      return;
    }

    setLoading(true);
    
    try {
      const response = await donorApi.createDonor({
        name: formData.name,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        available: true,
        coordinates: { lat: 0, lng: 0 } // Placeholder coordinates
      });

      if (response.success) {
        const userData = {
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          bloodGroup: response.data.bloodGroup,
          role: 'donor',
          registeredAt: response.data.createdAt || new Date().toISOString()
        };
        
        onLogin(userData);
        alert('Registration successful! Welcome to BloodConnect+');
        navigate('/');
      } else {
        alert(`Registration failed: ${response.message || 'Please try again'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message || 'An unexpected error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* HEADER */}
      <div className="bg-purple-600 text-white py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center">
          <Link to="/" className="mr-4 hover:bg-purple-700 p-2 rounded">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold">⚡ Quick Registration</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {/* PROGRESS INDICATOR */}
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
          <div className="text-center">
            <p className="text-sm text-gray-600">Step {step} of 3 - Only 30 seconds to save lives!</p>
          </div>
        </div>

        {/* STEP 1: BASIC INFO */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">👋</div>
              <h2 className="text-2xl font-bold mb-2">Hello Future Life-Saver!</h2>
              <p className="text-gray-600">Just need your basic info to get started</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-2">Your Name *</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">Phone Number *</label>
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <p className="text-sm text-gray-500 mt-1">We'll only call for urgent blood requests</p>
              </div>

              <button 
                onClick={nextStep}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-4 rounded-lg transition-colors"
              >
                Continue → Blood Group
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BLOOD GROUP */}
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
                  {formData.bloodGroup === 'O-' && ' 🌟 You\'re a universal donor - super hero!'}
                  {formData.bloodGroup === 'AB+' && ' 🌟 You can receive from anyone!'}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-lg font-bold py-4 rounded-lg transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={nextStep}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold py-4 rounded-lg transition-colors"
              >
                Continue → Final Step
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMATION */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Almost Done!</h2>
              <p className="text-gray-600">Confirm your details and join the life-saving community</p>
            </div>

            {/* SUMMARY */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-3">Your Registration Summary:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <strong>{formData.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <strong>{formData.phone}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Blood Group:</span>
                  <strong className="text-red-600">{formData.bloodGroup}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Role:</span>
                  <strong>Blood Donor</strong>
                </div>
              </div>
            </div>

            {/* AGREEMENT */}
            <div className="mb-6">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={(e) => handleInputChange('agreement', e.target.checked)}
                  className="mt-1 w-5 h-5 text-purple-600"
                />
                <div className="text-sm text-gray-600">
                  <p className="mb-2">I agree to:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Receive calls/SMS for urgent blood requests</li>
                    <li>• Donate blood voluntarily when possible</li>
                    <li>• Provide accurate health information</li>
                    <li>• Follow all blood donation guidelines</li>
                  </ul>
                  <p className="mt-2 font-semibold">By registering, I commit to saving lives! 🦸‍♂️</p>
                </div>
              </label>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-lg font-bold py-4 rounded-lg transition-colors"
              >
                ← Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Registering...
                  </div>
                ) : (
                  '🎯 REGISTER & SAVE LIVES!'
                )}
              </button>
            </div>
          </div>
        )}

        {/* BENEFITS SIDEBAR */}
        <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-3">🌟 Why Register?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <span className="mr-2">❤️</span>
              Get priority when you need blood
            </div>
            <div className="flex items-center">
              <span className="mr-2">📱</span>
              Instant notifications for urgent requests
            </div>
            <div className="flex items-center">
              <span className="mr-2">🏥</span>
              Access to all blood banks
            </div>
            <div className="flex items-center">
              <span className="mr-2">🎖️</span>
              Digital donor certificates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickRegistration;
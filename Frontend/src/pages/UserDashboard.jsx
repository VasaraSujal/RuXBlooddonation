import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentRole } from '../utils/auth.js';
import { useLanguage } from '../utils/LanguageContext';
import { getTranslation } from '../utils/languages';
import LanguageSelector from '../components/LanguageSelector';
import FloatingPanicButton from '../components/FloatingPanicButton.jsx';
import { mockHospitals, mockDonors } from '../data/mockData.js';
import { BLOOD_GROUPS } from '../utils/constants.js';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();

  const [userProfile] = useState({
    name: 'Rajesh Kumar',
    bloodGroup: 'O+',
    age: 28,
    donorId: 'RK-2024-001',
    donations: 5,
    rewardPoints: 250,
    verificationStatus: 'Verified',
    eligibleToDonate: true,
    lastDonation: '2024-06-15',
    nextDonationDate: '2024-12-15',
    nearbyBloodBanks: [
      {
        id: 1,
        name: 'All India Institute of Medical Sciences',
        location: 'Ansari Nagar, Delhi',
        distance: '2.5 km',
        availableBloodTypes: ['O+', 'A+', 'B+', 'AB+', 'O-'],
        stockLevel: 'High',
        contact: '+91 11 2659 8700'
      }
    ],
    bloodRequests: [
      {
        id: 1,
        hospital: 'AIIMS Delhi',
        bloodGroup: 'O+',
        units: 2,
        urgency: 'High',
        date: '2024-10-08',
        status: 'Pending'
      }
    ]
  });

  // Add role checking on component mount
  useEffect(() => {
    const currentRole = getCurrentRole();
    if (currentRole && currentRole !== 'user') {
      if (currentRole === 'ngo') {
        window.location.href = '/ngo';
      } else {
        window.location.href = '/';
      }
      return;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Government Header */}
      <div className="bg-white border-b-4 border-blue-600 shadow-lg">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🇮🇳 Government of India</span>
              <span>|</span>
              <span>Ministry of Health & Family Welfare</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>📞 National Helpline: 1075</span>
              <span>|</span>
              <span>🌐 Hindi | English</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200">
                  <span className="text-2xl">🩸</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">e-RaktKosh+</h1>
                  <p className="text-sm text-gray-600">National Blood Transfusion Service Portal</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-2">
                <div className="text-xs text-blue-600 font-medium">Authenticated User</div>
                <div className="text-sm font-semibold text-blue-800">{userProfile.name}</div>
              </div>
              <div className="text-green-600 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Verified Donor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Navigation and Language Selector */}
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
          
          <div className="bg-white rounded-lg p-2 shadow-md border border-gray-200">
            <LanguageSelector />
          </div>
        </div>

        {/* Government Official Notice */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-900 text-white rounded-lg p-8 shadow-xl border-l-8 border-orange-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-bold">OFFICIAL</div>
                    <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">VERIFIED</div>
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">ACTIVE</div>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
                    Government Blood Donor Portal
                  </h1>
                  <h2 className="text-xl lg:text-2xl font-semibold text-blue-100">
                    Welcome, {userProfile.name}
                  </h2>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-100">Registered Donor ID: <strong className="text-white">{userProfile.donorId}</strong></span>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span className="text-blue-100">Blood Group: <strong className="text-white bg-red-600 px-2 py-1 rounded ml-1">{userProfile.bloodGroup}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
                    <div className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Blood Group</div>
                    <div className="text-3xl font-black text-white">{userProfile.bloodGroup}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
                    <div className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Total Donations</div>
                    <div className="text-3xl font-black text-white">{userProfile.donations}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold border-2 border-green-400 uppercase tracking-wide">
                    ✅ GOVERNMENT VERIFIED
                  </div>
                  <div className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold border-2 border-blue-400 uppercase tracking-wide">
                    🩺 HEALTH CLEARED
                  </div>
                  <div className={`px-4 py-2 rounded text-sm font-bold border-2 uppercase tracking-wide ${
                    userProfile.eligibleToDonate 
                      ? 'bg-orange-600 text-white border-orange-400' 
                      : 'bg-gray-600 text-white border-gray-400'
                  }`}>
                    {userProfile.eligibleToDonate ? '🔴 DONATION ELIGIBLE' : '⏱️ WAITING PERIOD'}
                  </div>
                </div>
              </div>

              {/* Government Certification Card */}
              <div className="flex justify-center">
                <div className="bg-white/15 backdrop-blur-lg rounded-lg p-8 border-4 border-white/30 shadow-2xl">
                  <div className="text-center space-y-6">
                    <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-orange-400">
                      <span className="text-3xl">🇮🇳</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-white font-bold text-lg uppercase tracking-wide">Certified Donor</div>
                      <div className="text-blue-100 text-sm">Ministry of Health & Family Welfare</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4 border-2 border-white/20">
                      <div className="text-4xl font-black text-white mb-1">{userProfile.donations}</div>
                      <div className="text-blue-100 text-sm font-semibold uppercase">Lives Saved</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-green-600 text-white px-4 py-2 rounded font-bold text-sm">
                        CERTIFIED HERO
                      </div>
                      <div className="bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm">
                        {userProfile.rewardPoints} REWARD POINTS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Government Official Notice */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-8 border-orange-500 rounded-lg p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 text-white p-3 rounded-full">
                <span className="text-xl">📢</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-bold text-orange-800 uppercase tracking-wide">Official Notice</h3>
                  <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">IMPORTANT</div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Government of India</strong> acknowledges your contribution to the National Blood Donation Program. 
                  Your verified donor status ensures priority access to emergency blood services nationwide. 
                  <span className="text-blue-700 font-semibold">Thank you for serving the nation.</span>
                </p>
                <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                  <span>📅 Valid until: {new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString()}</span>
                  <span>🏛️ Authority: Ministry of Health</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">🩸</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{userProfile.donations}</h3>
                <p className="text-gray-600 text-sm">Blood Donations</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{userProfile.bloodRequests?.length || 0}</h3>
                <p className="text-gray-600 text-sm">Active Requests</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">🏥</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{userProfile.nearbyBloodBanks?.length || 0}</h3>
                <p className="text-gray-600 text-sm">Blood Banks</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{userProfile.rewardPoints}</h3>
                <p className="text-gray-600 text-sm">Reward Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md p-1 mb-8 border border-gray-200">
          <div className="flex space-x-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
              { id: 'donate-blood', label: 'Donate Blood', icon: '❤️' },
              { id: 'find-blood', label: 'Find Blood', icon: '🔍' },
              { id: 'requests', label: 'My Requests', icon: '📋' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Blood donated at AIIMS Delhi - September 15, 2024</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Health checkup completed - August 20, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'donate-blood' && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h2 className="text-xl font-bold mb-4">Schedule Blood Donation</h2>
                <p className="text-gray-600 mb-4">Schedule your next blood donation appointment</p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Schedule Appointment
                </button>
              </div>
            )}

            {activeTab === 'find-blood' && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h2 className="text-xl font-bold mb-4">Find Blood</h2>
                <p className="text-gray-600 mb-4">Search for available blood in nearby hospitals</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Search Blood Banks
                </button>
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h2 className="text-xl font-bold mb-4">My Blood Requests</h2>
                <div className="space-y-3">
                  {userProfile.bloodRequests.map(request => (
                    <div key={request.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{request.hospital}</h4>
                          <p className="text-sm text-gray-600">Blood Group: {request.bloodGroup}</p>
                          <p className="text-sm text-gray-600">Units needed: {request.units}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <h2 className="text-xl font-bold mb-4">My Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <div className="font-semibold">{userProfile.name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Blood Group</label>
                    <div className="font-bold text-red-600 text-xl">{userProfile.bloodGroup}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Donor ID</label>
                    <div className="font-semibold text-gray-800">{userProfile.donorId}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Last Donation</label>
                    <div className="font-semibold text-gray-800">{userProfile.lastDonation}</div>
                  </div>
                </div>
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/panic-mode')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  🚨 Emergency Mode
                </button>
                <button 
                  onClick={() => navigate('/digital-donor-card')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  📱 Digital Donor Card
                </button>
                <button 
                  onClick={() => navigate('/blood-banks')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  🗺️ Find Blood Banks
                </button>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Profile Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Blood Group:</span>
                  <span className="font-bold text-red-600">{userProfile.bloodGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-semibold">{userProfile.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Donations:</span>
                  <span className="font-semibold">{userProfile.donations}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-800 mb-4">Emergency Contact</h3>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-sm text-gray-600">Blood Bank Helpline</div>
                  <div className="font-bold text-red-600">1910</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-sm text-gray-600">Emergency Services</div>
                  <div className="font-bold text-red-600">108</div>
                </div>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium mt-4 transition-colors">
                📞 Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <FloatingPanicButton />
    </div>
  );
};

export default UserDashboard;
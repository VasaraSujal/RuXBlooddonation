import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import { useLanguage } from '../utils/LanguageContext';
import { getTranslation } from '../utils/languages';

const BloodBanks = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(key, currentLanguage);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  // Mock blood banks data
  const bloodBanks = [
    {
      id: 1,
      name: "All Institute of Medical Sciences (AIIMS) Blood Bank",
      address: "Ansari Nagar, New Delhi - 110029",
      state: "Delhi",
      phone: "011-26588500",
      email: "bloodbank@aiims.edu",
      timings: "24x7 Emergency",
      availableBlood: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      verified: true,
      type: "Public Hospital",
      distance: "2.5 km"
    },
    {
      id: 2,
      name: "Indian Red Cross Society Blood Bank",
      address: "Red Cross Bhawan, Sector 12, Dwarka, Delhi",
      state: "Delhi",
      phone: "011-25088441",
      email: "delhi@indianredcross.org",
      timings: "9:00 AM - 5:00 PM",
      availableBlood: ["O+", "A+", "B+", "AB+"],
      verified: true,
      type: "Red Cross",
      distance: "5.2 km"
    },
    {
      id: 3,
      name: "Safdarjung Hospital Blood Bank",
      address: "Ansari Nagar West, New Delhi - 110029",
      state: "Delhi",
      phone: "011-26165060",
      email: "bloodbank@safdarjung.gov.in",
      timings: "24x7 Emergency",
      availableBlood: ["O-", "A-", "B-", "AB-", "O+", "A+"],
      verified: true,
      type: "Community Hospital",
      distance: "3.8 km"
    },
    {
      id: 4,
      name: "Fortis Hospital Blood Bank",
      address: "Sector 62, Noida, Uttar Pradesh - 201301",
      state: "Uttar Pradesh",
      phone: "0120-3988888",
      email: "bloodbank@fortis.in",
      timings: "24x7 Available",
      availableBlood: ["O+", "O-", "A+", "B+", "AB+"],
      verified: true,
      type: "Private Hospital",
      distance: "12.1 km"
    },
    {
      id: 5,
      name: "King George Medical University Blood Bank",
      address: "Chowk, Lucknow, Uttar Pradesh - 226003",
      state: "Uttar Pradesh", 
      phone: "0522-2258800",
      email: "bloodbank@kgmu.org",
      timings: "24x7 Emergency",
      availableBlood: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      verified: true,
      type: "Municipal Hospital",
      distance: "45.7 km"
    },
    {
      id: 6,
      name: "Apollo Hospital Blood Bank",
      address: "Jubilee Hills, Hyderabad, Telangana - 500033",
      state: "Telangana",
      phone: "040-23607777",
      email: "bloodbank@apollo.com",
      timings: "24x7 Available",
      availableBlood: ["O+", "A+", "B+", "AB+", "O-"],
      verified: true,
      type: "Private Hospital",
      distance: "678 km"
    }
  ];

  const states = ["Delhi", "Uttar Pradesh", "Maharashtra", "Karnataka", "Telangana", "Tamil Nadu", "Gujarat", "Rajasthan"];
  const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  // Filter blood banks based on search criteria
  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bank.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = !selectedState || bank.state === selectedState;
    const matchesBloodGroup = !selectedBloodGroup || bank.availableBlood.includes(selectedBloodGroup);
    
    return matchesSearch && matchesState && matchesBloodGroup;
  });

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
                  <span className="text-2xl">🏥</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">Blood Bank Directory</h1>
                  <p className="text-sm text-gray-600">National Blood Transfusion Service Portal</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <BackButton text="Back to Home" customPath="/" className="bg-blue-600 hover:bg-blue-700 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Official Notice */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-8 border-orange-500 rounded-lg p-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-500 text-white p-3 rounded-full">
              <span className="text-xl">📢</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-bold text-orange-800 uppercase tracking-wide">Official Blood Bank Directory</h3>
                <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">VERIFIED</div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Government of India</strong> verified blood banks listed below. All facilities are licensed and regularly inspected by health authorities. 
                <span className="text-blue-700 font-semibold">For emergency requirements, contact National Blood Helpline: 1075</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Government Search Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-blue-200">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
              <span className="text-xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-900">Find Government Verified Blood Banks</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('searchByNameOrLocation')}
              </label>
              <input
                type="text"
                placeholder={t('enterHospitalName')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('selectState')}
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('allStates')}</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Blood Group Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('requiredBloodGroup')}
              </label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('allBloodGroups')}</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{filteredBloodBanks.length}</div>
              <div className="text-sm text-gray-600">{t('banksFound')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {filteredBloodBanks.filter(b => b.verified).length}
              </div>
              <div className="text-sm text-gray-600">{t('verified')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {filteredBloodBanks.filter(b => b.timings.includes('24x7')).length}
              </div>
              <div className="text-sm text-gray-600">{t('available24x7')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {filteredBloodBanks.filter(b => b.type.includes('Public') || b.type.includes('Community') || b.type.includes('Municipal')).length}
              </div>
              <div className="text-sm text-gray-600">{t('public')}</div>
            </div>
          </div>
        </div>

        {/* Blood Banks List */}
        <div className="space-y-6">
          {filteredBloodBanks.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('noBloodBanksFound')}</h3>
              <p className="text-gray-600 mb-6">
                {t('tryAdjustingSearch')}
              </p>
              <Link 
                to="/contact" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {t('getHelp')}
              </Link>
            </div>
          ) : (
            filteredBloodBanks.map(bank => (
              <div key={bank.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{bank.name}</h3>
                          {bank.verified && (
                            <span className="ml-3 bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">
                              ✓ GOVT VERIFIED
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{bank.address}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            {bank.type}
                          </span>
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {bank.distance} away
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">{t('contactInformation')}</h4>
                        <p className="text-sm text-gray-600">📞 {bank.phone}</p>
                        <p className="text-sm text-gray-600">✉️ {bank.email}</p>
                        <p className="text-sm text-gray-600">🕒 {bank.timings}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">{t('availableBloodGroups')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {bank.availableBlood.map(group => (
                            <span 
                              key={group} 
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                selectedBloodGroup === group 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {group}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 lg:ml-6 mt-4 lg:mt-0">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-medium transition-colors">
                      📋 Request Blood
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors">
                      📞 Call Now
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-medium transition-colors">
                      🗺️ Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Government Emergency Section */}
        <div className="mt-12 bg-red-50 border-2 border-red-200 rounded-lg p-8">
          <div className="text-center">
            <div className="bg-red-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🚨</span>
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">Emergency Blood Required?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              For critical situations requiring immediate blood transfusion, contact our 24x7 emergency helpline or visit the nearest government hospital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/panic-mode" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-medium transition-colors"
              >
                🚨 Emergency Mode
              </Link>
              <Link 
                to="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors"
              >
                📞 Call Helpline: 1075
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodBanks;
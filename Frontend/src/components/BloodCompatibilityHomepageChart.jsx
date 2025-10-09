import { useState } from 'react';

const BloodCompatibilityHomepageChart = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('O+');
  
  // Standard blood compatibility matrix
  const bloodCompatibilityMatrix = {
    'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'], frequency: '28%', population: 'Common' },
    'A-': { canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'], frequency: '6%', population: 'Rare' },
    'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'], frequency: '20%', population: 'Common' },
    'B-': { canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'], frequency: '2%', population: 'Rare' },
    'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['All Groups'], frequency: '4%', population: 'Universal Recipient' },
    'AB-': { canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'], frequency: '1%', population: 'Rare' },
    'O+': { canDonateTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'], frequency: '35%', population: 'Common' },
    'O-': { canDonateTo: ['All Groups'], canReceiveFrom: ['O-'], frequency: '4%', population: 'Universal Donor' }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const isCompatible = (donor, recipient) => {
    if (bloodCompatibilityMatrix[donor].canDonateTo.includes('All Groups')) return true;
    return bloodCompatibilityMatrix[donor].canDonateTo.includes(recipient);
  };

  return (
    <div className="bg-white py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Simple Government Header */}
                {/* Platform Header */}
        <div className="bg-red-600 text-white py-2">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm font-bold">🩸</span>
              </div>
              <span className="text-sm font-medium">
              BloodConnect+ | Community Health Initiative
              </span>
            </div>
          </div>
        </div>

        {/* Learn About Donation */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-red-600 mb-4 text-center">
            Learn About Donation
          </h3>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Select your Blood Type
          </p>
          
          {/* Blood Group Selector - Styled like the image */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
              {bloodGroups.map(group => (
                <button
                  key={group}
                  onClick={() => setSelectedBloodGroup(group)}
                  className={`w-20 h-16 rounded-lg font-bold text-lg transition-all border-2 ${
                    selectedBloodGroup === group 
                      ? 'bg-red-600 text-white border-red-600 shadow-lg' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-400'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* Main Donation Scene */}
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-3xl p-8 max-w-6xl mx-auto relative overflow-hidden">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-red-200 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 rounded-full opacity-20 translate-x-20 translate-y-20"></div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              
              {/* Left Side - Compatibility Info */}
              <div className="space-y-8">
                
                {/* You can take from */}
                <div className="bg-orange-100 rounded-2xl p-6 border-l-4 border-orange-400">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-orange-800">You can take from</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {bloodCompatibilityMatrix[selectedBloodGroup].canReceiveFrom === 'All Groups' ? (
                      bloodGroups.map(group => (
                        <span key={group} className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-bold text-lg">
                          {group}
                        </span>
                      ))
                    ) : (
                      bloodCompatibilityMatrix[selectedBloodGroup].canReceiveFrom.map(group => (
                        <span key={group} className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-bold text-lg">
                          {group}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* You can give to */}
                <div className="bg-blue-100 rounded-2xl p-6 border-l-4 border-blue-400">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-blue-800">You can give to</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {bloodCompatibilityMatrix[selectedBloodGroup].canDonateTo === 'All Groups' ? (
                      bloodGroups.map(group => (
                        <span key={group} className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full font-bold text-lg">
                          {group}
                        </span>
                      ))
                    ) : (
                      bloodCompatibilityMatrix[selectedBloodGroup].canDonateTo.map(group => (
                        <span key={group} className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full font-bold text-lg">
                          {group}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Donation Illustration */}
              <div className="text-center">
                <div className="relative">
                  {/* Medical Scene SVG */}
                  <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 inline-block">
                    <svg width="300" height="200" viewBox="0 0 300 200" className="mx-auto">
                      {/* Donation Chair */}
                      <rect x="80" y="120" width="140" height="60" rx="15" fill="#4ade80" opacity="0.8"/>
                      <rect x="70" y="110" width="20" height="70" rx="10" fill="#22c55e"/>
                      <rect x="210" y="110" width="20" height="70" rx="10" fill="#22c55e"/>
                      
                      {/* Patient */}
                      <circle cx="150" cy="80" r="20" fill="#fbbf24"/>
                      <rect x="130" y="100" width="40" height="50" rx="8" fill="#60a5fa"/>
                      <rect x="120" y="110" width="15" height="30" rx="7" fill="#f472b6"/>
                      <rect x="165" y="110" width="15" height="30" rx="7" fill="#f472b6"/>
                      
                      {/* Medical Professional */}
                      <circle cx="50" cy="60" r="18" fill="#f59e0b"/>
                      <rect x="35" y="78" width="30" height="40" rx="6" fill="#38bdf8"/>
                      <rect x="25" y="88" width="12" height="25" rx="6" fill="#fbbf24"/>
                      <rect x="53" y="88" width="12" height="25" rx="6" fill="#fbbf24"/>
                      
                      {/* Blood Bag */}
                      <rect x="250" y="50" width="30" height="40" rx="5" fill="#ef4444"/>
                      <rect x="255" y="45" width="20" height="8" rx="4" fill="#dc2626"/>
                      <line x1="265" y1="90" x2="180" y2="115" stroke="#ef4444" strokeWidth="3"/>
                      
                      {/* IV Stand */}
                      <line x1="270" y1="30" x2="270" y2="160" stroke="#6b7280" strokeWidth="4"/>
                      <circle cx="270" cy="160" r="15" fill="#374151"/>
                      
                      {/* Blood Group Badge */}
                      <circle cx="150" cy="50" r="25" fill="#dc2626"/>
                      <text x="150" y="58" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">{selectedBloodGroup}</text>
                    </svg>
                  </div>
                  
                  {/* Inspirational Message */}
                  <div className="mt-8 bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                    <p className="text-red-600 text-xl font-bold mb-2">
                      One Blood Donation can save upto Three Lives
                    </p>
                    <p className="text-red-500 font-medium">
                      Your {selectedBloodGroup} blood type has {bloodCompatibilityMatrix[selectedBloodGroup].frequency} population frequency
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blood Group Information */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-red-600 pb-2">
            Blood Group Information
          </h3>
          
          {/* Professional Table Style */}
          <div className="bg-white border border-gray-300 overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b border-gray-300">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b border-gray-300">
                    DescriptionBlood Group	Description	Population %
O Negative (O-)	Universal Donor - Can donate to all blood groups	6.6%
AB Positive (AB+)	Universal Receiver - Can receive from all blood groups	3.4%
A Negative (A-)	Rare blood type - Limited donor availability	6.3%
B Negative (B-)	Rare blood type - Limited donor availability	1.5%
AB Negative (AB-)	Rarest blood type - Very limited donor availability	0.6%

                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b border-gray-300">
                    Population %
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 text-sm font-medium text-red-700">
                    O Negative (O-)
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Universal Donor - Can donate to all blood groups
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    6.6%
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 text-sm font-medium text-green-700">
                    AB Positive (AB+)
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Universal Receiver - Can receive from all blood groups
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    3.4%
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 text-sm font-medium text-purple-700">
                    A Negative (A-)
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Rare blood type - Limited donor availability
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    6.3%
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 text-sm font-medium text-purple-700">
                    B Negative (B-)
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Rare blood type - Limited donor availability
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    1.5%
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 text-sm font-medium text-purple-700">
                    AB Negative (AB-)
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Rarest blood type - Very limited donor availability
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    0.6%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Important Notice Box */}
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4">
            <div className="flex">
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">
                  Important Notice
                </h4>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Blood compatibility testing is mandatory before transfusion</li>
                    <li>Consult qualified medical professionals for blood donation/transfusion</li>
                    <li>This information is for educational purposes only</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Government Notice */}
                {/* Important Medical Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            Important Medical Information
          </h3>
          <div className="space-y-2 text-sm text-yellow-700">
            <p>• Always consult qualified medical professionals before blood donation</p>
            <p>• Blood compatibility testing is mandatory in all certified medical facilities</p>
            <p>• Emergency blood transfusion decisions should only be made by licensed doctors</p>
            <p>• This chart is for educational purposes only and not a substitute for professional medical advice</p>
          </div>
          <div className="mt-4 text-xs text-yellow-600">
            <p>
              Source: WHO Blood Safety Guidelines & International Blood Transfusion Standards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodCompatibilityHomepageChart;
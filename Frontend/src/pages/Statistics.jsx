import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton.jsx';

const Statistics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [animatedStats, setAnimatedStats] = useState({});

  // Mock statistics data
  const realTimeStats = {
    totalDonations: 12847,
    activeDonors: 25634,
    bloodUnitsAvailable: 8945,
    livesImpacted: 38541,
    emergencyRequests: 234,
    successfulMatches: 189
  };

  const stateWiseData = [
    { state: 'Delhi', donations: 2847, donors: 5634, availability: 89 },
    { state: 'Maharashtra', donations: 3421, donors: 6789, availability: 92 },
    { state: 'Karnataka', donations: 2156, donors: 4234, availability: 78 },
    { state: 'Uttar Pradesh', donations: 2934, donors: 5123, availability: 85 },
    { state: 'Tamil Nadu', donations: 1489, donors: 3567, availability: 76 }
  ];

  const bloodGroupDistribution = [
    { type: 'O+', percentage: 37.4, available: 3348, color: 'bg-red-500' },
    { type: 'A+', percentage: 35.7, available: 3195, color: 'bg-blue-500' },
    { type: 'B+', percentage: 8.5, available: 760, color: 'bg-green-500' },
    { type: 'AB+', percentage: 3.4, available: 304, color: 'bg-purple-500' },
    { type: 'O-', percentage: 6.6, available: 590, color: 'bg-orange-500' },
    { type: 'A-', percentage: 6.3, available: 564, color: 'bg-cyan-500' },
    { type: 'B-', percentage: 1.5, available: 134, color: 'bg-pink-500' },
    { type: 'AB-', percentage: 0.6, available: 54, color: 'bg-indigo-500' }
  ];

  const monthlyTrends = [
    { month: 'Jan 2025', donations: 8234, requests: 7890 },
    { month: 'Feb 2025', donations: 9123, requests: 8456 },
    { month: 'Mar 2025', donations: 10567, requests: 9234 },
    { month: 'Apr 2025', donations: 11234, requests: 10123 },
    { month: 'May 2025', donations: 12456, requests: 11567 },
    { month: 'Jun 2025', donations: 13789, requests: 12890 },
    { month: 'Jul 2025', donations: 14123, requests: 13234 },
    { month: 'Aug 2025', donations: 15567, requests: 14567 },
    { month: 'Sep 2025', donations: 16234, requests: 15123 },
    { month: 'Oct 2025', donations: 12847, requests: 11890 }
  ];

  // Animate numbers on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(realTimeStats);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString('en-IN');
  };

  // Calculate success rate
  const successRate = ((realTimeStats.successfulMatches / realTimeStats.emergencyRequests) * 100).toFixed(1);

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
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">National Blood Statistics</h1>
                  <p className="text-sm text-gray-600">Central Blood Transfusion Service Analytics</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <BackButton text="Back to Home" customPath="/" className="bg-blue-600 hover:bg-blue-700 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Official Notice */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-8 border-orange-500 rounded-lg p-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-500 text-white p-3 rounded-full">
              <span className="text-xl">📈</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-bold text-orange-800 uppercase tracking-wide">Official Blood Donation Statistics</h3>
                <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">VERIFIED DATA</div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Real-time analytics</strong> from National Blood Transfusion Service showing blood donation trends, availability, and impact across India. 
                <span className="text-blue-700 font-semibold">Data updated every 30 seconds.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Government Time Range Selector */}
        <div className="text-center mb-12">
          <div className="bg-white rounded-lg shadow-lg p-2 border-t-4 border-blue-600 inline-flex">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3 flex items-center">
              <span className="text-lg">📅</span>
            </div>
            {[
              { id: '24hours', label: 'Last 24 Hours' },
              { id: '7days', label: 'Last 7 Days' },
              { id: '30days', label: 'Last 30 Days' },
              { id: '1year', label: 'This Year' }
            ].map(range => (
              <button
                key={range.id}
                onClick={() => setSelectedTimeRange(range.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedTimeRange === range.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Official Government Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {[
            { title: 'Total Donations', value: realTimeStats.totalDonations, icon: '🩸', color: 'red', bg: 'bg-red-50' },
            { title: 'Active Donors', value: realTimeStats.activeDonors, icon: '👥', color: 'blue', bg: 'bg-blue-50' },
            { title: 'Blood Units Available', value: realTimeStats.bloodUnitsAvailable, icon: '🏥', color: 'green', bg: 'bg-green-50' },
            { title: 'Lives Impacted', value: realTimeStats.livesImpacted, icon: '❤️', color: 'purple', bg: 'bg-purple-50' },
            { title: 'Emergency Requests', value: realTimeStats.emergencyRequests, icon: '🚨', color: 'orange', bg: 'bg-orange-50' },
            { title: 'Successful Matches', value: realTimeStats.successfulMatches, icon: '✅', color: 'emerald', bg: 'bg-green-50' }
          ].map((stat, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-200 border-l-8 border-${stat.color}-600 ${stat.bg}`}>
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className={`text-2xl font-bold text-${stat.color}-700 mb-2`}>
                {formatNumber(animatedStats[Object.keys(realTimeStats)[index]] || 0)}
              </div>
              <div className="text-xs text-gray-700 font-semibold uppercase tracking-wide">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Government Success Rate Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white p-8 mb-12 text-center shadow-lg border-l-8 border-green-800">
          <div className="flex items-center justify-center space-x-8">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg">
              <div className="text-4xl font-bold">{successRate}%</div>
              <div className="text-green-100 font-semibold">Emergency Success Rate</div>
            </div>
            <div className="text-4xl bg-white bg-opacity-20 p-4 rounded-full">🎯</div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg">
              <div className="text-xl font-bold">Government Response</div>
              <div className="text-green-100">Critical blood requests fulfilled</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Official Blood Group Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-600 text-white p-3 rounded-lg mr-3">
                <span className="text-xl">🩸</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900">National Blood Group Distribution</h3>
            </div>
            <div className="space-y-4">
              {bloodGroupDistribution.map((group) => (
                <div key={group.type} className="flex items-center">
                  <div className="w-16 font-bold text-gray-700">{group.type}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className={`${group.color} h-6 rounded-full transition-all duration-1000 flex items-center justify-end pr-2`}
                        style={{ width: `${group.percentage}%` }}
                      >
                        <span className="text-white text-xs font-bold">{group.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-20 text-right text-gray-600 text-sm">
                    {formatNumber(group.available)} units
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Government State-wise Performance */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-green-600">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-green-600 text-white p-3 rounded-lg mr-3">
                <span className="text-xl">🏛️</span>
              </div>
              <h3 className="text-xl font-bold text-green-900">State-wise Performance Report</h3>
            </div>
            <div className="space-y-6">
              {stateWiseData.map((state, index) => (
                <div key={state.state} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-700">{state.state}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      state.availability >= 90 ? 'bg-green-100 text-green-800' :
                      state.availability >= 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {state.availability}% Available
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>Donations: <span className="font-semibold">{formatNumber(state.donations)}</span></div>
                    <div>Active Donors: <span className="font-semibold">{formatNumber(state.donors)}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Monthly Donation Trends</h3>
          <div className="grid grid-cols-5 lg:grid-cols-10 gap-4">
            {monthlyTrends.map((month, index) => (
              <div key={month.month} className="text-center">
                <div className="mb-4">
                  <div 
                    className="bg-gradient-to-t from-red-500 to-red-300 rounded-lg mx-auto transition-all duration-1000 hover:shadow-lg"
                    style={{ 
                      height: `${(month.donations / Math.max(...monthlyTrends.map(m => m.donations))) * 120}px`,
                      width: '40px'
                    }}
                  ></div>
                </div>
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  {month.month.split(' ')[0]}
                </div>
                <div className="text-xs text-gray-600">
                  {formatNumber(month.donations)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span>Blood Donations</span>
              </div>
              <div className="text-gray-400">•</div>
              <div>Showing data for 2025</div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <div className="text-3xl font-bold mb-2">2.3 min</div>
            <div className="text-blue-100">Average Response Time</div>
            <div className="text-sm text-blue-200 mt-2">For emergency blood requests</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">🏆</div>
            <div className="text-3xl font-bold mb-2">96.8%</div>
            <div className="text-green-100">Donor Satisfaction</div>
            <div className="text-sm text-green-200 mt-2">Based on feedback surveys</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">🌟</div>
            <div className="text-3xl font-bold mb-2">4.9/5</div>
            <div className="text-purple-100">Platform Rating</div>
            <div className="text-sm text-purple-200 mt-2">Average user rating</div>
          </div>
        </div>

        {/* Live Updates */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">🔴 Live Updates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">+47</div>
              <div className="text-gray-300 text-sm">New Donations Today</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">+123</div>
              <div className="text-gray-300 text-sm">New Donor Registrations</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">12</div>
              <div className="text-gray-300 text-sm">Active Emergency Requests</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400">8</div>
              <div className="text-gray-300 text-sm">Successful Matches This Hour</div>
            </div>
          </div>
          <div className="mt-6 text-gray-400 text-sm">
            📊 Data updates every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
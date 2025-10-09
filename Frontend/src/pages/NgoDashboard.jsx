import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentRole } from '../utils/auth.js';
import Navbar from '../components/Navbar.jsx';
import FloatingPanicButton from '../components/FloatingPanicButton.jsx';
import BackButton from '../components/BackButton.jsx';
import { mockDonors, mockHospitals } from '../data/mockData.js';
import { BLOOD_GROUPS } from '../utils/constants.js';

const NgoDashboard = () => {
  const [activeTab, setActiveTab] = useState('blood-stock');
  const [organizationProfile, setOrganizationProfile] = useState({
    name: 'Government District Hospital',
    type: 'Government Healthcare Institution',
    license: 'GOVT-HOS-2025-001',
    established: '1995',
    totalBeds: 250,
    bloodBankCapacity: 500
  });
  
  const [bloodStock, setBloodStock] = useState([
    { bloodGroup: 'O+', current: 45, capacity: 100, status: 'normal', lastUpdated: '2025-10-07 09:30' },
    { bloodGroup: 'O-', current: 12, capacity: 50, status: 'critical', lastUpdated: '2025-10-07 09:15' },
    { bloodGroup: 'A+', current: 32, capacity: 80, status: 'normal', lastUpdated: '2025-10-07 08:45' },
    { bloodGroup: 'A-', current: 8, capacity: 40, status: 'low', lastUpdated: '2025-10-07 09:00' },
    { bloodGroup: 'B+', current: 28, capacity: 70, status: 'normal', lastUpdated: '2025-10-07 08:30' },
    { bloodGroup: 'B-', current: 6, capacity: 35, status: 'critical', lastUpdated: '2025-10-07 09:10' },
    { bloodGroup: 'AB+', current: 15, capacity: 45, status: 'low', lastUpdated: '2025-10-07 08:55' },
    { bloodGroup: 'AB-', current: 4, capacity: 25, status: 'critical', lastUpdated: '2025-10-07 09:20' }
  ]);

  const [activeRequests, setActiveRequests] = useState([
    {
      id: 1,
      requester: 'John Doe',
      bloodGroup: 'O-',
      units: 2,
      urgency: 'critical',
      requestDate: '2025-10-07',
      contactNumber: '+91-9876543210',
      status: 'pending',
      patientCondition: 'Emergency surgery required'
    },
    {
      id: 2,
      requester: 'Maria Singh',
      bloodGroup: 'A+',
      units: 1,
      urgency: 'high',
      requestDate: '2025-10-06',
      contactNumber: '+91-9876543211',
      status: 'approved',
      patientCondition: 'Post-operative care'
    },
    {
      id: 3,
      requester: 'Raj Kumar',
      bloodGroup: 'B-',
      units: 3,
      urgency: 'medium',
      requestDate: '2025-10-05',
      contactNumber: '+91-9876543212',
      status: 'fulfilled',
      patientCondition: 'Thalassemia treatment'
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    bloodGroup: '',
    units: 1,
    urgency: 'medium',
    description: '',
    contactPerson: '',
    contactNumber: ''
  });

  const navigate = useNavigate();

  // Add role checking on component mount
  // useEffect(() => {
  //   const currentRole = getCurrentRole();
  //   if (currentRole && currentRole !== 'ngo') {
  //     // If user has wrong role, redirect to correct dashboard
  //     if (currentRole === 'user') {
  //       window.location.href = '/user';
  //     } else {
  //       window.location.href = '/';
  //     }
  //     return; // Prevent further execution
  //   }
  // }, []);

  const getStockStatus = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage < 20) return 'critical';
    if (percentage < 40) return 'low';
    return 'normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'low': return 'text-orange-600 bg-orange-100';
      case 'normal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStockUpdate = (bloodGroup, newAmount) => {
    setBloodStock(prevStock => 
      prevStock.map(stock => 
        stock.bloodGroup === bloodGroup 
          ? { 
              ...stock, 
              current: parseInt(newAmount), 
              status: getStockStatus(parseInt(newAmount), stock.capacity),
              lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
            }
          : stock
      )
    );
    
    window.showNotification && window.showNotification(
      'success',
      'Stock Updated',
      `${bloodGroup} blood stock updated to ${newAmount} units`
    );
  };

  const handleRequestStatusChange = (requestId, newStatus) => {
    setActiveRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
    
    window.showNotification && window.showNotification(
      'success',
      'Request Status Updated',
      `Request has been marked as ${newStatus}`
    );
  };

  const handleSubmitNewRequest = () => {
    if (!newRequest.bloodGroup || !newRequest.contactPerson) {
      window.showNotification && window.showNotification(
        'error',
        'Missing Information',
        'Please fill in all required fields'
      );
      return;
    }

    // Add new request
    const request = {
      id: Date.now(),
      requester: newRequest.contactPerson,
      bloodGroup: newRequest.bloodGroup,
      units: newRequest.units,
      urgency: newRequest.urgency,
      requestDate: new Date().toISOString().split('T')[0],
      contactNumber: newRequest.contactNumber,
      status: 'pending',
      patientCondition: newRequest.description
    };

    setActiveRequests(prev => [request, ...prev]);
    
    // Reset form
    setNewRequest({
      bloodGroup: '',
      units: 1,
      urgency: 'medium',
      description: '',
      contactPerson: '',
      contactNumber: ''
    });

    window.showNotification && window.showNotification(
      'success',
      'Request Submitted',
      'Blood request has been successfully submitted'
    );
  };

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
                  <h1 className="text-2xl font-bold text-blue-900">Healthcare Institution Dashboard</h1>
                  <p className="text-sm text-gray-600">Government Blood Management Portal</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <BackButton text="Back to Home" customPath="/" className="bg-blue-600 hover:bg-blue-700 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Official Institution Information */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 mb-6 shadow-lg border-l-8 border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">{organizationProfile.name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">GOVT AUTHORIZED</span>
                  <span className="text-blue-100">{organizationProfile.type}</span>
                  <span className="text-blue-100">License: {organizationProfile.license}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">{organizationProfile.totalBeds}</div>
                <div className="text-sm text-blue-100 font-semibold">Total Beds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Government Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-2 mb-6 border-t-4 border-blue-600">
          <div className="flex space-x-2">
            {[
              { id: 'blood-stock', label: 'Government Blood Stock Management', icon: '🩸' },
              { id: 'active-requests', label: 'Official Blood Requests', icon: '📋' },
              { id: 'add-request', label: 'Submit New Request', icon: '➕' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'blood-stock' && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                      <span className="text-xl">🩸</span>
                    </div>
                    <h2 className="text-xl font-bold text-blue-900">Government Blood Stock Management</h2>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
                    <span>📊</span>
                    <span>Generate Official Report</span>
                  </button>
                </div>
                
                {/* Stock Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {bloodStock.map(stock => (
                    <div 
                      key={stock.bloodGroup}
                      className={`border-l-4 rounded-lg p-4 ${
                        stock.status === 'critical' ? 'border-red-500 bg-red-50' :
                        stock.status === 'low' ? 'border-orange-500 bg-orange-50' :
                        'border-green-500 bg-green-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-2xl font-bold text-gray-800">{stock.bloodGroup}</div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stock.status)}`}>
                          {stock.status.toUpperCase()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {stock.current} / {stock.capacity} units
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${
                            stock.status === 'critical' ? 'bg-red-500' :
                            stock.status === 'low' ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(stock.current / stock.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Government Stock Management Table */}
                <div className="overflow-x-auto bg-blue-50 p-4 rounded-lg">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="text-left py-3 px-4 font-semibold">Blood Group</th>
                        <th className="text-left py-3 px-4 font-semibold">Government Stock</th>
                        <th className="text-left py-3 px-4 font-semibold">Authorized Capacity</th>
                        <th className="text-left py-3 px-4 font-semibold">Official Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Last Verified</th>
                        <th className="text-left py-3 px-4 font-semibold">Official Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bloodStock.map(stock => (
                        <tr key={stock.bloodGroup} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4 font-semibold text-lg">{stock.bloodGroup}</td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              value={stock.current}
                              onChange={(e) => handleStockUpdate(stock.bloodGroup, e.target.value)}
                              className="w-20 p-1 border border-gray-300 rounded text-center"
                              min="0"
                              max={stock.capacity}
                            />
                          </td>
                          <td className="py-3 px-4">{stock.capacity}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stock.status)}`}>
                              {stock.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{stock.lastUpdated}</td>
                          <td className="py-3 px-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold">
                              🔄 Verify & Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'active-requests' && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-600 text-white p-3 rounded-lg">
                      <span className="text-xl">📋</span>
                    </div>
                    <h2 className="text-xl font-bold text-green-900">Official Blood Requests</h2>
                  </div>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Fulfilled</option>
                    </select>
                    <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>All Blood Groups</option>
                      {BLOOD_GROUPS.map(bg => (
                        <option key={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {activeRequests.map(request => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{request.requester}</h3>
                          <p className="text-gray-600 text-sm">{request.contactNumber}</p>
                          <p className="text-gray-500 text-sm mt-1">{request.patientCondition}</p>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            request.status === 'fulfilled' ? 'bg-green-100 text-green-800' :
                            request.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm bg-gray-50 p-4 rounded-lg">
                        <div>
                          <span className="text-blue-700 font-semibold">Required Blood Group:</span>
                          <div className="font-bold text-red-600">{request.bloodGroup}</div>
                        </div>
                        <div>
                          <span className="text-blue-700 font-semibold">Units Requested:</span>
                          <div className="font-bold">{request.units}</div>
                        </div>
                        <div>
                          <span className="text-blue-700 font-semibold">Official Request Date:</span>
                          <div className="font-bold">{request.requestDate}</div>
                        </div>
                        <div>
                          <span className="text-blue-700 font-semibold">Government Stock:</span>
                          <div className="font-bold text-green-600">
                            {bloodStock.find(s => s.bloodGroup === request.bloodGroup)?.current || 0} units available
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        {request.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleRequestStatusChange(request.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold"
                            >
                              ✅ Government Approval
                            </button>
                            <button 
                              onClick={() => handleRequestStatusChange(request.id, 'rejected')}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold"
                            >
                              ❌ Official Rejection
                            </button>
                          </>
                        )}
                        {request.status === 'approved' && (
                          <button 
                            onClick={() => handleRequestStatusChange(request.id, 'fulfilled')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                          >
                            ✅ Mark as Fulfilled
                          </button>
                        )}
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm">
                          📞 Contact Requester
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'add-request' && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-600">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-orange-600 text-white p-3 rounded-lg">
                    <span className="text-xl">➕</span>
                  </div>
                  <h2 className="text-xl font-bold text-orange-900">Submit Official Blood Request</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-blue-800 mb-2">
                        🩸 Required Blood Group *
                      </label>
                      <select
                        value={newRequest.bloodGroup}
                        onChange={(e) => setNewRequest({...newRequest, bloodGroup: e.target.value})}
                        className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                      >
                        <option value="">Select Official Blood Group</option>
                        {BLOOD_GROUPS.map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-blue-800 mb-2">
                        📊 Units Required for Government Allocation
                      </label>
                      <input
                        type="number"
                        value={newRequest.units}
                        onChange={(e) => setNewRequest({...newRequest, units: parseInt(e.target.value) || 1})}
                        className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        min="1"
                        max="10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-blue-800 mb-2">
                        🚨 Official Priority Level
                      </label>
                      <select
                        value={newRequest.urgency}
                        onChange={(e) => setNewRequest({...newRequest, urgency: e.target.value})}
                        className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                        <option value="critical">Critical - Emergency</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-blue-800 mb-2">
                        👨‍⚕️ Authorized Contact Person *
                      </label>
                      <input
                        type="text"
                        value={newRequest.contactPerson}
                        onChange={(e) => setNewRequest({...newRequest, contactPerson: e.target.value})}
                        className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        placeholder="Enter authorized medical officer name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-blue-800 mb-2">
                        📞 Official Contact Number
                      </label>
                      <input
                        type="tel"
                        value={newRequest.contactNumber}
                        onChange={(e) => setNewRequest({...newRequest, contactNumber: e.target.value})}
                        className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        placeholder="+91-XXXXXXXXXX (Government approved number)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-blue-800 mb-2">
                        📋 Medical Condition / Official Notes
                      </label>
                      <textarea
                        value={newRequest.description}
                        onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                        className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50"
                        rows="3"
                        placeholder="Provide detailed medical condition and official justification for blood requirement..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button 
                    onClick={handleSubmitNewRequest}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>📝</span>
                    <span>Submit Official Request</span>
                  </button>
                  <button 
                    onClick={() => setNewRequest({
                      bloodGroup: '',
                      units: 1,
                      urgency: 'medium',
                      description: '',
                      contactPerson: '',
                      contactNumber: ''
                    })}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/panic-mode')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
                >
                  🚨 Emergency Alert
                </button>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium">
                  📢 Mass Donor Alert
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium">
                  📊 Generate Reports
                </button>
              </div>
            </div>

            {/* Organization Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Organization Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Beds:</span>
                  <span className="font-semibold">{organizationProfile.totalBeds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Blood Bank Capacity:</span>
                  <span className="font-semibold">{organizationProfile.bloodBankCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Established:</span>
                  <span className="font-semibold">{organizationProfile.established}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">License:</span>
                  <span className="font-semibold text-sm">{organizationProfile.license}</span>
                </div>
              </div>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium mt-4">
                Edit Profile
              </button>
            </div>

            {/* Critical Stock Alert */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-4">🚨 Critical Stock</h3>
              <div className="space-y-2">
                {bloodStock.filter(stock => stock.status === 'critical').map(stock => (
                  <div key={stock.bloodGroup} className="flex justify-between items-center">
                    <span className="text-red-700 font-medium">{stock.bloodGroup}</span>
                    <span className="text-red-600 text-sm">{stock.current} units</span>
                  </div>
                ))}
              </div>
              {bloodStock.filter(stock => stock.status === 'critical').length === 0 && (
                <p className="text-green-700 text-sm">All blood types have adequate stock</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Panic Button */}
      <FloatingPanicButton />
    </div>
  );
};

export default NgoDashboard;
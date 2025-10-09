import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";

const Camps = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Mock camps data
  const upcomingCamps = [
    {
      id: 1,
      name: "BloodConnect+ Mega Camp 2025",
      organizer: "BloodConnect+ Foundation",
      date: "2025-10-15",
      time: "9:00 AM - 4:00 PM",
      venue: "Community Center, Connaught Place, New Delhi",
      state: "Delhi",
      target: 500,
      registered: 324,
      contactPerson: "Dr. Raj Kumar",
      phone: "9876543210",
      email: "camp@bloodconnect.com",
      facilities: [
        "Free Health Checkup",
        "Refreshments",
        "Certificate",
        "Blood Group Testing",
      ],
      status: "Open",
    },
    {
      id: 2,
      name: "Corporate Blood Drive - Tech Park",
      organizer: "TechCorp Industries",
      date: "2025-10-18",
      time: "10:00 AM - 3:00 PM",
      venue: "Tech Park Auditorium, Sector 62, Noida",
      state: "Uttar Pradesh",
      target: 200,
      registered: 156,
      contactPerson: "Ms. Priya Sharma",
      phone: "9123456789",
      email: "blooddrive@techcorp.com",
      facilities: [
        "Employee Participation",
        "Lunch",
        "Health Screening",
        "Transportation",
      ],
      status: "Open",
    },
    {
      id: 3,
      name: "University Blood Donation Camp",
      organizer: "Delhi University Medical Society",
      date: "2025-10-22",
      time: "8:00 AM - 2:00 PM",
      venue: "Delhi University, North Campus",
      state: "Delhi",
      target: 300,
      registered: 289,
      contactPerson: "Dr. Anita Singh",
      phone: "9987654321",
      email: "medsoc@du.ac.in",
      facilities: [
        "Student Volunteers",
        "Medical Supervision",
        "Snacks",
        "Awareness Session",
      ],
      status: "Nearly Full",
    },
    {
      id: 4,
      name: "Community Service Blood Camp",
      organizer: "Lions Club Mumbai",
      date: "2025-10-25",
      time: "9:30 AM - 4:30 PM",
      venue: "Municipal Hall, Bandra West, Mumbai",
      state: "Maharashtra",
      target: 400,
      registered: 98,
      contactPerson: "Mr. Suresh Patel",
      phone: "9765432108",
      email: "service@lionsclubmumbai.org",
      facilities: [
        "Free Medical Checkup",
        "Lunch",
        "Blood Donor Card",
        "Health Tips",
      ],
      status: "Open",
    },
    {
      id: 5,
      name: "Annual Blood Donation Drive",
      organizer: "Rotary Club Bangalore",
      date: "2025-10-30",
      time: "10:00 AM - 5:00 PM",
      venue: "Brigade Road Community Center, Bangalore",
      state: "Karnataka",
      target: 350,
      registered: 267,
      contactPerson: "Dr. Ramesh Kumar",
      phone: "9876501234",
      email: "annual@rotarybangalore.org",
      facilities: [
        "Expert Medical Team",
        "Refreshments",
        "Certificate",
        "Follow-up Care",
      ],
      status: "Open",
    },
  ];

  const states = [
    "Delhi",
    "Maharashtra",
    "Karnataka",
    "Uttar Pradesh",
    "Tamil Nadu",
    "Gujarat",
    "Rajasthan",
    "West Bengal",
  ];
  const months = [
    "October 2025",
    "November 2025",
    "December 2025",
    "January 2026",
  ];

  // Filter camps based on selected criteria
  const filteredCamps = upcomingCamps.filter((camp) => {
    const matchesState = !selectedState || camp.state === selectedState;
    const matchesMonth =
      !selectedMonth ||
      camp.date.includes(selectedMonth.split(" ")[1]) ||
      camp.date.includes(selectedMonth.split(" ")[0].toLowerCase());
    return matchesState && matchesMonth;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800 border-green-200";
      case "Nearly Full":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Full":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
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
                  <span className="text-2xl">🏕️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">
                    Blood Donation Camps
                  </h1>
                  <p className="text-sm text-gray-600">
                    National Blood Transfusion Service Portal
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <BackButton
                text="Back to Home"
                customPath="/"
                className="bg-blue-600 hover:bg-blue-700 text-black"
              />
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
                <h3 className="text-lg font-bold text-orange-800 uppercase tracking-wide">
                  Official Blood Donation Camps
                </h3>
                <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                  VERIFIED
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Government approved</strong> blood donation camps listed
                below. All camps follow national safety guidelines and are
                supervised by qualified medical professionals.
                <span className="text-blue-700 font-semibold">
                  Join community service and save lives.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Government Search Filters */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-t-4 border-blue-600">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
              <span className="text-xl">🔍</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-900">
                Search Government Verified Camps
              </h2>
              <p className="text-sm text-gray-600">
                Find authorized blood donation camps across India
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📍 Select State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📅 Select Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">All Months</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Official Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t-2 border-gray-200">
            <div className="text-center bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">
                {filteredCamps.length}
              </div>
              <div className="text-sm text-gray-700 font-medium">
                Camps Found
              </div>
            </div>
            <div className="text-center bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {filteredCamps.filter((c) => c.status === "Open").length}
              </div>
              <div className="text-sm text-gray-700 font-medium">
                Open Registration
              </div>
            </div>
            <div className="text-center bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">
                {filteredCamps.reduce((sum, camp) => sum + camp.target, 0)}
              </div>
              <div className="text-sm text-gray-700 font-medium">
                Target Donors
              </div>
            </div>
            <div className="text-center bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-700">
                {filteredCamps.reduce((sum, camp) => sum + camp.registered, 0)}
              </div>
              <div className="text-sm text-gray-700 font-medium">
                Already Registered
              </div>
            </div>
          </div>
        </div>

        {/* Government Camp Organization */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mb-12 border-l-8 border-green-600 shadow-lg">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-600 text-white p-4 rounded-full">
                <span className="text-2xl">🏥</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Organize Government Approved Blood Camp
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Apply to organize blood donation camps in your organization,
              college, or community under government supervision. Complete
              support provided including medical equipment, trained staff, and
              official certification.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors duration-200">
              📋 Apply for Camp Organization
            </button>
          </div>
        </div>

        {/* Camps List */}
        <div className="space-y-6">
          {filteredCamps.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Camps Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new camps.
              </p>
              <Link
                to="/contact"
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Request New Camp
              </Link>
            </div>
          ) : (
            filteredCamps.map((camp) => (
              <div
                key={camp.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-8 border-l-8 border-blue-600"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 lg:pr-8">
                    {/* Government Verified Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-bold text-blue-900 mr-3">
                            {camp.name}
                          </h3>
                          <div className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">
                            GOVT VERIFIED
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">
                          <span className="font-semibold">Organized by:</span>{" "}
                          {camp.organizer}
                        </p>
                        <div
                          className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getStatusColor(
                            camp.status
                          )}`}
                        >
                          {camp.status}
                        </div>
                      </div>
                    </div>

                    {/* Official Event Details */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                          📋 Event Details
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                            <span className="text-gray-700 font-medium">
                              📅{" "}
                              {new Date(camp.date).toLocaleDateString("en-IN", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                            <span className="text-gray-700 font-medium">
                              🕒 {camp.time}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-orange-600 rounded-full mr-3"></div>
                            <span className="text-gray-700 font-medium">
                              📍 {camp.venue}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                          📞 Official Contact
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="text-gray-700 font-medium">
                            👨‍⚕️ {camp.contactPerson}
                          </div>
                          <div className="text-gray-700 font-medium">
                            📞 {camp.phone}
                          </div>
                          <div className="text-gray-700 font-medium">
                            ✉️ {camp.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Registration Progress */}
                    <div className="mb-6 bg-white border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-gray-800">
                          📊 Registration Status
                        </span>
                        <span className="text-sm text-gray-700 font-semibold bg-gray-100 px-3 py-1 rounded">
                          {camp.registered} / {camp.target} donors
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 border">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (camp.registered / camp.target) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Government Approved Facilities */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                        ✅ Approved Facilities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {camp.facilities.map((facility, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Official Actions */}
                  <div className="flex flex-col space-y-3 lg:ml-6 mt-6 lg:mt-0 lg:min-w-[200px]">
                    {camp.status === "Open" && (
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                        📝 Register Now
                      </button>
                    )}
                    {camp.status === "Nearly Full" && (
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                        ⏳ Join Waiting List
                      </button>
                    )}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                      🗺️ Get Directions
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                      📱 Share Camp
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Government Benefits Information */}
        <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg text-white p-12 shadow-xl border-l-8 border-blue-700">
          <h2 className="text-3xl font-extrabold text-center mb-12 flex items-center justify-center tracking-wide drop-shadow-md">
            🏛️ Benefits of Government Blood Donation Camps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="text-center bg-white/15 hover:bg-white/25 transition-all duration-300 p-8 rounded-xl shadow-md">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-3 text-white drop-shadow-sm">
                Government Medical Standards
              </h3>
              <p className="text-blue-50 leading-relaxed">
                Qualified medical professionals ensure safe donation with
                government-approved screening protocols and equipment.
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center bg-white/15 hover:bg-white/25 transition-all duration-300 p-8 rounded-xl shadow-md">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-3 text-white drop-shadow-sm">
                Official Benefits
              </h3>
              <p className="text-blue-50 leading-relaxed">
                Free health checkups, refreshments, government certificates, and
                donor recognition by health authorities.
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center bg-white/15 hover:bg-white/25 transition-all duration-300 p-8 rounded-xl shadow-md">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-white drop-shadow-sm">
                National Service
              </h3>
              <p className="text-blue-50 leading-relaxed">
                Contribute to national blood reserves and serve the nation by
                helping patients in emergency situations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camps;

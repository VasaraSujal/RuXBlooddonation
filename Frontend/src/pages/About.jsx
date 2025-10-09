import React from 'react';
import { Link } from 'react-router-dom';
// import BackButton from '../components/BackButton.jsx';
import { useLanguage } from '../utils/LanguageContext';
import { getTranslation } from '../utils/languages';

const About = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(key, currentLanguage);

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
                  <span className="text-2xl">ℹ️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">About BloodConnect+</h1>
                  <p className="text-sm text-gray-600">National Blood Transfusion Service Portal</p>
                </div>
              </div>
            </div>
            
            {/* <div className="flex items-center space-x-4">
              <BackButton text={t('backToHomepage')} customPath="/" className="bg-blue-600 hover:bg-blue-700 text-white" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Official Notice */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-8 border-orange-500 rounded-lg p-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-500 text-white p-3 rounded-full">
              <span className="text-xl">📋</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-bold text-orange-800 uppercase tracking-wide">Government Blood Donation Initiative</h3>
                <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">OFFICIAL</div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>BloodConnect+</strong> is a government initiative to create a smart, connected network for blood donation across India. 
                <span className="text-blue-700 font-semibold">Authorized by Ministry of Health & Family Welfare.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Government Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-8 border-blue-600">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 text-white p-4 rounded-lg mr-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-900">{t('ourMission')}</h2>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                {t('missionDescription')}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-l-8 border-green-600">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-600 text-white p-4 rounded-lg mr-3">
                <span className="text-2xl">👁️</span>
              </div>
              <h2 className="text-2xl font-bold text-green-900">{t('ourVision')}</h2>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                {t('visionDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Government Key Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="bg-blue-600 text-white p-4 rounded-lg inline-flex items-center mb-4">
              <span className="text-2xl mr-3">🏛️</span>
              <h2 className="text-2xl font-bold">{t('whyChooseBloodConnect')}</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-blue-600">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-200">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-4">{t('aiPoweredMatching')}</h3>
              <p className="text-gray-700 font-medium">Government-approved algorithms for accurate blood type matching and location-based donor identification</p>
            </div>

            <div className="text-center bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-green-600">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-200">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-green-900 mb-4">{t('realTimeResponse')}</h3>
              <p className="text-gray-700 font-medium">24/7 emergency response system connecting nationwide donor network instantly</p>
            </div>

            <div className="text-center bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-orange-600">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-orange-200">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-bold text-orange-900 mb-4">{t('gamifiedExperience')}</h3>
              <p className="text-gray-700 font-medium">Official recognition and certificates for community service and life-saving contributions</p>
            </div>
          </div>
        </div>

        {/* Government Impact Statistics */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg text-white p-12 mb-16 shadow-lg">
          <div className="text-center mb-12">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg inline-flex items-center">
              <span className="text-2xl mr-3">📊</span>
              <h2 className="text-2xl font-bold">{t('ourImpact')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-200 mb-2">50,000+</div>
              <div className="text-blue-100 font-semibold">{t('livesSaved')}</div>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-200 mb-2">2,50,000+</div>
              <div className="text-blue-100 font-semibold">{t('registeredDonors')}</div>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-200 mb-2">1,500+</div>
              <div className="text-blue-100 font-semibold">{t('partnerHospitals')}</div>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-200 mb-2">28 States</div>
              <div className="text-blue-100 font-semibold">{t('panIndiaPresence')}</div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Built with Modern Technology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-3">⚛️</div>
              <h4 className="font-semibold text-gray-800">React 19</h4>
              <p className="text-sm text-gray-600">Modern UI Framework</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-3">🤖</div>
              <h4 className="font-semibold text-gray-800">AI Matching</h4>
              <p className="text-sm text-gray-600">Smart Algorithms</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-3">📱</div>
              <h4 className="font-semibold text-gray-800">PWA Ready</h4>
              <p className="text-sm text-gray-600">Mobile First Design</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-3">🔒</div>
              <h4 className="font-semibold text-gray-800">Secure</h4>
              <p className="text-sm text-gray-600">Data Protection</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-red-400 to-red-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold">
                BC
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">BloodConnect+ Team</h3>
              <p className="text-gray-600 mb-4">Founder & CEO</p>
              <p className="text-sm text-gray-500">
                Passionate about using technology to save lives and make blood donation accessible to everyone.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold">
                AI
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI Development Team</h3>
              <p className="text-gray-600 mb-4">Technical Lead</p>
              <p className="text-sm text-gray-500">
                Building intelligent systems for blood type matching and emergency response optimization.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-green-400 to-green-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold">
                MH
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Medical Advisory</h3>
              <p className="text-gray-600 mb-4">Healthcare Consultant</p>
              <p className="text-sm text-gray-500">
                Ensuring medical accuracy and safety standards in all our blood donation processes.
              </p>
            </div>
          </div>
        </div>

        {/* Government Call to Action */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-12 text-center border-l-8 border-green-600 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600 text-white p-4 rounded-lg">
              <span className="text-2xl">🇮🇳</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Join National Blood Donation Mission</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
            Every donation serves the nation. Every donor is a life-saver. Join thousands of citizens across India 
            in this noble cause and contribute to national health security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/donate-now" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors duration-200 flex items-center justify-center"
            >
              🩸 Become a Donor
            </Link>
            <Link 
              to="/need-blood" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors duration-200 flex items-center justify-center"
            >
              🏥 Request Blood
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
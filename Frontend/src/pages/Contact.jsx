import { useState } from 'react';
import BackButton from '../components/BackButton.jsx';
import { useLanguage } from '../utils/LanguageContext';
import { getTranslation } from '../utils/languages';
import { useNavigate } from 'react-router-dom';


const Contact = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(key, currentLanguage);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      type: 'Emergency Helpline',
      value: '104',
      description: '24x7 Blood Emergency Support',
      icon: '🚨',
      color: 'red',
      action: 'Call Now'
    },
    {
      type: 'Customer Support',
      value: '+91-11-4567-8900',
      description: 'General queries and support',
      icon: '📞',
      color: 'blue',
      action: 'Call'
    },
    {
      type: 'Email Support',
      value: 'support@bloodconnectplus.com',
      description: 'For detailed queries and feedback',
      icon: '📧',
      color: 'green',
      action: 'Email'
    },
    {
      type: 'WhatsApp Support',
      value: '+91-98765-43210',
      description: 'Quick assistance via WhatsApp',
      icon: '💬',
      color: 'emerald',
      action: 'Message'
    }
  ];

  const officeLocations = [
    {
      city: 'New Delhi',
      address: 'BloodConnect+ HQ, Connaught Place, New Delhi - 110001',
      phone: '+91-11-4567-8900',
      email: 'delhi@bloodconnectplus.com',
      timings: 'Mon-Sat: 9:00 AM - 6:00 PM'
    },
    {
      city: 'Mumbai',
      address: 'Western Regional Office, Bandra Kurla Complex, Mumbai - 400051',
      phone: '+91-22-6789-0123',
      email: 'mumbai@bloodconnectplus.com',
      timings: 'Mon-Sat: 9:30 AM - 6:30 PM'
    },
    {
      city: 'Bangalore',
      address: 'Southern Regional Office, Electronic City, Bangalore - 560100',
      phone: '+91-80-4567-8901',
      email: 'bangalore@bloodconnectplus.com',
      timings: 'Mon-Sat: 9:00 AM - 6:00 PM'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can I get blood in an emergency?',
      answer: 'Our emergency response system can connect you with available blood sources within 2-3 minutes. Use the Panic Mode for critical situations.'
    },
    {
      question: 'Is it safe to donate blood during COVID-19?',
      answer: 'Yes, blood donation is safe when proper protocols are followed. All our partner centers follow strict sanitization and safety guidelines.'
    },
    {
      question: 'How often can I donate blood?',
      answer: 'You can donate whole blood every 56 days, plasma every 28 days, and platelets every 7 days. Our system tracks this automatically.'
    },
    {
      question: 'Can I choose which hospital receives my blood?',
      answer: 'While we try to accommodate preferences, emergency needs take priority. You can express preferences during registration.'
    },
    {
      question: 'Do you provide transportation for blood donation?',
      answer: 'We partner with various organizations to provide transportation assistance. Contact our support team for availability in your area.'
    }
  ];

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
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">{t('contactUs')}</h1>
                  <p className="text-sm text-gray-600">National Blood Service Support Center</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <BackButton text={t('backToHomepage')} customPath="/" className="bg-blue-600 hover:bg-blue-700 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Official Notice */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-8 border-orange-500 rounded-lg p-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-500 text-white p-3 rounded-full">
              <span className="text-xl">📞</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-bold text-orange-800 uppercase tracking-wide">Government Support Services</h3>
                <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">24x7 AVAILABLE</div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Official support</strong> for blood donation queries, emergency blood requirements, and technical assistance.
                <span className="text-blue-700 font-semibold">Multilingual support available in Hindi and English.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Government Emergency Contact Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8 mb-12 text-center shadow-lg border-l-8 border-red-800">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-full mr-4">
              <span className="text-3xl animate-pulse">🚨</span>
            </div>
            <h2 className="text-2xl font-bold">{t('emergencyBloodRequired')}</h2>
          </div>
          <p className="text-lg text-red-100 mb-6 font-medium">
            National Emergency Blood Service - Immediate assistance for critical blood requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1075"
              className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors duration-200 flex items-center justify-center"
            >
              📞 Call 1075 (National Helpline)
            </a>
            <button
              onClick={() => navigate("/panic-mode")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors duration-200 flex items-center justify-center"
            >
              🚨 Emergency Alert System
            </button>

          </div>
        </div>

        {/* Government Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-200 border-l-8 border-${method.color}-600`}>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-3xl">{method.icon}</div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{method.type}</h3>
              <p className={`text-xl font-bold text-${method.color}-700 mb-2`}>{method.value}</p>
              <p className="text-gray-600 text-sm mb-4 font-medium">{method.description}</p>
              <button className={`bg-${method.color}-600 hover:bg-${method.color}-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200`}>
                {method.action}
              </button>
            </div>
          ))}
        </div>

        {/* Contact Form and Office Locations */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Government Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-600 text-white p-3 rounded-lg mr-3">
                <span className="text-xl">📝</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-900">{t('sendUsMessage')}</h2>
            </div>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 text-center">
                <div className="flex items-center justify-center">
                  <span className="text-2xl mr-2">✅</span>
                  <span className="font-semibold">{t('messageSentSuccessfully')}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('fullName')} *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('phoneNumber')} *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="+91-98765-43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('emailAddress')} *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="donation">Blood Donation</option>
                    <option value="request">Blood Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="normal">Normal - Standard response</option>
                    <option value="high">High - Priority response</option>
                    <option value="urgent">Urgent - Emergency (call instead)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Please provide details about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg shadow-md transition-colors duration-200 flex items-center justify-center"
              >
                📨 {t('sendMessage')}
              </button>
            </form>
          </div>

          {/* Office Locations */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('ourOffices')}</h2>

            <div className="space-y-8">
              {officeLocations.map((office, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-xl font-bold text-teal-600 mb-4">{office.city} Office</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">📍</span>
                      <span className="text-gray-700">{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-3">📞</span>
                      <a href={`tel:${office.phone}`} className="text-teal-600 hover:text-teal-700 font-semibold">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-3">✉️</span>
                      <a href={`mailto:${office.email}`} className="text-teal-600 hover:text-teal-700 font-semibold">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-3">🕒</span>
                      <span className="text-gray-700">{office.timings}</span>
                    </div>
                  </div>
                  <button className="mt-4 bg-teal-100 hover:bg-teal-200 text-teal-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    Get Directions
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('frequentlyAskedQuestions')}</h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-11">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media and Additional Links */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('connectWithUs')}</h2>
          <p className="text-xl text-teal-100 mb-8">
            Follow us on social media for updates, success stories, and blood donation drives in your area
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <a href="#" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
              <div className="text-2xl mb-2">📘</div>
              <div className="font-semibold">Facebook</div>
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
              <div className="text-2xl mb-2">🐦</div>
              <div className="font-semibold">Twitter</div>
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
              <div className="text-2xl mb-2">📷</div>
              <div className="font-semibold">Instagram</div>
            </a>
            <a href="#" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
              <div className="text-2xl mb-2">💼</div>
              <div className="font-semibold">LinkedIn</div>
            </a>
          </div>

          <div className="text-teal-100">
            <p className="mb-2">📧 Newsletter: Subscribe for weekly updates</p>
            <p>📱 Download our mobile app for instant notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
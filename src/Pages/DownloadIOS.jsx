import React, { useState } from 'react';
import { ChevronDown, Smartphone, Shield, MapPin, MessageSquare, BarChart3, Bell } from 'lucide-react';
import DownloadPageQRCode from '../components/DownloadPageQRCode';

const DownloadIOS = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Is the Civix app free to use on iOS?",
      answer: "Yes, Civix is completely free for all iPhone users as well."
    },
    {
      question: "When will it be available on the App Store?",
      answer: "We are preparing for release and expect to launch on the App Store very soon."
    },
    {
      question: "Will it work on all iPhones?",
      answer: "Civix supports iOS 13 and above, covering all modern iPhones."
    },
    {
      question: "Does it support iPads?",
      answer: "Yes, Civix will run on both iPhones and iPads for your convenience."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. Civix for iOS follows strict Apple security and privacy standards."
    }
  ];

  const features = [
    { 
      title: "Instant Civic Alerts", 
      subtitle: "Real-time updates for local policies, disruptions, and public services.",
      icon: Bell
    },
    { 
      title: "Location-Specific Info", 
      subtitle: "Civic updates curated for your area using Apple location services.",
      icon: MapPin
    },
    { 
      title: "Report Issues", 
      subtitle: "Easily submit issues to authorities directly from your iOS device.",
      icon: MessageSquare
    },
    { 
      title: "Community Insights", 
      subtitle: "Vote in polls, complete surveys, and view local statistics.",
      icon: BarChart3
    },
    { 
      title: "Privacy First", 
      subtitle: "Your iCloud data and preferences are safe and private.",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="relative overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-700 dark:from-white dark:via-green-300 dark:to-emerald-300 bg-clip-text text-transparent mb-6">
              Civix for iOS
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empower your civic voice with Civix on iPhone and iPad. Stay connected to your community like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl font-semibold text-lg cursor-not-allowed overflow-hidden"
                disabled
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 opacity-50"></div>
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Coming Soon on App Store
                </span>
              </button>
              
              <button className="group px-8 py-4 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Get Notified
                </span>
              </button>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm font-medium">
              <Smartphone className="w-4 h-4" />
              Launching soon on the Apple App Store
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Smart Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover powerful tools designed to enhance your civic engagement and community connection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={i} 
                  className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to know about Civix for iOS.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openFAQ === index && (
                  <div className="px-8 pb-6 pt-0">
                    <div className="h-px bg-gray-200 dark:bg-gray-600 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get Civix on Your iPhone
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Scan the QR code below with your iPhone camera to be redirected to the App Store when Civix launches.
            </p>
          </div>
          
          <DownloadPageQRCode 
            title="Civix for iOS"
            subtitle="Coming Soon to App Store"
            size="large"
          />
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Be First to Download Civix on iOS
          </h2>
          
          <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Sign up and get notified the moment Civix is available on the App Store. Join thousands already waiting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-white text-green-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <span className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notify Me
              </span>
            </button>
            
            <button className="group px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 dark:border-gray-600 dark:hover:bg-gray-700 rounded-2xl font-semibold text-lg transition-all duration-300">
              <span className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Explore Features
              </span>
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default DownloadIOS;
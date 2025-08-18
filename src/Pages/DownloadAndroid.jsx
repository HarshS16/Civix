import React, { useState } from 'react';
import { ChevronDown, Smartphone, Shield, MapPin, MessageSquare, BarChart3, Bell, Users, Star, Globe } from 'lucide-react';
import DownloadPageQRCode from '../components/DownloadPageQRCode';

const DownloadAndroid = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Is the Civix app free to use?",
      answer: "Yes, Civix is completely free for all users. We believe civic engagement should be accessible to everyone."
    },
    {
      question: "Is this available on the Play Store?",
      answer: "Currently, the app is under development. Play Store release is coming very soon - stay tuned for updates!"
    },
    {
      question: "Will it work on all Android devices?",
      answer: "Yes, Civix is compatible with most Android devices running version 8.0 and above, covering 95% of active Android devices."
    },
    {
      question: "How does location-based services work?",
      answer: "Our app uses your location to show relevant local civic information, nearby events, and connect you with your local representatives."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use end-to-end encryption and follow strict privacy protocols. Your personal data is never shared with third parties."
    }
  ];

  const features = [
    { 
      title: "Live Civic Updates", 
      subtitle: "Stay notified of local events, alerts, and policy changes in real-time.",
      icon: Bell
    },
    { 
      title: "Location-Based Services", 
      subtitle: "Get accurate civic info tailored to your neighborhood or region.",
      icon: MapPin
    },
    { 
      title: "Raise Issues to Authorities", 
      subtitle: "Report public problems directly to local officials through the app.",
      icon: MessageSquare
    },
    { 
      title: "Polls & Surveys", 
      subtitle: "Participate in shaping civic decisions via community surveys.",
      icon: BarChart3
    },
    { 
      title: "Secure & Private", 
      subtitle: "Your data is protected with industry-leading security measures.",
      icon: Shield
    }
  ];

  const stats = [
    { number: "50K+", label: "Beta Users", icon: Users },
    { number: "4.8★", label: "App Rating", icon: Star },
    { number: "100+", label: "Cities Covered", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="relative overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
           
            
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-700 dark:from-white dark:via-green-300 dark:to-emerald-300 bg-clip-text text-transparent mb-6">
              Civix for Android
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform how you engage with your community. Stay informed, stay empowered with the power of Android.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl font-semibold text-lg cursor-not-allowed overflow-hidden"
                disabled
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 opacity-50"></div>
                <span className="relative flex items-center gap-2">
                  
                  Coming Soon
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
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Currently under development
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg text-center border border-gray-100 dark:border-gray-700"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover advanced tools designed to revolutionize your civic engagement and community connection.
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
              Everything you need to know about Civix for Android.
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
              Get Civix on Your Android Device
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Scan the QR code below with your Android camera to be redirected to Google Play when Civix launches.
            </p>
          </div>
          
          <DownloadPageQRCode 
            title="Civix for Android"
            subtitle="Coming Soon to Google Play"
            size="large"
          />
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Civic Engagement?
          </h2>
          
          <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands already making their voices heard. Be the first to know when Civix launches on Android.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-white text-green-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <span className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notify Me on Launch
              </span>
            </button>
            
            <button className="group px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 dark:border-gray-600 dark:hover:bg-gray-700 rounded-2xl font-semibold text-lg transition-all duration-300">
              <span className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Learn More
              </span>
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default DownloadAndroid;
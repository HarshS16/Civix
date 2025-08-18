import { useState } from 'react';
import { Shield, Eye, Lock, Users, FileText, ChevronDown, ChevronUp } from 'lucide-react';

function Privacy() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'collection',
      icon: <Eye className="w-6 h-6" />,
      title: 'Information Collection',
      preview: 'We collect information you provide directly...',
      content: 'We collect information you provide directly, such as when you report issues or contact support. We may also collect location data to better route civic complaints to the appropriate local authorities and ensure your reports reach the right departments efficiently.'
    },
    {
      id: 'usage',
      icon: <FileText className="w-6 h-6" />,
      title: 'Use of Information',
      preview: 'Your data helps us improve our service...',
      content: 'The collected information is used to improve our service quality, route reports to appropriate authorities, provide users with real-time updates and support, and analyze trends to better serve your community\'s needs.'
    },
    {
      id: 'security',
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      preview: 'We implement robust security measures...',
      content: 'We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your data. However, no method of transmission over the internet is 100% secure, and we continuously work to enhance our security protocols.'
    },
    {
      id: 'third-party',
      icon: <Users className="w-6 h-6" />,
      title: 'Third-Party Services',
      preview: 'Your privacy is our priority...',
      content: 'We do not sell your information to third parties. However, we may share necessary data with trusted government partners and verified service providers to ensure our civic services function effectively and your reports reach the appropriate authorities.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-950">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 dark:from-emerald-400/5 dark:to-blue-400/5"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-8 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 py-2">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy outlines how <span className="font-semibold text-emerald-600 dark:text-emerald-400">Civix</span> collects, uses, and protects your information when you use our services.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="space-y-6 mb-12">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white shadow-md">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {section.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {section.preview}
                    </p>
                  </div>
                </div>
                <div className="text-emerald-500 transform transition-transform duration-200">
                  {expandedSection === section.id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                expandedSection === section.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-6 border-l-4 border-emerald-500">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">Changes to This Policy</h3>
              <p className="text-emerald-50 leading-relaxed mb-4">
                We may update this policy periodically to reflect changes in our practices or for legal compliance. 
                Continued use of our services constitutes your agreement to these changes.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-medium">Last updated: August 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Questions about our privacy policy?</span>
            <a
              href="/contact"
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
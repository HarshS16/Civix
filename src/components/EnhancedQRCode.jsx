import React from 'react';
import favvIcon from '../favv.svg';
import './EnhancedQRCode.css';

const EnhancedQRCode = () => {
  return (
    <div className="enhanced-qr-container relative w-full max-w-sm">
      {/* QR Card */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white via-slate-50 to-gray-100 dark:from-[#1f2937] dark:via-[#111827] dark:to-[#0f172a] border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:border-emerald-300 dark:hover:border-emerald-500 p-8 backdrop-blur-sm">
        
        {/* QR Code Container with Icon Overlay */}
        <div className="relative qr-code-shimmer">
          {/* QR Code Background with Enhanced Styling */}
          <div className="relative bg-white dark:bg-gray-50 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-300">
            <img
              src="/downloadCivixQrCode.png"
              alt="Download Civix App QR Code"
              className="qr-code-enhanced w-48 h-48 object-contain"
              loading="lazy"
            />
            
            {/* App Icon Overlay in Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="app-icon-container rounded-2xl p-2 shadow-xl backdrop-blur-sm">
                <div className="app-icon-bg w-12 h-12 flex items-center justify-center rounded-xl shadow-lg">
                  <img 
                    src={favvIcon} 
                    alt="Civix App Icon" 
                    className="w-8 h-8 object-contain filter brightness-110"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Gradient Border Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300 -m-1 -z-10"></div>
        </div>
        
        {/* Enhanced Text */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-lg font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 dark:from-emerald-400 dark:via-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
            Civix App on Mobile
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Scan to Download
          </p>
        </div>
        
        
      </div>

      {/* Enhanced Floating Icon */}
      <div className="floating-icon-glow absolute -bottom-6 -left-6 h-20 w-20 rounded-2xl border-4 border-white dark:border-gray-800 bg-gradient-to-br from-white via-slate-50 to-gray-100 dark:from-[#1f2937] dark:via-[#111827] dark:to-[#0f172a] p-3 shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 group">
        <div className="flex items-center justify-center h-full w-full rounded-xl bg-gradient-to-br from-emerald-100 via-green-100 to-emerald-200 dark:from-emerald-900 dark:via-green-900 dark:to-emerald-800 group-hover:from-emerald-200 group-hover:via-green-200 group-hover:to-emerald-300 dark:group-hover:from-emerald-800 dark:group-hover:via-green-800 dark:group-hover:to-emerald-700 transition-all duration-300">
          <img 
            src={favvIcon} 
            alt="Civix Icon" 
            className="w-10 h-10 object-contain filter brightness-110 group-hover:scale-110 transition-transform duration-300" 
          />
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md -z-10"></div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-dot absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-70 animate-pulse"></div>
      <div className="decorative-dot absolute top-4 -left-2 w-4 h-4 rounded-full opacity-50 animate-pulse delay-1000"></div>
      <div className="decorative-dot absolute -bottom-2 right-4 w-5 h-5 rounded-full opacity-60 animate-pulse delay-500"></div>
    </div>
  );
};

export default EnhancedQRCode;

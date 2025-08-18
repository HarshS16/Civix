import React from 'react';
import favvIcon from '../favv.svg';
import './EnhancedQRCode.css';

const DownloadPageQRCode = ({ 
  title = "Civix App on Mobile", 
  subtitle = "Scan to Download",
  size = "large" // small, medium, large
}) => {
  const sizeClasses = {
    small: "w-32 h-32",
    medium: "w-40 h-40", 
    large: "w-48 h-48"
  };

  const containerSizes = {
    small: "max-w-xs",
    medium: "max-w-sm",
    large: "max-w-md"
  };

  const iconSizes = {
    small: "w-8 h-8",
    medium: "w-10 h-10",
    large: "w-12 h-12"
  };

  const iconInnerSizes = {
    small: "w-5 h-5",
    medium: "w-6 h-6", 
    large: "w-8 h-8"
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`enhanced-qr-container relative w-full ${containerSizes[size]} mx-auto`}>
        {/* QR Card */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white via-slate-50 to-gray-100 dark:from-[#1f2937] dark:via-[#111827] dark:to-[#0f172a] border-2 border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:border-emerald-300 dark:hover:border-emerald-500 p-8 backdrop-blur-sm">
          
          {/* QR Code Container with Icon Overlay */}
          <div className="relative qr-code-shimmer">
            {/* QR Code Background with Enhanced Styling */}
            <div className="relative bg-white dark:bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-300">
              <img
                src="/downloadCivixQrCode.png"
                alt="Download Civix App QR Code"
                className={`qr-code-enhanced ${sizeClasses[size]} object-contain`}
                loading="lazy"
              />
              
              {/* App Icon Overlay in Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="app-icon-container rounded-2xl p-4 shadow-xl backdrop-blur-sm">
                  <div className={`app-icon-bg ${iconSizes[size]} flex items-center justify-center rounded-xl shadow-lg`}>
                    <img 
                      src={favvIcon} 
                      alt="Civix App Icon" 
                      className={`${iconInnerSizes[size]} object-contain filter brightness-110`}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gradient Border Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300 -m-1 -z-10"></div>
          </div>
          
          {/* Enhanced Text */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 dark:from-emerald-400 dark:via-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
              {title}
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
              {subtitle}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 01-2 2H3.055A5.02 5.02 0 003 13c0-.334.018-.667.055-1z"/>
                <path d="M19 10a4 4 0 01-4 4h-1a2 2 0 00-2 2v1a2 2 0 002 2h2a2 2 0 002-2v-7z"/>
                <path d="M19 3H3a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1z"/>
              </svg>
              Works on all devices
            </div>
          </div>
          
          {/* Download Badges */}
          <div className="flex gap-4 mt-6">
            <div className="download-badge text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              iOS App Store
            </div>
            <div className="download-badge android text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.3414c-.5665 0-.9726-.4061-.9726-.9726v-1.7952c0-.566.4061-.9726.9726-.9726s.9726.4066.9726.9726v1.7952c0 .5665-.4061.9726-.9726.9726zm-5.2307 0c-.5665 0-.9726-.4061-.9726-.9726v-1.7952c0-.566.4061-.9726.9726-.9726s.9726.4066.9726.9726v1.7952c0 .5665-.4061.9726-.9726.9726zm-5.2307 0c-.5665 0-.9726-.4061-.9726-.9726v-1.7952c0-.566.4061-.9726.9726-.9726s.9726.4066.9726.9726v1.7952c0 .5665-.4061.9726-.9726.9726z"/>
              </svg>
              Google Play
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
            <div className="flex items-center gap-3 text-sm text-emerald-700 dark:text-emerald-300">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">
                Use your phone's camera to scan the QR code and download the app instantly
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="decorative-dot absolute -top-3 -right-3 w-8 h-8 rounded-full opacity-70 animate-pulse"></div>
        <div className="decorative-dot absolute top-6 -left-3 w-5 h-5 rounded-full opacity-50 animate-pulse delay-1000"></div>
        <div className="decorative-dot absolute -bottom-3 right-6 w-6 h-6 rounded-full opacity-60 animate-pulse delay-500"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-30 animate-ping delay-200"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-green-400 rounded-full opacity-40 animate-ping delay-700"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-25 animate-ping delay-1200"></div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPageQRCode;

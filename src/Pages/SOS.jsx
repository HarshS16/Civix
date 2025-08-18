import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Shield, AlertTriangle, Heart, Car, Home, Users, ChevronRight, Copy, Check, Zap, Send } from 'lucide-react';

const SOSPage = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [copiedNumber, setCopiedNumber] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setLocationError('');
        },
        (error) => {
          setLocationError('Unable to retrieve location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const emergencyNumbers = [
    { name: 'Police Emergency', number: '100', icon: Shield, color: 'from-blue-500 to-blue-700', description: 'Police assistance and law enforcement' },
    { name: 'Fire Emergency', number: '101', icon: AlertTriangle, color: 'from-red-500 to-red-700', description: 'Fire department and rescue services' },
    { name: 'Medical Emergency', number: '108', icon: Heart, color: 'from-emerald-500 to-emerald-700', description: 'Ambulance and medical emergency' },
    { name: 'Women Helpline', number: '1091', icon: Users, color: 'from-purple-500 to-purple-700', description: '24x7 helpline for women in distress' },
    { name: 'Child Helpline', number: '1098', icon: Users, color: 'from-pink-500 to-pink-700', description: 'Child protection and assistance' },
    { name: 'Disaster Management', number: '108', icon: Car, color: 'from-orange-500 to-orange-700', description: 'Natural disaster and emergency response' }
  ];

  const quickActions = [
    { name: 'Send Location to Emergency Contact', action: () => shareLocation(), icon: Send, color: 'from-indigo-500 to-indigo-700' },
    { name: 'Medical Information', action: () => alert('Show medical info'), icon: Heart, color: 'from-rose-500 to-rose-700' },
    { name: 'Safe Word Alert', action: () => sendSafeWordAlert(), icon: Shield, color: 'from-amber-500 to-amber-700' },
    { name: 'Record Audio', action: () => startRecording(), icon: Zap, color: 'from-violet-500 to-violet-700' }
  ];

  const callEmergencyNumber = (number) => {
  };

  const copyToClipboard = async (number) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(''), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = number;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(''), 2000);
    }
  };

  const shareLocation = () => {
    if (location) {
      const locationText = `Emergency! My current location: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      if (navigator.share) {
        navigator.share({
          title: 'Emergency Location',
          text: locationText,
        });
      } else {
        copyToClipboard(locationText);
        alert('Location copied to clipboard!');
      }
    } else {
      alert('Location not available. Please enable location services.');
    }
  };

  const sendSafeWordAlert = () => {
    alert('Safe word alert would be sent to emergency contacts');
  };

  const startRecording = () => {
    alert('Audio recording feature would be activated');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-rose-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative backdrop-blur-sm">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-md"></div>
                  <div className="relative bg-white/20 p-3 rounded-full border border-white/20">
                    <AlertTriangle className="h-10 w-10" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                    Emergency SOS
                  </h1>
                  <p className="text-red-100 text-lg mt-1">Help is available 24/7 • Stay Safe</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="flex items-center justify-center md:justify-end gap-2 text-red-100 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">Current Time</span>
                </div>
                <div className="text-2xl md:text-3xl font-mono font-bold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-8">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Location</h2>
          </div>
          
          {location ? (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-emerald-800 dark:text-emerald-200 font-semibold mb-1">
                    Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                    Accuracy: ±{Math.round(location.accuracy)} meters
                  </p>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => window.open(`https://maps.google.com/?q=${location.latitude},${location.longitude}`, '_blank')}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  View on Maps
                </button>
                <button
                  onClick={shareLocation}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Share Location
                </button>
              </div>
            </div>
          ) : locationError ? (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-6">
              <p className="text-amber-800 dark:text-amber-200 mb-4 font-medium">{locationError}</p>
              <button
                onClick={getLocation}
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                <p className="text-blue-800 dark:text-blue-200 font-medium">Getting your location...</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 p-3 rounded-full">
              <Phone className="h-6 w-6 text-white" />
            </div>
            Emergency Numbers
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {emergencyNumbers.map((emergency, index) => {
              const Icon = emergency.icon;
              return (
                <div key={index} className="group bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border border-white/40 dark:border-slate-600/40 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-r ${emergency.color} p-3 rounded-full shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{emergency.name}</h3>
                        <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                          {emergency.number}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(emergency.number)}
                        className="p-3 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full transition-all duration-300 group"
                        title="Copy number"
                      >
                        {copiedNumber === emergency.number ? 
                          <Check className="h-5 w-5 text-emerald-600" /> : 
                          <Copy className="h-5 w-5 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300" />
                        }
                      </button>
                      <button
                        onClick={() => callEmergencyNumber(emergency.number)}
                        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
                      >
                        <Phone className="h-4 w-4" />
                        Call Now
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{emergency.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`group bg-gradient-to-r ${action.color} hover:shadow-2xl text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-between relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-4">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-semibold text-lg">{action.name}</span>
                  </div>
                  <ChevronRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Safety Guidelines</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/30">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                Emergency Protocol
              </h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Stay calm and assess the situation carefully</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Call the appropriate emergency number immediately</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide your exact location and situation details</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Follow the emergency operator's instructions precisely</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Stay on the line until professional help arrives</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-800/30">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                Preparedness Tips
              </h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Keep emergency contacts readily accessible</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Share location with trusted family members</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Maintain your phone charge above 20%</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Keep medical information and allergies documented</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Always trust your instincts in potentially dangerous situations</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-red-50 via-rose-50 to-red-50 dark:from-red-900/20 dark:via-rose-900/20 dark:to-red-900/20 border border-red-200/50 dark:border-red-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 text-red-800 dark:text-red-200">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 animate-pulse" />
              </div>
              <p className="text-center font-semibold text-lg">
                If you're in immediate danger, call emergency services right away. This application serves as a helpful tool, but professional emergency response should always be your primary priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSPage;
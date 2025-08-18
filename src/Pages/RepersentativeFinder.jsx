import React, { useState } from "react";
import { Search, MapPin, User, Users, Building, Crown } from "lucide-react";
import officialsData from "../components/RepersentativeFinder.json";

export default function RepresentativeFinder() {
  const [selectedCity, setSelectedCity] = useState("");
  const selectedData = officialsData.find((city) => city.city === selectedCity);

  const InfoCard = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`bg-white/80 backdrop-blur-sm border border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90 dark:bg-gray-800/80 dark:border-gray-700 dark:hover:bg-gray-800/90 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/50 dark:to-emerald-900/50 rounded-xl border border-green-200 dark:border-green-700">
          <Icon className="w-5 h-5 text-green-700 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  );

  const OfficialCard = ({ name, details, party, isMain = false }) => (
    <div className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
      isMain 
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-900/30 dark:to-emerald-900/30 dark:border-green-700' 
        : 'bg-gray-50/50 border-gray-200 hover:bg-white dark:bg-gray-700/50 dark:border-gray-600 dark:hover:bg-gray-700'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isMain ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-600'
        }`}>
          <User className={`w-5 h-5 ${isMain ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white truncate">{name}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            {details && <span>{details}</span>}
            {party && (
              <>
                {details && <span className="text-gray-400 dark:text-gray-500">•</span>}
                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-full text-xs font-medium">
                  {party}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 dark:from-green-800 dark:via-green-900 dark:to-emerald-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-black/20 rounded-full text-green-100 dark:text-green-200 text-sm font-medium mb-6">
              <Building className="w-4 h-4" />
              Civix Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-green-100 dark:from-gray-100 dark:to-green-200 bg-clip-text text-transparent">
              Find Your Representatives
            </h1>
            <p className="text-lg md:text-xl text-green-100 dark:text-green-200 max-w-2xl mx-auto leading-relaxed">
              Discover who represents you in government. Connect with your local officials and stay informed about your civic leadership.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8 pb-16 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 dark:bg-gray-800/90 dark:border-gray-700 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-800/50 dark:to-emerald-800/50 rounded-2xl">
              <Search className="w-6 h-6 text-green-700 dark:text-green-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Select Your City</h2>
              <p className="text-gray-600 dark:text-gray-300">Choose your city to find your representatives</p>
            </div>
          </div>
          
          <select
            className="w-full p-4 border-2 border-green-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-green-400 text-lg transition-all duration-200"
            onChange={(e) => setSelectedCity(e.target.value)}
            value={selectedCity}
          >
            <option value="">Choose your city...</option>
            {officialsData.map((city, idx) => (
              <option key={idx} value={city.city}>
                {city.city}, {city.state}
              </option>
            ))}
          </select>
        </div>

        {selectedData && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 dark:bg-black/20 rounded-2xl">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {selectedData.city}, {selectedData.state}
                  </h2>
                  <p className="text-green-100 dark:text-green-200 text-lg">{selectedData.governing_body}</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <InfoCard icon={Crown} title="Mayor" className="lg:col-span-2">
                <OfficialCard
                  name={selectedData.mayor.name}
                  party={selectedData.mayor.party}
                  isMain={true}
                />
              </InfoCard>

              <InfoCard icon={Building} title="Municipal Commissioner">
                <OfficialCard
                  name={selectedData.municipal_commissioner.name}
                  details={selectedData.municipal_commissioner.cadre}
                  isMain={true}
                />
              </InfoCard>

              <InfoCard icon={Users} title="MLAs (State Representatives)">
                <div className="space-y-3">
                  {selectedData.mlas.map((mla, i) => (
                    <OfficialCard
                      key={i}
                      name={mla.name}
                      details={mla.constituency}
                      party={mla.party}
                    />
                  ))}
                </div>
              </InfoCard>

              <InfoCard icon={Users} title="MPs (National Representatives)" className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedData.mps.map((mp, i) => (
                    <OfficialCard
                      key={i}
                      name={mp.name}
                      details={mp.constituency}
                      party={mp.party}
                    />
                  ))}
                </div>
              </InfoCard>
            </div>

            <div className="bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800 rounded-2xl p-6 text-center">
              <p className="text-green-800 dark:text-green-300 font-medium">
                Stay engaged with your representatives and participate in local governance
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm mt-2">
                Data updated regularly • Part of the Civix platform
              </p>
            </div>
          </div>
        )}

        {!selectedData && selectedCity === "" && (
          <div className="text-center py-16">
            <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-full inline-block mb-6">
              <Search className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ready to Connect?</h3>
            <p className="text-gray-600 dark:text-gray-300">Select your city above to discover your representatives</p>
          </div>
        )}
      </div>
    </div>
  );
}
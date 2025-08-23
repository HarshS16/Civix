import React, { useState } from 'react';

const AdvancedSearch = ({ onSearch, searchParams, setSearchParams, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearFilters = () => {
    setSearchParams({});
    onClearFilters();
  };

  const getTimeRange = (time) => {
    if (!time) return '';
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 24) return 'evening';
    return 'night';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Advanced Search
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Find your perfect train journey
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="font-medium">{isExpanded ? 'Hide' : 'Show'} Filters</span>
          <svg 
            className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Basic Search with modern design */}
      <div className="mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search train name, number, or station..."
            value={searchParams.searchTerm || ''}
            onChange={(e) => handleInputChange('searchTerm', e.target.value)}
            className="w-full pl-16 pr-6 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-500"
          />
        </div>
      </div>

      {/* Advanced Filters with modern design */}
      {isExpanded && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Train Number/Name */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Train Number/Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., 12345 or Rajdhani"
                  value={searchParams.trainNumber || ''}
                  onChange={(e) => handleInputChange('trainNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm">🚄</span>
                </div>
              </div>
            </div>
            
            {/* Source Station */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                From Station
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Source station"
                  value={searchParams.source || ''}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm">📍</span>
                </div>
              </div>
            </div>
            
            {/* Destination Station */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                To Station
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Destination station"
                  value={searchParams.destination || ''}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm">🎯</span>
                </div>
              </div>
            </div>
            
            {/* Departure Time Range */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Departure Time
              </label>
              <div className="relative">
                <select
                  value={searchParams.departureTime || ''}
                  onChange={(e) => handleInputChange('departureTime', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 appearance-none"
                >
                  <option value="">Any Time</option>
                  <option value="morning">🌅 Morning (6 AM - 12 PM)</option>
                  <option value="afternoon">☀️ Afternoon (12 PM - 6 PM)</option>
                  <option value="evening">🌆 Evening (6 PM - 12 AM)</option>
                  <option value="night">🌙 Night (12 AM - 6 AM)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Arrival Time Range */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Arrival Time
              </label>
              <div className="relative">
                <select
                  value={searchParams.arrivalTime || ''}
                  onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 appearance-none"
                >
                  <option value="">Any Time</option>
                  <option value="morning">🌅 Morning (6 AM - 12 PM)</option>
                  <option value="afternoon">☀️ Afternoon (12 PM - 6 PM)</option>
                  <option value="evening">🌆 Evening (6 PM - 12 AM)</option>
                  <option value="night">🌙 Night (12 AM - 6 AM)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Distance Range */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Distance Range (km)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Min"
                    value={searchParams.minDistance || ''}
                    onChange={(e) => handleInputChange('minDistance', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">📏</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Max"
                    value={searchParams.maxDistance || ''}
                    onChange={(e) => handleInputChange('maxDistance', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">📏</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Filters with modern design */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Filters</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'express', label: 'Express Trains', icon: '🚄', color: 'from-blue-500 to-blue-600' },
                { key: 'local', label: 'Local Trains', icon: '🚆', color: 'from-green-500 to-green-600' },
                { key: 'superfast', label: 'Superfast', icon: '⚡', color: 'from-purple-500 to-purple-600' },
                { key: 'passenger', label: 'Passenger', icon: '🚂', color: 'from-orange-500 to-orange-600' }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => handleInputChange('trainType', searchParams.trainType === filter.key ? '' : filter.key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    searchParams.trainType === filter.key
                      ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <span className="mr-2">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons with modern design */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleClearFilters}
          className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
        >
          <span className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Clear Filters</span>
          </span>
        </button>
        
        <button
          onClick={onSearch}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
        >
          <span className="flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search Trains</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;

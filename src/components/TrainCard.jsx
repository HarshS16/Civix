import React from 'react';

const TrainCard = ({ train, index }) => {
  const getTimeRange = (time) => {
    if (!time || time === '00:00:00') return '';
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 24) return 'evening';
    return 'night';
  };

  const getTrainType = (trainName) => {
    const name = trainName?.toLowerCase() || '';
    if (name.includes('express')) return 'express';
    if (name.includes('local')) return 'local';
    if (name.includes('superfast')) return 'superfast';
    if (name.includes('passenger')) return 'passenger';
    return 'regular';
  };

  const getTrainTypeIcon = (type) => {
    switch (type) {
      case 'express': return '🚄';
      case 'local': return '🚆';
      case 'superfast': return '⚡';
      case 'passenger': return '🚂';
      default: return '🚊';
    }
  };

  const getTrainTypeColor = (type) => {
    switch (type) {
      case 'express': return 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700';
      case 'local': return 'from-green-500 to-green-600 dark:from-green-600 dark:to-green-700';
      case 'superfast': return 'from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700';
      case 'passenger': return 'from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700';
      default: return 'from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700';
    }
  };

  const getTimeRangeColor = (timeRange) => {
    switch (timeRange) {
      case 'morning': return 'text-yellow-600 dark:text-yellow-400';
      case 'afternoon': return 'text-orange-600 dark:text-orange-400';
      case 'evening': return 'text-purple-600 dark:text-purple-400';
      case 'night': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-500 dark:text-gray-400';
    }
  };

  const trainType = getTrainType(train['train name']);
  const departureTimeRange = getTimeRange(train['departure time']);
  const arrivalTimeRange = getTimeRange(train['arrival time']);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden transform hover:-translate-y-1 hover:scale-[1.02]">
      {/* Modern gradient header */}
      <div className={`relative bg-gradient-to-r ${getTrainTypeColor(trainType)} px-6 py-4 overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Train number badge */}
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <span className="text-white text-lg font-bold">{train['train no']}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-lg truncate">
                {train['train name']}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30">
                  {getTrainTypeIcon(trainType)} {trainType.charAt(0).toUpperCase() + trainType.slice(1)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Sequence indicator */}
          <div className="text-right">
            <div className="text-white/80 text-xs font-medium uppercase tracking-wider">Sequence</div>
            <div className="text-white text-2xl font-bold">{train['seq']}</div>
          </div>
        </div>
      </div>

      {/* Content with modern spacing */}
      <div className="p-6 space-y-6">
        {/* Station and Distance Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg"></div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Station</span>
            </div>
            <div className="pl-6">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {train['station name']}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md inline-block">
                {train['station code']}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg"></div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Distance</span>
            </div>
            <div className="pl-6">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {train['distance']} <span className="text-lg text-gray-500 dark:text-gray-400">km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Information with modern design */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Departure</span>
            </div>
            <div className="pl-13">
              <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                {train['departure time'] !== '00:00:00' ? train['departure time'].substring(0, 5) : '--:--'}
              </div>
              {departureTimeRange && (
                <div className={`text-sm font-medium capitalize ${getTimeRangeColor(departureTimeRange)}`}>
                  {departureTimeRange}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Arrival</span>
            </div>
            <div className="pl-13">
              <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                {train['arrival time'] !== '00:00:00' ? train['arrival time'].substring(0, 5) : '--:--'}
              </div>
              {arrivalTimeRange && (
                <div className={`text-sm font-medium capitalize ${getTimeRangeColor(arrivalTimeRange)}`}>
                  {arrivalTimeRange}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Route Information with modern divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-gray-800 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Route Details
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"></div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">From</span>
            </div>
            <div className="pl-4">
              <div className="font-semibold text-gray-900 dark:text-white">
                {train['source station name']}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md inline-block">
                {train['source station']}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">To</span>
            </div>
            <div className="pl-4">
              <div className="font-semibold text-gray-900 dark:text-white">
                {train['destination station name']}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md inline-block">
                {train['destination station']}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern footer */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Train #{train['train no']}
            </span>
            <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
              Seq {train['seq']}
            </span>
          </div>
          
          {/* Hover effect indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainCard;

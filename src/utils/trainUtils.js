// Utility functions for train data processing and formatting

/**
 * Format time from HH:MM:SS to HH:MM
 */
export const formatTime = (time) => {
  if (!time || time === '00:00:00') return '--:--';
  return time.substring(0, 5);
};

/**
 * Get time range (morning, afternoon, evening, night) from time string
 */
export const getTimeRange = (time) => {
  if (!time || time === '00:00:00') return '';
  const hour = parseInt(time.split(':')[0]);
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 24) return 'evening';
  return 'night';
};

/**
 * Get train type from train name
 */
export const getTrainType = (trainName) => {
  const name = trainName?.toLowerCase() || '';
  if (name.includes('express')) return 'express';
  if (name.includes('local')) return 'local';
  if (name.includes('superfast')) return 'superfast';
  if (name.includes('passenger')) return 'passenger';
  return 'regular';
};

/**
 * Get train type icon
 */
export const getTrainTypeIcon = (type) => {
  switch (type) {
    case 'express': return '🚄';
    case 'local': return '🚆';
    case 'superfast': return '⚡';
    case 'passenger': return '🚂';
    default: return '🚊';
  }
};

/**
 * Get train type color classes
 */
export const getTrainTypeColor = (type) => {
  switch (type) {
    case 'express': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'local': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'superfast': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'passenger': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

/**
 * Format distance with units
 */
export const formatDistance = (distance) => {
  const dist = parseFloat(distance);
  if (isNaN(dist)) return '0 km';
  return `${dist} km`;
};

/**
 * Get sort icon based on current sort state
 */
export const getSortIcon = (currentSortBy, currentSortOrder, field) => {
  if (currentSortBy !== field) {
    return (
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  
  if (currentSortOrder === 'asc') {
    return (
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  
  return (
    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
};

/**
 * Debounce function for search input
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate unique key for train items
 */
export const generateTrainKey = (train) => {
  return `${train['train no']}-${train['seq']}-${train['station code']}`;
};

/**
 * Validate search parameters
 */
export const validateSearchParams = (params) => {
  const errors = {};
  
  if (params.minDistance && params.maxDistance) {
    const min = parseFloat(params.minDistance);
    const max = parseFloat(params.maxDistance);
    if (min > max) {
      errors.distance = 'Minimum distance cannot be greater than maximum distance';
    }
  }
  
  return errors;
};

/**
 * Get column headers for train table
 */
export const getTableHeaders = () => [
  { key: 'train no', label: 'Train No', sortable: true },
  { key: 'train name', label: 'Train Name', sortable: true },
  { key: 'seq', label: 'SEQ', sortable: true },
  { key: 'station code', label: 'Station Code', sortable: true },
  { key: 'station name', label: 'Station Name', sortable: true },
  { key: 'arrival time', label: 'Arrival Time', sortable: true },
  { key: 'departure time', label: 'Departure Time', sortable: true },
  { key: 'distance', label: 'Distance', sortable: true },
  { key: 'source station', label: 'Source Station', sortable: true },
  { key: 'source station name', label: 'Source Station Name', sortable: true },
  { key: 'destination station', label: 'Destination Station', sortable: true },
  { key: 'destination station name', label: 'Destination Station Name', sortable: true }
];

/**
 * Export train data to CSV
 */
export const exportToCSV = (data, filename = 'train-data.csv') => {
  if (!data || data.length === 0) return;
  
  const headers = getTableHeaders();
  const csvContent = [
    headers.map(h => h.label).join(','),
    ...data.map(row => 
      headers.map(h => {
        const value = row[h.key] || '';
        // Escape commas and quotes in CSV
        return `"${value.toString().replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Get loading skeleton for train cards
 */
export const getTrainCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
    <div className="bg-gray-300 dark:bg-gray-600 h-16"></div>
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Get error message component
 */
export const getErrorMessage = (error) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Error Loading Data</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
    <button 
      onClick={() => window.location.reload()} 
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

/**
 * Get empty state component
 */
export const getEmptyState = () => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trains found</h3>
    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria</p>
  </div>
);

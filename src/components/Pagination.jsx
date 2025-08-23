import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  totalItems,
  onItemsPerPageChange 
}) => {
  // Calculate the range of pages to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 space-y-6 sm:space-y-0">
        {/* Items per page and total count with modern design */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Showing</span>
            <div className="relative">
              <select 
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
                className="appearance-none px-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 font-medium"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">of</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              {totalItems.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">results</span>
          </div>
        </div>
        
        {/* Pagination controls with modern design */}
        <div className="flex items-center space-x-2">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Page numbers */}
          <div className="flex items-center space-x-2">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-4 py-2 text-gray-500 dark:text-gray-400 font-medium">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      currentPage === page 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-2 border-blue-500' 
                        : 'bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Page info with modern design */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-8 py-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.ceil((currentPage / totalPages) * 100)}% Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

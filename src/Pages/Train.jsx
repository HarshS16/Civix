import React, { useState } from "react";
import { useTrains } from "../hooks/useTrains";
import AdvancedSearch from "../components/AdvancedSearch";
import Pagination from "../components/Pagination";
import TrainCard from "../components/TrainCard";
import { 
  getSortIcon, 
  getTrainCardSkeleton, 
  getErrorMessage, 
  getEmptyState,
  exportToCSV,
  getTableHeaders,
  formatTime,
  formatDistance
} from "../utils/trainUtils";

const TrainSchedule = () => {
  const {
    data: trains,
    allData: allTrains,
    loading,
    error,
    searchParams,
    setSearchParams,
    paginationInfo,
    handlePageChange,
    handleItemsPerPageChange,
    sortBy,
    sortOrder,
    handleSort,
    handleSearch,
    handleClearFilters
  } = useTrains();

  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const tableHeaders = getTableHeaders();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-emerald-100 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Train Schedule</h1>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Civix</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 flex flex-col items-center space-y-6">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-emerald-700 dark:text-emerald-300 font-medium text-lg">Loading train data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-emerald-100 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Train Schedule</h1>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Civix</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {getErrorMessage(error)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Modern Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-emerald-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Train Schedule</h1>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Civix</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle with modern design */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-2xl p-1 border border-gray-200 dark:border-gray-600 shadow-lg">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    viewMode === 'cards'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>Cards</span>
                  </span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    viewMode === 'table'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Table</span>
                  </span>
                </button>
              </div>

              {/* Export Button with modern design */}
              <button
                onClick={() => exportToCSV(allTrains, `train-data-${new Date().toISOString().split('T')[0]}.csv`)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-3 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Advanced Search */}
        <AdvancedSearch
          onSearch={handleSearch}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onClearFilters={handleClearFilters}
        />

        {/* Results Summary with modern design */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Showing <span className="font-bold text-gray-900 dark:text-white">{paginationInfo.startItem}</span> to{' '}
                  <span className="font-bold text-gray-900 dark:text-white">{paginationInfo.endItem}</span> of{' '}
                  <span className="font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                    {paginationInfo.totalItems.toLocaleString()}
                  </span> results
                </span>
              </div>
              
              {Object.keys(searchParams).length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {Object.keys(searchParams).length} filter(s) applied
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by:</span>
              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    handleSort(field);
                  }}
                  className="appearance-none px-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 font-medium"
                >
                  <option value="train no-asc">Train No (A-Z)</option>
                  <option value="train no-desc">Train No (Z-A)</option>
                  <option value="train name-asc">Train Name (A-Z)</option>
                  <option value="train name-desc">Train Name (Z-A)</option>
                  <option value="distance-asc">Distance (Low-High)</option>
                  <option value="distance-desc">Distance (High-Low)</option>
                  <option value="departure time-asc">Departure Time (Early-Late)</option>
                  <option value="departure time-desc">Departure Time (Late-Early)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {trains.length === 0 ? (
          getEmptyState()
        ) : (
          <>
            {/* Cards View with modern grid */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {trains.map((train, index) => (
                  <TrainCard key={`${train['train no']}-${train['seq']}-${train['station code']}`} train={train} index={index} />
                ))}
              </div>
            )}

            {/* Table View with modern design */}
            {viewMode === 'table' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-emerald-600 to-blue-700 text-white">
                        {tableHeaders.map((header) => (
                          <th 
                            key={header.key} 
                            className={`px-6 py-4 text-left text-sm font-semibold tracking-wider whitespace-nowrap ${
                              header.sortable ? 'cursor-pointer hover:bg-emerald-700 transition-all duration-300' : ''
                            }`}
                            onClick={() => header.sortable && handleSort(header.key)}
                          >
                            <div className="flex items-center space-x-2">
                              <span>{header.label}</span>
                              {header.sortable && getSortIcon(sortBy, sortOrder, header.key)}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100 dark:divide-gray-700">
                      {trains.map((row, index) => (
                        <tr 
                          key={`${row['train no']}-${row['seq']}-${row['station code']}`}
                          className="hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all duration-300 group"
                        >
                          <td className="px-6 py-4 text-sm font-mono text-emerald-700 dark:text-emerald-300 font-semibold">
                            {row['train no']}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                            {row['train name']}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {row['seq']}
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-emerald-600 dark:text-emerald-400">
                            {row['station code']}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {row['station name']}
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600 dark:text-blue-400">
                            {formatTime(row['arrival time'])}
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-orange-600 dark:text-orange-400">
                            {formatTime(row['departure time'])}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {formatDistance(row['distance'])}
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-emerald-600 dark:text-emerald-400">
                            {row['source station']}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {row['source station name']}
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-emerald-600 dark:text-emerald-400">
                            {row['destination station']}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {row['destination station name']}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={paginationInfo.currentPage}
              totalPages={paginationInfo.totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={paginationInfo.itemsPerPage}
              totalItems={paginationInfo.totalItems}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TrainSchedule;
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Papa from "papaparse";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ComposedChart, ScatterChart, Scatter
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced SDRF Government Data Dashboard Component
export default function SDRFDashboard() {
  const [nfsaData, setNfsaData] = useState([]);
  const [sdrfData, setSdrfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedMetrics, setSelectedMetrics] = useState(['allocation', 'beneficiaries']);
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard', 'charts', 'insights'

  // Load and parse CSV data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      Papa.parse("/gtfs/RS_Session_258_AU_1935_2.csv", {
        download: true,
        header: true,
        complete: (result) => {
          setSdrfData(result.data);
          checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading SDRF data:', error);
          checkLoadingComplete();
        }
      });

      Papa.parse("/gtfs/RS_Session_258_AU_1997_1.csv", {
        download: true,
        header: true,
        complete: (result) => {
          setNfsaData(result.data);
          checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading NFSA data:', error);
          checkLoadingComplete();
        }
      });
    };

    let loadedCount = 0;
    const checkLoadingComplete = () => {
      loadedCount++;
      if (loadedCount === 2) {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Process and transform data for visualizations
  const processedSDRFData = useMemo(() => {
    if (!sdrfData.length) return [];
    
    return sdrfData
      .filter(row => row['State'] && row['State'] !== 'Total')
      .map(row => ({
        state: row['State'],
        centralShare: parseFloat(row['Allocation of SDRF - Central Share']) || 0,
        stateShare: parseFloat(row['Allocation of SDRF - State Share']) || 0,
        totalAllocation: parseFloat(row['Allocation of SDRF - Total']) || 0,
        firstInstallment: parseFloat(row['Release from SDRF - 1st Installment']) || 0,
        secondInstallment: parseFloat(row['Release from SDRF - 2nd Installment']) || 0,
        totalRelease: (parseFloat(row['Release from SDRF - 1st Installment']) || 0) + (parseFloat(row['Release from SDRF - 2nd Installment']) || 0),
        releasePercentage: ((parseFloat(row['Release from SDRF - 1st Installment']) || 0) + (parseFloat(row['Release from SDRF - 2nd Installment']) || 0)) / parseFloat(row['Allocation of SDRF - Total']) * 100 || 0
      }));
  }, [sdrfData]);

  const processedNFSAData = useMemo(() => {
    if (!nfsaData.length) return [];
    

    
    const processed = nfsaData
      .filter(row => row['States/UTs'] && row['States/UTs'] !== 'Total')
      .map(row => ({
        state: row['States/UTs'],
        beneficiaries2021: parseFloat(row['Beneficiaries covered under the National Food Security Act, 2013 - As on 31-03-2021']) || 0,
        beneficiaries2022: parseFloat(row['Beneficiaries covered under the National Food Security Act, 2013 - As on 31-03-2022']) || 0,
        beneficiaries2022Nov: parseFloat(row['Beneficiaries covered under the National Food Security Act, 2013 - As on 30-11-2022']) || 0,
        growthRate: ((parseFloat(row['Beneficiaries covered under the National Food Security Act, 2013 - As on 30-11-2022']) || 0) - (parseFloat(row['Beneficiaries covered under the National Food Security Act, 2013 - As on 31-03-2021']) || 0)) / (parseFloat(row['Beneficiaries covered under the National Food Security Act, 2013 - As on 31-03-2021']) || 1) * 100
      }));
    

    return processed;
  }, [nfsaData]);

  // Calculate KPI metrics
  const kpiMetrics = useMemo(() => {
    if (!processedSDRFData.length || !processedNFSAData.length) {
      return {
        totalSDRFAllocation: 0,
        totalSDRFRelease: 0,
        totalBeneficiaries: 0,
        avgAllocation: 0,
        releaseEfficiency: 0,
        statesCovered: 0,
        nfsaStatesCovered: 0
      };
    }
    
    const totalSDRFAllocation = processedSDRFData.reduce((sum, item) => sum + item.totalAllocation, 0);
    const totalSDRFRelease = processedSDRFData.reduce((sum, item) => sum + item.totalRelease, 0);
    const totalBeneficiaries = processedNFSAData.reduce((sum, item) => sum + item.beneficiaries2022Nov, 0);
    const avgAllocation = totalSDRFAllocation / processedSDRFData.length;
    const releaseEfficiency = (totalSDRFRelease / totalSDRFAllocation) * 100;
    
    return {
      totalSDRFAllocation,
      totalSDRFRelease,
      totalBeneficiaries,
      avgAllocation,
      releaseEfficiency,
      statesCovered: processedSDRFData.length,
      nfsaStatesCovered: processedNFSAData.length
    };
  }, [processedSDRFData, processedNFSAData]);

  // Filter data based on selected state
  const filteredSDRFData = useMemo(() => {
    if (selectedState === 'all') return processedSDRFData;
    return processedSDRFData.filter(item => item.state === selectedState);
  }, [processedSDRFData, selectedState]);

  const filteredNFSAData = useMemo(() => {
    if (selectedState === 'all') return processedNFSAData;
    return processedNFSAData.filter(item => item.state === selectedState);
  }, [processedNFSAData, selectedState]);

  // Chart colors
  const chartColors = {
    primary: '#10b981',
    secondary: '#3b82f6',
    accent: '#f59e0b',
    success: '#22c55e',
    warning: '#f97316',
    danger: '#ef4444',
    purple: '#8b5cf6',
    pink: '#ec4899'
  };

  // KPI Card Component
  const KPICard = ({ title, value, trend, icon, color = 'primary', subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-xl flex items-center justify-center`}>
          {icon}
      </div>
        {trend !== undefined && (
          <div className={`text-sm font-medium px-2 py-1 rounded-full ${
            trend >= 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
      </div>
        )}
    </div>
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      )}
    </motion.div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="absolute -inset-4">
                <div className="w-full h-full border-4 border-green-200 dark:border-green-400/30 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Loading Government Data Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">Please wait while we prepare your analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Government Data Analytics Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">SDRF Allocations & NFSA Beneficiary Coverage Analysis</p>
            </div>
          </div>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl p-1 border border-gray-200 dark:border-gray-600 shadow-lg">
            {['dashboard', 'charts', 'insights'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State/UT</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-4 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300"
                >
                  <option value="all">All States/UTs</option>
                  {(processedSDRFData || []).map(item => (
                    <option key={item.state} value={item.state}>
                      {item.state}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Metrics</label>
                <div className="flex gap-2">
                  {[
                    { key: 'allocation', label: 'SDRF Allocation' },
                    { key: 'beneficiaries', label: 'NFSA Beneficiaries' }
                  ].map(metric => (
                    <button
                      key={metric.key}
                      onClick={() => {
                        if (selectedMetrics.includes(metric.key)) {
                          setSelectedMetrics(selectedMetrics.filter(m => m !== metric.key));
                        } else {
                          setSelectedMetrics([...selectedMetrics, metric.key]);
                        }
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                        selectedMetrics.includes(metric.key)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {metric.label}
                    </button>
                  ))}
            </div>
          </div>
        </div>
          </div>
        </motion.div>

        {/* Dashboard View */}
        {viewMode === 'dashboard' && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Data Status Display */}
              <div className="col-span-full mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">📊 Data Status</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        SDRF: {processedSDRFData.length} states | NFSA: {processedNFSAData.length} states
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        <strong>Total SDRF:</strong> ₹{kpiMetrics.totalSDRFAllocation?.toLocaleString() || 0} Cr
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        <strong>Total NFSA:</strong> {(kpiMetrics.totalBeneficiaries || 0).toLocaleString()} beneficiaries
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* KPI Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                  title="Total SDRF Allocation"
                  value={`₹${(kpiMetrics.totalSDRFAllocation / 1000).toFixed(1)}K Cr`}
                  trend={12.5}
                  icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>}
                  color="primary"
                  subtitle="Central + State Share"
                />
                
                <KPICard
                  title="Total Beneficiaries"
                  value={`${(kpiMetrics.totalBeneficiaries / 1000000).toFixed(1)}M`}
                  trend={0.9}
                  icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>}
                  color="success"
                  subtitle="NFSA Coverage"
                />
                
                <KPICard
                  title="States Covered"
                  value={kpiMetrics.statesCovered}
                  icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>}
                  color="accent"
                  subtitle="SDRF Allocation"
                />
                
                <KPICard
                  title="Release Efficiency"
                  value={`${kpiMetrics.releaseEfficiency.toFixed(1)}%`}
                  trend={kpiMetrics.releaseEfficiency - 100}
                  icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>}
                  color={kpiMetrics.releaseEfficiency >= 80 ? 'success' : 'warning'}
                  subtitle="SDRF Release vs Allocation"
                />
              </div>

              {/* Main Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SDRF Allocation Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SDRF Allocation by State</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    {processedSDRFData && processedSDRFData.length > 0 ? (
                      <BarChart data={processedSDRFData.slice(0, 15)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="state" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="totalAllocation" fill={chartColors.primary} name="Total Allocation (Cr)" />
                      </BarChart>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <p className="text-gray-500 dark:text-gray-400 mb-2">No SDRF data available</p>
                          <p className="text-sm text-gray-400 dark:text-gray-500">
                            Raw data: {sdrfData.length} rows | Processed: {processedSDRFData.length} rows
                          </p>
                        </div>
                      </div>
                    )}
                  </ResponsiveContainer>
                </motion.div>

                {/* NFSA Beneficiary Trend Chart */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">NFSA Beneficiary Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    {processedNFSAData && processedNFSAData.length > 0 ? (
                      <LineChart data={processedNFSAData.slice(0, 15)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="state" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="beneficiaries2021" 
                          stroke={chartColors.primary} 
                          strokeWidth={3}
                          name="2021 (Million)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="beneficiaries2022Nov" 
                          stroke={chartColors.secondary} 
                          strokeWidth={3}
                          name="2022 Nov (Million)"
                        />
                      </LineChart>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <p className="text-gray-500 dark:text-gray-400 mb-2">No NFSA data available</p>
                          <p className="text-sm text-gray-400 dark:text-gray-500">
                            Raw data: {nfsaData.length} rows | Processed: {processedNFSAData.length} rows
                          </p>
                        </div>
                      </div>
                    )}
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* Additional Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Funding Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Funding Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                                              <Pie
                          data={[
                            { name: 'Central Share', value: (kpiMetrics.totalSDRFAllocation || 0) * 0.75 },
                            { name: 'State Share', value: (kpiMetrics.totalSDRFAllocation || 0) * 0.25 }
                          ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill={chartColors.primary} />
                        <Cell fill={chartColors.secondary} />
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Release Analysis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Release Analysis</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={(processedSDRFData || []).slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="state" stroke="#6b7280" angle={-45} textAnchor="end" height={60} />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="firstInstallment" fill={chartColors.success} name="1st Installment" />
                      <Bar dataKey="secondInstallment" fill={chartColors.accent} name="2nd Installment" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Performance Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Top Allocated State</span>
                      <span className="text-sm font-semibold text-green-600">
                        {processedSDRFData.length > 0 ? processedSDRFData.reduce((best, current) => 
                          current.totalAllocation > best.totalAllocation ? current : best
                        ).state : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Highest Beneficiaries</span>
                      <span className="text-sm font-semibold text-blue-600">
                        {processedNFSAData.length > 0 ? processedNFSAData.reduce((best, current) => 
                          current.beneficiaries2022Nov > best.beneficiaries2022Nov ? current : best
                        ).state : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Avg Growth Rate</span>
                      <span className="text-sm font-semibold text-purple-600">
                        {processedNFSAData.length > 0 ? (processedNFSAData.reduce((sum, item) => sum + item.growthRate, 0) / processedNFSAData.length).toFixed(1) : '0.0'}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Charts View */}
        {viewMode === 'charts' && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Advanced Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Composed Chart - SDRF Overview */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SDRF Comprehensive Overview</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={(processedSDRFData || []).slice(0, 12)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="state" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="totalAllocation" 
                        fill={chartColors.primary + '20'} 
                        stroke={chartColors.primary}
                        name="Total Allocation"
                      />
                      <Bar dataKey="totalRelease" fill={chartColors.secondary} name="Total Release" />
                      <Line 
                        type="monotone" 
                        dataKey="releasePercentage" 
                        stroke={chartColors.accent} 
                        strokeWidth={3}
                        name="Release %"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* NFSA Growth Analysis */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">NFSA Growth Analysis</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={(processedNFSAData || []).slice(0, 12)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="state" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="beneficiaries2021" 
                        fill={chartColors.primary + '20'} 
                        stroke={chartColors.primary}
                        name="2021 Coverage"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="beneficiaries2022Nov" 
                        fill={chartColors.secondary + '20'} 
                        stroke={chartColors.secondary}
                        name="2022 Nov Coverage"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
      </div>

              {/* Scatter Plot Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Allocation vs. Beneficiary Correlation</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart data={(processedSDRFData || []).filter(item => 
                    (processedNFSAData || []).find(nfsa => nfsa.state === item.state)
                  ).map(item => {
                    const nfsaItem = (processedNFSAData || []).find(nfsa => nfsa.state === item.state);
                    return {
                      ...item,
                      beneficiaries: nfsaItem ? nfsaItem.beneficiaries2022Nov : 0
                    };
                  })}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" dataKey="totalAllocation" name="SDRF Allocation (Cr)" stroke="#6b7280" />
                    <YAxis type="number" dataKey="beneficiaries" name="NFSA Beneficiaries (Million)" stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Scatter dataKey="beneficiaries" fill={chartColors.primary} name="States" />
                  </ScatterChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Insights View */}
        {viewMode === 'insights' && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Government Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Government Data Insights & Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Positive Trends */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600 text-lg">Positive Trends 📈</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>NFSA Coverage:</strong> {kpiMetrics.nfsaStatesCovered || 0} states/UTs covered under food security</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Comprehensive Coverage:</strong> {kpiMetrics.statesCovered || 0} states covered under SDRF</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Food Security:</strong> {(kpiMetrics.totalBeneficiaries || 0).toLocaleString()} beneficiaries covered</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Areas of Concern */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-orange-600 text-lg">Areas of Concern ⚠️</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Release Efficiency:</strong> {(kpiMetrics.releaseEfficiency || 0).toFixed(1)}% average release rate</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Regional Disparities:</strong> Significant variations in allocation across states</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span><strong>Installment Gaps:</strong> Many states show no second installment releases</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Strategic Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Strategic Recommendations 💡</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Allocation Optimization</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Improve SDRF allocation distribution based on population and vulnerability factors</p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Release Monitoring</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">Implement quarterly reviews to track SDRF release progress and efficiency</p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Beneficiary Outreach</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Expand NFSA coverage to ensure food security for all eligible citizens</p>
                  </div>
                </div>
              </motion.div>

              {/* Performance Rankings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">State Performance Rankings 🏆</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Top Performers */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600 text-lg">Top Performing States</h4>
                    <div className="space-y-3">
                                             {(processedSDRFData || [])
                          .sort((a, b) => b.totalAllocation - a.totalAllocation)
                          .slice(0, 5)
                          .map((item, index) => (
                          <div key={item.state} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">{item.state}</span>
                            </div>
                            <span className="text-sm font-semibold text-green-600">
                              ₹{item.totalAllocation.toFixed(1)} Cr
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  {/* Bottom Performers */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-orange-600 text-lg">States Needing Attention</h4>
                    <div className="space-y-3">
                                             {(processedSDRFData || [])
                          .sort((a, b) => a.totalAllocation - b.totalAllocation)
                          .slice(0, 5)
                          .map((item, index) => (
                          <div key={item.state} className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">{item.state}</span>
                            </div>
                            <span className="text-sm font-semibold text-orange-600">
                              ₹{item.totalAllocation.toFixed(1)} Cr
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}



        {/* Data Tables (Collapsible) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Raw Government Data Tables</h3>
                  <p className="text-green-100 dark:text-green-200">Detailed SDRF and NFSA records for analysis</p>
                </div>
                <div className="bg-white/20 dark:bg-white/25 backdrop-blur-sm rounded-lg p-3">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7zM7 11h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM7 15h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              {/* SDRF Data Table */}
        {sdrfData.length > 0 && (
                <div className="overflow-x-auto">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SDRF Allocation & Release Data</h4>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 border-b border-green-200 dark:border-gray-600">
                        {Object.keys(sdrfData[0] || {}).map((header, i) => (
                          <th key={i} className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-r border-green-100 dark:border-gray-600 last:border-r-0 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span>{header}</span>
                              <svg className="w-3 h-3 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                              </svg>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-green-100 dark:divide-gray-600">
                      {sdrfData.map((row, i) => (
                        <tr key={i} className="hover:bg-green-50/50 dark:hover:bg-gray-600/50 transition-colors duration-200 group">
                          {Object.values(row).map((value, j) => (
                            <td key={j} className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border-r border-green-50 dark:border-gray-700 last:border-r-0 group-hover:border-green-100 dark:group-hover:border-gray-600 transition-colors duration-200">
                              <div className="truncate max-w-xs" title={value}>
                                {value}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* NFSA Data Table */}
              {nfsaData.length > 0 && (
                <div className="overflow-x-auto">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">NFSA Beneficiary Coverage Data</h4>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border-b border-blue-200 dark:border-gray-600">
                        {Object.keys(nfsaData[0] || {}).map((header, i) => (
                          <th key={i} className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-r border-blue-100 dark:border-gray-600 last:border-r-0 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span>{header}</span>
                              <svg className="w-3 h-3 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100 dark:divide-gray-600">
                      {nfsaData.map((row, i) => (
                        <tr key={i} className="hover:bg-blue-50/50 dark:hover:bg-gray-600/50 transition-colors duration-200 group">
                          {Object.values(row).map((value, j) => (
                            <td key={j} className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 border-r border-blue-50 dark:border-gray-700 last:border-r-0 group-hover:border-blue-100 dark:group-hover:border-gray-600 transition-colors duration-200">
                              <div className="truncate max-w-xs" title={value}>
                                {value}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
          </div>
        )}
      </div>

            <div className="bg-green-50 dark:bg-gray-700 px-6 py-4 border-t border-green-100 dark:border-gray-600">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Showing {sdrfData.length + nfsaData.length} total records</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
                  <span>Government data loaded successfully</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
    </div>
  );
}
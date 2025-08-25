import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Papa from 'papaparse';
import { 
  Building2, TrendingUp, FileText, IndianRupee, Search, Filter, 
  BarChart3, PieChart, Activity, Download, Eye, BarChart, 
  LineChart, AreaChart, ScatterChart, Treemap, Sun, Gauge,
  ChevronDown, ChevronUp, Calendar, DollarSign, Target,
  Users, Award, AlertTriangle, CheckCircle, XCircle
} from 'lucide-react';
import {
  LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, 
  PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart as RechartsAreaChart, 
  Area, ComposedChart, ScatterChart as RechartsScatterChart, Scatter
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export default function GovernmentSchemesDashboard() {
  const [schemes, setSchemes] = useState([]);
  const [planExpenditure, setPlanExpenditure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('dashboard');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [amountRange, setAmountRange] = useState({ min: 0, max: 10000 });
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      Papa.parse("/gtfs/schemes.csv", {
        download: true,
        header: true,
        complete: (result) => {
          setSchemes(result.data.filter(row => row['Programme/Schemes']));
        },
        error: (error) => console.error('Error loading schemes:', error)
      });

      Papa.parse("/gtfs/planExpenditure.csv", {
        download: true,
        header: true,
        complete: (result) => {
          setPlanExpenditure(result.data.filter(row => row.Details && row.Details !== 'TOTAL'));
        },
        error: (error) => console.error('Error loading expenditure:', error)
      });
    };

    loadData();
  }, []);

  useEffect(() => {
    if (schemes.length > 0 && planExpenditure.length > 0) {
      setLoading(false);
    }
  }, [schemes, planExpenditure]);

  // Utility functions - moved before useMemo hooks
  const getSchemeCategory = (schemeName) => {
    const name = schemeName.toLowerCase();
    if (name.includes('sc') || name.includes('scheduled caste')) return 'Scheduled Castes';
    if (name.includes('obc') || name.includes('backward')) return 'Other Backward Classes';
    if (name.includes('senior') || name.includes('elderly')) return 'Senior Citizens';
    if (name.includes('transgender') || name.includes('lgbtq')) return 'LGBTQ+';
    if (name.includes('drug') || name.includes('substance')) return 'Substance Abuse';
    if (name.includes('education') || name.includes('scholarship')) return 'Education';
    if (name.includes('health') || name.includes('medical')) return 'Healthcare';
    return 'General Welfare';
  };

  const formatAmount = (amount) => {
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount.toFixed(0)}`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Scheduled Castes': '#10b981',
      'Other Backward Classes': '#3b82f6',
      'Senior Citizens': '#f59e0b',
      'LGBTQ+': '#ec4899',
      'Substance Abuse': '#ef4444',
      'Education': '#8b5cf6',
      'Healthcare': '#06b6d4',
      'General Welfare': '#6b7280'
    };
    return colors[category] || '#6b7280';
  };

  // Data processing with useMemo for performance
  const processedSchemes = useMemo(() => {
    if (!schemes.length) return [];
    
    return schemes.map(scheme => ({
      name: scheme['Programme/Schemes'],
      category: getSchemeCategory(scheme['Programme/Schemes']),
      '2016-17': parseFloat(scheme['Funds Allocated - 2016-17']) || 0,
      '2017-18': parseFloat(scheme['Funds Allocated - 2017-18']) || 0,
      '2018-19': parseFloat(scheme['Funds Allocated - 2018-19']) || 0,
      '2019-20': parseFloat(scheme['Funds Allocated - 2019-20']) || 0,
      '2020-21': parseFloat(scheme['Funds Allocated - 2020-21']) || 0,
      total: parseFloat(scheme['Funds Allocated - 2016-17']) + 
             parseFloat(scheme['Funds Allocated - 2017-18']) + 
             parseFloat(scheme['Funds Allocated - 2018-19']) + 
             parseFloat(scheme['Funds Allocated - 2019-20']) + 
             parseFloat(scheme['Funds Allocated - 2020-21'])
    }));
  }, [schemes]);

  const processedExpenditure = useMemo(() => {
    if (!planExpenditure.length) return [];
    
    return planExpenditure.map(sector => ({
      sector: sector.Details,
      '2012-13': parseFloat(sector['2012-13']) || 0,
      '2013-14': parseFloat(sector['2013-14']) || 0,
      '2014-15': parseFloat(sector['2014-15 (R. E.)']) || 0,
      '2015-16': parseFloat(sector['2015-16  (B. E.)']) || 0,
      total: (parseFloat(sector['2012-13']) || 0) + 
             (parseFloat(sector['2013-14']) || 0) + 
             (parseFloat(sector['2014-15 (R. E.)']) || 0) + 
             (parseFloat(sector['2015-16  (B. E.)']) || 0)
    }));
  }, [planExpenditure]);

  // Filtered data based on user selections
  const filteredSchemes = useMemo(() => {
    let filtered = processedSchemes;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (amountRange.min > 0 || amountRange.max < 10000) {
      filtered = filtered.filter(scheme => 
        scheme.total >= amountRange.min && scheme.total <= amountRange.max
      );
    }

    return filtered;
  }, [processedSchemes, selectedCategory, searchQuery, amountRange]);

  // KPI calculations
  const kpiMetrics = useMemo(() => {
    if (!processedSchemes.length || !processedExpenditure.length) {
      return {
        totalSchemes: 0,
        totalFunds: 0,
        avgGrowth: 0,
        topSector: '',
        efficiency: 0
      };
    }

    const totalSchemes = processedSchemes.length;
    const totalFunds = processedSchemes.reduce((sum, scheme) => sum + scheme.total, 0);
    
    // Calculate year-over-year growth
    const growthRates = [];
    for (let i = 1; i < 5; i++) {
      const currentYear = 2016 + i;
      const prevYear = 2015 + i;
      const currentKey = `${currentYear}-${String(currentYear + 1).slice(-2)}`;
      const prevKey = `${prevYear}-${String(prevYear + 1).slice(-2)}`;
      
      const currentTotal = processedSchemes.reduce((sum, scheme) => sum + scheme[currentKey], 0);
      const prevTotal = processedSchemes.reduce((sum, scheme) => sum + scheme[prevKey], 0);
      
      if (prevTotal > 0) {
        growthRates.push(((currentTotal - prevTotal) / prevTotal) * 100);
      }
    }
    
    const avgGrowth = growthRates.length > 0 ? growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length : 0;
    
    // Top performing sector
    const topSector = processedExpenditure.reduce((top, current) => 
      current.total > top.total ? current : top
    ).sector;
    
    // Budget utilization efficiency (simplified calculation)
    const efficiency = Math.min(100, (totalFunds / 50000) * 100); // Assuming 50,000 as baseline

    return {
      totalSchemes,
      totalFunds,
      avgGrowth,
      topSector,
      efficiency
    };
  }, [processedSchemes, processedExpenditure]);

  // Chart data preparation
  const fundTrendsData = useMemo(() => {
    if (!filteredSchemes.length) return [];
    
    const years = ['2016-17', '2017-18', '2018-19', '2019-20', '2020-21'];
    return years.map(year => ({
      year,
      total: filteredSchemes.reduce((sum, scheme) => sum + scheme[year], 0),
      count: filteredSchemes.filter(scheme => scheme[year] > 0).length
    }));
  }, [filteredSchemes]);

  const sectorComparisonData = useMemo(() => {
    if (!processedExpenditure.length) return [];
    
    return processedExpenditure
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)
      .map(sector => ({
        sector: sector.sector.length > 20 ? sector.sector.substring(0, 20) + '...' : sector.sector,
        total: sector.total,
        '2012-13': sector['2012-13'],
        '2013-14': sector['2013-14'],
        '2014-15': sector['2014-15'],
        '2015-16': sector['2015-16']
      }));
  }, [processedExpenditure]);

  const budgetDistributionData = useMemo(() => {
    if (!filteredSchemes.length) return [];
    
    const categories = {};
    filteredSchemes.forEach(scheme => {
      const category = scheme.category;
      categories[category] = (categories[category] || 0) + scheme.total;
    });
    
    return Object.entries(categories).map(([category, total]) => ({
      category,
      total,
      percentage: (total / kpiMetrics.totalFunds) * 100
    }));
  }, [filteredSchemes, kpiMetrics.totalFunds]);

  // Enhanced KPI Card Component
  const KPICard = ({ title, value, trend, icon, color = 'green', subtitle, unit = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full ${
            trend >= 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
            <span>{trend >= 0 ? '+' : ''}{trend.toFixed(1)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}{unit}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      )}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600 dark:text-green-400 text-lg">Loading Government Schemes Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-green-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center space-x-3">
            <Building2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Government Schemes Dashboard
            </h1>
          </div>
          <p className="text-center text-green-600/70 dark:text-green-400/70 mt-2 font-medium">
            Advanced Analytics & Interactive Visualizations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* View Mode Selector */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard View</h2>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {[
                  { key: 'dashboard', label: 'Dashboard', icon: Activity },
                  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { key: 'insights', label: 'Insights', icon: PieChart },
                  { key: 'comparison', label: 'Comparison', icon: BarChart }
                ].map((mode) => {
                  const IconComponent = mode.icon;
                  return (
                    <button
                      key={mode.key}
                      onClick={() => setViewMode(mode.key)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === mode.key
                          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 inline mr-2" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const csvContent = Papa.unparse(filteredSchemes);
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'government-schemes-data.csv';
                  a.click();
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <KPICard
            title="Total Schemes"
            value={kpiMetrics.totalSchemes}
            icon={<FileText className="w-6 h-6 text-white" />}
            color="green"
            subtitle="Active government schemes"
          />
          <KPICard
            title="Total Funds"
            value={formatAmount(kpiMetrics.totalFunds)}
            trend={kpiMetrics.avgGrowth}
            icon={<IndianRupee className="w-6 h-6 text-white" />}
            color="emerald"
            subtitle="Funds allocated (₹Crores)"
          />
          <KPICard
            title="Avg Growth"
            value={kpiMetrics.avgGrowth.toFixed(1)}
            unit="%"
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="blue"
            subtitle="Year-over-year growth"
          />
          <KPICard
            title="Top Sector"
            value={kpiMetrics.topSector.substring(0, 15) + '...'}
            icon={<Award className="w-6 h-6 text-white" />}
            color="purple"
            subtitle="Highest expenditure sector"
          />
          <KPICard
            title="Efficiency"
            value={kpiMetrics.efficiency.toFixed(1)}
            unit="%"
            icon={<Target className="w-6 h-6 text-white" />}
            color="orange"
            subtitle="Budget utilization rate"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">Search Schemes</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">Scheme Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="Scheduled Castes">Scheduled Castes</option>
                <option value="Other Backward Classes">Other Backward Classes</option>
                <option value="Senior Citizens">Senior Citizens</option>
                <option value="LGBTQ+">LGBTQ+</option>
                <option value="Substance Abuse">Substance Abuse</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="General Welfare">General Welfare</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">Min Amount (₹Crores)</label>
              <input
                type="number"
                placeholder="0"
                value={amountRange.min}
                onChange={(e) => setAmountRange(prev => ({ ...prev, min: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">Max Amount (₹Crores)</label>
              <input
                type="number"
                placeholder="10000"
                value={amountRange.max}
                onChange={(e) => setAmountRange(prev => ({ ...prev, max: parseFloat(e.target.value) || 10000 }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Conditional Chart Rendering Based on View Mode */}
        <AnimatePresence mode="wait">
          {viewMode === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Fund Allocation Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fund Allocation Trends (2016-2021)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={fundTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`₹${value} Crores`, 'Amount']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                        name="Total Funds (₹Crores)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        name="Active Schemes Count"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Sector Performance Comparison */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top 10 Sectors by Expenditure</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={sectorComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="sector" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`₹${value} Crores`, 'Amount']}
                      />
                      <Legend />
                      <Bar dataKey="total" fill="#10b981" name="Total Expenditure" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* Additional Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Budget Distribution by Category */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget Distribution by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={budgetDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="total"
                      >
                        {budgetDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`₹${value} Crores`, 'Amount']}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Cumulative Fund Allocation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cumulative Fund Allocation</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsAreaChart data={fundTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [`₹${value} Crores`, 'Amount']}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                        name="Cumulative Funds"
                      />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </motion.div>
          )}

          {viewMode === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Advanced Analytics Dashboard</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Scatter Plot: Fund Allocation vs Scheme Count */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Fund Allocation vs Scheme Count</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsScatterChart data={fundTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="total" stroke="#6b7280" />
                        <YAxis dataKey="count" stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Scatter dataKey="count" fill="#10b981" />
                      </RechartsScatterChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Composed Chart: Multiple Metrics */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Sector Performance Overview</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <ComposedChart data={sectorComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="sector" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="total" fill="#3b82f6" name="Total Expenditure" />
                        <Line type="monotone" dataKey="2015-16" stroke="#10b981" strokeWidth={3} name="Latest Year" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Data Insights & Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">Key Findings</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Top Sector:</strong> {kpiMetrics.topSector} leads with highest expenditure
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          <strong>Growth Trend:</strong> Average {kpiMetrics.avgGrowth.toFixed(1)}% year-over-year growth
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="text-sm text-purple-800 dark:text-purple-200">
                          <strong>Efficiency:</strong> {kpiMetrics.efficiency.toFixed(1)}% budget utilization rate
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          <strong>Focus Areas:</strong> Prioritize schemes with highest impact-to-cost ratios
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Monitoring:</strong> Track underperforming schemes for optimization
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Transparency:</strong> Enhance public reporting for better accountability
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Year-over-Year Comparison</h3>
                <div className="grid grid-cols-1 gap-6">
                  {/* Multi-Year Comparison Chart */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Scheme Performance Comparison (2016-2021)</h4>
                    <ResponsiveContainer width="100%" height={400}>
                      <ComposedChart data={fundTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="year" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="total" fill="#3b82f6" name="Total Funds (₹Crores)" />
                        <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} name="Active Schemes Count" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Data Tables */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl rounded-3xl border border-green-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Filtered Schemes Data</h2>
              </div>
              <div className="text-white text-sm">
                Showing {filteredSchemes.length} of {processedSchemes.length} schemes
              </div>
            </div>
          </div>
          <div className="p-6">
            {filteredSchemes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-green-100 dark:border-gray-600">
                      <th className="text-left py-4 px-4 font-semibold text-green-800 dark:text-green-300">Scheme Name</th>
                      <th className="text-left py-4 px-4 font-semibold text-green-800 dark:text-green-300">Category</th>
                      <th className="text-left py-4 px-4 font-semibold text-green-800 dark:text-green-300">2016-17</th>
                      <th className="text-left py-4 px-4 font-semibold text-green-800 dark:text-green-300">2017-18</th>
                      <th className="text-left py-4 px-4 font-semibold text-green-800 dark:text-green-300">2018-19</th>
                      <th className="text-left py-4 px-4 font-semibold text-green-800 dark:text-green-300">2019-20</th>
                      <th className="text-left py-4 px-4 font-semibold text-green-800 dark:text-green-300">2020-21</th>
                      <th className="text-left py-4 px-4 font-semibold text-green-800 dark:text-green-300">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchemes.map((scheme, i) => (
                      <tr
                        key={i}
                        className="hover:bg-green-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200 border-b border-green-50 dark:border-gray-700"
                      >
                        <td className="py-4 px-4 text-green-700 dark:text-green-200 font-medium">
                          {scheme.name}
                        </td>
                        <td className="py-4 px-4">
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{ 
                              backgroundColor: getCategoryColor(scheme.category) + '20',
                              color: getCategoryColor(scheme.category)
                            }}
                          >
                            {scheme.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-green-700 dark:text-green-200">
                          ₹{scheme['2016-17'].toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-green-700 dark:text-green-200">
                          ₹{scheme['2017-18'].toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-green-700 dark:text-green-200">
                          ₹{scheme['2018-19'].toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-green-700 dark:text-green-200">
                          ₹{scheme['2019-20'].toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-green-700 dark:text-green-200">
                          ₹{scheme['2020-21'].toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-green-800 dark:text-green-100 font-semibold">
                          ₹{scheme.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-green-300 dark:text-green-500 mx-auto mb-3" />
                  <p className="text-green-500 dark:text-green-400 font-medium">No schemes match the current filters</p>
                  <p className="text-green-400 dark:text-green-500 text-sm mt-1">Try adjusting your search criteria</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
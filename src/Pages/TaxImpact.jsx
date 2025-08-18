import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Building, Car, Book, Shield, Droplets, Users, Heart, Recycle } from 'lucide-react';

const TaxImpact = () => {
  const [income, setIncome] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [municipality, setMunicipality] = useState('medium');

  const municipalityData = {
    small: {
      name: 'Small Town',
      incomeTaxRate: 0.015,
      propertyTaxRate: 0.012,
      services: {
        'Public Safety': 0.35,
        'Education': 0.25,
        'Infrastructure': 0.20,
        'Parks & Recreation': 0.08,
        'Health Services': 0.05,
        'Administration': 0.04,
        'Waste Management': 0.03
      }
    },
    medium: {
      name: 'Medium City',
      incomeTaxRate: 0.02,
      propertyTaxRate: 0.015,
      services: {
        'Education': 0.30,
        'Public Safety': 0.25,
        'Infrastructure': 0.18,
        'Health Services': 0.10,
        'Parks & Recreation': 0.08,
        'Transportation': 0.05,
        'Administration': 0.04
      }
    },
    large: {
      name: 'Large City',
      incomeTaxRate: 0.025,
      propertyTaxRate: 0.018,
      services: {
        'Education': 0.28,
        'Public Safety': 0.22,
        'Transportation': 0.15,
        'Infrastructure': 0.12,
        'Health Services': 0.12,
        'Parks & Recreation': 0.06,
        'Administration': 0.05
      }
    }
  };

  const serviceIcons = {
    'Public Safety': Shield,
    'Education': Book,
    'Infrastructure': Building,
    'Parks & Recreation': Users,
    'Health Services': Heart,
    'Transportation': Car,
    'Administration': DollarSign,
    'Waste Management': Recycle
  };

  const calculations = useMemo(() => {
    const annualIncome = parseFloat(income) || 0;
    const propValue = parseFloat(propertyValue) || 0;
    const data = municipalityData[municipality];

    const incomeTax = annualIncome * data.incomeTaxRate;
    const propertyTax = propValue * data.propertyTaxRate;
    const totalTax = incomeTax + propertyTax;

    const serviceBreakdown = Object.entries(data.services).map(([service, percentage]) => ({
      service,
      amount: totalTax * percentage,
      percentage: percentage * 100,
      icon: serviceIcons[service] || Building
    })).sort((a, b) => b.amount - a.amount);

    return {
      incomeTax,
      propertyTax,
      totalTax,
      serviceBreakdown,
      municipality: data.name
    };
  }, [income, propertyValue, municipality]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 p-4 rounded-2xl shadow-lg mr-4">
              <Calculator className="text-white w-12 h-12" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-green-900 dark:from-green-400 dark:via-emerald-300 dark:to-green-200 bg-clip-text text-transparent">
              Civix Tax Impact Calculator
            </h1>
          </div>
          <p className="text-green-700 dark:text-green-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover how your tax contributions fund essential local services and build stronger communities across India
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200/50 dark:border-green-700/50 p-8 hover:shadow-3xl transition-all duration-300">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl p-6 mb-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-2 flex items-center">
                <div className="w-7 h-7 -ml-7" />
                ₹ Your Tax Information
              </h2>
              <p className="text-green-100 dark:text-emerald-100">Enter your details to see your community impact</p>
            </div>
            
            <div className="space-y-8">
              <div className="group">
                <label className="block text-sm font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-full mr-2"></span>
                  Annual Household Income
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="e.g., 800000"
                    className="w-full p-5 pl-12 bg-white dark:bg-gray-700 border-2 border-green-200 dark:border-green-600 rounded-2xl focus:border-green-500 dark:focus:border-green-400 focus:outline-none text-lg dark:text-white shadow-sm group-hover:shadow-md transition-all duration-200 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 dark:text-green-400 font-medium">₹</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-full mr-2"></span>
                  Property Value
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    placeholder="e.g., 5000000"
                    className="w-full p-5 pl-12 bg-white dark:bg-gray-700 border-2 border-green-200 dark:border-green-600 rounded-2xl focus:border-green-500 dark:focus:border-green-400 focus:outline-none text-lg dark:text-white shadow-sm group-hover:shadow-md transition-all duration-200 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 dark:text-green-400 font-medium">₹</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-full mr-2"></span>
                  Municipality Type
                </label>
                <select
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="w-full p-5 bg-white dark:bg-gray-700 border-2 border-green-200 dark:border-green-600 rounded-2xl focus:border-green-500 dark:focus:border-green-400 focus:outline-none text-lg dark:text-white shadow-sm group-hover:shadow-md transition-all duration-200 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50"
                >
                  <option value="small">Small Town (&lt;50k population)</option>
                  <option value="medium">Medium City (50k-200k)</option>
                  <option value="large">Large City (&gt;200k)</option>
                </select>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl p-8 shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-8 h-8 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center mr-3">
                </div>
                Your Annual Tax Contribution
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg bg-white/10 dark:bg-white/20 rounded-xl p-4">
                  <span className="text-green-100 dark:text-emerald-100">Local Income Tax:</span>
                  <span className="font-bold text-2xl">{formatCurrency(calculations.incomeTax)}</span>
                </div>
                <div className="flex justify-between items-center text-lg bg-white/10 dark:bg-white/20 rounded-xl p-4">
                  <span className="text-green-100 dark:text-emerald-100">Property Tax:</span>
                  <span className="font-bold text-2xl">{formatCurrency(calculations.propertyTax)}</span>
                </div>
                <div className="bg-white/20 dark:bg-white/30 rounded-xl p-6 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Total Annual Taxes:</span>
                    <span className="text-3xl font-bold">{formatCurrency(calculations.totalTax)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200/50 dark:border-green-700/50 p-8 hover:shadow-3xl transition-all duration-300">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700 rounded-2xl p-6 mb-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-2">
                How Your Taxes Fund Local Services
              </h2>
              <p className="text-emerald-100 dark:text-green-100">
                Based on {calculations.municipality} budget allocation
              </p>
            </div>

            <div className="space-y-6">
              {calculations.serviceBreakdown.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.service} className="group bg-gradient-to-r from-white to-green-50/50 dark:from-gray-700 dark:to-green-900/30 rounded-2xl p-6 border-2 border-green-100/50 dark:border-green-600/30 hover:border-green-300 dark:hover:border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 p-3 rounded-xl shadow-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-green-900 dark:text-green-100 text-xl">{service.service}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-900 dark:text-green-100 text-2xl">{formatCurrency(service.amount)}</div>
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-full">
                          {service.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-green-100 dark:bg-gray-600 rounded-full h-4 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-500 h-4 rounded-full transition-all duration-1000 shadow-sm"
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {calculations.totalTax > 0 && (
              <div className="mt-10 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 dark:from-green-600 dark:via-emerald-600 dark:to-green-700 rounded-2xl p-8 shadow-2xl text-white">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold">Your Community Impact</h3>
                </div>
                <p className="text-green-50 dark:text-emerald-50 text-lg leading-relaxed">
                  Your {formatCurrency(calculations.totalTax)} in annual local taxes helps fund essential services 
                  that keep your community safe, educated, and thriving. Every rupee makes a difference in 
                  building a better place to live, work, and raise families across India.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-full shadow-xl border border-green-400/30 dark:border-green-500/50">
            <div className="w-6 h-6 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white font-bold text-lg">
              Powered by Civix - Understanding Your Community
            </span>
          </div>
          <div className="mt-8 max-w-4xl mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
            <p className="text-green-700 dark:text-green-300 text-base leading-relaxed">
              Tax rates and service allocations are estimates based on typical Indian municipal budgets. 
              Actual rates may vary by state and local government. Consult your local municipal corporation 
              or panchayat for precise figures and current tax policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxImpact;
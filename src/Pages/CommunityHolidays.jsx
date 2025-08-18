import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

const CommunityHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const countryCode = "IN";
  const year = new Date().getFullYear();
  const apiKey = process.env.REACT_APP_CALENDARIFIC_KEY;

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          "https://calendarific.com/api/v2/holidays",
          {
            params: {
              api_key: apiKey,
              country: countryCode,
              year: year,
            },
          }
        );
        const upcomingHolidays = response.data.response.holidays.filter(
          (holiday) => new Date(holiday.date.iso) >= new Date()
        );
        setHolidays(upcomingHolidays);
      } catch (err) {
        console.error("Error fetching holidays:", err);
        setError("Failed to fetch holidays. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, [apiKey, countryCode, year]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const holidayDate = new Date(dateString);
    const diffTime = holidayDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-emerald-600 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Civix Community</h1>
            <p className="text-xl text-slate-600 mb-8">Loading upcoming holidays...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-6">
              <Calendar className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Civix Community</h1>
            <div className="bg-white border border-red-200 rounded-2xl p-6 max-w-md mx-auto shadow-sm">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Civix Community</h1>
                <p className="text-slate-600">Upcoming Holidays</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <MapPin className="w-4 h-4" />
              <span>India • {year}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {holidays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {holidays.map((holiday) => {
              const daysUntil = getDaysUntil(holiday.date.iso);
              return (
                <div
                  key={holiday.date.iso}
                  className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100/50 hover:border-emerald-200 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                        Holiday
                      </span>
                    </div>
                    {daysUntil <= 7 && (
                      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Soon
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                    {holiday.name}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-slate-600">
                      <Calendar className="w-5 h-5 text-emerald-500" />
                      <span className="font-medium">{formatDate(holiday.date.iso)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-600">
                      <Clock className="w-5 h-5 text-emerald-500" />
                      <span>
                        {daysUntil === 0 
                          ? "Today!" 
                          : daysUntil === 1 
                          ? "Tomorrow" 
                          : `${daysUntil} days away`
                        }
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-emerald-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-500">Days remaining</span>
                      <span className="text-sm font-semibold text-emerald-600">{daysUntil}</span>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, Math.min(100, (30 - daysUntil) * 3))}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-3xl mb-6">
              <Calendar className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">No Upcoming Holidays</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              We couldn't find any upcoming holidays for this year. Check back later or refresh the page.
            </p>
          </div>
        )}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-2 text-slate-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Powered by Civix Community Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHolidays;
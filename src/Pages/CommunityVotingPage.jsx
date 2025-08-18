import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Clock, AlertTriangle, CheckCircle, TrendingUp, Filter, ChevronDown } from "lucide-react";

const CommunityVotingPage = () => {
  const handleGoBack = () => {
    console.log("Going back...");
  };
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [sortBy, setSortBy] = useState("Most Votes");
  const [isDark, setIsDark] = useState(false);
  const [votedIssues, setVotedIssues] = useState({}); // New state to track voted issues

  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Pothole on Main Street",
      area: "Noida",
      daysOpen: 3,
      votes: 15,
      accidentsReported: 2,
      status: "Open",
      priority: "high"
    },
    {
      id: 2,
      title: "Broken Street Light",
      area: "East Delhi",
      daysOpen: 5,
      votes: 8,
      accidentsReported: 1,
      status: "Open",
      priority: "medium"
    },
    {
      id: 3,
      title: "Garbage Not Collected",
      area: "South Delhi",
      daysOpen: 7,
      votes: 22,
      accidentsReported: 0,
      status: "Open",
      priority: "low"
    },
    {
      id: 4,
      title: "Water Leakage Issue",
      area: "West Delhi",
      daysOpen: 2,
      votes: 32,
      accidentsReported: 0,
      status: "In Progress",
      priority: "high"
    }
  ]);

  const areas = ["All Areas", "Noida", "East Delhi", "West Delhi", "North Delhi", "South Delhi", "Ghaziabad"];
  const sortOptions = ["Most Votes", "Most Recent", "Longest Open", "Most Accidents"];

  const filteredIssues = issues
    .filter(issue => selectedArea === "All Areas" || issue.area === selectedArea)
    .sort((a, b) => {
      if (sortBy === "Most Votes") return b.votes - a.votes;
      if (sortBy === "Most Recent") return b.daysOpen - a.daysOpen;
      if (sortBy === "Longest Open") return a.daysOpen - b.daysOpen;
      if (sortBy === "Most Accidents") return b.accidentsReported - a.accidentsReported;
      return 0;
    });

  const handleVote = (id) => {
    const hasVoted = votedIssues[id];
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, votes: hasVoted ? issue.votes - 1 : issue.votes + 1 } : issue
    ));

    setVotedIssues(prevVotedIssues => ({
      ...prevVotedIssues,
      [id]: !prevVotedIssues[id] // Toggle the vote status for the issue ID
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'In Progress': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Resolved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 transition-colors duration-300">
        <button
          className="absolute top-20 left-4 z-20 group flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200 transition-all duration-200 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-lg backdrop-blur-sm"
          onClick={() => window.history.back()}
          type="button"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Community Voting
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Help prioritize local issues in your area</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Issues</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{issues.length}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Votes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{issues.reduce((sum, issue) => sum + issue.votes, 0)}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Active Areas</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{areas.length - 1}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Area</label>
                <div className="relative">
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  >
                    {areas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {filteredIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  layout
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{issue.title}</h3>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{issue.area}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                            {issue.priority} priority
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)} mt-2 sm:mt-0`}>
                        {issue.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{issue.daysOpen}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Days Open</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center justify-center mb-1">
                          <AlertTriangle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{issue.accidentsReported}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Accidents</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{issue.votes}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Votes</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Community Support</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{Math.min(issue.votes * 5, 100)}%</span>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(issue.votes * 5, 100)}%` }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          key={`progress-${issue.id}-${issue.votes}`}
                        />
                      </div>

                      <motion.button
                        onClick={() => handleVote(issue.id)}
                        className={`w-full text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 ${votedIssues[issue.id] ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {votedIssues[issue.id] ? <CheckCircle className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                        <span>{votedIssues[issue.id] ? `Voted (${issue.votes})` : `Vote for This Issue (${issue.votes})`}</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredIssues.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No issues found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more issues.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityVotingPage;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Vote, 
  BarChart3, 
  Users, 
  Clock, 
  Shield,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

const VotingSystem = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [polls, setPolls] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newOptions, setNewOptions] = useState('');
  const [votedPolls, setVotedPolls] = useState(new Set());

  useEffect(() => {
  }, []);

  const handleVote = (pollId, optionIndex) => {
    if (votedPolls.has(pollId)) return;
    
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          const updatedVotes = [...poll.votes];
          updatedVotes[optionIndex] = (updatedVotes[optionIndex] || 0) + 1;
          return { ...poll, votes: updatedVotes };
        }
        return poll;
      })
    );
    setVotedPolls(prev => new Set([...prev, pollId]));
  };

  const handleCreatePoll = (e) => {
    e.preventDefault();
    const optionsArray = newOptions.split('\n').map(opt => opt.trim()).filter(opt => opt);
    if (!newTitle.trim() || optionsArray.length < 2) {
      return;
    }
    const newPoll = {
      id: Date.now(),
      title: newTitle.trim(),
      options: optionsArray,
      votes: Array(optionsArray.length).fill(0),
    };
    setPolls((prevPolls) => [...prevPolls, newPoll]);
    setNewTitle('');
    setNewOptions('');
    setActiveTab('browse');
  };

  const getTotalVotes = (poll) => poll.votes.reduce((a, v) => a + v, 0);
  const getVotePercentage = (votes, total) => total > 0 ? Math.round((votes / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 rounded-2xl mb-6 shadow-lg">
            <Vote className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
            Voting System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create engaging polls and gather insights with our modern, secure voting platform. 
            Real-time results with beautiful analytics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-green-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center">
                <Vote className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Active Polls</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{polls.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-green-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Votes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {polls.reduce((acc, poll) => acc + poll.votes.reduce((a, v) => a + v, 0), 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-green-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Engagement</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {polls.length > 0 ? Math.round(polls.reduce((acc, poll) => acc + poll.votes.reduce((a, v) => a + v, 0), 0) / polls.length) : 0}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-green-100 dark:border-gray-700 rounded-2xl shadow-lg mb-8 overflow-hidden"
        >
          <div className="flex">
            {[
              { id: 'browse', label: 'Browse Polls', icon: Vote },
              { id: 'create', label: 'Create Poll', icon: Plus },
              { id: 'results', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-8 py-6 text-sm font-semibold transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-green-100 dark:border-gray-700 rounded-2xl shadow-lg p-8"
        >
          {activeTab === 'browse' && (
            <div className="space-y-6">
              {polls.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Vote className="w-12 h-12 text-green-500 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No polls yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Create your first poll to get started with collecting votes!</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Create Poll
                  </button>
                </div>
              ) : (
                polls.map((poll) => {
                  const totalVotes = getTotalVotes(poll);
                  const hasVoted = votedPolls.has(poll.id);
                  
                  return (
                    <div key={poll.id} className="border border-green-200 dark:border-gray-600 rounded-xl p-6 bg-gradient-to-br from-white to-green-50/50 dark:from-gray-800 dark:to-gray-700/50 hover:shadow-lg transition-all duration-300">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{poll.title}</h3>
                      
                      {!hasVoted ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {poll.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleVote(poll.id, idx)}
                              className="bg-white dark:bg-gray-700 border-2 border-green-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-md text-left"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {poll.options.map((option, idx) => {
                            const votes = poll.votes[idx] || 0;
                            const percentage = getVotePercentage(votes, totalVotes);
                            return (
                              <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-green-200 dark:border-gray-600">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium text-gray-800 dark:text-gray-200">{option}</span>
                                  <span className="text-sm text-gray-600 dark:text-gray-300">{votes} votes ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="flex items-center text-green-600 dark:text-green-400 mt-4">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            <span className="font-medium">You voted in this poll</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
          
          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New Poll</h2>
                <p className="text-gray-600 dark:text-gray-300">Design an engaging poll to gather opinions from your audience</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Poll Question
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-xl border-2 border-green-200 dark:border-gray-600 px-4 py-4 text-lg focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/20 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="What would you like to ask?"
                  />
                </div>
                
                <div>
                  <label htmlFor="options" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Answer Options
                  </label>
                  <textarea
                    id="options"
                    value={newOptions}
                    onChange={(e) => setNewOptions(e.target.value)}
                    rows={6}
                    className="w-full rounded-xl border-2 border-green-200 dark:border-gray-600 px-4 py-4 text-lg focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/20 transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Enter each option on a new line&#10;Option 1&#10;Option 2&#10;Option 3"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enter at least 2 options, one per line</p>
                </div>
                
                <button
                  onClick={handleCreatePoll}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Poll
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'results' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Poll Analytics</h2>
                <p className="text-gray-600 dark:text-gray-300">Detailed insights and voting patterns</p>
              </div>
              
              <div className="space-y-8">
                {polls.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BarChart3 className="w-12 h-12 text-green-500 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No analytics available</h3>
                    <p className="text-gray-600 dark:text-gray-300">Create and vote on polls to see detailed analytics here.</p>
                  </div>
                ) : (
                  polls.map((poll) => {
                    const totalVotes = getTotalVotes(poll);
                    return (
                      <div key={poll.id} className="border border-green-200 dark:border-gray-600 rounded-xl p-6 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-800 dark:to-gray-700/30">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{poll.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">Total responses: {totalVotes}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Engagement</div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalVotes > 0 ? '100%' : '0%'}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {poll.options.map((option, idx) => {
                            const votes = poll.votes[idx] || 0;
                            const percentage = getVotePercentage(votes, totalVotes);
                            const isLeading = totalVotes > 0 && votes === Math.max(...poll.votes);
                            
                            return (
                              <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-green-200 dark:border-gray-600">
                                <div className="flex justify-between items-center mb-3">
                                  <div className="flex items-center">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{option}</span>
                                    {isLeading && totalVotes > 0 && (
                                      <span className="ml-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-1 rounded-full">
                                        Leading
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-gray-900 dark:text-white">{votes}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{percentage}%</div>
                                  </div>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                                  <div
                                    className={`h-3 rounded-full transition-all duration-700 ${
                                      isLeading && totalVotes > 0
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400'
                                        : 'bg-gradient-to-r from-green-300 to-emerald-300 dark:from-green-600 dark:to-emerald-600'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VotingSystem;
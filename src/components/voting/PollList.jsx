import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Vote, 
  Clock, 
  Users, 
  Eye,
  Calendar,
  Tag,
  TrendingUp,
  Shield
} from 'lucide-react';

const PollList = ({ onPollSelect, selectedPoll }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for demonstration
  const mockPolls = [
    {
      _id: '1',
      title: 'Community Center Location',
      description: 'Help decide where to build the new community center in our city.',
      category: 'Community',
      totalVotes: 156,
      uniqueVoters: 142,
      startDate: '2024-01-15T00:00:00Z',
      endDate: '2024-02-15T23:59:59Z',
      status: 'active',
      isAnonymous: false,
      requireVerification: true,
      publicAccess: true,
      questions: [
        {
          _id: 'q1',
          text: 'Where should the new community center be built?',
          type: 'single_choice',
          options: [
            { _id: 'opt1', text: 'Downtown Area' },
            { _id: 'opt2', text: 'Northside Park' },
            { _id: 'opt3', text: 'Riverside District' },
            { _id: 'opt4', text: 'Westside Plaza' }
          ]
        }
      ]
    },
    {
      _id: '2',
      title: 'School Budget Priorities',
      description: 'Vote on how to allocate the school district budget for the upcoming year.',
      category: 'Education',
      totalVotes: 89,
      uniqueVoters: 89,
      startDate: '2024-01-10T00:00:00Z',
      endDate: '2024-02-10T23:59:59Z',
      status: 'ended',
      isAnonymous: true,
      requireVerification: false,
      publicAccess: true,
      questions: [
        {
          _id: 'q1',
          text: 'Which areas should receive increased funding?',
          type: 'multiple_choice',
          options: [
            { _id: 'opt1', text: 'Technology & Computers' },
            { _id: 'opt2', text: 'Sports & Athletics' },
            { _id: 'opt3', text: 'Arts & Music' },
            { _id: 'opt4', text: 'Library Resources' },
            { _id: 'opt5', text: 'Science Labs' }
          ]
        }
      ]
    },
    {
      _id: '3',
      title: 'City Park Improvements',
      description: 'Choose which improvements to make to our city parks.',
      category: 'Community',
      totalVotes: 234,
      uniqueVoters: 198,
      startDate: '2024-02-01T00:00:00Z',
      endDate: '2024-03-01T23:59:59Z',
      status: 'active',
      isAnonymous: false,
      requireVerification: true,
      publicAccess: false,
      questions: [
        {
          _id: 'q1',
          text: 'What improvements would you like to see?',
          type: 'multiple_choice',
          options: [
            { _id: 'opt1', text: 'New Playground Equipment' },
            { _id: 'opt2', text: 'Walking Trails' },
            { _id: 'opt3', text: 'Picnic Areas' },
            { _id: 'opt4', text: 'Sports Facilities' },
            { _id: 'opt5', text: 'Dog Parks' }
          ]
        }
      ]
    },
    {
      _id: '4',
      title: 'Public Transportation Survey',
      description: 'Share your thoughts on improving public transportation in the city.',
      category: 'Transportation',
      totalVotes: 67,
      uniqueVoters: 67,
      startDate: '2024-01-20T00:00:00Z',
      endDate: '2024-02-20T23:59:59Z',
      status: 'active',
      isAnonymous: true,
      requireVerification: false,
      publicAccess: true,
      questions: [
        {
          _id: 'q1',
          text: 'How often do you use public transportation?',
          type: 'single_choice',
          options: [
            { _id: 'opt1', text: 'Daily' },
            { _id: 'opt2', text: 'Weekly' },
            { _id: 'opt3', text: 'Monthly' },
            { _id: 'opt4', text: 'Rarely' },
            { _id: 'opt5', text: 'Never' }
          ]
        },
        {
          _id: 'q2',
          text: 'What would improve your public transportation experience?',
          type: 'text_input',
          options: []
        }
      ]
    }
  ];

  const categories = ['All', 'Community', 'Education', 'Transportation', 'Politics', 'Business', 'Health', 'Environment'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPolls(mockPolls);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poll.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || poll.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPolls = [...filteredPolls].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.startDate) - new Date(a.startDate);
      case 'oldest':
        return new Date(a.startDate) - new Date(b.startDate);
      case 'most_votes':
        return b.totalVotes - a.totalVotes;
      case 'ending_soon':
        return new Date(a.endDate) - new Date(b.endDate);
      default:
        return 0;
    }
  });

  const getStatusColor = (status, endDate) => {
    if (status === 'ended' || new Date(endDate) < new Date()) {
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
    return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
  };

  const getStatusText = (status, endDate) => {
    if (status === 'ended' || new Date(endDate) < new Date()) {
      return 'Ended';
    }
    return 'Active';
  };

  const formatTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h remaining`;
    return 'Ending soon';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Available Polls
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Available Polls ({filteredPolls.length})
        </h3>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search polls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most_votes">Most Votes</option>
              <option value="ending_soon">Ending Soon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Polls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPolls.map((poll) => (
          <motion.div
            key={poll._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
            onClick={() => onPollSelect(poll)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {poll.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {poll.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(poll.status, poll.endDate)}`}>
                {getStatusText(poll.status, poll.endDate)}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                {poll.category}
              </span>
              {poll.isAnonymous && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                  Anonymous
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                {poll.totalVotes} total votes
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                {formatTimeRemaining(poll.endDate)}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Tag className="w-4 h-4 mr-2" />
                {poll.questions.length} question{poll.questions.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Security Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                {poll.requireVerification && (
                  <Shield className="w-3 h-3 mr-1" />
                )}
                {poll.requireVerification ? 'Verified' : 'Open'}
              </div>
              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Vote Now →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPolls.length === 0 && (
        <div className="text-center py-12">
          <Vote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No polls found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default PollList;

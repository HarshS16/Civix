import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  Download, 
  Share2, 
  Eye,
  EyeOff,
  Users,
  Clock,
  TrendingUp,
  FileText,
  FileSpreadsheet,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

const PollResults = () => {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('chart'); // chart, table, export
  const [showVoterDetails, setShowVoterDetails] = useState(false);

  // Mock data for demonstration
  const mockPolls = [
    {
      _id: '1',
      title: 'Community Center Location',
      category: 'Community',
      totalVotes: 156,
      uniqueVoters: 142,
      endDate: '2024-02-15T23:59:59Z',
      questions: [
        {
          _id: 'q1',
          text: 'Where should the new community center be built?',
          type: 'single_choice',
          options: [
            { _id: 'opt1', text: 'Downtown Area', votes: 67, percentage: 42.9 },
            { _id: 'opt2', text: 'Northside Park', votes: 45, percentage: 28.8 },
            { _id: 'opt3', text: 'Riverside District', votes: 34, percentage: 21.8 },
            { _id: 'opt4', text: 'Westside Plaza', votes: 10, percentage: 6.4 }
          ]
        }
      ]
    },
    {
      _id: '2',
      title: 'School Budget Priorities',
      category: 'Education',
      totalVotes: 89,
      uniqueVoters: 89,
      endDate: '2024-02-10T23:59:59Z',
      questions: [
        {
          _id: 'q1',
          text: 'Which areas should receive increased funding?',
          type: 'multiple_choice',
          options: [
            { _id: 'opt1', text: 'Technology & Computers', votes: 67, percentage: 75.3 },
            { _id: 'opt2', text: 'Sports & Athletics', votes: 45, percentage: 50.6 },
            { _id: 'opt3', text: 'Arts & Music', votes: 52, percentage: 58.4 },
            { _id: 'opt4', text: 'Library Resources', votes: 38, percentage: 42.7 },
            { _id: 'opt5', text: 'Science Labs', votes: 61, percentage: 68.5 }
          ]
        }
      ]
    }
  ];

  const mockResults = {
    totalVotes: 156,
    uniqueVoters: 142,
    questions: [
      {
        questionId: 'q1',
        questionText: 'Where should the new community center be built?',
        questionType: 'single_choice',
        totalResponses: 156,
        options: [
          { optionId: 'opt1', optionText: 'Downtown Area', votes: 67, percentage: 42.9 },
          { optionId: 'opt2', optionText: 'Northside Park', votes: 45, percentage: 28.8 },
          { optionId: 'opt3', optionText: 'Riverside District', votes: 34, percentage: 21.8 },
          { optionId: 'opt4', optionText: 'Westside Plaza', votes: 10, percentage: 6.4 }
        ]
      }
    ]
  };

  useEffect(() => {
    if (selectedPoll) {
      loadResults(selectedPoll._id);
    }
  }, [selectedPoll]);

  const loadResults = async (pollId) => {
    setLoading(true);
    try {
      // Here you would make API call to get results
      // const response = await fetch(`/api/polls/${pollId}/results`);
      // const data = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResults(mockResults);
    } catch (error) {
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const exportResults = (format) => {
    try {
      let content = '';
      let filename = `poll-results-${selectedPoll._id}`;
      let mimeType = '';

      switch (format) {
        case 'csv':
          content = generateCSV();
          filename += '.csv';
          mimeType = 'text/csv';
          break;
        case 'json':
          content = JSON.stringify(results, null, 2);
          filename += '.json';
          mimeType = 'application/json';
          break;
        default:
          return;
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`${format.toUpperCase()} export successful`);
    } catch (error) {
      toast.error('Export failed');
    }
  };

  const generateCSV = () => {
    let csv = 'Question,Option,Votes,Percentage\n';
    
    results.questions.forEach(question => {
      question.options.forEach(option => {
        csv += `"${question.questionText}","${option.optionText}",${option.votes},${option.percentage}%\n`;
      });
    });
    
    return csv;
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedPoll.title,
        text: `Check out the results for "${selectedPoll.title}"`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const renderChart = (question) => {
    const maxVotes = Math.max(...question.options.map(opt => opt.votes));
    
    return (
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div key={option.optionId} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {option.optionText}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {option.votes} votes ({option.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(option.votes / maxVotes) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTable = (question) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Option
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Votes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {question.options.map((option) => (
              <tr key={option.optionId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {option.optionText}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {option.votes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {option.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (!selectedPoll) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Poll Results
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPolls.map((poll) => (
            <div
              key={poll._id}
              onClick={() => setSelectedPoll(poll)}
              className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {poll.title}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {poll.category}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  {poll.totalVotes} total votes
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  Ended {new Date(poll.endDate).toLocaleDateString()}
                </div>
              </div>
              
              <div className="mt-4">
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                  View Results →
                </button>
              </div>
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
        <div>
          <button
            onClick={() => setSelectedPoll(null)}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium mb-2"
          >
            ← Back to Polls
          </button>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {selectedPoll.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedPoll.category} • {selectedPoll.totalVotes} votes
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('chart')}
            className={`p-2 rounded-md ${
              viewMode === 'chart' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-md ${
              viewMode === 'table' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <FileText className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('export')}
            className={`p-2 rounded-md ${
              viewMode === 'export' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Votes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {results?.totalVotes || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Unique Voters</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {results?.uniqueVoters || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {new Date(selectedPoll.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="w-8 h-8 text-blue-500 mx-auto animate-spin" />
            <p className="text-gray-600 dark:text-gray-400 mt-2">Loading results...</p>
          </div>
        ) : (
          <div className="p-6">
            {viewMode === 'chart' && (
              <div className="space-y-8">
                {results?.questions.map((question, index) => (
                  <div key={question.questionId} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {index + 1}. {question.questionText}
                    </h4>
                    {renderChart(question)}
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'table' && (
              <div className="space-y-8">
                {results?.questions.map((question, index) => (
                  <div key={question.questionId} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {index + 1}. {question.questionText}
                    </h4>
                    {renderTable(question)}
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'export' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Export Results
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Download the poll results in your preferred format
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => exportResults('csv')}
                    className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    <FileSpreadsheet className="w-8 h-8 text-green-500 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">CSV Export</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Spreadsheet format</p>
                    </div>
                  </button>

                  <button
                    onClick={() => exportResults('json')}
                    className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    <FileText className="w-8 h-8 text-blue-500 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">JSON Export</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Data format</p>
                    </div>
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={shareResults}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PollResults;

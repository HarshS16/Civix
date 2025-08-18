import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Vote, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Clock,
  Users,
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail
} from 'lucide-react';
import toast from 'react-hot-toast';

const PollVoting = ({ poll, onClose, onVoteSubmitted }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [voterData, setVoterData] = useState({
    email: '',
    name: '',
    verificationCode: ''
  });
  const [answers, setAnswers] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Calculate time remaining
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const endTime = new Date(poll.endDate).getTime();
      const remaining = Math.max(0, endTime - now);
      setTimeRemaining(remaining);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [poll.endDate]);

  const formatTimeRemaining = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const handleVerification = async () => {
    try {
      // Here you would make API call to verify voter
      console.log('Verifying voter:', voterData.email);
      
      // Simulate verification
      setIsVerified(true);
      setShowVerification(true);
      toast.success('Verification code sent to your email');
    } catch (error) {
      toast.error('Failed to send verification code');
    }
  };

  const handleVerifyCode = async () => {
    try {
      // Here you would verify the code with API
      console.log('Verifying code:', voterData.verificationCode);
      
      // Simulate verification
      if (voterData.verificationCode === '123456') { // Demo code
        setIsVerified(true);
        setCurrentStep(2);
        toast.success('Verification successful!');
      } else {
        toast.error('Invalid verification code');
      }
    } catch (error) {
      toast.error('Verification failed');
    }
  };

  const handleAnswerChange = (questionId, value, questionType) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        questionId,
        selectedOptions: questionType === 'single_choice' ? [value] : 
                        questionType === 'multiple_choice' ? 
                          (prev[questionId]?.selectedOptions || []).includes(value) ?
                            (prev[questionId]?.selectedOptions || []).filter(v => v !== value) :
                            [...(prev[questionId]?.selectedOptions || []), value] : [],
        rankedOptions: questionType === 'ranked_voting' ? value : undefined,
        textAnswer: questionType === 'text_input' ? value : undefined
      }
    }));
  };

  const handleSubmitVote = async () => {
    try {
      // Validate all required questions are answered
      const requiredQuestions = poll.questions.filter(q => q.required);
      const answeredQuestions = Object.keys(answers);
      
      const missingQuestions = requiredQuestions.filter(q => 
        !answeredQuestions.includes(q._id)
      );

      if (missingQuestions.length > 0) {
        toast.error(`Please answer all required questions: ${missingQuestions.map(q => q.text).join(', ')}`);
        return;
      }

      // Here you would make API call to submit vote
      console.log('Submitting vote:', {
        answers: Object.values(answers),
        voterEmail: voterData.email,
        voterName: voterData.name
      });

      toast.success('Vote submitted successfully!');
      onVoteSubmitted?.();
    } catch (error) {
      toast.error('Failed to submit vote');
    }
  };

  const renderQuestion = (question, index) => {
    const answer = answers[question._id];

    switch (question.type) {
      case 'single_choice':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option._id} className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option._id}
                  checked={answer?.selectedOptions?.includes(option._id)}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value, 'single_choice')}
                  className="mr-3"
                  required={question.required}
                />
                <span className="text-gray-900 dark:text-white">{option.text}</span>
              </label>
            ))}
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option._id} className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  value={option._id}
                  checked={answer?.selectedOptions?.includes(option._id)}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value, 'multiple_choice')}
                  className="mr-3"
                  disabled={answer?.selectedOptions?.length >= question.maxSelections && !answer?.selectedOptions?.includes(option._id)}
                />
                <span className="text-gray-900 dark:text-white">{option.text}</span>
              </label>
            ))}
            {question.maxSelections > 1 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Select up to {question.maxSelections} options
              </p>
            )}
          </div>
        );

      case 'ranked_voting':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Drag to reorder or use the dropdown to rank options (1 = highest preference)
            </p>
            {question.options.map((option, optionIndex) => (
              <div key={option._id} className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <span className="text-gray-900 dark:text-white flex-1">{option.text}</span>
                <select
                  value={answer?.rankedOptions?.indexOf(option._id) + 1 || ''}
                  onChange={(e) => {
                    const newRankings = [...(answer?.rankedOptions || [])];
                    const rank = parseInt(e.target.value);
                    if (rank) {
                      // Remove from current position
                      const currentIndex = newRankings.indexOf(option._id);
                      if (currentIndex > -1) {
                        newRankings.splice(currentIndex, 1);
                      }
                      // Insert at new position
                      newRankings.splice(rank - 1, 0, option._id);
                    }
                    handleAnswerChange(question._id, newRankings, 'ranked_voting');
                  }}
                  className="ml-3 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="">-</option>
                  {question.options.map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );

      case 'text_input':
        return (
          <div>
            <textarea
              value={answer?.textAnswer || ''}
              onChange={(e) => handleAnswerChange(question._id, e.target.value, 'text_input')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your answer..."
              required={question.required}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Vote className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {poll.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {poll.category} • {poll.totalVotes} votes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Time Remaining */}
        {timeRemaining > 0 && (
          <div className="px-6 py-3 bg-orange-50 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800">
            <div className="flex items-center text-orange-700 dark:text-orange-300">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                Poll ends in: {formatTimeRemaining(timeRemaining)}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Voter Verification
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Please verify your identity to participate in this poll
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={voterData.email}
                      onChange={(e) => setVoterData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your email"
                    />
                  </div>

                  {!poll.isAnonymous && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={voterData.name}
                        onChange={(e) => setVoterData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                  )}

                  {showVerification && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Verification Code *
                      </label>
                      <input
                        type="text"
                        value={voterData.verificationCode}
                        onChange={(e) => setVoterData(prev => ({ ...prev, verificationCode: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Demo code: 123456
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  {!showVerification ? (
                    <button
                      onClick={handleVerification}
                      disabled={!voterData.email}
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Verification Code
                    </button>
                  ) : (
                    <button
                      onClick={handleVerifyCode}
                      disabled={!voterData.verificationCode}
                      className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify Code
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <Vote className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Cast Your Vote
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Answer all questions to submit your vote
                  </p>
                </div>

                <div className="space-y-8">
                  {poll.questions.map((question, index) => (
                    <div key={question._id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                      <div className="mb-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          {index + 1}. {question.text}
                        </h4>
                        {question.required && (
                          <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      {renderQuestion(question, index)}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            
            {currentStep === 2 && (
              <button
                onClick={handleSubmitVote}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Vote className="w-4 h-4 mr-2" />
                Submit Vote
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PollVoting;

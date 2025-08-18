import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  ArrowRight, 
  ArrowLeft,
  Eye,
  EyeOff,
  Shield,
  Clock,
  Users,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

const PollCreation = ({ onClose, onPollCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pollData, setPollData] = useState({
    title: '',
    description: '',
    category: '',
    questions: [
      {
        text: '',
        type: 'single_choice',
        options: [
          { text: '', order: 0 },
          { text: '', order: 1 }
        ],
        required: true,
        maxSelections: 1,
        order: 0
      }
    ],
    isAnonymous: false,
    requireVerification: true,
    allowMultipleVotes: false,
    requireLogin: false,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    publicAccess: false,
    showResultsBeforeEnd: false,
    showResultsAfterEnd: true,
    showVoterNames: false,
    eligibleVoters: []
  });

  const [templates] = useState([
    {
      id: 'election',
      name: 'Election Poll',
      description: 'Standard election with single choice voting',
      icon: '🗳️',
      color: 'bg-blue-500'
    },
    {
      id: 'survey',
      name: 'Survey',
      description: 'Multiple choice survey with various questions',
      icon: '📊',
      color: 'bg-green-500'
    },
    {
      id: 'ranking',
      name: 'Ranking Poll',
      description: 'Rank candidates or options in order of preference',
      icon: '🏆',
      color: 'bg-purple-500'
    },
    {
      id: 'feedback',
      name: 'Feedback Form',
      description: 'Text-based feedback collection',
      icon: '💬',
      color: 'bg-orange-500'
    }
  ]);

  const questionTypes = [
    { value: 'single_choice', label: 'Single Choice', icon: '🔘' },
    { value: 'multiple_choice', label: 'Multiple Choice', icon: '☑️' },
    { value: 'ranked_voting', label: 'Ranked Voting', icon: '🏆' },
    { value: 'text_input', label: 'Text Input', icon: '📝' }
  ];

  const categories = [
    'Politics', 'Community', 'Education', 'Business', 
    'Entertainment', 'Technology', 'Health', 'Environment'
  ];

  const handleTemplateSelect = (template) => {
    let questions = [];
    
    switch (template.id) {
      case 'election':
        questions = [{
          text: 'Who would you vote for?',
          type: 'single_choice',
          options: [
            { text: 'Candidate A', order: 0 },
            { text: 'Candidate B', order: 1 },
            { text: 'Candidate C', order: 2 }
          ],
          required: true,
          maxSelections: 1,
          order: 0
        }];
        break;
      
      case 'survey':
        questions = [
          {
            text: 'What is your age group?',
            type: 'single_choice',
            options: [
              { text: '18-25', order: 0 },
              { text: '26-35', order: 1 },
              { text: '36-45', order: 2 },
              { text: '46+', order: 3 }
            ],
            required: true,
            maxSelections: 1,
            order: 0
          },
          {
            text: 'What topics interest you most?',
            type: 'multiple_choice',
            options: [
              { text: 'Technology', order: 0 },
              { text: 'Politics', order: 1 },
              { text: 'Environment', order: 2 },
              { text: 'Education', order: 3 }
            ],
            required: true,
            maxSelections: 3,
            order: 1
          }
        ];
        break;
      
      case 'ranking':
        questions = [{
          text: 'Rank these options in order of preference:',
          type: 'ranked_voting',
          options: [
            { text: 'Option A', order: 0 },
            { text: 'Option B', order: 1 },
            { text: 'Option C', order: 2 },
            { text: 'Option D', order: 3 }
          ],
          required: true,
          maxSelections: 1,
          order: 0
        }];
        break;
      
      case 'feedback':
        questions = [{
          text: 'Please provide your feedback:',
          type: 'text_input',
          options: [],
          required: true,
          maxSelections: 1,
          order: 0
        }];
        break;
    }

    setPollData(prev => ({
      ...prev,
      questions,
      category: template.name
    }));
    
    setCurrentStep(2);
  };

  const addQuestion = () => {
    setPollData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: '',
          type: 'single_choice',
          options: [
            { text: '', order: 0 },
            { text: '', order: 1 }
          ],
          required: true,
          maxSelections: 1,
          order: prev.questions.length
        }
      ]
    }));
  };

  const updateQuestion = (index, field, value) => {
    setPollData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const addOption = (questionIndex) => {
    setPollData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? { ...q, options: [...q.options, { text: '', order: q.options.length }] }
          : q
      )
    }));
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    setPollData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? {
              ...q,
              options: q.options.map((opt, j) => 
                j === optionIndex ? { ...opt, text: value } : opt
              )
            }
          : q
      )
    }));
  };

  const removeQuestion = (index) => {
    if (pollData.questions.length > 1) {
      setPollData(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate data
      if (!pollData.title || !pollData.category) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Here you would make API call to create poll
      console.log('Creating poll:', pollData);
      
      toast.success('Poll created successfully!');
      onPollCreated?.();
    } catch (error) {
      toast.error('Failed to create poll');
    }
  };

  const steps = [
    { number: 1, title: 'Choose Template', description: 'Select a template or start from scratch' },
    { number: 2, title: 'Poll Details', description: 'Configure basic poll information' },
    { number: 3, title: 'Questions', description: 'Add and configure poll questions' },
    { number: 4, title: 'Settings', description: 'Configure security and display options' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create New Poll
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.number
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                }`}>
                  {step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Choose a Template
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start with a pre-built template or create from scratch
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{template.icon}</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {template.name}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {template.description}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    Or start from scratch →
                  </button>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Poll Title *
                  </label>
                  <input
                    type="text"
                    value={pollData.title}
                    onChange={(e) => setPollData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter poll title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={pollData.description}
                    onChange={(e) => setPollData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Describe your poll..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={pollData.category}
                    onChange={(e) => setPollData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={pollData.startDate}
                      onChange={(e) => setPollData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={pollData.endDate}
                      onChange={(e) => setPollData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Poll Questions
                  </h3>
                  <button
                    onClick={addQuestion}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Question
                  </button>
                </div>

                {pollData.questions.map((question, qIndex) => (
                  <div key={qIndex} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Question {qIndex + 1}
                      </h4>
                      {pollData.questions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(qIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Question Text *
                        </label>
                        <input
                          type="text"
                          value={question.text}
                          onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter your question..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Question Type
                        </label>
                        <select
                          value={question.type}
                          onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          {questionTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.icon} {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {question.type !== 'text_input' && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Options
                            </label>
                            <button
                              onClick={() => addOption(qIndex)}
                              className="text-blue-600 hover:text-blue-700 text-sm"
                            >
                              + Add Option
                            </button>
                          </div>
                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => (
                              <input
                                key={oIndex}
                                type="text"
                                value={option.text}
                                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder={`Option ${oIndex + 1}...`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {question.type === 'multiple_choice' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Maximum Selections
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={question.options.length}
                            value={question.maxSelections}
                            onChange={(e) => updateQuestion(qIndex, 'maxSelections', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Security & Display Settings
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Security Settings
                    </h4>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pollData.isAnonymous}
                        onChange={(e) => setPollData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Anonymous voting
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pollData.requireVerification}
                        onChange={(e) => setPollData(prev => ({ ...prev, requireVerification: e.target.checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Require email verification
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pollData.allowMultipleVotes}
                        onChange={(e) => setPollData(prev => ({ ...prev, allowMultipleVotes: e.target.checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Allow multiple votes per person
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pollData.requireLogin}
                        onChange={(e) => setPollData(prev => ({ ...prev, requireLogin: e.target.checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Require user login
                      </span>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Display Settings
                    </h4>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pollData.publicAccess}
                        onChange={(e) => setPollData(prev => ({ ...prev, publicAccess: e.target.checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Public access (no invitation required)
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pollData.showResultsBeforeEnd}
                        onChange={(e) => setPollData(prev => ({ ...prev, showResultsBeforeEnd: e.target.checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Show results before poll ends
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pollData.showResultsAfterEnd}
                        onChange={(e) => setPollData(prev => ({ ...prev, showResultsAfterEnd: e.target.checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Show results after poll ends
                      </span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pollData.showVoterNames}
                        onChange={(e) => setPollData(prev => ({ ...prev, showVoterNames: e.target.checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Show voter names in results
                      </span>
                    </label>
                  </div>
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
            
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Create Poll
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PollCreation;

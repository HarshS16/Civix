import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Users, Vote, Building, Heart, BookOpen, Download, Play, CheckCircle, XCircle, RotateCcw, Trophy, Star, Brain, Target, Lightbulb, Award, Clock, TrendingUp, MessageCircle, Share2, Bookmark, Calendar, MapPin, Phone, Mail, ExternalLink, Zap, Globe, Shield, Scale, Gavel, FileText, PieChart, BarChart3, Activity, Sparkles, Rocket, Gamepad2, Gift, Medal, Crown, Flame } from 'lucide-react';

const CivicEducation = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [didYouKnowIndex, setDidYouKnowIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [bookmarkedSections, setBookmarkedSections] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [streakCount, setStreakCount] = useState(0);

  // Load saved data from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem('civicEducationQuizScore');
    const savedBookmarks = localStorage.getItem('civicEducationBookmarks');
    const savedProgress = localStorage.getItem('civicEducationProgress');
    const savedXP = localStorage.getItem('civicEducationXP');
    const savedLevel = localStorage.getItem('civicEducationLevel');
    const savedAchievements = localStorage.getItem('civicEducationAchievements');
    const savedStreak = localStorage.getItem('civicEducationStreak');

    if (savedScore) setQuizScore(parseInt(savedScore));
    if (savedBookmarks) setBookmarkedSections(JSON.parse(savedBookmarks));
    if (savedProgress) setReadingProgress(parseInt(savedProgress));
    if (savedXP) setUserXP(parseInt(savedXP));
    if (savedLevel) setUserLevel(parseInt(savedLevel));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedStreak) setStreakCount(parseInt(savedStreak));
  }, []);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.round((scrollTop / docHeight) * 100);
      setReadingProgress(progress);
      localStorage.setItem('civicEducationProgress', progress.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Did You Know facts rotation with more engaging content
  const didYouKnowFacts = [
    {
      fact: "The right to vote is considered one of the most fundamental civic rights in democratic societies.",
      icon: <Vote className="w-5 h-5" />,
      color: "emerald"
    },
    {
      fact: "Local governments typically handle services like water, sewage, parks, and local roads.",
      icon: <Building className="w-5 h-5" />,
      color: "blue"
    },
    {
      fact: "Citizens can attend city council meetings to voice their opinions on local issues.",
      icon: <Users className="w-5 h-5" />,
      color: "purple"
    },
    {
      fact: "The Freedom of Information Act allows citizens to request government documents.",
      icon: <FileText className="w-5 h-5" />,
      color: "orange"
    },
    {
      fact: "Community participation in local government can lead to a 40% increase in civic satisfaction.",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "pink"
    },
    {
      fact: "Young voters (18-29) have the power to significantly influence election outcomes.",
      icon: <Zap className="w-5 h-5" />,
      color: "yellow"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDidYouKnowIndex((prev) => (prev + 1) % didYouKnowFacts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
    // Award XP for exploring content
    if (activeAccordion !== index) {
      awardXP(10, 'Content Explorer');
    }
  };

  const toggleBookmark = (sectionId) => {
    const newBookmarks = bookmarkedSections.includes(sectionId)
      ? bookmarkedSections.filter(id => id !== sectionId)
      : [...bookmarkedSections, sectionId];

    setBookmarkedSections(newBookmarks);
    localStorage.setItem('civicEducationBookmarks', JSON.stringify(newBookmarks));

    if (!bookmarkedSections.includes(sectionId)) {
      awardXP(5, 'Bookworm');
    }
  };

  const awardXP = (points, reason) => {
    const newXP = userXP + points;
    const newLevel = Math.floor(newXP / 100) + 1;

    setUserXP(newXP);
    localStorage.setItem('civicEducationXP', newXP.toString());

    if (newLevel > userLevel) {
      setUserLevel(newLevel);
      localStorage.setItem('civicEducationLevel', newLevel.toString());
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    // Check for achievements
    checkAchievements(newXP, reason);
  };

  const checkAchievements = (xp, reason) => {
    const newAchievements = [...achievements];

    if (xp >= 50 && !achievements.includes('first-steps')) {
      newAchievements.push('first-steps');
    }
    if (quizScore >= 4 && !achievements.includes('quiz-master')) {
      newAchievements.push('quiz-master');
    }
    if (bookmarkedSections.length >= 3 && !achievements.includes('collector')) {
      newAchievements.push('collector');
    }

    if (newAchievements.length > achievements.length) {
      setAchievements(newAchievements);
      localStorage.setItem('civicEducationAchievements', JSON.stringify(newAchievements));
    }
  };

  const accordionData = [
    {
      id: 'civic-rights',
      title: "What Are Civic Rights?",
      icon: <Users className="w-5 h-5" />,
      difficulty: "Beginner",
      readTime: "3 min",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Civic rights are the fundamental freedoms and privileges that belong to citizens in a democratic society. These rights form the foundation of civic participation and democratic governance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white group hover:scale-[1.02] transition-all duration-300">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <Vote className="w-8 h-8 mr-3" />
                  <h4 className="text-xl font-bold">Political Rights</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Right to vote in elections</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Right to run for public office</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Right to petition the government</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Right to peaceful assembly</li>
                </ul>
              </div>
            </div>

            <div className="group hover:scale-[1.02] transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 mr-3" />
                  <h4 className="text-xl font-bold">Civil Liberties</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Freedom of speech and expression</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Freedom of religion</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Right to due process</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Right to equal protection</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Quick Fact
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              The Universal Declaration of Human Rights, adopted by the UN in 1948, outlines 30 fundamental rights that belong to every person, regardless of nationality, race, or religion.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'responsibilities',
      title: "Responsibilities of a Citizen",
      icon: <Heart className="w-5 h-5" />,
      difficulty: "Intermediate",
      readTime: "4 min",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 p-6 rounded-xl border border-pink-200 dark:border-pink-700">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Along with rights come responsibilities. Being an active citizen means contributing to your community and upholding democratic values through meaningful participation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Stay Informed",
                desc: "Keep up with local news and issues affecting your community",
                icon: <BookOpen className="w-6 h-6" />,
                color: "emerald"
              },
              {
                title: "Participate in Elections",
                desc: "Vote in all elections, from local to national",
                icon: <Vote className="w-6 h-6" />,
                color: "blue"
              },
              {
                title: "Serve on Juries",
                desc: "Participate in the justice system when called upon",
                icon: <Scale className="w-6 h-6" />,
                color: "purple"
              },
              {
                title: "Pay Taxes",
                desc: "Contribute to public services and infrastructure",
                icon: <PieChart className="w-6 h-6" />,
                color: "orange"
              },
              {
                title: "Volunteer",
                desc: "Give back to your community through service",
                icon: <Heart className="w-6 h-6" />,
                color: "pink"
              },
              {
                title: "Respect Others",
                desc: "Treat fellow citizens with dignity and respect",
                icon: <Users className="w-6 h-6" />,
                color: "indigo"
              }
            ].map((item, idx) => (
              <div key={idx} className="group hover:scale-[1.02] transition-all duration-300">
                <div className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-3">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                  </div>
                  <p className="text-white/90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 mr-3" />
              <h4 className="text-xl font-bold">Civic Engagement Challenge</h4>
            </div>
            <p className="mb-4">Try to complete at least 3 civic activities this month!</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/20 p-2 rounded text-center text-sm">Attend a meeting</div>
              <div className="bg-white/20 p-2 rounded text-center text-sm">Contact representative</div>
              <div className="bg-white/20 p-2 rounded text-center text-sm">Volunteer locally</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'local-government',
      title: "How Local Government Works",
      icon: <Building className="w-5 h-5" />,
      difficulty: "Advanced",
      readTime: "5 min",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Local government is the level of government closest to citizens, handling daily services and community issues that directly impact your life.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-8 rounded-xl shadow-xl">
            <h4 className="text-2xl font-bold mb-6 text-center">Structure of Local Government</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h5 className="font-semibold text-lg mb-2">Mayor/Manager</h5>
                <p className="text-white/90">Chief executive officer</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8" />
                </div>
                <h5 className="font-semibold text-lg mb-2">City Council</h5>
                <p className="text-white/90">Legislative body</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8" />
                </div>
                <h5 className="font-semibold text-lg mb-2">Departments</h5>
                <p className="text-white/90">Service delivery</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-emerald-500" />
                Services Provided
              </h4>
              <div className="space-y-3">
                {[
                  "Water and sewer systems",
                  "Waste management",
                  "Parks and recreation",
                  "Local roads and traffic",
                  "Building permits",
                  "Emergency services"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                Decision Making Process
              </h4>
              <div className="space-y-3">
                {[
                  "Public meetings and hearings",
                  "Community input sessions",
                  "Committee reviews",
                  "Council votes",
                  "Budget planning",
                  "Policy implementation"
                ].map((process, idx) => (
                  <div key={idx} className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-3">
                      {idx + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{process}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'participation',
      title: "How to Participate in Your Community",
      icon: <Vote className="w-5 h-5" />,
      difficulty: "Beginner",
      readTime: "4 min",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Active participation in your community strengthens democracy and creates positive change. Here are practical ways to get involved and make your voice heard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-xl text-gray-900 dark:text-white flex items-center
">
                <Rocket className="w-6 h-6 mr-2 text-emerald-500" />
                Direct Participation
              </h4>
              {[
                {
                  title: "Attend City Council Meetings",
                  desc: "Voice your opinions on local issues",
                  icon: <Users className="w-5 h-5" />,
                  color: "emerald"
                },
                {
                  title: "Join Community Organizations",
                  desc: "Connect with like-minded neighbors",
                  icon: <Heart className="w-5 h-5" />,
                  color: "blue"
                },
                {
                  title: "Volunteer for Causes",
                  desc: "Contribute time to important issues",
                  icon: <Gift className="w-5 h-5" />,
                  color: "purple"
                },
                {
                  title: "Use Civic Apps",
                  desc: "Report issues through platforms like Civix",
                  icon: <Sparkles className="w-5 h-5" />,
                  color: "pink"
                }
              ].map((item, idx) => (
                <div key={idx} className="group hover:scale-[1.02] transition-all duration-300">
                  <div className="border-l-4 border-emerald-500 bg-white dark:bg-gray-800 p-4 rounded-r-xl shadow-lg">
                    <div className="flex items-center mb-2">
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg mr-3">
                        {item.icon}
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">{item.title}</h5>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 ml-12">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-xl text-gray-900 dark:text-white flex items-center
">
                <Flame className="w-6 h-6 mr-2 text-orange-500" />
                Advocacy & Influence
              </h4>
              {[
                {
                  title: "Contact Representatives",
                  desc: "Share your views with elected officials",
                  icon: <Phone className="w-5 h-5" />,
                  color: "orange"
                },
                {
                  title: "Start or Sign Petitions",
                  desc: "Rally support for important causes",
                  icon: <FileText className="w-5 h-5" />,
                  color: "red"
                },
                {
                  title: "Organize Neighborhood Groups",
                  desc: "Build grassroots support",
                  icon: <Users className="w-5 h-5" />,
                  color: "indigo"
                },
                {
                  title: "Run for Office",
                  desc: "Become a representative yourself",
                  icon: <Crown className="w-5 h-5" />,
                  color: "yellow"
                }
              ].map((item, idx) => (
                <div key={idx} className="group hover:scale-[1.02] transition-all duration-300">
                  <div className="border-l-4 border-orange-500 bg-white dark:bg-gray-800 p-4 rounded-r-xl shadow-lg">
                    <div className="flex items-center mb-2">
                      <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mr-3">
                        {item.icon}
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">{item.title}</h5>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 ml-12">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Gamepad2 className="w-8 h-8 mr-3" />
                <h4 className="text-xl font-bold">Participation Challenge</h4>
              </div>
              <Medal className="w-8 h-8" />
            </div>
            <p className="mb-4">Complete these civic actions to earn badges and level up your civic engagement!</p>
            <div className="grid md:grid-cols-4 gap-3">
              <div className="bg-white/20 p-3 rounded-lg text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm">Attend 1 Meeting</div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg text-center">
                <MessageCircle className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm">Contact Rep</div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg text-center">
                <Share2 className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm">Share Knowledge</div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg text-center">
                <Vote className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm">Vote in Election</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const quizQuestions = [
    {
      question: "What is the primary purpose of local government?",
      options: [
        "To enforce federal laws",
        "To provide services and handle local issues",
        "To collect taxes for the state",
        "To manage international relations"
      ],
      correct: 1,
      explanation: "Local government's main role is to provide essential services like water, waste management, and parks while addressing community-specific issues.",
      difficulty: "Easy",
      category: "Local Government"
    },
    {
      question: "Which of these is NOT a civic right?",
      options: [
        "Right to vote",
        "Right to free healthcare",
        "Right to peaceful assembly",
        "Right to free speech"
      ],
      correct: 1,
      explanation: "While healthcare access is important, it's not universally recognized as a fundamental civic right like voting, assembly, and free speech.",
      difficulty: "Medium",
      category: "Civic Rights"
    },
    {
      question: "What is the best way to influence local government decisions?",
      options: [
        "Complaining on social media",
        "Attending city council meetings",
        "Ignoring local politics",
        "Moving to another city"
      ],
      correct: 1,
      explanation: "Attending city council meetings allows you to directly voice your concerns and participate in the democratic process.",
      difficulty: "Easy",
      category: "Participation"
    },
    {
      question: "Which service is typically provided by local government?",
      options: [
        "National defense",
        "International trade",
        "Waste management",
        "Immigration control"
      ],
      correct: 2,
      explanation: "Waste management is a core local government service, while the other options are handled by federal government.",
      difficulty: "Easy",
      category: "Local Government"
    },
    {
      question: "What is a key responsibility of citizens in a democracy?",
      options: [
        "Staying informed about issues",
        "Avoiding political discussions",
        "Following only federal laws",
        "Paying taxes to other countries"
      ],
      correct: 0,
      explanation: "Staying informed about local and national issues is essential for making educated decisions and participating effectively in democracy.",
      difficulty: "Medium",
      category: "Responsibilities"
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnsweredQuestions = [...answeredQuestions];
      const isCorrect = selectedAnswer === quizQuestions[currentQuestionIndex].correct;

      newAnsweredQuestions[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedAnswer,
        isCorrect: isCorrect
      };
      setAnsweredQuestions(newAnsweredQuestions);

      // Award XP for answering
      awardXP(isCorrect ? 20 : 10, isCorrect ? 'Correct Answer' : 'Participation');

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
        const finalScore = newAnsweredQuestions.filter(q => q.isCorrect).length;
        setQuizScore(finalScore);
        setQuizSubmitted(true);
        localStorage.setItem('civicEducationQuizScore', finalScore.toString());

        // Award bonus XP for completion
        awardXP(50, 'Quiz Completion');

        // Update streak
        const newStreak = streakCount + 1;
        setStreakCount(newStreak);
        localStorage.setItem('civicEducationStreak', newStreak.toString());
      }
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnsweredQuestions([]);
    setQuizSubmitted(false);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnsweredQuestions([]);
    setQuizSubmitted(false);
    setQuizScore(0);
    localStorage.removeItem('civicEducationQuizScore');
  };

  const getScoreMessage = (score) => {
    if (score === 5) return "Excellent! You're a civic education champion! 🏆";
    if (score >= 3) return "Great job! You have a solid understanding of civic engagement! 👏";
    if (score >= 2) return "Good effort! Consider reviewing the materials above. 📚";
    return "Keep learning! Every citizen's journey starts with curiosity. 🌟";
  };

  const getScoreColor = (score) => {
    if (score === 5) return "text-yellow-600";
    if (score >= 3) return "text-emerald-600";
    if (score >= 2) return "text-blue-600";
    return "text-purple-600";
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentFact = didYouKnowFacts[didYouKnowIndex];

  const achievementsList = [
    { id: 'first-steps', name: 'First Steps', desc: 'Earned 50 XP', icon: <Star className="w-5 h-5" /> },
    { id: 'quiz-master', name: 'Quiz Master', desc: 'Scored 4+ on quiz', icon: <Trophy className="w-5 h-5" /> },
    { id: 'collector', name: 'Collector', desc: 'Bookmarked 3+ sections', icon: <Bookmark className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Level Up Celebration */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center animate-bounce">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Level Up!</h3>
            <p className="text-gray-600 dark:text-gray-300">You've reached Level {userLevel}!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <BookOpen className="w-16 h-16 mr-4 opacity-90" />
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                    Civic Education & Rights
                  </h1>
                  <p className="text-xl opacity-90">
                    Learn, engage, and make a difference in your community
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-75">Level {userLevel}</div>
              <div className="text-xs opacity-60">{userXP} XP</div>
            </div>
          </div>

          {/* User Stats Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{readingProgress}%</div>
                  <div className="text-sm opacity-75">Reading Progress</div>
                </div>
                <BookOpen className="w-8 h-8 opacity-60" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{quizScore}/5</div>
                  <div className="text-sm opacity-75">Quiz Score</div>
                </div>
                <Brain className="w-8 h-8 opacity-60" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{bookmarkedSections.length}</div>
                  <div className="text-sm opacity-75">Bookmarks</div>
                </div>
                <Bookmark className="w-8 h-8 opacity-60" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{streakCount}</div>
                  <div className="text-sm opacity-75">Day Streak</div>
                </div>
                <Flame className="w-8 h-8 opacity-60" />
              </div>
            </div>
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <h3 className="font-semibold mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Recent Achievements
              </h3>
              <div className="flex space-x-3">
                {achievements.map(achievementId => {
                  const achievement = achievementsList.find(a => a.id === achievementId);
                  return achievement ? (
                    <div key={achievementId} className="bg-white/20 p-2 rounded-lg flex items-center space-x-2">
                      {achievement.icon}
                      <div className="text-sm">
                        <div className="font-medium">{achievement.name}</div>
                        <div className="opacity-75 text-xs">{achievement.desc}</div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 bg-white dark:bg-gray-900 text-black dark:text-white">
        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview', icon: <Globe className="w-4 h-4" /> },
              { id: 'learn', label: 'Learn', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'quiz', label: 'Test Knowledge', icon: <Brain className="w-4 h-4" /> },
              { id: 'resources', label: 'Resources', icon: <Download className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center justify-center space-x-2 py-3 px-4 sm:px-6 transition-colors ${
                  activeTab === tab.id
                  ? 'bg-emerald-50 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 border-b-2 border-emerald-500'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
                >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Enhanced Did You Know Section */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 dark:from-emerald-700 dark:to-blue-800 text-white rounded-xl shadow-lg p-6 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  {currentFact.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Did You Know?
                  </h3>
                  <div className="flex space-x-1 mt-1">
                    {didYouKnowFacts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === didYouKnowIndex ? 'bg-white' : 'bg-white/40'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg leading-relaxed">{currentFact.fact}</p>
            </div>

            {/* Interactive Civic Journey */}
            <div className="bg-white dark:bg-[#23272f] rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Your Civic Journey
              </h3>
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 rounded-full transform -translate-y-1/2"></div>
                <div className="grid md:grid-cols-4 gap-8 relative">
                  {[
                    { step: 1, title: "Learn", desc: "Understand your rights", icon: <BookOpen className="w-8 h-8" />, color: "emerald", completed: readingProgress > 25 },
                    { step: 2, title: "Engage", desc: "Participate locally", icon: <Users className="w-8 h-8" />, color: "blue", completed: bookmarkedSections.length > 0 },
                    { step: 3, title: "Test", desc: "Verify knowledge", icon: <Brain className="w-8 h-8" />, color: "purple", completed: quizScore > 0 },
                    { step: 4, title: "Act", desc: "Make a difference", icon: <Rocket className="w-8 h-8" />, color: "pink", completed: quizScore >= 4 }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${item.completed
                        ? 'bg-emerald-500 text-white shadow-lg scale-110'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-300'
                        }`}>
                        {item.completed ? <CheckCircle className="w-8 h-8" /> : item.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                      {item.completed && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Complete
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-12 h-12 opacity-80" />
                  <div className="text-right">
                    <div className="text-3xl font-bold">2.3M</div>
                    <div className="text-emerald-100">Active Citizens</div>
                  </div>
                </div>
                <p className="text-emerald-100">Join millions learning about civic engagement</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Vote className="w-12 h-12 opacity-80" />
                  <div className="text-right">
                    <div className="text-3xl font-bold">89%</div>
                    <div className="text-blue-100">Completion Rate</div>
                  </div>
                </div>
                <p className="text-blue-100">High engagement in civic education</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-12 h-12 opacity-80" />
                  <div className="text-right">
                    <div className="text-3xl font-bold">15K</div>
                    <div className="text-purple-100">Achievements</div>
                  </div>
                </div>
                <p className="text-purple-100">Earned by dedicated learners</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="space-y-6">
            {accordionData.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
                >

                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-emerald-600 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${item.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {item.difficulty}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(item.id);
                        }}
                        className={`p-2 rounded-lg transition-colors ${bookmarkedSections.includes(item.id)
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                          }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <div className="text-gray-500">
                        {activeAccordion === index ?
                          <ChevronUp className="w-5 h-5" /> :
                          <ChevronDown className="w-5 h-5" />
                        }
                      </div>
                    </div>
                  </div>
                </button>
                {activeAccordion === index && (
                  <div className="px-6 pb-6 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div className="pt-6">
                      {item.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Test Your Knowledge</h3>
                    <p className="opacity-90">Challenge yourself with our interactive civic quiz</p>
                  </div>
                </div>
                {quizSubmitted && (
                  <button
                    onClick={resetQuiz}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Quiz</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
              {!quizStarted && !quizSubmitted ? (
                // Quiz Start Screen
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-xl">
                    <Target className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      Ready to Test Your Civic Knowledge?
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Take our interactive quiz to see how well you understand civic rights and responsibilities
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-purple-600 mb-1">5</div>
                        <div className="text-sm text-gray-600">Questions</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600 mb-1">~3</div>
                        <div className="text-sm text-gray-600">Minutes</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">★</div>
                        <div className="text-sm text-gray-600">Instant Results</div>
                      </div>
                    </div>
                    <button
                      onClick={startQuiz}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
                    >
                      <Play className="w-5 h-5" />
                      <span>Start Quiz</span>
                    </button>
                  </div>
                </div>
              ) : quizSubmitted ? (
                // Quiz Results Screen
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-emerald-100 to-blue-100 p-8 rounded-xl">
                    <div className="flex justify-center mb-4">
                      {quizScore === 5 ? (
                        <Trophy className="w-16 h-16 text-yellow-500" />
                      ) : quizScore >= 3 ? (
                        <Star className="w-16 h-16 text-emerald-500" />
                      ) : (
                        <Target className="w-16 h-16 text-blue-500" />
                      )}
                    </div>
                    <h4 className={`text-3xl font-bold mb-2 ${getScoreColor(quizScore)}`}>
                      Your Score: {quizScore}/{quizQuestions.length}
                    </h4>
                    <p className="text-lg text-gray-700 mb-6">
                      {getScoreMessage(quizScore)}
                    </p>

                    {/* Enhanced Score Breakdown */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <CheckCircle className="w-6 h-6 text-emerald-500" />
                          <span className="font-semibold text-emerald-600 text-lg">Correct Answers</span>
                        </div>
                        <div className="text-3xl font-bold text-emerald-600">{quizScore}</div>
                        <div className="text-sm text-gray-500 mt-1">+{quizScore * 20} XP earned</div>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <XCircle className="w-6 h-6 text-red-500" />
                          <span className="font-semibold text-red-600 text-lg">Incorrect Answers</span>
                        </div>
                        <div className="text-3xl font-bold text-red-600">{quizQuestions.length - quizScore}</div>
                        <div className="text-sm text-gray-500 mt-1">Review recommended</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-blue-800 mb-2">
                          Continue Learning
                        </h5>
                        <p className="text-sm text-gray-600">
                          Review the learning sections to deepen your understanding
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-purple-800 mb-2">
                          Take Action
                        </h5>
                        <p className="text-sm text-gray-600">
                          Use the Civix app to report issues and engage with your community
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Quiz Question Screen
                <div className="space-y-6">
                  {/* Enhanced Progress Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Question {currentQuestionIndex + 1} of {quizQuestions.length}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-full text-xs ${currentQuestion.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : currentQuestion.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                      >
                        {currentQuestion.difficulty}
                      </span>

                      <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {currentQuestion.category}
                      </span>
                    </div>

                    <div className="flex space-x-1">
                      {quizQuestions.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${index < currentQuestionIndex
                            ? 'bg-emerald-500'
                            : index === currentQuestionIndex
                              ? 'bg-purple-500 scale-125'
                              : 'bg-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 p-8 rounded-xl border border-purple-200 dark:border-purple-700">

                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">

                      {currentQuestion.question}
                    </h4>

                    {/* Answer Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showResult}
                          className={`p-4 text-left rounded-lg border-2 transition-all transform hover:scale-[1.01] ${selectedAnswer === index
                            ? showResult
                              ? index === currentQuestion.correct
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'border-red-500 bg-red-50 text-red-700'
                              : 'border-purple-500 bg-purple-50 text-purple-700'
                            : showResult && index === currentQuestion.correct
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-gray-300 bg-white hover:border-purple-300 text-black dark:bg-gray-800 dark:text-white dark:border-gray-600'

                            }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index
                                  ? showResult
                                    ? index === currentQuestion.correct
                                      ? 'border-emerald-500 bg-emerald-500'
                                      : 'border-red-500 bg-red-500'
                                    : 'border-purple-500 bg-purple-500'
                                  : showResult && index === currentQuestion.correct
                                    ? 'border-emerald-500 bg-emerald-500'
                                    : 'border-gray-400'
                                }`}
                            >
                              {showResult && index === currentQuestion.correct ? (
                                <CheckCircle className="w-4 h-4 text-white" />
                              ) : showResult && selectedAnswer === index && index !== currentQuestion.correct ? (
                                <XCircle className="w-4 h-4 text-white" />
                              ) : null}
                            </div>
                            <span className="font-medium">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Explanation (shown after answer) */}
                    {showResult && (
                      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">

                        <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">

                          <Lightbulb className="w-4 h-4 mr-2" />
                          Explanation:
                        </h5>
                        <p className="text-blue-700 dark:text-blue-100">{currentQuestion.explanation}</p>

                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400">

                        {selectedAnswer !== null && !showResult && "Click 'Check Answer' to see if you're correct!"}
                      </div>
                      <div className="space-x-3">
                        {selectedAnswer !== null && !showResult && (
                          <button
                            onClick={handleShowResult}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Check Answer
                          </button>
                        )}
                        {showResult && (
                          <button
                            onClick={handleNextQuestion}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                          >
                            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            {/* Download Resources */}
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-700 dark:to-blue-700 text-white rounded-xl p-8 text-center">
              <Download className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-semibold mb-2">
                Download Civic Education Resources
              </h3>
              <p className="opacity-90 mb-6">
                Get comprehensive guides, worksheets, and reference materials
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <a href="/pdfs/civic_rights_guide.pdf" download className="bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-colors">
                  <FileText className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Civic Rights Guide</div>
                  <div className="text-sm opacity-75">PDF • 2.3 MB</div>
                </a>
                <a href="/pdfs/local_government_handbook.pdf" download className="bg-white/20 hover:bg-white-30 p-4 rounded-lg transition-colors">
                  <BookOpen className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Local Government Handbook</div>
                  <div className="text-sm opacity-75">PDF • 1.8 MB</div>
                </a>
                <a href="/pdfs/participation_toolkit.pdf" download className="bg-white/20 hover:bg-white-30 p-4 rounded-lg transition-colors">
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Participation Toolkit</div>
                  <div className="text-sm opacity-75">PDF • 3.1 MB</div>
                </a>
              </div>
            </div>

            {/* External Resources */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2 text-blue-500" />
                  Government Resources
                </h4>
                <div className="space-y-3">
                  {[
                    { title: "USA.gov - Official Guide", desc: "Official government information" },
                    { title: "Vote.gov", desc: "Voter registration and information" },
                    { title: "Congress.gov", desc: "Legislative information" },
                    { title: "Local Government Directory", desc: "Find your local representatives" }
                  ].map((resource, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{resource.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{resource.desc}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-emerald-500 dark:text-emerald-400" />
                  Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Civic Helpline</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">1-800-CIVIC-HELP</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Email Support</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">civic@example.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Local Office</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Find your nearest location</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Interactive Tools */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Interactive Tools & Calculators
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Tax Impact Calculator */}
                <Link to="/tax-impact">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-lg text-center hover:scale-105 transition-transform cursor-pointer">
                  <PieChart className="w-12 h-12 mx-auto mb-3" />
                  <h5 className="font-semibold mb-2">Tax Impact Calculator</h5>
                  <p className="text-sm text-white/90">See how your taxes fund local services</p>
                </div>
                </Link>

                {/* Voting Guide */}
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white p-6 rounded-lg text-center hover:scale-105 transition-transform cursor-pointer">
                  <Vote className="w-12 h-12 mx-auto mb-3" />
                  <h5 className="font-semibold mb-2">Voting Guide</h5>
                  <p className="text-sm text-white/90">Find your polling place and candidates</p>
                </div>

                {/* Representative Finder */}
                <Link to='/repersentative-finder'>
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-6 rounded-lg text-center hover:scale-105 transition-transform cursor-pointer">
                  <Users className="w-12 h-12 mx-auto mb-3" />
                  <h5 className="font-semibold mb-2">Representative Finder</h5>
                  <p className="text-sm text-white/90">Contact your elected officials</p>
                </div>
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CivicEducation;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Home,
  FileText,
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react";

import { motion } from "framer-motion";
import Switch from '../DarkModeToggle';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sidebarMenu = [
  { key: 'dashboard', label: 'Dashboard', icon: Home, route: '/admin/dashboard' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, route: '/admin/analytics' },
  { key: 'users', label: 'Users', icon: Users, route: '/admin/users' },
  { key: 'documents', label: 'Documents', icon: FileText, route: '/admin/documents' },
  { key: 'notifications', label: 'Notifications', icon: Bell, route: '/admin/notifications' },
  { key: 'settings', label: 'Settings', icon: Settings, route: '/admin/settings' },
];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/admin/dashboard');

  // Mock data for demonstration
  const mockIssues = [
    {
      _id: "1",
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues near downtown area",
      phone: "+91 8264192031",
      email: "ragesh1251@gmail.com",
      status: "In Progress",
      priority: "High",
      dateReported: "2024-08-06",
      category: "Infrastructure"
    },
    {
      _id: "2",
      title: "Broken Street Light",
      description: "Street light not working on Oak Avenue, creating safety concerns",
      phone: "+91 758393985",
      email: "kunalar12@gmail.com",
      status: "Pending",
      priority: "Medium",
      dateReported: "2024-08-05",
      category: "Public Safety"
    },
    {
      _id: "3",
      title: "Park Maintenance Request",
      description: "Playground equipment needs repair at Central Park",
      phone: "+91 8793837454",
      email: "meerasingh123gmail.com",
      status: "Resolved",
      priority: "Low",
      dateReported: "2024-08-04",
      category: "Parks & Recreation"
    }
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const statusConfig = {
    "Pending": { 
      color: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700", 
      icon: Clock,
      dotColor: "bg-amber-400 dark:bg-amber-500"
    },
    "In Progress": { 
      color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700", 
      icon: RefreshCw,
      dotColor: "bg-blue-400 dark:bg-blue-500"
    },
    "Resolved": { 
      color: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700", 
      icon: CheckCircle2,
      dotColor: "bg-emerald-400 dark:bg-emerald-500"
    },
    "Rejected": { 
      color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700", 
      icon: XCircle,
      dotColor: "bg-red-400 dark:bg-red-500"
    }
  };

  const priorityConfig = {
    "High": "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
    "Medium": "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
    "Low": "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
  };

  const fetchIssues = React.useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIssues(mockIssues);
      setIsRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === "Pending").length,
    inProgress: issues.filter(i => i.status === "In Progress").length,
    resolved: issues.filter(i => i.status === "Resolved").length,
    rejected: issues.filter(i => i.status === "Rejected").length
  };

  const handleStatusChange = (issueId, newStatus) => {
    setIssues(prev => 
      prev.map(issue => 
        issue._id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
  };


  return (
    <div className="min-h-screen ">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-xl ${
          isSidebarOpen ? 'w-[64]' : 'w-16'
        }`}
      >
        <div className="relative flex items-center justify-between p-4 border-b border-gray-200/50">
          <div className={`flex items-center transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            {isSidebarOpen && (
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Civix
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
              !isSidebarOpen ? 'mx-auto' : ''
            }`}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        {isSidebarOpen && (
          <div className="p-4 border-b border-gray-200/50">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>
        )}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarMenu.map((item) => {
            const isActive = item.route === activeRoute;
            const Icon = item.icon;
            return (
              <div key={item.key} className="relative group">
                <button
                  type="button"
                  className={`
                    w-full flex items-center py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden
                    ${isSidebarOpen ? '' : 'justify-center'}
                    ${isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 transform scale-[1.02]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                    }
                  `}
                  onClick={() => navigate(item.route)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-10 rounded-xl" />
                  )}
                  <div className="relative z-10 flex items-center">
                    <Icon
                      className={`w-5 h-5 transition-all duration-200 ${
                        isSidebarOpen ? 'mr-3' : ''
                      } ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-500 group-hover:text-emerald-600'
                      }`}
                    />
                    {isSidebarOpen && (
                      <span className="relative z-10 transition-all duration-300">
                        {item.label}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
                {!isSidebarOpen && (
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 text-white text-sm rounded-lg opacity-0 group-hover:transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent0" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
      <motion.header 
        className=" backdrop-blur-md border-b border-green-100 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                    Civix Admin
                  </h1>
                  <p className="text-sm text-gray-500">Citizen Issue Management</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin/notifications")} 
                className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate("/admin/settings")}
                className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <Switch />
              <button 
                onClick={() => navigate("/login")}
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium ">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, Admin! 👋
          </h2>
          <p className="text-gray-500">
            Monitor and manage citizen-reported issues across the city
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className=" backdrop-blur-sm rounded-xl p-6 border border-green-100 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Issues</p>
                <p className="text-3xl font-bold ">{stats.total}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                <BarChart3 className="w-6 h-6 " />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-emerald-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </motion.div>

          {Object.entries(statusConfig).map(([status, config]) => {
            const keyMap = {
              "Pending": "pending",
              "In Progress": "inProgress",
              "Resolved": "resolved",
              "Rejected": "rejected"
            };
            const count = stats[keyMap[status]];
            const Icon = config.icon;
            return (
              <motion.div 
                key={status}
                variants={cardVariants}
                whileHover="hover"
                className=" backdrop-blur-sm rounded-xl p-6 border border-green-100 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{status}</p>
                    <p className="text-2xl font-bold ">{count || 0}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${config.color.split(' ')[0]} ${config.color.split(' ')[0]}/20`}>
                    <Icon className={`w-5 h-5 ${config.color.split(' ')[1]}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className=" backdrop-blur-sm rounded-xl p-6 border border-green-100 shadow-sm mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border text-black border-green-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-sm"
                />
              </div>
              
              <div className="relative">
                <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border text-black  border-green-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/40 backdrop-blur-sm appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {/* Handle export */}}
                className="flex items-center space-x-2 px-4 py-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              
              <button
                onClick={fetchIssues}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 rounded-lg transition-all font-medium disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className=" backdrop-blur-sm rounded-xl border border-green-100 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-green-100">
            <h3 className="text-lg font-semibold flex items-center">
              <MessageSquare className="w-5 h-5 text-emerald-600 mr-2" />
              Reported Issues ({filteredIssues.length})
            </h3>
          </div>

          {filteredIssues.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No issues found</p>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredIssues.map((issue, index) => {
                    const StatusIcon = statusConfig[issue.status]?.icon || AlertCircle;
                    return (
                      <motion.tr
                        key={issue._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-emerald-50/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold">{issue.title}</p>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{issue.description}</p>
                            <p className="text-xs text-gray-400 mt-1">Reported: {issue.dateReported}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm ">{issue.email}</p>
                            <p className="text-sm text-gray-500">{issue.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {issue.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityConfig[issue.priority]}`}>
                            {issue.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${statusConfig[issue.status]?.dotColor}`}></div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig[issue.status]?.color}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {issue.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={issue.status}
                            onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                            className="text-sm border text-black border-green-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>

      <div className="fixed top-4 right-4 z-50">
      </div>
    </div>
  );
};

export default AdminDashboard;
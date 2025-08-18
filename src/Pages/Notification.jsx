import React, { useState } from 'react';
import { Bell, Check, X, AlertTriangle, Info, Users, FileText, Settings, Clock, ChevronDown,Home, BarChart3, ChevronRight,ChevronLeft,Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'System Maintenance Required',
      message: 'Critical security update needs to be applied to the voting system.',
      timestamp: '2 minutes ago',
      read: false,
      icon: AlertTriangle,
      category: 'system'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Citizen Registration',
      message: '15 new citizens have registered for upcoming municipal elections.',
      timestamp: '5 minutes ago',
      read: false,
      icon: Users,
      category: 'registration'
    },
    {
      id: 3,
      type: 'success',
      title: 'Vote Count Verified',
      message: 'District 7 vote count has been successfully verified and approved.',
      timestamp: '10 minutes ago',
      read: true,
      icon: Check,
      category: 'voting'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Low Voter Turnout Alert',
      message: 'Current turnout is 23% below expected levels for Ward 3.',
      timestamp: '15 minutes ago',
      read: false,
      icon: AlertTriangle,
      category: 'analytics'
    },
    {
      id: 5,
      type: 'info',
      title: 'Campaign Document Submitted',
      message: 'John Mitchell has submitted financial disclosure documents.',
      timestamp: '1 hour ago',
      read: true,
      icon: FileText,
      category: 'documents'
    },
    {
      id: 6,
      type: 'info',
      title: 'System Update Complete',
      message: 'Database backup and system optimization completed successfully.',
      timestamp: '2 hours ago',
      read: true,
      icon: Settings,
      category: 'system'
    }
  ]);

  const sidebarMenu = [
    { key: 'dashboard', label: 'Dashboard', icon: Home, route: '/admin/dashboard' },
    { key: 'analytics', label: 'Analytics', icon: BarChart3, route: '/admin/analytics' },
    { key: 'users', label: 'Users', icon: Users, route: '/admin/users' },
    { key: 'documents', label: 'Documents', icon: FileText, route: '/admin/documents' },
    { key: 'notifications', label: 'Notifications', icon: Bell, route: '/admin/notifications' },
    { key: 'settings', label: 'Settings', icon: Settings, route: '/admin/settings' },
  ];

  const getTypeStyles = (type) => {
    switch (type) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/30 dark:hover:bg-yellow-950/50';
      case 'success':
        return 'border-l-green-500 bg-green-50 hover:bg-green-100 dark:bg-green-950/30 dark:hover:bg-green-950/50';
      default:
        return 'border-l-emerald-500 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50';
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/admin/notifications');

  const getIconColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'success':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-emerald-600 dark:text-emerald-400';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen p-6">
        {isSidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
              <aside
                className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col shadow-xl ${
                  isSidebarOpen ? 'w-[64]' : 'w-16'
                }`}
              >
                <div className="relative flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
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
                    className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      !isSidebarOpen ? 'mx-auto' : ''
                    }`}
                  >
                    {isSidebarOpen ? (
                      <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                {isSidebarOpen && (
                  <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
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
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 hover:shadow-md'
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
                                  : 'text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-emerald-100 dark:border-gray-700 mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-xl">
                <Bell className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                <p className="text-gray-600 dark:text-gray-300">Stay updated with system alerts and activities</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <span className="bg-emerald-600 dark:bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              {['all', 'unread', 'read'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                    filter === tab
                      ? 'bg-white dark:bg-gray-600 text-emerald-700 dark:text-emerald-300 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium flex items-center space-x-1"
              >
                <Check className="h-4 w-4" />
                <span>Mark all as read</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-emerald-100 dark:border-gray-700 p-12 text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notifications</h3>
              <p className="text-gray-600 dark:text-gray-300">You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 transition-all duration-200 ${getTypeStyles(notification.type)} ${
                    !notification.read ? 'shadow-md' : 'opacity-75'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'urgent' ? 'bg-red-100 dark:bg-red-900/50' :
                          notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/50' :
                          notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-emerald-100 dark:bg-emerald-900/50'
                        }`}>
                          <Icon className={`h-5 w-5 ${getIconColor(notification.type)}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`text-lg font-semibold ${
                              !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full"></div>
                            )}
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4" />
                              <span>{notification.timestamp}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              notification.category === 'system' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' :
                              notification.category === 'voting' ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300' :
                              notification.category === 'registration' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
                              notification.category === 'analytics' ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300' :
                              'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                            }`}>
                              {notification.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                          title="Delete notification"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
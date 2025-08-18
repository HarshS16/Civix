import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  List, 
  User, 
  Headphones, 
  BarChart3, 
  BookOpen,
  Bell,
  X,
  MessageCircle,
  MapPin,
  Search,
  Calendar
} from "lucide-react";

const UserDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Complaint Update", message: "Your complaint #12345 has been reviewed", time: "2 hours ago", unread: true },
    { id: 2, title: "Community Vote", message: "New voting topic: Street Light Installation", time: "1 day ago", unread: true },
    { id: 3, title: "Profile Update", message: "Your profile information was successfully updated", time: "3 days ago", unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const markAllAsRead = (e) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (e, id) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const removeNotification = (e, id) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      <div className="absolute top-20 right-6 z-50">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-105 group"
          >
            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div 
              className="absolute top-full right-0 mt-2 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700 shadow-2xl shadow-green-500/10 overflow-hidden animate-in slide-in-from-top-2 duration-200"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`relative p-4 ${index !== notifications.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''} hover:bg-green-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200 group ${
                        notification.unread ? 'bg-green-50/30 dark:bg-green-900/10' : ''
                      }`}
                      onClick={(e) => markAsRead(e, notification.id)}
                    >
                      <button 
                        onClick={(e) => removeNotification(e, notification.id)}
                        className="absolute top-2 right-2 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-start space-x-3">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                        )}
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No notifications yet</p>
                  </div>
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex space-x-2">
                  <button 
                    onClick={markAllAsRead}
                    className="flex-1 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200 py-1"
                  >
                    Mark All Read
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200 py-1"
                  >
                    View All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 dark:from-green-400 dark:to-emerald-400">
            Welcome, Citizen 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your digital gateway to civic engagement and community services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <DashboardCard
            title="File a Complaint"
            description="Submit a new issue with full details."
            onClick={() => navigate("/report-issue")}
            icon={FileText}
            gradient="from-green-500 to-green-600"
            shadowColor="shadow-green-500/20"
          />
          <DashboardCard
            title="My Complaints"
            description="Track all complaints you've raised."
            onClick={() => navigate("/complaints")}
            icon={List}
            gradient="from-emerald-500 to-emerald-600"
            shadowColor="shadow-emerald-500/20"
          />
          <DashboardCard
            title="Profile"
            description="View or edit your profile details."
            onClick={() => navigate("/profile")}
            icon={User}
            gradient="from-teal-500 to-teal-600"
            shadowColor="shadow-teal-500/20"
          />
          <DashboardCard
            title="Support"
            description="Need help? Contact our support."
            onClick={() => navigate("/contact")}
            icon={Headphones}
            gradient="from-green-600 to-emerald-700"
            shadowColor="shadow-green-600/20"
          />
          <DashboardCard
            title="Community Voting"
            description="Interact with the community by casting your vote on trending topics, events, and decisions that matter."
            onClick={() => navigate("/community-voting")}
            icon={BarChart3}
            gradient="from-emerald-600 to-teal-700"
            shadowColor="shadow-emerald-600/20"
          />
          <DashboardCard
            title="Resources"
            description="Read FAQs, citizen rights, and more."
            onClick={() => navigate("/resources")}
            icon={BookOpen}
            gradient="from-teal-600 to-green-700"
            shadowColor="shadow-teal-600/20"
          />
          <DashboardCard
            title="Chat Room"
            description="Join the community chat and engage in real-time discussions."
            onClick={() => navigate("/chatroom")}
            icon={MessageCircle}
            gradient="from-green-700 to-teal-700"
            shadowColor="shadow-green-700/20"
          />
          <DashboardCard
            title="Nearby Services"
            description="Find hospitals, police stations, and fire stations close to you."
            onClick={() => navigate("/nearby-services")}
            icon={MapPin}
            gradient="from-green-500 to-green-800"
            shadowColor="shadow-green-500/20"
          />
           <DashboardCard
            title="Lost & Found"
            description="Bringing lost items back to their owners."
            onClick={() => navigate("/lost-found")}
            icon={Search}
            gradient="from-green-500 to-green-600"
            shadowColor="shadow-green-500/20"
            />
          <DashboardCard
            title="Community Holidays"
            description="Look for the Community Holidays approaching soon to you"
            onClick={() => navigate("/community-holidays")}
            icon={Calendar}
            gradient="from-emerald-600 to-teal-700"
            shadowColor="shadow-emerald-600/20"
          />
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({ title, description, onClick, icon: Icon, gradient, shadowColor }) => {
  return (
    <div
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-gray-700 shadow-lg ${shadowColor} hover:shadow-2xl hover:shadow-green-500/30 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:scale-105 overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
      
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500" />
      

      <div className="relative z-10">
    
        <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
      
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors duration-300">
          {title}
        </h3>
      
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>
        
      </div>
 
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl`} />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </div>
  );
};

export default UserDashboard;
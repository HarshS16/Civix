import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Users, FileText, MessageCircle, TrendingUp, Calendar, MapPin, Award, AlertCircle, Home, BarChart3, Bell, Settings, ChevronRight,ChevronLeft,Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7d');

  const sidebarMenu = [
  { key: 'dashboard', label: 'Dashboard', icon: Home, route: '/admin/dashboard' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, route: '/admin/analytics' },
  { key: 'users', label: 'Users', icon: Users, route: '/admin/users' },
  { key: 'documents', label: 'Documents', icon: FileText, route: '/admin/documents' },
  { key: 'notifications', label: 'Notifications', icon: Bell, route: '/admin/notifications' },
  { key: 'settings', label: 'Settings', icon: Settings, route: '/admin/settings' },
];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/admin/analytics');

  const userGrowthData = [
    { month: 'Jan', users: 1200, active: 850 },
    { month: 'Feb', users: 1450, active: 980 },
    { month: 'Mar', users: 1800, active: 1200 },
    { month: 'Apr', users: 2100, active: 1450 },
    { month: 'May', users: 2650, active: 1800 },
    { month: 'Jun', users: 3200, active: 2200 },
  ];

  const engagementData = [
    { day: 'Mon', posts: 45, comments: 120, votes: 89 },
    { day: 'Tue', posts: 52, comments: 145, votes: 95 },
    { day: 'Wed', posts: 38, comments: 98, votes: 78 },
    { day: 'Thu', posts: 61, comments: 165, votes: 112 },
    { day: 'Fri', posts: 48, comments: 132, votes: 87 },
    { day: 'Sat', posts: 35, comments: 89, votes: 65 },
    { day: 'Sun', posts: 29, comments: 76, votes: 54 },
  ];

  const categoryData = [
    { name: 'Local Issues', value: 35, color: '#059669' },
    { name: 'Elections', value: 28, color: '#10b981' },
    { name: 'Policy Discussion', value: 22, color: '#34d399' },
    { name: 'Community Events', value: 15, color: '#6ee7b7' },
  ];

  const recentActivity = [
    { type: 'new_post', user: 'Sarah Chen', action: 'created a post about local transportation', time: '2 minutes ago' },
    { type: 'comment', user: 'Mike Johnson', action: 'commented on school funding discussion', time: '5 minutes ago' },
    { type: 'vote', user: 'Emma Davis', action: 'voted on parking ordinance proposal', time: '8 minutes ago' },
    { type: 'new_user', user: 'Alex Rivera', action: 'joined the platform', time: '12 minutes ago' },
  ];

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="rounded-lg shadow-sm border border-green-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className={`h-4 w-4 ${trend === 'up' ? 'text-green-500' : 'text-red-500'} mr-1`} />
            <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {change} from last week
            </span>
          </div>
        </div>
        <div className="p-3 bg-green-50 rounded-full">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen ml-10 ">
        {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out  backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-xl ${
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
      <div className="shadow-sm border-b border-green-100">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Civix Analytics</h1>
              <p className="text-gray-600 mt-1">Monitor platform engagement and community growth</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-green-200 rounded-lg px-4 py-2  text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Users" 
            value="3,247" 
            change="+12.5%" 
            trend="up" 
            icon={Users} 
          />
          <StatCard 
            title="Active Posts" 
            value="1,582" 
            change="+8.2%" 
            trend="up" 
            icon={FileText} 
          />
          <StatCard 
            title="Comments" 
            value="4,891" 
            change="+15.7%" 
            trend="up" 
            icon={MessageCircle} 
          />
          <StatCard 
            title="Civic Actions" 
            value="892" 
            change="+22.1%" 
            trend="up" 
            icon={Award} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 rounded-lg shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold ">User Growth</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-500">Total Users</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-300 rounded-full mr-2"></div>
                  <span className="text-gray-500">Active Users</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f9fafb', 
                    border: '1px solid #d1fae5',
                    borderRadius: '8px'
                  }} 
                  labelStyle={{ color: '#1f2937' }}
                  itemStyle={{ color: '#1f2937' }}
                />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#059669" fill="#059669" fillOpacity={0.6} />
                <Area type="monotone" dataKey="active" stackId="2" stroke="#34d399" fill="#34d399" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg shadow-sm border border-green-100 p-6">
            <h3 className="text-lg font-semibold  mb-6">Discussion Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm text-gray-500">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium ">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg shadow-sm border border-green-100 p-6">
            <h3 className="text-lg font-semibold mb-6">Weekly Engagement</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f9fafb', 
                    border: '1px solid #d1fae5',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#1f2937' }}
                  itemStyle={{ color: '#1f2937' }}
                />
                <Bar dataKey="posts" fill="#059669" radius={[2, 2, 0, 0]} />
                <Bar dataKey="comments" fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="votes" fill="#34d399" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg shadow-sm border border-green-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold ">Recent Activity</h3>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.type === 'new_post' && <FileText className="h-5 w-5 text-green-600" />}
                    {activity.type === 'comment' && <MessageCircle className="h-5 w-5 text-green-600" />}
                    {activity.type === 'vote' && <Award className="h-5 w-5 text-green-600" />}
                    {activity.type === 'new_user' && <Users className="h-5 w-5 text-green-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="rounded-lg shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Geographic Reach</p>
                <p className="text-xl font-bold">47 Cities</p>
                <p className="text-sm text-green-600">+3 new this month</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Scheduled Events</p>
                <p className="text-xl font-bold ">23</p>
                <p className="text-sm text-green-600">Next: Town Hall</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg shadow-sm border border-green-100 p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Moderation Queue</p>
                <p className="text-xl font-bold ">8</p>
                <p className="text-sm text-yellow-600">Requires attention</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
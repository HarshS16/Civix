import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Bell, 
  Users, 
  Database, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe,
  Clock,
  Key,
  FileText,
  BarChart3,
  Smartphone,
  Home, ChevronRight,ChevronLeft,Search
} from 'lucide-react';
import { useNavigate } from "react-router-dom";


const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    systemName: 'Civix Municipal Platform',
    systemDescription: 'Digital democracy platform for municipal governance',
    timezone: 'America/New_York',
    language: 'English',
    maintenanceMode: false,
    
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    maxLoginAttempts: '3',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    criticalAlerts: true,
    reportReminders: true,
    
    autoApproveRegistrations: false,
    requireEmailVerification: true,
    allowPublicRegistration: true,
    maxUsersPerDistrict: '500',
    
    votingEnabled: true,
    earlyVoting: true,
    proxyVoting: false,
    voteVerification: true,
    resultPublication: 'immediate',
    
    smtpServer: 'smtp.civix.gov',
    smtpPort: '587',
    smtpUsername: 'admin@civix.gov',
    smtpPassword: '',
    emailFromName: 'Civix Administration',
    
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: '30',
    backupLocation: 'cloud'
  });

  const sidebarMenu = [
      { key: 'dashboard', label: 'Dashboard', icon: Home, route: '/admin/dashboard' },
      { key: 'analytics', label: 'Analytics', icon: BarChart3, route: '/admin/analytics' },
      { key: 'users', label: 'Users', icon: Users, route: '/admin/users' },
      { key: 'documents', label: 'Documents', icon: FileText, route: '/admin/documents' },
      { key: 'notifications', label: 'Notifications', icon: Bell, route: '/admin/notifications' },
      { key: 'settings', label: 'Settings', icon: Settings, route: '/admin/settings' },
    ];

   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState('/admin/settings');

  const [saveStatus, setSaveStatus] = useState(null);

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'voting', name: 'Voting System', icon: BarChart3 },
    { id: 'email', name: 'Email Config', icon: Mail },
    { id: 'backup', name: 'Backup & Data', icon: Database }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">System Name</label>
          <input
            type="text"
            value={settings.systemName}
            onChange={(e) => handleInputChange('systemName', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => handleInputChange('timezone', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">System Description</label>
        <textarea
          value={settings.systemDescription}
          onChange={(e) => handleInputChange('systemDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Maintenance Mode</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">Temporarily disable public access for system updates</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-6">
        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          Authentication Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-500">Two-Factor Authentication</label>
              <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Password Expiry (days)</label>
          <input
            type="number"
            value={settings.passwordExpiry}
            onChange={(e) => handleInputChange('passwordExpiry', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={settings.maxLoginAttempts}
            onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={settings.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={settings.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={settings.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
          { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS', icon: Smartphone },
          { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications', icon: Bell },
          { key: 'criticalAlerts', label: 'Critical Alerts', desc: 'Immediate alerts for critical issues', icon: AlertTriangle }
        ].map(({ key, label, desc, icon: Icon }) => (
          <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">{label}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={(e) => handleInputChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: 'autoApproveRegistrations', label: 'Auto-approve Registrations', desc: 'Automatically approve new user registrations' },
          { key: 'requireEmailVerification', label: 'Email Verification Required', desc: 'Users must verify email before activation' },
          { key: 'allowPublicRegistration', label: 'Allow Public Registration', desc: 'Enable public user registration' }
        ].map(({ key, label, desc }) => (
          <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={(e) => handleInputChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">Maximum Users Per District</label>
        <input
          type="number"
          value={settings.maxUsersPerDistrict}
          onChange={(e) => handleInputChange('maxUsersPerDistrict', e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderVotingSettings = () => (
    <div className="space-y-6">
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-6">
        <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-4">Voting System Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'votingEnabled', label: 'Enable Voting System', desc: 'Allow citizens to cast votes' },
            { key: 'earlyVoting', label: 'Early Voting', desc: 'Enable early voting periods' },
            { key: 'proxyVoting', label: 'Proxy Voting', desc: 'Allow voting by proxy' },
            { key: 'voteVerification', label: 'Vote Verification', desc: 'Enable voter verification system' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-500">{label}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={(e) => handleInputChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">Result Publication</label>
        <select
          value={settings.resultPublication}
          onChange={(e) => handleInputChange('resultPublication', e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="immediate">Immediate</option>
          <option value="delayed">Delayed (24 hours)</option>
          <option value="manual">Manual approval required</option>
        </select>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">SMTP Server</label>
          <input
            type="text"
            value={settings.smtpServer}
            onChange={(e) => handleInputChange('smtpServer', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">SMTP Port</label>
          <input
            type="text"
            value={settings.smtpPort}
            onChange={(e) => handleInputChange('smtpPort', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Username</label>
          <input
            type="email"
            value={settings.smtpUsername}
            onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Password</label>
          <input
            type="password"
            value={settings.smtpPassword}
            onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">From Name</label>
        <input
          type="text"
          value={settings.emailFromName}
          onChange={(e) => handleInputChange('emailFromName', e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">Automatic Backup</h3>
            <p className="text-sm text-blue-700 dark:text-blue-400">Enable scheduled system backups</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Backup Frequency</label>
          <select
            value={settings.backupFrequency}
            onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Retention Period (days)</label>
          <input
            type="number"
            value={settings.retentionPeriod}
            onChange={(e) => handleInputChange('retentionPeriod', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Backup Location</label>
          <select
            value={settings.backupLocation}
            onChange={(e) => handleInputChange('backupLocation', e.target.value)}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="cloud">Cloud Storage</option>
            <option value="local">Local Storage</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationSettings();
      case 'users': return renderUserManagement();
      case 'voting': return renderVotingSettings();
      case 'email': return renderEmailSettings();
      case 'backup': return renderBackupSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen p-6">
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
                              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                              <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-gray-900 dark:text-gray-100"
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
                                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                    {item.label}
                                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </nav>
                      </aside>
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl shadow-lg border border-emerald-100 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl">
                <Settings className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold ">System Settings</h1>
                <p className="text-gray-500">Configure and manage your Civix platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {saveStatus === 'saving' && (
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm">Saving...</span>
                </div>
              )}
              {saveStatus === 'success' && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">Settings saved</span>
                </div>
              )}
              <button
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="rounded-2xl shadow-lg border border-emerald-100 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-emerald-100 text-emerald-700 font-medium'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl shadow-lg border border-emerald-100 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold ">
                  {tabs.find(tab => tab.id === activeTab)?.name}
                </h2>
                <p className="text-gray-500 mt-1">
                  Configure your {tabs.find(tab => tab.id === activeTab)?.name.toLowerCase()} preferences
                </p>
              </div>
              
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
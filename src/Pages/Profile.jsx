import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  ArrowLeft, 
  Edit3, 
  Save, 
  Lock,
  CheckCircle
} from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    location: '',
    complaints: 0,
    lastActivity: '',
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    location: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordRequest, setShowPasswordRequest] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const mockUser = {
        username: 'User Name',
        email: 'user@example.com',
        location: 'Delhi, India',
        complaints: 3,
        lastActivity: new Date().toLocaleString(),
      };
      
      setUser(mockUser);
      setFormData({
        username: mockUser.username,
        email: mockUser.email,
        location: mockUser.location,
      });
    }, 500);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setUser({
        ...user,
        username: formData.username,
        email: formData.email,
        location: formData.location,
      });
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  const handlePasswordRequest = () => {
    setShowPasswordRequest(true);
    setTimeout(() => setShowPasswordRequest(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-6 lg:p-8">
      <button
        className="absolute top-20 left-4 z-20 group flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200 transition-all duration-200 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-lg backdrop-blur-sm"
        onClick={() => window.history.back()}
        type="button"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-700 dark:to-green-700 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 dark:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{user.username || 'Loading...'}</h1>
                <p className="text-emerald-100 dark:text-emerald-200 opacity-90">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  Name
                </label>
                <input
                  type="text"
                  value={formData.username}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                    isEditing 
                      ? 'border-emerald-200 dark:border-emerald-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                  } outline-none`}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                    isEditing 
                      ? 'border-emerald-200 dark:border-emerald-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                  } outline-none`}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                    isEditing 
                      ? 'border-emerald-200 dark:border-emerald-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                  } outline-none`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800/50">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-semibold">Complaints</span>
                  </div>
                  <div className="text-2xl font-bold text-red-700 dark:text-red-300">{user.complaints}</div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-semibold">Last Active</span>
                  </div>
                  <div className="text-xs font-medium text-emerald-700 dark:text-emerald-300 leading-tight">
                    {user.lastActivity || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 dark:border-slate-700">
                {isEditing ? (
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-700 dark:to-green-800 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-800 dark:hover:from-emerald-800 dark:hover:to-green-900 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-700 dark:to-green-800 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-green-800 dark:hover:from-emerald-800 dark:hover:to-green-900 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePasswordRequest}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all duration-200 border border-emerald-200 dark:border-emerald-700"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>

            {showPasswordRequest && (
              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-300">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                  Password reset link sent to your email address
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
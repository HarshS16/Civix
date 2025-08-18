import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Switch from '../DarkModeToggle';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@clerk/clerk-react';
import logo from '../assets/logo.png';
import { title } from 'process';
import { Info, Phone, Users, User, LogOut, Shield, LayoutDashboard, BookOpen, Menu, X, AlertTriangle,Vote } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightDropdownOpen, setRightDropdownOpen] = useState(false);
  const rightDropdownRef = useRef(null);
  const { isSignedIn, signOut } = useAuth();

  const handleNav = (cb) => {
    setMobileMenuOpen(false);
    if (cb) cb();
  };

  const handleLogout = async () => {
    if (signOut) {
      await signOut(); 
    }
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage-update"));
    setRightDropdownOpen(false);
    navigate("/");
  };

  const handleSOSClick = () => {
    navigate('/sos');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rightDropdownRef.current && !rightDropdownRef.current.contains(event.target)) {
        setRightDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onClick = (e) => {
      if (e.target.closest('#mobile-nav-panel') || e.target.closest('#mobile-nav-toggle')) return;
      setMobileMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [mobileMenuOpen]);

  const token = localStorage.getItem('token');
  let isAdmin = false;

  try {
    if (token) {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === 'admin';
    }
  } catch (err) {
    console.error('Invalid token');
  }

  const navLinks = [
    {
      title: "About",
      href: "/about",
      icon: Info,
    },
    {
      title: "Contact Us",
      href: "/contact",
      icon: Phone,
    },
    {
      title: "Our contributors",
      href: "/contributors",
      icon: Users,
    },
    {
      title: "Voting System",
      href: "/voting-system",
      icon: Vote,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-green-100 dark:border-green-900/20 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex items-center">
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/'); }} 
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Civix logo" 
                  className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((navItem) => {
              const Icon = navItem.icon;
              const isActive = location.pathname === navItem.href;
              return (
                <Link
                  key={navItem.title}
                  to={navItem.href}
                  className={`flex items-center gap-2 px-4 py-2.5 text-base font-semibold text-xl rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? 'text-green-700 dark:text-green-300 bg-white/60 dark:bg-white/10 backdrop-blur-lg border border-green-200/50 dark:border-green-700/50'
                      : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 dark:from-green-500/20 dark:to-emerald-500/20 rounded-xl" />
                  )}
                  <Icon className={`w-4 h-4 transition-transform duration-300 relative z-10 ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span className="relative z-10">{navItem.title}</span>
                </Link>
              );
            })}
          </nav>

          <button
            id="mobile-nav-toggle"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/50 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors duration-300 group"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <Menu className="h-5 w-5 text-green-600 dark:text-green-400" />
            )}
          </button>

          <div className="hidden lg:flex items-center gap-5">
            
            <button
              onClick={handleSOSClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg hover:shadow-red-200 dark:hover:shadow-red-900/50 transform hover:scale-105 transition-all duration-300 group"
              title="Emergency SOS"
              aria-label="Emergency SOS Button"
            >
              <AlertTriangle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>SOS</span>
            </button>

            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/50 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors duration-300">
              <Switch />
            </div>

            <div className="relative" ref={rightDropdownRef}>
              <button
                onClick={() => setRightDropdownOpen(!rightDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900/50 transform hover:scale-105 transition-all duration-300"
                aria-label="Open user menu"
              >
                <User className="h-5 w-5" />
              </button>

              {rightDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-green-100 dark:border-green-900/20 z-50 overflow-hidden">
                  <div className="p-2">
                    
                    <button
                      onClick={() => { setRightDropdownOpen(false); navigate('/civic-education'); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-xl transition-all duration-200 group"
                    >
                      <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span>Civic Education & Rights</span>
                    </button>
                    
                    {!(isSignedIn || token) ? (
                      <button
                        onClick={() => { setRightDropdownOpen(false); navigate('/login'); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl transition-all duration-200 group mt-2"
                      >
                        <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span>Login</span>
                      </button>
                    ) : (
                      <>
                        <div className="border-t border-green-100 dark:border-green-900/20 my-2"></div>
                        
                        <button
                          onClick={() => { setRightDropdownOpen(false); navigate('/profile'); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-xl transition-all duration-200 group"
                        >
                          <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span>Profile</span>
                        </button>
                        
                        <button
                          onClick={() => { setRightDropdownOpen(false); navigate(isAdmin ? '/admin' : '/user/dashboard'); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-xl transition-all duration-200 group"
                        >
                          {isAdmin ? (
                            <Shield className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          ) : (
                            <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          )}
                          <span>Dashboard</span>
                        </button>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:text-white hover:bg-gradient-to-r from-red-500 to-red-600 rounded-xl transition-all duration-200 group mt-2"
                        >
                          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span>Logout</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          <div className="lg:hidden fixed inset-x-0 top-0 z-50">
            <nav 
              id="mobile-nav-panel" 
              className="flex flex-col w-full min-h-screen bg-white dark:bg-slate-950 pt-20 px-6 pb-6"
            >
              <button
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-green-50 dark:bg-green-950/50 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors duration-300"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5 text-green-600 dark:text-green-400" />
              </button>

              <div className="space-y-2 mb-8">
                {navLinks.map((navItem) => {
                  const Icon = navItem.icon;
                  const isActive = location.pathname === navItem.href;
                  return (
                    <Link 
                      key={navItem.title}
                      to={navItem.href}
                      onClick={() => handleNav()}
                      className={`flex items-center gap-4 px-4 py-4 text-xl font-semibold rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        isActive
                          ? 'text-green-700 dark:text-green-300 bg-white/60 dark:bg-white/10 backdrop-blur-lg border border-green-200/50 dark:border-green-700/50 shadow-lg shadow-green-100/50 dark:shadow-green-900/30'
                          : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 dark:from-green-500/20 dark:to-emerald-500/20 rounded-xl" />
                      )}
                      <Icon className={`w-5 h-5 transition-transform duration-300 relative z-10 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`} />
                      <span className="relative z-10">{navItem.title}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-3 flex-1">
                {(isSignedIn || token) && (
                  <>
                    <button
                      onClick={() => handleNav(() => navigate('/profile'))}
                      className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-950/50 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-xl transition-all duration-300 group"
                    >
                      <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => handleNav(() => navigate(isAdmin ? '/admin' : '/user/dashboard'))}
                      className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-950/50 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-xl transition-all duration-300 group"
                    >
                      {isAdmin ? (
                        <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      )}
                      <span>Dashboard</span>
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleNav(handleSOSClick)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 text-base font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group"
                >
                  <AlertTriangle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Emergency SOS</span>
                </button>

                {(isSignedIn || token) ? (
                  <button
                    onClick={() => handleNav(handleLogout)}
                    className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-red-600 dark:text-red-400 hover:text-white hover:bg-gradient-to-r from-red-500 to-red-600 rounded-xl transition-all duration-300 group"
                  >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleNav(() => navigate('/login'))}
                      className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-gray-700 dark:text-gray-300 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-xl transition-all duration-300 group"
                    >
                      <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Login</span>
                    </button>
                    
                    <button
                      onClick={() => handleNav(() => navigate('/signup'))}
                      className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group"
                    >
                      <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Get Started</span>
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center justify-center pt-6 mt-auto border-t border-green-100 dark:border-green-900/20">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/50">
                  <Switch />
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
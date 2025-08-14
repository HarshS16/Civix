import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Switch from '../DarkModeToggle';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@clerk/clerk-react';
// Updated logo imports
import logoLight from '../assets/lightmode-removebg.png';
import logoDark from '../assets/darkmode-removebg.png';
import { title } from 'process';
import { Info, Phone, Users } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightDropdownOpen, setRightDropdownOpen] = useState(false);
  const rightDropdownRef = useRef(null);
  const { isSignedIn, signOut } = useAuth();

  // Updated dark mode detection state with localStorage check
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // If no saved theme, check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    // Check DOM as fallback
    return document.documentElement.classList.contains('dark');
  });

  // Updated effect to listen for dark mode changes
  useEffect(() => {
    // Function to update dark mode state
    const updateDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Initial check
    updateDarkMode();

    // Set up observer for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateDarkMode();
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Clean up
    return () => observer.disconnect();
  }, []);

  const handleNav = (cb) => {
    setMobileMenuOpen(false);
    if (cb) cb();
  };

  // Handle logout
  const handleLogout = async () => {
    if (signOut) {
      await signOut(); // Clerk: clears session and data
    }
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage-update"));
    setRightDropdownOpen(false);
    navigate("/");
  };

  // Handle SOS button click
  const handleSOSClick = () => {
    // You can customize this action based on your needs
    // For now, it will navigate to an SOS/emergency page or trigger emergency services
    navigate('/sos');
    // Or open a modal, call emergency services, etc.
  };

  // Close dropdowns when clicking outside
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

  // Close menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onClick = (e) => {
      if (e.target.closest('#mobile-nav-panel') || e.target.closest('#mobile-nav-toggle')) return;
      setMobileMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [mobileMenuOpen]);

  // Check if logged-in user is admin
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
  ];


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-[hsla(240,5%,15%,0.8)] backdrop-blur">
      <div className="container flex h-14 items-center justify-between">

        <div className="flex items-center">
          <button onClick={() => { setMobileMenuOpen(false); navigate('/'); }} className="flex items-center gap-2 hover:text-emerald-500 transition-colors duration-300">
            {/* Updated logo implementation */}
            <img 
              src={isDarkMode ? logoDark : logoLight} 
              alt="Civix logo" 
              className="h-8 w-auto" 
            />
          </button>
        </div>

        <nav className="hidden md:flex gap-4">
          {navLinks.map((navItem) => {
            const Icon = navItem.icon;
            return (
              <Link
                key={navItem.title}
                to={navItem.href}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white rounded-full px-4 py-2 transition-all duration-300 hover:bg-gradient-to-r from-emerald-400 to-teal-500 hover:shadow-lg"
              >
                <Icon className="w-5 h-5" />
                <span>{navItem.title}</span>
              </Link>
            );
          })}
        </nav>

        <button
          id="mobile-nav-toggle"
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <svg className="h-7 w-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleSOSClick}
            className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-lg hover:shadow-xl h-9 px-4 py-2"
            title="Emergency SOS"
            aria-label="Emergency SOS Button"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            SOS
          </button>
          <div className="h-8 flex items-center justify-center">
            <Switch />
          </div>

          <div className="relative" ref={rightDropdownRef}>
            <button
              onClick={() => setRightDropdownOpen(!rightDropdownOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Open user menu"
            >
              <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {rightDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 p-px shadow-xl z-50">
                <div className="bg-white dark:bg-gray-900 rounded-[7px]">
                  <div className="p-1">
                    <button
                      onClick={() => { setRightDropdownOpen(false); navigate('/civic-education'); }}
                      className="w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-200 flex items-center gap-2"
                    >
                      Civic Education & Rights
                    </button>
                    
                    {!(isSignedIn || token) ? (
                      <button
                        onClick={() => { setRightDropdownOpen(false); navigate('/login'); }}
                        className="w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-200 flex items-center gap-2"
                      >
                        Login
                      </button>
                    ) : (
                      <>
                        <hr className="my-1 border-gray-200 dark:border-gray-700" />
                        <button
                          onClick={() => {
                            setRightDropdownOpen(false);
                            navigate('/profile');
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-200 flex items-center gap-2"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            setRightDropdownOpen(false);
                            navigate(isAdmin ? '/admin' : '/user/dashboard');
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-200 flex items-center gap-2"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-sm rounded-md text-red-600 dark:text-red-400 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-200 flex items-center gap-2"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed inset-x-0 top-0 z-[100] animate-fade-slide-up">
            <nav id="mobile-nav-panel" className="relative flex flex-col items-center w-full h-[100vh] bg-white dark:bg-[#18181b] pt-24 gap-6 shadow-xl">
              <button
                className="absolute top-6 right-6 text-3xl text-emerald-600 focus:outline-none"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                &times;
              </button>

              {navLinks.map((navItem) => (
                <Link key={navItem.title}
                  to={navItem.href}
                  onClick={() => handleNav()}
                  className='text-lg font-medium hover:text-emerald-500 transition-colors duration-300'
                >
                  {navItem.title}
                </Link>
              ))}

              {(isSignedIn || token) && (
                <button
                  onClick={() => handleNav(() => navigate('/profile'))}
                  className="w-11/12 rounded-md text-base font-medium border border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 h-11 px-4 py-2"
                >
                  Profile
                </button>
              )}

              {(isSignedIn || token) && (
                <button
                  onClick={() => handleNav(() => navigate(isAdmin ? '/admin' : '/user/dashboard'))}
                  className="w-11/12 rounded-md text-base font-medium border border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 h-11 px-4 py-2"
                >
                  Dashboard
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => handleNav(() => navigate('/admin'))}
                  className="w-11/12 rounded-md text-base font-medium border border-emerald-500 text-emerald-600 hover:bg-emerald-50 h-11 px-4 py-2"
                >
                  Admin Dashboard
                </button>
              )}

              {isSignedIn || token ? (
                <>
                  <button
                    onClick={() => handleNav(handleLogout)}
                    className="w-11/12 rounded-md text-base font-medium bg-emerald-500 text-white hover:bg-emerald-600 h-11 px-4 py-2"
                  >
                    Logout
                  </button>

                  <button
                    onClick={() => handleNav(handleSOSClick)}
                    className="w-11/12 rounded-md text-base font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg h-11 px-4 py-2 animate-pulse flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Emergency SOS
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNav(() => navigate('/login'))}
                    className="w-11/12 rounded-md text-base font-medium border border-input hover:bg-accent hover:text-accent-foreground h-11 px-4 py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNav(() => navigate('/signup'))}
                    className="w-11/12 rounded-md text-base font-medium bg-emerald-500 text-white hover:bg-emerald-600 h-11 px-4 py-2"
                  >
                    Get Started
                  </button>

                  <button
                    onClick={() => handleNav(handleSOSClick)}
                    className="w-11/12 rounded-md text-base font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg h-11 px-4 py-2 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Emergency SOS
                  </button>
                </>
              )}
              <div className="mt-auto pb-10">
                <Switch />
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
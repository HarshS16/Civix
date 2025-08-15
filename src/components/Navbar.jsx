import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Switch from "../DarkModeToggle";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@clerk/clerk-react";
// Updated logo imports
import logoLight from "../assets/lightmode-removebg.png";
import logoDark from "../assets/darkmode-removebg.png";
import {
  Info,
  Phone,
  Users,
  Vote,
  X,
  Menu,
  User,
  Shield,
  LayoutDashboard,
  AlertTriangle,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightDropdownOpen, setRightDropdownOpen] = useState(false);
  const rightDropdownRef = useRef(null);
  const { isSignedIn, signOut } = useAuth();

  // Updated dark mode detection state with localStorage check
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // If no saved theme, check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true;
    }
    // Check DOM as fallback
    return document.documentElement.classList.contains("dark");
  });

  // Updated effect to listen for dark mode changes
  useEffect(() => {
    // Function to update dark mode state
    const updateDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    // Initial check
    updateDarkMode();

    // Set up observer for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateDarkMode();
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Clean up
    return () => observer.disconnect();
  }, []);

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
    navigate("/sos");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        rightDropdownRef.current &&
        !rightDropdownRef.current.contains(event.target)
      ) {
        setRightDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onClick = (e) => {
      if (
        e.target.closest("#mobile-nav-panel") ||
        e.target.closest("#mobile-nav-toggle")
      )
        return;
      setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mobileMenuOpen]);

  const token = localStorage.getItem("token");
  let isAdmin = false;

  try {
    if (token) {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === "admin";
    }
  } catch (err) {
    console.error("Invalid token");
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-[hsla(240,5%,15%,0.8)] backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate("/");
            }}
            className="flex items-center gap-2 hover:text-emerald-500 transition-colors duration-300"
          >
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
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <svg
            className="h-7 w-7 text-emerald-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <Menu className="h-5 w-5 text-green-600 dark:text-green-400" />
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
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900/50 transform hover:scale-105 transition-all duration-300"
              aria-label="Open user menu"
            >
              <User className="h-5 w-5" />
            </button>

            {rightDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 p-px shadow-xl z-50">
                <div className="bg-white dark:bg-gray-900 rounded-[7px]">
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setRightDropdownOpen(false);
                        navigate("/civic-education");
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-200 flex items-center gap-2"
                    >
                      Civic Education & Rights
                    </button>

                    {!(isSignedIn || token) ? (
                      <button
                        onClick={() => {
                          setRightDropdownOpen(false);
                          navigate("/login");
                        }}
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
                            navigate("/profile");
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-200 flex items-center gap-2"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            setRightDropdownOpen(false);
                            navigate(isAdmin ? "/admin" : "/user/dashboard");
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
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed inset-x-0 top-0 z-[100] animate-fade-slide-up">
            <nav
              id="mobile-nav-panel"
              className="relative flex flex-col items-center w-full h-[100vh] bg-white dark:bg-[#18181b] pt-24 gap-6 shadow-xl"
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
                      className={`flex items-center gap-4 px-4 py-4 text-lg font-medium rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        isActive
                          ? "text-green-700 dark:text-green-300 bg-white/60 dark:bg-white/10 backdrop-blur-lg border border-green-200/50 dark:border-green-700/50 shadow-lg shadow-green-100/50 dark:shadow-green-900/30"
                          : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 dark:from-green-500/20 dark:to-emerald-500/20 rounded-xl" />
                      )}
                      <Icon
                        className={`w-5 h-5 transition-transform duration-300 relative z-10 ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                      />
                      <span className="relative z-10">{navItem.title}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-3 flex-1">
                {(isSignedIn || token) && (
                  <>
                    <button
                      onClick={() => handleNav(() => navigate("/profile"))}
                      className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-950/50 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-xl transition-all duration-300 group"
                    >
                      <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() =>
                        handleNav(() =>
                          navigate(isAdmin ? "/admin" : "/user/dashboard")
                        )
                      }
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

                {isSignedIn || token ? (
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
                      onClick={() => handleNav(() => navigate("/login"))}
                      className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-gray-700 dark:text-gray-300 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-xl transition-all duration-300 group"
                    >
                      <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Login</span>
                    </button>

                    <button
                      onClick={() => handleNav(() => navigate("/signup"))}
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

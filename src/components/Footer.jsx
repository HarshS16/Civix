import { Github, Info, ShieldCheck, ScrollText, Star, UsersIcon, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
// Update the logo imports
import logoLight from '../assets/lightmode-removebg.png';
import logoDark from '../assets/darkmode-removebg.png';
import { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/HarshS16/Civix",
      icon: Github,
      description: "View source code"
    },
  ];

  const footerLinks = [
    {
      title: "Civix",
      links: [
        { name: "About", href: "/about", icon: Info },
        { name: "Features", href: "/#features", icon: Star },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy", icon: ShieldCheck },
        { name: "Terms", href: "/terms", icon: ScrollText },
        { name: "Contributors", href: "/contributors", icon: UsersIcon },
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95 backdrop-blur-xl border-t border-green-500/20 dark:border-green-500/10 text-slate-800 dark:text-slate-100">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10 dark:from-green-500/5 dark:via-transparent dark:to-blue-500/5 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src={isDarkMode ? logoDark : logoLight} 
                alt="Civix Logo" 
                className="w-20 h-auto" 
              />
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-md">
              Empowering citizens through technology. Stay informed, make better decisions, 
              and engage with civic life through our innovative platform.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-green-500/20 hover:bg-green-500/30 dark:bg-green-500/10 dark:hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 dark:border-green-500/20 dark:hover:border-green-500/40 rounded-xl flex items-center justify-center text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/25"
                  title={social.description}
                >
                  <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <div className="relative">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300 hover:w-12"></div>
              </div>
              
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-center space-x-3 text-slate-600 hover:text-green-600 dark:text-slate-300 dark:hover:text-green-300 transition-all duration-300 hover:translate-x-2 py-1"
                    >
                      <link.icon className="w-4 h-4 text-green-500 group-hover:text-green-600 dark:text-green-400 dark:group-hover:text-green-300 transition-colors duration-300 group-hover:scale-110" />
                      <span className="text-sm font-medium">{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-all duration-300 transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-green-500/20 dark:border-green-500/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-500 dark:text-slate-400 text-sm">
              © {currentYear} Civix. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm">
              <span>Built with</span>
              <span className="text-red-400 animate-pulse text-base">♥</span>
              <span>by</span>
              <a
                href="https://github.com/HarshS16/Civix"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium transition-all duration-300 hover:scale-105"
              >
                <span>Harsh S.</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-all duration-300 transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
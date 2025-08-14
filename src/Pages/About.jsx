// src/components/About.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './About.css';
import mission from '../assets/mission.png';
import { 
  Users, 
  Globe, 
  Heart, 
  Target, 
  Zap, 
  Shield,
  Award,
  Smartphone
} from 'lucide-react';

function About() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,   // repeat when scrolling up/down
      mirror: true,  // animate out while scrolling past
    });

    // Refresh AOS after layout changes / images load
    const refreshAOS = () => AOS.refresh();

    // refresh on load/resize and a small timeout (helps with images and fonts)
    window.addEventListener('load', refreshAOS);
    window.addEventListener('resize', refreshAOS);
    const timeoutId = setTimeout(refreshAOS, 600);

    // prefer-color-scheme listener
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDarkMode(mq.matches);
    mq.addEventListener && mq.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('load', refreshAOS);
      window.removeEventListener('resize', refreshAOS);
      clearTimeout(timeoutId);
      mq.removeEventListener && mq.removeEventListener('change', handleChange);
    };
  }, []);

   const features = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Community Building",
      description: "Connect with like-minded individuals in your area",
      details: "Create lasting relationships and build stronger neighborhoods through our advanced matching system."
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Global Impact",
      description: "Make a difference on a worldwide scale",
      details: "Join international initiatives and see how your local actions contribute to global change."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Social Good",
      description: "Focus on projects that truly matter",
      details: "Our AI-powered system helps identify the most impactful opportunities in your community."
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: "Goal Tracking",
      description: "Measure your impact with precision",
      details: "Advanced analytics and reporting tools help you track progress and celebrate achievements."
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Quick Actions",
      description: "Take immediate action when it matters",
      details: "Real-time notifications and one-click participation make helping others effortless."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Verified Projects",
      description: "Trust in legitimate, vetted opportunities",
      details: "Every project undergoes rigorous verification to ensure your time and effort create real impact."
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Recognition System",
      description: "Get acknowledged for your contributions",
      details: "Earn badges, certificates, and community recognition for your volunteer work and achievements."
    },
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "Mobile First",
      description: "Volunteer on the go with our mobile app",
      details: "Native iOS and Android apps with offline capabilities and push notifications."
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Report Issue',
      description:
        'Log in via mobile app and describe your issue with location and photo',
    },
    {
      number: '02',
      title: 'Route & Process',
      description: 'Civix automatically routes your report to the relevant department',
    },
    {
      number: '03',
      title: 'Track & Resolve',
      description:
        'Monitor updates and resolution status in real-time with notifications',
    },
  ];

  return (
    <div className={`about-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="content-wrapper">
        {/* HERO */}
        <section className="hero-section" data-aos="fade-up">
          <div className="hero-content">
            <div className="glitter-container" aria-hidden>
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="glitter-star"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* small framer animation only for the badge (doesn't conflict with AOS) */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
              className="hero-badge"
            >
              ✨ Empowering Citizens
            </motion.div>

            <h1 className="hero-title">
              Report Local Issues.
              <br />
              <span className="gradient-text">Make Your City Better.</span>
            </h1>

            <p className="hero-description">
              Civix helps citizens report and track local civic issues like potholes, broken lights,
              and garbage collection problems with unprecedented ease and transparency.
            </p>

            <div className="hero-cta">
              <Link to="/signup">
                <button className="cta-primary">Get Started</button>
              </Link>
              <button className="cta-secondary">Learn More</button>
            </div>
          </div>
        </section>

       <section className="relative py-20 px-6 ">
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-green-50/80 dark:bg-green-900/30 rounded-full border border-green-100/60 dark:border-green-700/30">
            <span className="text-green-700 dark:text-green-300 text-sm font-medium">✨ Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6 leading-tight">
            Everything you need to make a 
            <span className="block text-green-600 dark:text-green-400">real difference</span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover powerful tools and features designed to amplify your impact and 
            connect you with meaningful opportunities in your community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer
                ${activeFeature === index 
                  ? 'bg-white dark:bg-slate-800 shadow-xl shadow-green-500/5 dark:shadow-green-500/10 border border-green-200/40 dark:border-green-600/30 transform translate-y-[-4px]' 
                  : 'bg-white/70 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg dark:hover:shadow-lg border border-white/50 dark:border-slate-700/50'
                } backdrop-blur-sm`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                activeFeature === index 
                  ? 'bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/20 opacity-100' 
                  : 'opacity-0'
              }`}></div>

              <div className={`relative mb-5 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
                ${activeFeature === index 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white shadow-md shadow-green-500/20 dark:shadow-green-500/30' 
                  : 'bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/60'
                }`}
              >
                {feature.icon}
              </div>

              <div className="relative">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                  {feature.description}
                </p>
                
                <p className={`text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-all duration-300 ${
                  activeFeature === index ? 'opacity-100 max-h-16' : 'opacity-0 max-h-0 overflow-hidden'
                }`}>
                  {feature.details}
                </p>
              </div>

              <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeFeature === index ? 'bg-green-400 dark:bg-green-500' : 'bg-slate-200 dark:bg-slate-600'
              }`}></div>

              <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 transition-all duration-300 ${
                activeFeature === index ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
          ))}
        </div>        
      </div>
    </section>

        {/* WHY */}
        <section className="why-section" data-aos="fade-up" data-aos-delay="300">
          <div className="why-content">
            <div className="why-text">
              <h2 className="why-section-title">Why Choose Civix?</h2>
              <p className="why-description">
                Civix empowers citizens by simplifying the process to voice concerns and foster positive
                change in communities. We connect the public with civic authorities for enhanced governance,
                transparency, and real results that matter.
              </p>

              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Issues Resolved</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Cities Connected</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">User Satisfaction</span>
                </div>
              </div>
            </div>

            <div className="why-visual">
              <div className="visual-element">
                <div className="pulse-ring" />
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="mission-vision-section" data-aos="fade-up" data-aos-delay="400">
          <div className="mv-container">
            <div className="mv-text">
              <h2 className="section-title">Our Mission</h2>
              <p>
                To empower every citizen to take action and improve their city by making civic reporting
                simple, transparent, and impactful.
              </p>
              <h2 className="section-title">Our Vision</h2>
              <p>
                A world where communities and governments work hand-in-hand to create cleaner, safer, and
                more livable cities for everyone.
              </p>
            </div>
            <div className="mv-image">
              {/* refresh AOS once this image is loaded */}
              <img src={mission} alt="Mission" onLoad={() => AOS.refresh()} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" data-aos="zoom-in" data-aos-delay="500">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Join thousands of citizens who are already using Civix to improve their communities.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Download App</button>
              <Link to="/contact">
                <button className="cta-secondary">Contact Us</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;

// src/components/About.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [showMore, setShowMore] = useState(false);
  const learnMoreRef = useRef(null);

  useEffect(() => {
    if (showMore && learnMoreRef.current) {
      setTimeout(() => {
        learnMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        AOS.refresh();
      }, 60);
    }
  }, [showMore]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });

    const refreshAOS = () => AOS.refresh();
    window.addEventListener('load', refreshAOS);
    window.addEventListener('resize', refreshAOS);
    const timeoutId = setTimeout(refreshAOS, 600);

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

              <button onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show Less" : "Learn More"}
              </button>
            </div>
          </div>
        </section>

        {/* EXPANDABLE SECTION */}
        <AnimatePresence initial={false}>
          {showMore && (
            <motion.div
              key="learn-more"
              ref={learnMoreRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
              className="mt-10 space-y-16"
            >

              {/* FEATURES */}
              <section className="relative py-20 px-6 ">
                <div className="relative max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                      Everything you need to make a 
                      <span className="block text-green-600">real difference</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer
                          ${activeFeature === index 
                            ? 'bg-white shadow-xl border border-green-200 transform translate-y-[-4px]' 
                            : 'bg-white/70 hover:bg-white hover:shadow-lg border border-white/50'
                          }`}
                        onMouseEnter={() => setActiveFeature(index)}
                        onMouseLeave={() => setActiveFeature(null)}
                      >
                        <div className="relative mb-5 w-14 h-14 rounded-xl flex items-center justify-center bg-green-50 text-green-600">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100 group-hover:dark:text-gray-800">{feature.title}</h3>
                        <p className="text-sm mb-3 text-gray-600 dark:text-gray-200 group-hover:dark:text-gray-600">{feature.description}</p>
                        {activeFeature === index && (
                          <p className="text-xs text-slate-500">{feature.details}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* WHY SECTION */}
              <section className="why-section py-16 px-6 md:px-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl shadow-lg" data-aos="fade-up" data-aos-delay="300">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="why-text text-white md:w-2/3">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Civix?</h2>
                    <p className="text-lg opacity-90 leading-relaxed mb-8">
                      Civix empowers citizens by simplifying the process to voice concerns and foster positive
                      change in communities. We connect the public with civic authorities for enhanced governance,
                      transparency, and real results that matter.
                    </p>
                  </div>
                </div>
              </section>

              {/* MISSION & VISION */}
              <section className="mission-vision-section" data-aos="fade-up" data-aos-delay="400">
                <div className="mv-container">
                  <div className="mv-text">
                    <h2 className="section-title">Our Mission</h2>
                    <p>To empower every citizen to take action and improve their city by making civic reporting simple, transparent, and impactful.</p>
                    <h2 className="section-title">Our Vision</h2>
                    <p>A world where communities and governments work hand-in-hand to create cleaner, safer, and more livable cities for everyone.</p>
                  </div>
                  <div className="mv-image">
                    <img src={mission} alt="Mission" onLoad={() => AOS.refresh()} />
                  </div>
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default About;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './About.css';

function About() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: i * 0.2,
        type: 'spring',
        stiffness: 120,
        damping: 15
      }
    }),
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    }
  };

  const features = [
    {
      icon: '📱',
      title: 'Easy Reporting',
      description: 'Quickly log issues with a few taps and notify the right authorities instantly.',
      details: 'Our intuitive interface makes reporting civic issues as simple as sending a text message.'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Stay updated with real-time progress on your complaints and resolutions.',
      details: 'Get notifications and track every step from submission to resolution with our advanced tracking system.'
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Engage and collaborate with your neighborhood to drive meaningful change.',
      details: 'Join forces with neighbors, vote on issues, and create a stronger voice for your community.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Report Issue',
      description: 'Log in via mobile app and describe your issue with location and photo'
    },
    {
      number: '02',
      title: 'Route & Process',
      description: 'Civix automatically routes your report to the relevant department'
    },
    {
      number: '03',
      title: 'Track & Resolve',
      description: 'Monitor updates and resolution status in real-time with notifications'
    }
  ];

  return (
    <div className={`about-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
     

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="content-wrapper"
      >
        <motion.section variants={itemVariants} className="hero-section">
          <div className="hero-content">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="hero-badge"
            >
              ✨ Empowering Citizens
            </motion.div>
            
            <motion.h1
              className="hero-title bg-gradient-to-r from-gray-300 to-gray-700 bg-clip-text text-transparent"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Report Local Issues.
              <br />
              <span className="gradient-text">Make Your City Better.</span>
            </motion.h1>
            
            <motion.p
              className="hero-description"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Civix helps citizens report and track local civic issues like potholes, 
              broken lights, and garbage collection problems with unprecedented ease and transparency.
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button className="cta-primary">Get Started</button>
              <button className="cta-secondary">Learn More</button>
            </motion.div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="features-section">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need to make a real difference in your community</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setActiveFeature(index)}
                onHoverEnd={() => setActiveFeature(null)}
                className="feature-card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                <AnimatePresence>
                  {activeFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="feature-details"
                    >
                      <p>{feature.details}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="process-section">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Simple steps to create meaningful change</p>
          </div>

          <div className="process-timeline">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="timeline-item"
              >
                <div className="timeline-marker">
                  <span className="step-number">{step.number}</span>
                </div>
                <div className="timeline-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="why-section">
          <div className="why-content">
            <div className="why-text">
              <h2 className="section-title">Why Choose Civix?</h2>
              <p className="why-description">
                Civix empowers citizens by simplifying the process to voice concerns and foster 
                positive change in communities. We connect the public with civic authorities for 
                enhanced governance, transparency, and real results that matter.
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
                <div className="pulse-ring"></div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Join thousands of citizens who are already using Civix to improve their communities.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">Download App</button>
              <button className="btn-outline">Contact Us</button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

export default About;
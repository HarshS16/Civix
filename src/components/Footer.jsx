import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div>
          <h2>Civix</h2>
          <p>
            Empowering citizens, enabling better governance. Civix connects people with city authorities to report and resolve civic issues transparently.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/report">Report an Issue</a></li>
            <li><a href="/dashboard">Admin Dashboard</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3>Connect With Us</h3>
          <div className="footer-icons">
            <a href="https://github.com/HarshS16" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
            <a href="https://www.linkedin.com/in/harsh-srivastava-51b67324a/"><FaLinkedin size={20} /></a>
            <a href="https://x.com/harshsr69382182"><FaTwitter size={20} /></a>
            <a href="https://www.instagram.com/harsh_srivastava_16/"><FaInstagram size={20} /></a>
            <a href="#"><FaGlobe size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Civix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

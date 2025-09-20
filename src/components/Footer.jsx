import { useState, useEffect, useCallback, useRef } from "react";
import {
  Github,
  Info,
  ShieldCheck,
  ScrollText,
  Star,
  UsersIcon,
  ArrowUpRight,
  MapPin,
  Heart,
  Sparkles,
  Zap,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  ExternalLink,
  Rss,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import logoF from "../assets/logo.png";
import { ReactComponent as XLogo } from "../assets/XLogo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [selectedRating, setSelectedRating] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const canvasRef = useRef(null);
  const footerRef = useRef(null);

  // Performance optimization: Memoize social links
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/HarshS16/Civix",
      icon: Github,
      description: "View source code",
      color:
        "hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900",
    },
    {
      name: "X",
      href: "https://x.com/civix",
      icon: XLogo,
      description: "Follow us on X",
      color:
        "hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/civix",
      icon: Linkedin,
      description: "Connect on LinkedIn",
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/c/civix",
      icon: Youtube,
      description: "Watch our videos",
      color: "hover:bg-red-600 hover:text-white",
    },
  ];

  const footerLinks = [
    {
      title: "Civix",
      icon: Sparkles,
      links: [
        {
          name: "About",
          href: "/about",
          icon: Info,
          description: "Learn about our mission",
        },
        {
          name: "Features",
          href: "/#features",
          icon: Star,
          description: "Explore platform features",
        },
        {
          name: "Feedback",
          href: "/feedback",
          icon: MessageSquare,
          description: "Share your feedback",
        },
      ],
    },
    {
      title: "Resources",
      icon: Rss,
      links: [
        {
          name: "Blog",
          href: "/blog",
          icon: ScrollText,
          description: "Read our latest articles",
        },
        {
          name: "Documentation",
          href: "/docs",
          icon: ScrollText,
          description: "Developer documentation",
        },
        {
          name: "Tutorials",
          href: "/tutorials",
          icon: UsersIcon,
          description: "Learn how to use Civix",
        },
      ],
    },
    {
      title: "Legal",
      icon: ShieldCheck,
      links: [
        {
          name: "Privacy",
          href: "/privacy",
          icon: ShieldCheck,
          description: "Privacy policy",
        },
        {
          name: "Terms",
          href: "/terms",
          icon: ScrollText,
          description: "Terms of service",
        },
        {
          name: "Contributors",
          href: "/contributors",
          icon: UsersIcon,
          description: "Meet our team",
        },
      ],
    },
  ];

  const emojis = [
    {
      emoji: "😡",
      label: "Very Dissatisfied",
      color: "hover:bg-red-100 dark:hover:bg-red-900/20",
      bg: "bg-red-500/10",
    },
    {
      emoji: "😕",
      label: "Dissatisfied",
      color: "hover:bg-orange-100 dark:hover:bg-orange-900/20",
      bg: "bg-orange-500/10",
    },
    {
      emoji: "😐",
      label: "Neutral",
      color: "hover:bg-yellow-100 dark:hover:bg-yellow-900/20",
      bg: "bg-yellow-500/10",
    },
    {
      emoji: "🙂",
      label: "Satisfied",
      color: "hover:bg-green-100 dark:hover:bg-green-900/20",
      bg: "bg-green-500/10",
    },
    {
      emoji: "😍",
      label: "Very Satisfied",
      color: "hover:bg-purple-100 dark:hover:bg-purple-900/20",
      bg: "bg-purple-500/10",
    },
  ];

  // Performance optimization: Debounced feedback submission
  const handleSubmitFeedback = useCallback(() => {
    if (!selectedRating && !feedbackText.trim()) return;

    setMessage("Thanks for your feedback! 💚");
    setFeedbackText("");
    setSelectedRating(null);

    setTimeout(() => setMessage(""), 3000);
  }, [selectedRating, feedbackText]);

  // Handle newsletter subscription
  const handleNewsletterSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email.trim()) return;

      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubscribed(true);
        setEmail("");

        // Show success message
        setMessage("Successfully subscribed to our newsletter! 🎉");

        // Reset subscription status after some time
        setTimeout(() => {
          setIsSubscribed(false);
        }, 3000);

        // Hide the message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      }, 1000);
    },
    [email]
  );

  // Simple particle animation for background
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setCanvasSize = () => {
      if (footerRef.current) {
        canvas.width = footerRef.current.offsetWidth;
        canvas.height = footerRef.current.offsetHeight;
      }
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(167, 243, 208, 0.03)");
      gradient.addColorStop(0.5, "rgba(110, 231, 183, 0.02)");
      gradient.addColorStop(1, "rgba(52, 211, 153, 0.03)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${particle.opacity})`;
        ctx.fill();

        // Move particles
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className={`relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50 dark:opacity-20"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/50 to-emerald-50/30 dark:from-slate-900/90 dark:via-slate-800/90 dark:to-slate-900/95"></div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-grid-pattern bg-center bg-cover"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Content - Optimized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-12 mb-12">
          {/* Brand Section - More Compact */}
          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div
                className="flex items-center space-x-3 group cursor-pointer"
                onMouseEnter={() => setHoveredItem("logo")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative">
                  <div
                    className={`absolute -inset-3 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-15 blur-lg transition-all duration-500 ${
                      hoveredItem === "logo" ? "opacity-15" : ""
                    }`}
                  ></div>
                  <img
                    src={logoF}
                    alt="Civix Logo"
                    className="w-12 h-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent bg-300% animate-gradient">
                    CIVIX
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                    Civic Engagement Platform
                  </p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xs">
                Empowering citizens through technology. Stay informed, make
                better decisions, and engage with civic life.
              </p>
            </div>

            {/* Social Links - Enhanced */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center">
                <span>Connect With Us</span>
                <span className="ml-2 w-4 h-px bg-emerald-400/50 flex-grow"></span>
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-300/50 dark:hover:border-emerald-500/50 ${social.color}`}
                    title={social.description}
                    aria-label={`Visit our ${social.name} page`}
                    onMouseEnter={() => setHoveredItem(social.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <social.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-slate-900 text-white px-2 py-1 rounded-md whitespace-nowrap">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info - Enhanced */}
          <div className="space-y-4">
            <div
              className="flex items-center space-x-2 group cursor-pointer"
              onMouseEnter={() => setHoveredItem("contact")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                Contact
              </h3>
            </div>
            <div className="space-y-3">
              <a
                href="mailto:support@civix.com"
                className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm group transition-colors duration-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-md flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors duration-300">
                  <Mail className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>support@civix.com</span>
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm group transition-colors duration-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-md flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors duration-300">
                  <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>+1 (555) 123-4567</span>
              </a>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm group">
                <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-md flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Links Sections - Enhanced */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-4">
              <div
                className="flex items-center space-x-2 group cursor-pointer"
                onMouseEnter={() => setHoveredItem(section.title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <section.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {section.title}
                </h3>
              </div>

              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-center space-x-2 text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 py-1 px-2 rounded-md hover:bg-white/50 dark:hover:bg-slate-800/50 text-sm"
                      title={link.description}
                      onMouseEnter={() => setHoveredItem(link.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-md flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors duration-300">
                        <link.icon className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="font-medium">{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section - Enhanced */}
          <div className="space-y-4">
            <div
              className="flex items-center space-x-2 group cursor-pointer"
              onMouseEnter={() => setHoveredItem("newsletter")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Send className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                Newsletter
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Subscribe to get updates on new features
              </p>

              {isSubscribed ? (
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Subscribed! Check your email.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full px-5 py-2 pr-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-300 text-sm"
                      required
                      aria-label="Email address for newsletter subscription"
                    />
                    <Mail className="absolute right-3 text-slate-400 w-5 h-5 pointer-events-none top-1/2 -translate-y-1/2" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none text-sm relative overflow-hidden group"
                    aria-label="Subscribe to newsletter"
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 mr-2" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </form>
              )}

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Feedback Section */}
        <div className="text-center py-8 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                How was your experience?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Your feedback helps us improve Civix for everyone
              </p>
            </div>

            <div className="space-y-4">
              {/* Enhanced Emoji Rating */}
              <div className="flex flex-wrap justify-center items-center gap-2">
                {emojis.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedRating(index)}
                    className={`group relative p-3 rounded-xl transition-all duration-300 transform ${
                      selectedRating === index ? "scale-110" : "hover:scale-105"
                    } ${item.color} ${selectedRating === index ? item.bg : ""}`}
                    title={item.label}
                    aria-label={`Rate your experience as ${item.label}`}
                    onMouseEnter={() => setHoveredItem(`emoji-${index}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                      {item.emoji}
                    </span>
                    {selectedRating === index && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Zap className="w-2 h-2 text-white" />
                      </div>
                    )}
                    <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Enhanced Feedback Input */}
              {selectedRating !== null && (
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                  <input
                    type="text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Tell us more about your experience..."
                    className="flex-1 max-w-md px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-300 text-sm"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSubmitFeedback()
                    }
                    aria-label="Additional feedback"
                  />
                  <button
                    onClick={handleSubmitFeedback}
                    disabled={!feedbackText.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none text-sm flex items-center space-x-2"
                    aria-label="Submit feedback"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Footer Bottom */}
        <div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-500 dark:text-slate-400 text-xs flex items-center">
              © {currentYear} Civix. All rights reserved.
              <span className="mx-2">•</span>
              <span className="flex items-center">
                Made with{" "}
                <Heart className="w-3 h-3 text-red-500 animate-pulse mx-1" />{" "}
                for better civic engagement
              </span>
            </div>

            <div className="flex items-center space-x-4 text-slate-500 dark:text-slate-400 text-xs">
              <a
                href="/sitemap"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
              >
                Sitemap
              </a>
              <span>•</span>
              <a
                href="/accessibility"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
              >
                Accessibility
              </a>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <span>Built by</span>
                <a
                  href="https://github.com/HarshS16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold transition-all duration-300 hover:scale-105"
                  aria-label="Visit Harsh S.'s GitHub profile"
                >
                  <span>Harsh S.</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Toast Message */}
      {message && (
        <div className="fixed top-1 right-6 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-3 rounded-lg shadow-xl shadow-emerald-500/25 animate-fadeIn z-50 flex items-center space-x-2 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium text-sm">{message}</span>
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-full flex items-center justify-center text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-300/50 dark:hover:border-emerald-500/50 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUpRight className="w-5 h-5 transform rotate-45" />
      </button>
    </footer>
  );
};

export default Footer;

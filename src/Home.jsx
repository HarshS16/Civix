import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import "./Home.css";
import { motion } from "framer-motion";
import Switch from "./DarkModeToggle";
import { useAuth, useUser, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { toast, ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar";

function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add("animate-fade-up");
        }
      });
    };
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.info("You have been logged out");
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const questions = [
    {
      id: 1,
      question: "What is Civix?",
      answer: "Civix is a civic engagement platform that allows citizens to report and track local issues in their communities, such as potholes, broken streetlights, and garbage collection problems."
    },
    {
      id: 2,
      question: "How do I report an issue?",
      answer: "To report an issue, simply take a photo of the problem, add a description, and mark the location on the map. Your report will be sent to the appropriate city department for review."
    },
    {
      id: 3,
      question: "Is Civix free to use?",
      answer: "Yes, Civix is completely free for citizens to use. There are no hidden fees or charges."
    },
    {
      id: 4,
      question: "How can I track the status of my report?",
      answer: "You can track the status of your report through the Civix app or website. You will receive notifications when your issue is reviewed and resolved."
    },
    {
      id: 5,
      question: "Can I vote on issues reported by others?",
      answer: "Yes! You can upvote issues reported by other citizens to help prioritize them for resolution."
    }

  ]
  {/* Chatbot Section */}
<section className="py-16 bg-slate-50 dark:bg-gray-900">
  <div className="container flex flex-col items-center">
    <h2 className="text-3xl font-bold mb-8 dark:text-white">💬 Chat with CivixBot</h2>
    
    <div className="chat-container flex flex-col h-[520px] w-full max-w-[420px] shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/20 backdrop-blur-md p-3 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold">C</div>
          <div>
            <p className="font-semibold">CivixBot</p>
            <p className="text-xs text-emerald-200">Online</p>
          </div>
        </div>
        <button className="text-white text-xs bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition">
          End Chat
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/10 rounded-b-xl">
        <div className="chat-bubble">Hi 👋, I’m CivixBot. How can I help you today?</div>
        <div className="chat-bubble user">I want to report a pothole.</div>
        <div className="chat-bubble">🚧 Sure! Please share the location or upload a photo, and I’ll guide you through reporting it.</div>

        {/* Typing indicator */}
        <div className="typing-indicator ml-2">
          <span></span><span></span><span></span>
        </div>
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-3 rounded-b-xl">
        <input 
          type="text" 
          placeholder="Type your message..." 
          className="flex-1 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none"
        />
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition">
          ➤
        </button>
      </div>
    </div>
  </div>
</section>


  // Render Home Page UI with JSX
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="toast-body custom-toast-shadow"
        bodyClassName="text-sm font-medium"
      />

      <Helmet>
        <title>Civix | Report Local Issues & Improve Your Community</title>
        <meta name="description" content="Civix helps citizens report and track local civic issues like potholes, broken lights, and garbage collection problems. Make your city better today!" />
      </Helmet>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-down">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-emerald-500">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xl font-bold">Civix</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">How It Works</a>
            <a href="/civic-education" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Civic Education & Rights</a>
            <a href="/civic-simulator" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Civic Simulator</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Testimonials</a>
            <a href="#faqs" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">FAQs</a>
            <a href="#download" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Download</a>
          </nav>
          <div className="flex items-center gap-4">
            <Switch />
            <button className="hidden md:flex h-9 px-4 py-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors duration-300" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button className="h-9 px-4 py-2 rounded-md text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-300" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </header>
                
      <main className="flex-1">
        <section className="py-2 md:py-4 lg:py-6 xl:py-8">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center min-h-[calc(100vh-8rem)]">
              <div className="flex flex-col justify-center space-y-6 animate-on-scroll">
                <div className="space-y-4">
                  <div className="inline-block">
                    <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded-full">
                      🏛️ Civic Engagement Platform
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none leading-tight">
                    Report Local Issues. <br />
                    <span className="text-emerald-500 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                      Make Your City Better.
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                    Civix helps citizens report and track local civic issues like potholes, broken lights, and garbage collection problems. Join thousands making their communities better.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <button
                    className="flex h-12 items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] group"
                    onClick={() => {
                      if (isSignedIn) {
                        navigate("/report-issue");
                      } else {
                        navigate("/signup");
                      }
                    }}
                  >
                    Get Started
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    className="flex h-12 items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800 duration-300 group"
                    onClick={() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                    Watch Demo
                  </button>
                </div>
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">4.8/5 from 2,500+ users</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center animate-on-scroll">
                <div className="relative w-full max-w-[400px] aspect-[4/3] overflow-hidden rounded-xl border shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <img src="pexels.jpg" alt="Civix App Interface showing issue reporting" className="object-cover w-full h-full" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-xs font-medium text-gray-700">✅ Live Demo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <motion.section id="features" className="bg-slate-50 dark:bg-background py-6 md:py-12 lg:py-16 xl:py-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" variants={itemVariants}>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Everything you need to improve your community</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Civix provides a comprehensive platform for citizens and city workers to collaborate on local issues.</p>
              </div>
            </motion.div>
            <div className="flex justify-center">
              <motion.div className="grid max-w-5xl items-center justify-items-center gap-6 py-12 lg:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                {[
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-emerald-500">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                    ),
                    title: "Report Issues",
                    description: "Easily report problems with photos, location data, and detailed descriptions.",
                    features: ["Photo uploads", "Map integration", "Categorized issues"]
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-emerald-500">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    ),
                    title: "Track Progress",
                    description: "Follow the status of your reports from submission to resolution.",
                    features: ["Real-time updates", "Status notifications", "Resolution timeline"]
                  },
                  {
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-emerald-500">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    ),
                    title: "Community Voting",
                    description: "Upvote issues in your area to help prioritize what matters most.",
                    features: ["Issue upvoting", "Trending issues", "Community feedback"],
                    onClick: () => navigate('/community-voting')
                  }
                ].map((feature, index) => (
                  <motion.div key={index} className="rounded-lg bg-card text-card-foreground p-8 shadow-xl w-full max-w-[350px] transition-all duration-300 hover:shadow-md" variants={cardVariants} whileHover={{ y: -5 }} onClick={feature.onClick || (() => { })}>
                    {feature.icon}
                    <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                    <ul className="mt-4 space-y-2">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-emerald-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section id="how-it-works" className="py-6 md:py-12 lg:py-16 xl:py-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" variants={itemVariants}>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple process, powerful results</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Civix makes it easy to report issues and track their resolution in just a few simple steps.</p>
              </div>
            </motion.div>
            <div className="flex justify-center">
              <motion.div className="grid max-w-5xl items-center justify-items-center gap-6 py-12 lg:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {[
                  { step: "1", title: "Report an Issue", description: "Take a photo, mark the location on the map, and add a description of the problem." },
                  { step: "2", title: "City Review", description: "City workers review and prioritize issues based on severity and community votes." },
                  { step: "3", title: "Track Resolution", description: "Follow the progress of your report from submission to completion with real-time updates." }
                ].map((step, index) => (
                  <motion.div key={index} className="w-full max-w-xs flex flex-col items-center space-y-4 text-center" variants={itemVariants} whileHover={{ scale: 1.05 }}>
                    <motion.div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-all duration-300 hover:scale-110" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <span className="text-2xl font-bold">{step.step}</span>
                    </motion.div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section id="testimonials" className="bg-slate-50 py-6 dark:bg-gray-900 md:py-12 lg:py-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariants}>
          <div className="container mx-auto px-4">
            <motion.div className="flex flex-col items-center justify-center space-y-4 text-center" variants={itemVariants}>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 dark:bg-emerald-800 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-200">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight dark:text-white">Trusted by communities everywhere</h2>
                <p className="max-w-[900px] text-muted-foreground dark:text-gray-300  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">See what citizens and city workers are saying about Civix.</p>
              </div>
            </motion.div>
            <div className="flex justify-center">
              <motion.div className="grid max-w-5xl items-stretch justify-items-center gap-6 py-12 lg:grid-cols-2" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {[
                  { quote: "I reported a pothole on my street and it was fixed within a week. The ability to track progress kept me informed the whole time.", name: "Sarah Johnson", role: "Resident, Portland" },
                  { quote: "As a city worker, Civix has transformed how we manage local issues. The dashboard makes it easy to prioritize and track our work.", name: "Michael Rodriguez", role: "Public Works, Austin" }
                ].map((testimonial, index) => (
                  <motion.div key={index} className="w-full max-w-md rounded-lg border dark:border-gray-700  bg-white dark:bg-gray-800  text-card-foreground dark:text-white shadow-sm transition-all duration-300 hover:shadow-md flex flex-col h-full" variants={cardVariants} whileHover={{ y: -5 }}>
                    <div className="p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 fill-emerald-500 text-emerald-500">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-lg">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-slate-100 dark:bg-gray-700 p-1">
                            <div className="h-10 w-10 rounded-full bg-slate-200  dark:bg-gray-600" />
                          </div>

                          <div>
                            <p className="font-semibold dark:text-white">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section id="faqs" className="bg-white dark:bg-background py-6 md:py-12 lg:py-16" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
          <div className="container px-4 mx-auto">
            <motion.div className="flex flex-col items-center space-y-4 text-center w-full" variants={itemVariants}>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">FAQs</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Find answers to commonly asked questions about Civix platform features and services.</p>
              </div>
              <div className="w-full mt-8 max-w-3xl mx-auto">
                {questions.map((faq) => (
                  <div key={faq.id} className="py-2 mb-4 w-full overflow-hidden">
                    <button className={`w-full text-left flex items-center justify-between px-4 py-2 border-0 outline-none focus:outline-none focus:ring-0 shadow-none rounded-md transition-colors duration-300 ${activeFaq === faq.id ? 'bg-emerald-200 dark:bg-emerald-600 text-emerald-900 dark:text-white font-semibold' : 'bg-emerald-100 dark:bg-[#23272f] text-accent-foreground dark:text-white hover:bg-accent hover:dark:bg-[#2a2e37]'}`} onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}>
                      <span className="font-medium">{faq.question}</span>
                      {activeFaq === faq.id ? (
                        <svg className="w-5 h-5 text-emerald-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-emerald-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      )}
                    </button>
                    {activeFaq === faq.id && (
                      <motion.div className="mt-2 px-4 py-2 bg-card dark:bg-[#18181b] rounded-md shadow-sm" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                        <p className="text-left text-foreground dark:text-white">{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <section id="download" className="py-6 md:py-12 lg:py-16 bg-emerald-50 dark:bg-[#18181b] dark:text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 animate-on-scroll">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to improve your community?</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">Download the Civix app today and start making a difference in your neighborhood.</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/download-ios">
                    <button className="flex h-10 items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <path d="M12 18h.01" />
                      </svg>
                      Download for iOS
                    </button>
                  </Link>
                  <Link to="/download-android">
                    <button className="flex h-10 items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <path d="M12 18h.01" />
                      </svg>
                      Download for Android
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end animate-on-scroll">
                <div className="relative w-full max-w-[400px]">
                  <div className="overflow-hidden rounded-lg border shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] bg-white dark:bg-[#23272f]">
                    <img src="civix-mobile.png" alt="Civix App on Mobile" className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-lg border bg-background dark:bg-[#23272f] p-2 shadow-lg transition-all duration-300 hover:scale-110">
                    <div className="flex h-full w-full items-center justify-center rounded bg-emerald-100 dark:bg-emerald-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-emerald-500">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-slate-50 dark:bg-[#18181b]">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-emerald-500">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xl font-bold">Civix</span>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <a href="/about" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">About</a>
            <a href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Features</a>
            <a href="/privacy" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Privacy</a>
            <a href="/terms" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Terms</a>
            <a href="/contact" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://github.com/HarshS16/Civix" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-emerald-500 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
          </div>
          <p className="text-center text-sm text-muted-foreground dark:text-muted-foreground">© {new Date().getFullYear()} Civix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
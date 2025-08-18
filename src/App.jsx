import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { AnimatePresence } from 'framer-motion';

import Home from './Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import RequireAdmin from './components/auth/RequireAdmin';
import AdminDashboard from './Pages/AdminDashboard';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import ChatbotWidget from "./components/ChatbotWidget";

import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import About from './Pages/About';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import Contact from './Pages/Contact';
import ReportIssue from './Pages/ReportIssue';
import ServerError from './components/ServerError';
import DownloadAndroid from './Pages/DownloadAndroid';
import DownloadIOS from './Pages/DownloadIOS';
import NewIssue from './Pages/NewIssue';
import IssueDetail from './Pages/IssueDetail';
import UserDashboard from './Pages/UserDashboard';
import CommunityVotingPage from './Pages/CommunityVotingPage';
import VotingSystem from './Pages/VotingSystem';
import Profile from './Pages/Profile';
import Resources from './Pages/Resources';
import MyComplaints from './Pages/MyComplaints';
import CivicEducation from './Pages/CivicEducation';
import CivicSimulator from './Pages/CivicSimulator';
import Contributors from './Pages/Contributors';
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange';
import SOS from './Pages/SOS';
import Chatroom from './Pages/Chatroom';
import TaxImpact from './Pages/TaxImpact';
import RepersentativeFinder from './Pages/RepersentativeFinder';
import Analytics from './Pages/Analytics';
import Users from './Pages/Users';
import Documents from './Pages/Documents';
import Settings from './Pages/Settings';
import Notification from './Pages/Notification';
import NearbyServices from './Pages/NearbyServices';
import LostAndFoundPage from './Pages/Lost&Found';
import CommunityHolidays from './Pages/CommunityHolidays';



const App = () => {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  
  return (
    <>
      <ScrollToTop />
      <ScrollToTopOnRouteChange/>
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            '!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white !border !border-gray-200 dark:!border-gray-700',
          duration: 4000,
          success: {
            iconTheme: { primary: '#10B981', secondary: 'white' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: 'white' },
          },
        }}
      />
          
      {!isAdminRoute && <Navbar />}

      <main className="min-h-screen">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {/* Clerk Auth Routes */}
            <Route
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in" redirectUrl="/" />}
            />
            <Route
              path="/signup/*"
              element={<SignUp routing="path" path="/signup" redirectUrl="/" />}
            />

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/download-android" element={<DownloadAndroid />} />
            <Route path="/download-ios" element={<DownloadIOS />} />
            <Route path="/issues/new" element={<NewIssue />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            <Route path="/civic-education" element={<CivicEducation />} />
            <Route path="/civic-simulator" element={<CivicSimulator />} />
            <Route path="/community-voting" element={<CommunityVotingPage />} />
            <Route path="/voting-system" element={<VotingSystem />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/complaints" element={<MyComplaints />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/sos" element={<SOS/>}/>
            <Route path='/chatroom' element={<Chatroom/>}/>
            <Route path='/tax-impact' element={<TaxImpact/>}/>
            <Route path='/repersentative-finder' element={<RepersentativeFinder/>}/>
            <Route path='/admin/analytics' element={<Analytics/>}/>
            <Route path='/admin/users' element={<Users/>}/>
            <Route path='/admin/documents' element={<Documents/>}/>
            <Route path='/admin/settings' element={<Settings/>}/>
            <Route path='/admin/notifications' element={<Notification/>}/>
            <Route path='/nearby-services' element={<NearbyServices/>}/>
            <Route path='/lost-found' element={<LostAndFoundPage/>}/>
            <Route path='/community-holidays' element={<CommunityHolidays/>}/>
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute allowedRoles={['user', 'admin']}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute allowedRoles={['user', 'admin']}>
                  <UserDashboard />
                </PrivateRoute>
              }
            />

            {/* Errors */}
            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdminRoute && <Footer />}

    </>
  );
};

export default App;
// import ChatBot from './components/Chatbot';

// // Add this to your Layout component's return statement
// function Layout({ children }) {
//   return (
//     <div className="relative min-h-screen">
//       {/* Your existing layout code */}
//       {children}

//       {/* Add the ChatBot component at the end */}
//       <ChatBot />
//     </div>
//   );
// }

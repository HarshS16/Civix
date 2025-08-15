import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SignIn, SignUp } from '@clerk/clerk-react';

import Home from './Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import RequireAdmin from './components/auth/RequireAdmin';
import AdminDashboard from './components/AdminDashboard';
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
import Profile from './Pages/Profile';
import Resources from './Pages/Resources';
import MyComplaints from './Pages/MyComplaints';
import CivicEducation from './Pages/CivicEducation';
import CivicSimulator from './Pages/CivicSimulator';

const App = () => {
  return (
    <>
      <ScrollToTop />
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
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          {/* Clerk Auth Routes */}
          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" redirectUrl="/home" />}
          />
          <Route
            path="/signup/*"
            element={<SignUp routing="path" path="/signup" redirectUrl="/home" />}
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/complaints" element={<MyComplaints />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
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
      </main>

      <Footer />
    </>
  );
};

export default App;



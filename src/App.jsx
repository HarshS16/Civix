import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './components/AdminDashboard';
import Error404 from './components/Error404';
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error404 />} />

        {/* Protected routes */}
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
      </Routes>
      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;

import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    alert('You have been logged out.');
    navigate('/login'); // Redirect to login page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar with Logout button */}
      <header className="flex justify-between items-center px-6 py-4 bg-emerald-500 text-white shadow-md">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-white text-emerald-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </header>

      {/* Dashboard Content */}
      <main className="p-6">
        <p>Welcome, Admin! You have access to admin controls.</p>
      </main>
    </div>
  )
}

export default AdminDashboard;

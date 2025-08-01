import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  // Animation variants for the page container
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4 }
    }
  };

  // Animation variants for table rows
  const rowVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  // Fetch all reported issues
  const fetchIssues = React.useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/issues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Unauthorized or failed to fetch');
      }

      const data = await res.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
      alert('Failed to fetch issues. Please login again.');
      navigate('/login');
    }
  }, [navigate]);

  // Update issue status
  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/issues/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh issue list
      fetchIssues();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Could not update status.');
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Issues Table */}
      <main className="p-6">
        <motion.h2
          className="text-xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Admin Dashboard
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome, Admin! You have access to admin controls.
        </motion.p>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
          toastClassName="toast-body custom-toast-shadow"
          bodyClassName="text-sm font-medium"
        />
        <motion.h3
          className="text-lg font-semibold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Reported Issues
        </motion.h3>

        {issues.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            No issues found.
          </motion.p>
        ) : (
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <table className="min-w-full border border-gray-300 bg-white text-sm rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-200 text-gray-700">
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Change Status</th>
                </motion.tr>
              </thead>
              <tbody>
                {issues.map((issue, index) => (
                  <motion.tr
                    key={issue._id}
                    className="border-t border-gray-200"
                    variants={rowVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.6 + (index * 0.1) }}
                  >
                    <td className="p-3">{issue.title}</td>
                    <td className="p-3">{issue.description}</td>
                    <td className="p-3">{issue.phone}</td>
                    <td className="p-3">{issue.email}</td>
                    <td className="p-3">{issue.status || 'Pending'}</td>
                    <td className="p-3">
                      <select
                        value={issue.status || 'Pending'}
                        onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Rejected</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default AdminDashboard;

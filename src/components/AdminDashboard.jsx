import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaFilter, FaSort, FaTrash, FaFlag, FaArchive, FaChartBar } from 'react-icons/fa';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Calculate analytics data
  const analytics = useMemo(() => {
    const totalReports = issues.length;
    const resolvedIssues = issues.filter(issue => issue.status === 'Resolved').length;
    
    // Calculate average response time (time between creation and resolution)
    const resolvedIssuesWithTime = issues.filter(issue => issue.status === 'Resolved' && issue.resolvedAt);
    const totalResponseTime = resolvedIssuesWithTime.reduce((sum, issue) => {
      const created = new Date(issue.createdAt);
      const resolved = new Date(issue.resolvedAt);
      return sum + (resolved.getTime() - created.getTime());
    }, 0);

    const avgResponseTime = resolvedIssuesWithTime.length > 0
      ? (totalResponseTime / resolvedIssuesWithTime.length) / (1000 * 60 * 60 * 24) // Convert ms to days
      : 0;

    const formattedAvgResponseTime = avgResponseTime > 0 ? `${avgResponseTime.toFixed(2)} days` : 'N/A';
    
    // Reports by status
    const reportsByStatus = {
      Pending: issues.filter(issue => issue.status === 'Pending').length,
      'In Progress': issues.filter(issue => issue.status === 'In Progress').length,
      Resolved: resolvedIssues,
    };
    
    return {
      totalReports,
      resolvedIssues,
      avgResponseTime: formattedAvgResponseTime,
      reportsByStatus,
      resolutionRate: totalReports ? Math.round((resolvedIssues / totalReports) * 100) : 0
    };
  }, [issues]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    toast.success("you have been logged out")
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  // Fetch all reported issues
  const fetchIssues = React.useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5001/api/issues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Unauthorized or failed to fetch');
      }

      const data = await res.json();
      setIssues(data);
      setFilteredIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
      toast.error('Failed to fetch issues. Please login again.');
      setTimeout(() => navigate('/login'), 2000);
    } finally {
      setLoading(false);
    }
  }, [navigate]);
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle status filter
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };
  
  // Handle sorting
  const handleSort = (value) => {
    const [key, direction] = value.split('-');
    setSortConfig({ key, direction });
  };
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...issues];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(issue => issue.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(issue => issue.category === categoryFilter);
    }
    
    // Apply search
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(issue => 
        issue.title?.toLowerCase().includes(lowercasedSearch) ||
        issue.description?.toLowerCase().includes(lowercasedSearch) ||
        issue.email?.toLowerCase().includes(lowercasedSearch) ||
        issue.phone?.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Custom sorting for severity
        if (sortConfig.key === 'severity') {
          const severityOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };
          valA = severityOrder[valA] || 0;
          valB = severityOrder[valB] || 0;
        }

        if (valA < valB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredIssues(result);
  }, [issues, statusFilter, categoryFilter, searchTerm, sortConfig]);

  // Update issue status
  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5001/api/issues/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newStatus: status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      toast.success(`Issue status updated to ${status}`);
      // Refresh issue list
      fetchIssues();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Could not update status.');
    }
  };
  
  // Delete issue
  const handleDeleteIssue = async (id) => {
    if (!window.confirm('Are you sure you want to delete this issue? This action cannot be undone.')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5001/api/issues/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete issue');
      }

      toast.success('Issue deleted successfully');
      fetchIssues();
    } catch (error) {
      console.error('Error deleting issue:', error);
      toast.error('Could not delete issue.');
    }
  };

  // Flag issue
  const handleFlagIssue = async (id) => {
    if (!window.confirm('Are you sure you want to flag this issue?')) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5001/api/issues/${id}/flag`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to flag issue');
      }

      toast.success('Issue flagged successfully');
      fetchIssues();
    } catch (error) {
      console.error('Error flagging issue:', error);
      toast.error('Could not flag issue.');
    }
  };

  // Archive issue
  const handleArchiveIssue = async (id) => {
    if (!window.confirm('Are you sure you want to archive this issue?')) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5001/api/issues/${id}/archive`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to archive issue');
      }

      toast.success('Issue archived successfully');
      fetchIssues();
    } catch (error) {
      console.error('Error archiving issue:', error);
      toast.error('Could not archive issue.');
    }
  };


  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-emerald-500 text-white shadow-md">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition flex items-center"
          >
            <FaChartBar className="mr-2" /> {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-emerald-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Welcome, Admin!</h3>
          <p className="text-gray-600">You have access to all issue management controls.</p>
        </div>
        
        {/* Analytics Section */}
        {showAnalytics && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaChartBar className="mr-2 text-emerald-500" /> Dashboard Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <h4 className="text-sm font-medium text-emerald-800">Total Reports</h4>
                <p className="text-2xl font-bold text-emerald-600">{analytics.totalReports}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800">Resolved Issues</h4>
                <p className="text-2xl font-bold text-blue-600">{analytics.resolvedIssues}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h4 className="text-sm font-medium text-purple-800">Avg. Response Time</h4>
                <p className="text-2xl font-bold text-purple-600">{analytics.avgResponseTime}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h4 className="text-sm font-medium text-amber-800">Resolution Rate</h4>
                <p className="text-2xl font-bold text-amber-600">{analytics.resolutionRate}%</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Reports by Status</h4>
              <div className="flex items-center space-x-2">
                <div className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 text-sm font-medium">
                  Pending: {analytics.reportsByStatus.Pending}
                </div>
                <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm font-medium">
                  In Progress: {analytics.reportsByStatus['In Progress']}
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-full text-green-800 text-sm font-medium">
                  Resolved: {analytics.reportsByStatus.Resolved}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <FaFilter className="text-gray-500 mr-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="flex items-center">
                <FaFilter className="text-gray-500 mr-2" />
                <select
                  value={categoryFilter}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Public Safety">Public Safety</option>
                  <option value="Environment">Environment</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex items-center">
                <FaSort className="text-gray-500 mr-2" />
                <select
                  value={`${sortConfig.key}-${sortConfig.direction}`}
                  onChange={(e) => {
                    const [key, direction] = e.target.value.split('-');
                    setSortConfig({ key, direction });
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                  <option value="status-asc">Status (A-Z)</option>
                  <option value="status-desc">Status (Z-A)</option>
                  <option value="severity-asc">Severity (Low-High)</option>
                  <option value="severity-desc">Severity (High-Low)</option>
                  <option value="location-asc">Location (A-Z)</option>
                  <option value="location-desc">Location (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Issues Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h3 className="text-lg font-semibold p-4 border-b border-gray-200">Reported Issues</h3>

          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Loading issues...</p>
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No issues found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="p-4 text-left font-medium cursor-pointer" onClick={() => handleSort('title')}>
                      Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-4 text-left font-medium">Description</th>
                    <th className="p-4 text-left font-medium">Contact</th>
                    <th className="p-4 text-left font-medium cursor-pointer" onClick={() => handleSort('status')}>
                      Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-4 text-left font-medium cursor-pointer" onClick={() => handleSort('createdAt')}>
                      Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="p-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredIssues.map((issue) => (
                    <tr key={issue._id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-emerald-600">{issue.title}</td>
                      <td className="p-4">
                        <div className="max-w-xs overflow-hidden text-ellipsis">
                          {issue.description.length > 100 
                            ? `${issue.description.substring(0, 100)}...` 
                            : issue.description}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>{issue.email}</div>
                        <div className="text-gray-500 text-xs">{issue.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className={
                          `px-2 py-1 rounded-full text-xs font-medium ${
                            issue.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            issue.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`
                        }>
                          {issue.status || 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <select
                            value={issue.status || 'Pending'}
                            onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                          >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Rejected</option>
                          </select>
                          <button 
                            onClick={() => handleDeleteIssue(issue._id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Delete Issue"
                          >
                            <FaTrash />
                          </button>
                          <button 
                            onClick={() => handleFlagIssue(issue._id)}
                            className="text-amber-500 hover:text-amber-700 p-1"
                            title="Flag as Inappropriate"
                          >
                            <FaFlag />
                          </button>
                          <button 
                            onClick={() => handleArchiveIssue(issue._id)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            title="Archive Issue"
                          >
                            <FaArchive />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

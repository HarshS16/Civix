import React, { useState } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import './ReportIssue.css';

export default function ReportIssue() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [category, setCategory] = useState('Other');
  const [severity, setSeverity] = useState('Low');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('phone', phone);
    formData.append('notifyByEmail', notifyByEmail);
    formData.append('category', category);
    formData.append('severity', severity);
    formData.append('location', location);
    if (file) formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5001/api/report', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      alert(data.message);
      setPhone('');
      setEmail('');
      setTitle('');
      setDescription('');
      setFile(null);
      setNotifyByEmail(false);
      setCategory('Other');
      setSeverity('Low');
      setLocation('');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit issue.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      <motion.div
        className="absolute top-10 left-10 w-48 h-48 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      ></motion.div>
      <motion.div
        className="absolute bottom-10 right-10 w-48 h-48 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 bg-emerald-100 rounded-lg mix-blend-multiply filter blur-lg opacity-60 animate-blob animation-delay-2000"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-white/70 dark:bg-gray-800 backdrop-blur-xl rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md border border-gray-100 dark:border-gray-700 z-10"
      >
        <h1 className="text-3xl font-extrabold text-center text-emerald-700 dark:text-white mb-6">Report an Issue</h1>
        <p className="text-center text-gray-600 dark:text-gray-200 mb-8">
          We're here to help! Please fill out the form below to report any issues you've encountered.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="e.g., +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm p-3 placeholder-gray-400 text-gray-700 dark:text-white dark:bg-gray-900 transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm p-3 placeholder-gray-400 text-gray-700 dark:text-white dark:bg-gray-900 transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Issue Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="e.g., Login button not working"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm p-3 placeholder-gray-400 text-gray-700 dark:text-white dark:bg-gray-900 transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm p-3 text-gray-700 dark:text-white dark:bg-gray-900 transition duration-150 ease-in-out"
              required
            >
              <option value="Infrastructure">Infrastructure</option>
              <option value="Public Safety">Public Safety</option>
              <option value="Environment">Environment</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Severity
            </label>
            <select
              id="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm p-3 text-gray-700 dark:text-white dark:bg-gray-900 transition duration-150 ease-in-out"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="e.g., Main Street, near Central Park"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm p-3 placeholder-gray-400 text-gray-700 dark:text-white dark:bg-gray-900 transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Describe the Issue
            </label>
            <textarea
              id="description"
              placeholder="Please provide as much detail as possible about the issue you're experiencing. When did it happen? What steps did you take?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm p-3 placeholder-gray-400 text-gray-700 dark:text-white dark:bg-gray-900 resize-y transition duration-150 ease-in-out"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Attach a Screenshot/File (Optional)
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer transition duration-150 ease-in-out"
            />
            {file && <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">File selected: {file.name}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifyByEmail"
              checked={notifyByEmail}
              onChange={() => setNotifyByEmail(!notifyByEmail)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer accent-emerald-600"
            />
            <label htmlFor="notifyByEmail" className="ml-2 block text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
              Notify me via email when the issue status changes
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Submit Report
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

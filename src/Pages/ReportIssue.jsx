import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import './ReportIssue.css';

// Debounce hook for form inputs
const useDebounce = (callback, delay) => {
  const [debounceTimer, setDebounceTimer] = useState(null);

  const debouncedCallback = useCallback((...args) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);
    setDebounceTimer(newTimer);
  }, [callback, delay, debounceTimer]);

  return debouncedCallback;
};

// Memoized background animations component
const BackgroundAnimations = React.memo(() => {
  // Simplified animation configs to reduce performance impact
  const animationConfig = {
    duration: 15,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut'
  };

  return (
    <>
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-lg opacity-30"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={animationConfig}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-lg opacity-30"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{ ...animationConfig, delay: 2 }}
      />
    </>
  );
});

BackgroundAnimations.displayName = 'BackgroundAnimations';

// Memoized form input component
const FormInput = React.memo(({
  type = 'text',
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  rows
}) => {
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        {label}
      </label>
      <InputComponent
        type={type !== 'textarea' ? type : undefined}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm p-3 placeholder-gray-400 text-gray-700 dark:text-white dark:bg-gray-900 transition duration-150 ease-in-out resize-y"
        required={required}
      />
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default React.memo(function ReportIssue() {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    title: '',
    description: '',
    notifyByEmail: false
  });
  const [file, setFile] = useState(null);

  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add new state for loading

  // Memoized form handlers
  const handleInputChange = useCallback((field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    debouncedUpdate(field, value);
  }, [debouncedUpdate]);

  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (file) formDataToSend.append('file', file);

    try {
      const res = await fetch('http://localhost:5001/api/report', {
        method: 'POST',
        body: formDataToSend,
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        setPhone('');
        setEmail('');
        setTitle('');
        setDescription('');
        setFile(null);
        setNotifyByEmail(false);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to submit issue.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert(err.message);
    } finally {
      setIsSubmitting(false); // Always stop loading, whether successful or not

    }
  }, [formData, file, isSubmitting]);

  // Memoized form fields configuration
  const formFields = useMemo(() => [
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: 'e.g., +91 98765 43210',
      required: true
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'you@example.com',
      required: true
    },
    {
      id: 'title',
      type: 'text',
      label: 'Issue Title',
      placeholder: 'e.g., Login button not working',
      required: true
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Describe the Issue',
      placeholder: 'Please provide as much detail as possible about the issue you\'re experiencing. When did it happen? What steps did you take?',
      rows: 5,
      required: true
    }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      <BackgroundAnimations />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white/70 dark:bg-gray-800 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md border border-gray-100 dark:border-gray-700 z-10"
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
              disabled={isSubmitting} // Disable during submission
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
              disabled={isSubmitting} // Disable during submission
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
              disabled={isSubmitting} // Disable during submission
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
              disabled={isSubmitting} // Disable during submission
            ></textarea>
          </div>
         

          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Attach a Screenshot/File (Optional)
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer transition duration-150 ease-in-out"
              disabled={isSubmitting} // Disable during submission
            />
            {file && <p className="mt-2 text-xs text-gray-500 dark:text-gray-300">File selected: {file.name}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifyByEmail"
              checked={formData.notifyByEmail}
              onChange={handleInputChange('notifyByEmail')}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer accent-emerald-600"
              disabled={isSubmitting} // Disable during submission
            />
            <label htmlFor="notifyByEmail" className="ml-2 block text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
              Notify me via email when the issue status changes
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            type="submit"

            disabled={isSubmitting} // Disable the button during submission
            className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="spinner mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Submit Report'
            )}

          </motion.button>
        </form>
      </motion.div>
    </div>
  );

});


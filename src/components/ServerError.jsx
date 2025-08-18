import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ServerError() {
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);
  const [showRetrySuccess, setShowRetrySuccess] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: 180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setShowRetrySuccess(true);

    setTimeout(() => {
      setShowRetrySuccess(false);
      if (retryCount >= 2) {
        navigate('/');
      }
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Server Error | Civix</title>
        <meta name="description" content="We're experiencing technical difficulties. Our team is working to resolve the issue. Please try again or return to Civix homepage." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      

      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <motion.div
          className="flex flex-col items-center justify-center space-y-6 text-center max-w-lg mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="relative"
            variants={iconVariants}
          >
            <div className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-red-50 border-4 border-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500 sm:w-16 sm:h-16"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-2 sm:w-8 sm:h-2 bg-red-400 rounded-sm opacity-70"
              animate={{
                x: [0, 4, -2, 0],
                opacity: [0.7, 0.9, 0.5, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-4 h-2 sm:w-6 sm:h-2 bg-red-300 rounded-sm opacity-60"
              animate={{
                x: [0, -3, 2, 0],
                opacity: [0.6, 0.8, 0.4, 0.6]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
          </motion.div>

          <motion.div className="space-y-3" variants={itemVariants}>
            <h1 className="text-5xl sm:text-6xl font-bold text-red-500 tracking-tight">
              500
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">
              Server Error
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Something went wrong on our end. Our team has been notified and is working on a fix.
            </p>
          </motion.div>

          {showRetrySuccess ? (
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <span className="text-sm font-medium">Retrying...</span>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700"
              variants={itemVariants}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="text-sm font-medium">
                Attempt {retryCount + 1} of 3
              </span>
            </motion.div>
          )}

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleRetry}
              disabled={showRetrySuccess || retryCount >= 3}
              className="w-40 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-emerald-700 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
              whileHover={{ scale: showRetrySuccess || retryCount >= 3 ? 1 : 1.02 }}
              whileTap={{ scale: showRetrySuccess || retryCount >= 3 ? 1 : 0.98 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={showRetrySuccess ? "animate-spin" : ""}
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              {retryCount >= 3 ? 'Max Retries' : showRetrySuccess ? 'Retrying...' : 'Try Again'}
            </motion.button>

            <motion.button
              onClick={() => navigate('/')}
              className="w-40 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              Back to Home
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      <footer className="border-t bg-slate-50">
        <div className="container py-6 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-500"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-bold">Civix</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Civix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ServerError;

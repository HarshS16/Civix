import React, { useEffect, useState } from "react";

const DownloadIOS = ({ onClose }) => {
  const [count, setCount] = useState(5);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (count > 0 && !showThankYou) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (count === 0 && !showThankYou) {
      setShowThankYou(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    }
  }, [count, showThankYou, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 max-w-xs w-full text-center">
        {!showThankYou ? (
          <>
            <h2 className="text-xl font-bold mb-3 text-emerald-600">
              Your download will start in a few seconds
            </h2>
            <div className="text-5xl font-bold mb-3 text-emerald-500">
              {count}
            </div>
            <p className="mb-1 text-base text-gray-700 dark:text-gray-200">
              See <span className="underline">Help</span> for any issue.
            </p>
          </>
        ) : (
          <h2 className="text-xl font-bold text-emerald-600">
            Thank you for downloading Civix for iOS!
          </h2>
        )}
      </div>
    </div>
  );
};

export default DownloadIOS;

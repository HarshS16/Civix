// components/ChatbotWidget.jsx
import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col animate-fade-up">
          <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-2xl">
            <h3 className="font-semibold">💬 Civix Chat</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
            <p>👋 Hello! How can I help you today?</p>
            {/* You can integrate your chatbot logic here */}
          </div>
          <div className="p-3 border-t dark:border-gray-700">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transform transition duration-300"
        >
          <FaComments size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;

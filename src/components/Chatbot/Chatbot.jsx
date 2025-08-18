// import { useState, useEffect, useRef } from 'react';
// import { FiMessageSquare, FiX, FiSend, FiChevronDown } from 'react-icons/fi';

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [suggestedQuestions, setSuggestedQuestions] = useState([]);
//   const messagesEndRef = useRef(null);

//   // FAQ data - can be expanded or moved to a separate file
//   const faqData = [
//     {
//       question: 'How do I report an issue?',
//       answer: 'To report an issue, click on the "Report Issue" button on the homepage. You\'ll need to provide a description, location, and optionally upload a photo of the problem.'
//     },
//     {
//       question: 'How can I track my reported issue?',
//       answer: 'Go to "My Reports" in your profile to see all issues you\'ve reported. Each issue will show its current status (Open, In Progress, or Resolved).'
//     },
//     {
//       question: 'What types of issues can I report?',
//       answer: 'You can report various civic issues like potholes, broken streetlights, garbage collection problems, water leaks, and other public infrastructure issues.'
//     },
//     {
//       question: 'How do I upvote an issue?',
//       answer: 'Find the issue in the "Community Reports" section and click the thumbs-up icon. Upvoting helps prioritize common community concerns.'
//     },
//     {
//       question: 'Who can see my reports?',
//       answer: 'Your reports are visible to city administrators and other community members. Personal information is kept private according to our privacy policy.'
//     },
//     {
//       question: 'How long does it take to resolve issues?',
//       answer: 'Resolution times vary based on issue complexity and city resources. Simple issues may be fixed within days, while complex ones may take weeks.'
//     }
//   ];

//   // Initialize with welcome message and suggested questions
//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setMessages([
//         {
//           text: 'Hello! I\'m Civix Assistant. How can I help you today? Here are some common questions:',
//           isBot: true
//         }
//       ]);
//       setSuggestedQuestions(faqData.map(item => item.question).slice(0, 3));
//     }
//   }, [isOpen]);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSendMessage = () => {
//     if (inputValue.trim() === '') return;

//     // Add user message
//     const newMessages = [...messages, { text: inputValue, isBot: false }];
//     setMessages(newMessages);
//     setInputValue('');

//     // Find matching FAQ or provide default response
//     setTimeout(() => {
//       const matchedFaq = faqData.find(item => 
//         item.question.toLowerCase().includes(inputValue.toLowerCase()) || 
//         inputValue.toLowerCase().includes(item.question.toLowerCase())
//       );

//       if (matchedFaq) {
//         setMessages(prev => [...prev, { text: matchedFaq.answer, isBot: true }]);
//       } else {
//         setMessages(prev => [...prev, { 
//           text: "I'm not sure I understand. Here are some questions I can help with:", 
//           isBot: true 
//         }]);
//         setSuggestedQuestions(faqData.map(item => item.question).slice(0, 3));
//       }
//     }, 1000);
//   };

//   const handleSuggestedQuestion = (question) => {
//     setInputValue(question);
//     setSuggestedQuestions([]);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {isOpen ? (
//         <div className="w-80 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col border border-gray-200 dark:border-gray-700">
//           {/* Header */}
//           <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
//             <h3 className="font-semibold">Civix Assistant</h3>
//             <button onClick={toggleChat} className="text-white hover:text-gray-200">
//               <FiX size={20} />
//             </button>
//           </div>
          
//           {/* Messages */}
//           <div className="flex-1 p-4 overflow-y-auto">
//             {messages.map((message, index) => (
//               <div 
//                 key={index} 
//                 className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
//               >
//                 <div 
//                   className={`max-w-[80%] p-3 rounded-lg ${message.isBot ? 
//                     'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 
//                     'bg-blue-500 text-white'}`}
//                 >
//                   {message.text}
//                 </div>
//               </div>
//             ))}
            
//             {/* Suggested questions */}
//             {suggestedQuestions.length > 0 && (
//               <div className="mt-4">
//                 <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</div>
//                 {suggestedQuestions.map((question, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleSuggestedQuestion(question)}
//                     className="block w-full text-left mb-2 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200 transition"
//                   >
//                     {question}
//                   </button>
//                 ))}
//               </div>
//             )}
            
//             <div ref={messagesEndRef} />
//           </div>
          
//           {/* Input area */}
//           <div className="p-3 border-t border-gray-200 dark:border-gray-700">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your question..."
//                 className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition"
//               >
//                 <FiSend size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <button
//           onClick={toggleChat}
//           className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
//         >
//           <FiMessageSquare size={24} />
//         </button>
//       )}
//     </div>
//   );
// };

// export default ChatBot;
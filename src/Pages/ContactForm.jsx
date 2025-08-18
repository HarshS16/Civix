import React, { useState } from 'react';
import { User, Mail, MessageCircle, CheckCircle, Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const isFilled = (value) => value.trim() !== '';

  const getFieldValidation = (field, value) => {
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'name':
        return value.trim().length >= 2;
      case 'message':
        return value.trim().length >= 10;
      default:
        return true;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <User className={`w-5 h-5 transition-colors duration-300 ${
                focusedField === 'name' || isFilled(formData.name) 
                  ? 'text-emerald-500' 
                  : 'text-gray-400'
              }`} />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              className="peer w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 border-gray-200 dark:border-slate-600 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 text-lg"
              placeholder="Your Name"
            />
            <label
              htmlFor="name"
              className={`absolute left-12 px-2 bg-white dark:bg-slate-800 transition-all duration-300 pointer-events-none font-medium ${
                focusedField === 'name' || isFilled(formData.name)
                  ? '-top-3 text-sm text-emerald-600 dark:text-emerald-400'
                  : 'top-4 text-gray-500 dark:text-gray-400'
              } peer-focus:-top-3 peer-focus:text-sm peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400`}
            >
              Your Name
            </label>
            {isFilled(formData.name) && getFieldValidation('name', formData.name) && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            )}
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Mail className={`w-5 h-5 transition-colors duration-300 ${
                focusedField === 'email' || isFilled(formData.email) 
                  ? 'text-emerald-500' 
                  : 'text-gray-400'
              }`} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              className="peer w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 border-gray-200 dark:border-slate-600 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 text-lg"
              placeholder="Your Email"
            />
            <label
              htmlFor="email"
              className={`absolute left-12 px-2 bg-white dark:bg-slate-800 transition-all duration-300 pointer-events-none font-medium ${
                focusedField === 'email' || isFilled(formData.email)
                  ? '-top-3 text-sm text-emerald-600 dark:text-emerald-400'
                  : 'top-4 text-gray-500 dark:text-gray-400'
              } peer-focus:-top-3 peer-focus:text-sm peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400`}
            >
              Your Email
            </label>
            {isFilled(formData.email) && getFieldValidation('email', formData.email) && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            )}
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-5 z-10">
              <MessageCircle className={`w-5 h-5 transition-colors duration-300 ${
                focusedField === 'message' || isFilled(formData.message) 
                  ? 'text-emerald-500' 
                  : 'text-gray-400'
              }`} />
            </div>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              required
              className="peer w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 border-gray-200 dark:border-slate-600 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 text-lg resize-none"
              placeholder="Your Message"
            />
            <label
              htmlFor="message"
              className={`absolute left-12 px-2 bg-white dark:bg-slate-800 transition-all duration-300 pointer-events-none font-medium ${
                focusedField === 'message' || isFilled(formData.message)
                  ? '-top-3 text-sm text-emerald-600 dark:text-emerald-400'
                  : 'top-4 text-gray-500 dark:text-gray-400'
              } peer-focus:-top-3 peer-focus:text-sm peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400`}
            >
              Your Message
            </label>
            {isFilled(formData.message) && getFieldValidation('message', formData.message) && (
              <div className="absolute right-4 top-4">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || submitted}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl disabled:shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100"
          >
            <div className="flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : submitted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  <span>Send Message</span>
                </>
              )}
            </div>
            
            {!isLoading && !submitted && (
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
            )}
          </button>

          {submitted && (
            <div className="flex items-center justify-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 rounded-2xl">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                Thank you! We'll get back to you soon.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
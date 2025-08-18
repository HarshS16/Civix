import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { User, Mail, MessageCircle, CheckCircle, Send, Sparkles, Phone, MapPin, Clock, AlertCircle } from 'lucide-react';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});


const serviceId = process.env.REACT_APP_CONTACT_SERVICE_ID || '';
const templateId = process.env.REACT_APP_CONTACT_TEMPLATE_ID || '';
const publicKey = process.env.REACT_APP_CONTACT_PUBLIC_KEY || '';

  console.log("ENV SERVICE ID:", serviceId);
  console.log("ENV TEMPLATE ID:", templateId);
  console.log("ENV PUBLIC KEY:", publicKey);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const getFieldValidation = (field, value) => {
    switch (field) {
      case 'email':
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
        return null;
      case 'name':
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters long.";
        return null;
      case 'message':
        if (!value.trim()) return "Message is required.";
        if (value.trim().length < 10) return "Message must be at least 10 characters long.";
        return null;
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    const nameError = getFieldValidation('name', formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = getFieldValidation('email', formData.email);
    if (emailError) newErrors.email = emailError;

    const messageError = getFieldValidation('message', formData.message);
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        },
        publicKey
      );
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert("An error occurred while sending your message. Please try again.");
      console.error("EmailJS Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = getFieldValidation(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setFocusedField(null);
  };

  const isFilled = (value) => value.trim() !== '';


  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <div>
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
          onBlur={handleBlur}
          required

            className={`peer w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 text-lg ${
              errors.name
                ? 'border-red-500 dark:border-red-500 focus:border-red-500'
                : 'border-gray-200 dark:border-slate-600 focus:border-emerald-500'
            }`}
            placeholder="Your Name"
          />
          <label
            htmlFor="name"
            className={`absolute left-12 px-2 bg-white dark:bg-slate-800 transition-all duration-300 pointer-events-none font-medium ${
              focusedField === 'name' || isFilled(formData.name) ? '-top-3 text-sm' : 'top-4'
            } ${
              errors.name
                ? 'text-red-500 dark:text-red-400'
                : focusedField === 'name' || isFilled(formData.name)
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-gray-500 dark:text-gray-400'
            } peer-focus:-top-3 peer-focus:text-sm ${
              errors.name ? 'peer-focus:text-red-500' : 'peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400'
            }`}
          >
            Your Name
          </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {errors.name ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : isFilled(formData.name) && getFieldValidation('name', formData.name) === null ? (
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          ) : null}
        </div>
      </div>
      {errors.name && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {errors.name}
        </p>
      )}
    </div>


      <div>
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
          onBlur={handleBlur}
          required

            className={`peer w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 text-lg ${
              errors.email
                ? 'border-red-500 dark:border-red-500 focus:border-red-500'
                : 'border-gray-200 dark:border-slate-600 focus:border-emerald-500'
            }`}
            placeholder="Your Email"
          />
          <label
            htmlFor="email"
            className={`absolute left-12 px-2 bg-white dark:bg-slate-800 transition-all duration-300 pointer-events-none font-medium ${
              focusedField === 'email' || isFilled(formData.email) ? '-top-3 text-sm' : 'top-4'
            } ${
              errors.email
                ? 'text-red-500 dark:text-red-400'
                : focusedField === 'email' || isFilled(formData.email)
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-gray-500 dark:text-gray-400'
            } peer-focus:-top-3 peer-focus:text-sm ${
              errors.email ? 'peer-focus:text-red-500' : 'peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400'
            }`}
          >
            Your Email
          </label>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {errors.email ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : isFilled(formData.email) && getFieldValidation('email', formData.email) === null ? (
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          ) : null}
        </div>
      </div>
      {errors.email && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {errors.email}
        </p>
      )}
    </div>


      <div>
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
          onBlur={handleBlur}
          required

            className={`peer w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 text-lg resize-none ${
              errors.message
                ? 'border-red-500 dark:border-red-500 focus:border-red-500'
                : 'border-gray-200 dark:border-slate-600 focus:border-emerald-500'
            }`}
            placeholder="Your Message"
          />
          <label
            htmlFor="message"
            className={`absolute left-12 px-2 bg-white dark:bg-slate-800 transition-all duration-300 pointer-events-none font-medium ${
              focusedField === 'message' || isFilled(formData.message) ? '-top-3 text-sm' : 'top-4'
            } ${
              errors.message
                ? 'text-red-500 dark:text-red-400'
                : focusedField === 'message' || isFilled(formData.message)
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-gray-500 dark:text-gray-400'
            } peer-focus:-top-3 peer-focus:text-sm ${
              errors.message ? 'peer-focus:text-red-500' : 'peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400'
            }`}
          >
            Your Message
          </label>
        <div className="absolute right-4 top-4">
          {errors.message ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : isFilled(formData.message) && getFieldValidation('message', formData.message) === null ? (
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          ) : null}
        </div>
      </div>
      {errors.message && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {errors.message}
        </p>
      )}
    </div>


      <button
        type="submit"
        disabled={isLoading || submitted}
        className="group relative w-full overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl disabled:shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100"
      >

        <div className="flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-lg">Sending...</span>
            </>
          ) : submitted ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span className="text-lg">Message Sent!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              <span className="text-lg">Send Message</span>
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
    </form>
  );
};


function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20 px-4 py-12">
      <button
        className="absolute top-20 left-4 z-20 group flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200 transition-all duration-200 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-lg backdrop-blur-sm"
        onClick={() => window.history.back()}
        type="button"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl shadow-xl mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent mb-4 leading-tight">
                Contact Us
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mx-auto lg:mx-0 mb-6"></div>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Have questions, feedback, or need help? We'd love to hear from you. 
                Fill out the form and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="group p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-emerald-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</h3>
                    <a
                      href="mailto:support@civix.com"
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 font-medium"
                    >
                      support@civix.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-emerald-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/30">
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
                Why Contact Us?
              </h3>
              <ul className="space-y-2 text-emerald-700 dark:text-emerald-200">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Technical support and assistance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Feature requests and feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>General inquiries and questions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll respond to you as quickly as possible
                </p>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

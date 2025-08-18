import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Aarav Patel",
    role: "Resident, Bangalore",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    message:
      "Civix helped me report a huge pothole near my street. The issue was resolved in 3 days!",
    rating: 5
  },
  {
    name: "Meera Sharma",
    role: "Teacher, Chennai",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    message:
      "I love how simple and fast Civix is. Clean streets and working streetlights again!",
    rating: 5
  },
  {
    name: "Ravi Kumar",
    role: "Engineer, Hyderabad",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    message:
      "The platform makes you feel empowered as a citizen. Great civic initiative!",
    rating: 5
  },
  {
    name: "Ananya Roy",
    role: "Designer, Kolkata",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    message:
      "Being able to track my report's status makes all the difference. Fantastic work Civix!",
    rating: 5
  },
  {
    name: "Sanjay Singh",
    role: "Student, Delhi",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    message:
      "Easy to use app with quick responses from local authorities. Highly recommended!",
    rating: 5
  },
  {
    name: "Priya Desai",
    role: "Entrepreneur, Mumbai",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    message:
      "Makes community participation simple and effective. Love Civix!",
    rating: 5
  },
];

const extendedTestimonials = [...testimonials, ...testimonials];

const CARD_WIDTH = 380;
const VISIBLE_CARDS = 3;

const TestimonialCarousel = () => {
  const [offset, setOffset] = useState(0);
  const [currentCenter, setCurrentCenter] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const speed = 1;
  const pauseTime = 2500;

  useEffect(() => {
    if (isPaused) return;
    
    let pause = false;

    function tick() {
      if (!pause) {
        setOffset((prev) => {
          let next = prev + speed;
          const maxOffset = CARD_WIDTH * testimonials.length;
          if (next >= maxOffset) next = 0;

          const centerIndex = Math.floor(
            (next + CARD_WIDTH * (VISIBLE_CARDS / 2)) / CARD_WIDTH
          ) % testimonials.length;
          setCurrentCenter(centerIndex);

          if (next % CARD_WIDTH === 0) {
            pause = true;
            setTimeout(() => (pause = false), pauseTime);
          }
          return next;
        });
      }
      frameRef.current = requestAnimationFrame(tick);
    }

    const frameRef = { current: null };
    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [isPaused]);

  const prev = () => {
    setOffset((prev) => {
      let next = prev - CARD_WIDTH;
      const maxOffset = CARD_WIDTH * testimonials.length;
      if (next < 0) next = maxOffset - CARD_WIDTH;
      const centerIndex = Math.floor(
        (next + CARD_WIDTH * (VISIBLE_CARDS / 2)) / CARD_WIDTH
      ) % testimonials.length;
      setCurrentCenter(centerIndex);
      return next;
    });
  };

  const next = () => {
    setOffset((prev) => {
      let next = prev + CARD_WIDTH;
      const maxOffset = CARD_WIDTH * testimonials.length;
      if (next >= maxOffset) next = 0;
      const centerIndex = Math.floor(
        (next + CARD_WIDTH * (VISIBLE_CARDS / 2)) / CARD_WIDTH
      ) % testimonials.length;
      setCurrentCenter(centerIndex);
      return next;
    });
  };

  const StarRating = ({ rating }) => (
    <div className="flex justify-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="relative py-24 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30 dark:from-emerald-900/10 dark:via-slate-900 dark:to-teal-900/10 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-40 h-40 bg-gradient-to-l from-emerald-100/40 to-teal-100/40 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-teal-100/40 to-cyan-100/40 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
         
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800 dark:text-slate-200">What </span>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Citizens Say
            </span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Real stories from community members who are making a difference with Civix
          </p>
        </div>

        <div 
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-3xl py-8">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {extendedTestimonials.map((testimonial, index) => {
                const relativeIndex = index % testimonials.length;
                const distance = Math.abs(relativeIndex - currentCenter);
                const scale = distance === 0 ? 1.05 : distance === 1 ? 0.95 : 0.85;
                const opacity = distance <= 1 ? 1 : 0.4;
                const zIndex = distance === 0 ? 10 : 1;

                return (
                  <div
                    key={index}
                    className="flex-shrink-0 px-4"
                    style={{
                      width: `${CARD_WIDTH}px`,
                      transform: `scale(${scale})`,
                      opacity,
                      zIndex,
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className={`
                      relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 
                      shadow-lg border border-white/50 dark:border-slate-700/50
                      ${distance === 0 ? 'shadow-xl shadow-emerald-500/10 dark:shadow-emerald-500/20' : ''}
                      transition-all duration-500 group
                    `}>
                      <div className="absolute top-6 right-6 text-emerald-200 dark:text-emerald-800">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                      </div>

                      <div className="relative mb-6 flex justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full p-1">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full"></div>
                          </div>
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="relative w-20 h-20 rounded-full object-cover border-4 border-white dark:border-slate-800"
                          />
                        </div>
                      </div>

                      <StarRating rating={testimonial.rating} />

                      <blockquote className="text-slate-700 dark:text-slate-300 text-center mb-6 leading-relaxed min-h-[80px] flex items-center">
                        <p className="italic text-lg">"{testimonial.message}"</p>
                      </blockquote>
                      <div className="text-center">
                        <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-1">
                          {testimonial.name}
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {testimonial.role}
                        </p>
                      </div>

                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100/30 to-transparent dark:from-emerald-900/20 rounded-bl-3xl rounded-tr-3xl"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 
                       w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 
                       hover:from-emerald-600 hover:to-teal-700 
                       text-white rounded-full shadow-lg hover:shadow-xl 
                       transition-all duration-300 hover:scale-110 
                       flex items-center justify-center group"
            aria-label="Previous testimonial"
          >
            <svg 
              className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 
                       w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 
                       hover:from-emerald-600 hover:to-teal-700 
                       text-white rounded-full shadow-lg hover:shadow-xl 
                       transition-all duration-300 hover:scale-110 
                       flex items-center justify-center group"
            aria-label="Next testimonial"
          >
            <svg 
              className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentCenter 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 scale-125' 
                  : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
              onClick={() => setOffset(index * CARD_WIDTH)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
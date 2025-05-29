import React, { useRef, useEffect, useState } from 'react';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Contact = () => {
  const sectionRef = React.useRef(null);
  const line1Ref = React.useRef(null);
  const line2Ref = React.useRef(null);
  const line3Ref = React.useRef(null);
  const contactFormRef = React.useRef(null);
  const skillsSectionRef = React.useRef(null);
  const connectTextRef = React.useRef(null);
  const [isContactOpen, setIsContactOpen] = React.useState(false);
   const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;

    // 3D standing rotation and staggered entrance animation for text
    gsap.fromTo(
      [line1, line2, line3],
      { opacity: 0, rotateX: 90, y: 100 },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 1.8,
        delay: (index) => index * 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Entry animation for other elements (button, icons)
    gsap.fromTo(
      section.querySelectorAll('button, .social-icon'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Scroll-based movement in different directions
    gsap.to(line1, {
      x: () => -window.innerWidth * 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.5,
        ease: 'none',
      },
    });

    gsap.to(line2, {
      x: () => window.innerWidth * 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 15%',
        scrub: 1.5,
        ease: 'none',
      },
    });

    gsap.to(line3, {
      x: () => +window.innerWidth * 0.2,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.5,
        ease: 'none',
      },
    });

    // Cleanup ScrollTrigger on unmount
    return () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
  }, []);

  // Handle contact form and skills section animations
   React.useEffect(() => {
    const contactForm = contactFormRef.current;
    const skillsSection = skillsSectionRef.current;
    const connectText = connectTextRef.current;

    if (isContactOpen) {
      setIsAnimating(true);
      gsap.fromTo(
        contactForm,
        { y: '100%' },
        { y: 0, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        skillsSection,
        { y: '-100%' },
        { y: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        connectText,
        { y: '-100%', opacity: 0, scale: 0.6 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.4,
        }
      );
    } else if (isAnimating) {
      gsap.to(contactForm, {
        y: '100%',
        duration: 0.8,
        ease: 'power3.in',
        onComplete: () => setIsAnimating(false),
      });

      gsap.to(skillsSection, {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.in',
      });
    }
  }, [isContactOpen, isAnimating]);

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col items-center min-h-screen bg-gray-900 text-white px-4 py-8 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Main Text Container with 3D Perspective */}
      <div className="text-center space-y-2 md:space-y-4 -translate-x-24" style={{ perspective: '1000px' }}>
        <h1
          ref={line1Ref}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Let's create
        </h1>
        <h1
          ref={line2Ref}
          className="text-4xl sm:text-5xl md:text-9xl lg:text-9xl font-bold font-cormorant"
          style={{ transformStyle: 'preserve-3d' }}
        >
          SOMETHING MEANINGFUL
        </h1>
        <h1
          ref={line3Ref}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold -translate-x-3/4"
          style={{ transformStyle: 'preserve-3d' }}
        >
          TOGETHER{' '}
          <span className="italic text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            (but not forever)
          </span>
        </h1>
      </div>

      {/* Contact Button */}
      <button
        onClick={toggleContact}
        className="mt-6 px-6 py-3 bg-white text-gray-900 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition"
      >
        <span>CONTACT ME</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.94 6.06a1 1 0 011.42 0L10 11.59l5.64-5.65a1 1 0 011.42 1.42l-6.36 6.36a1 1 0 01-1.42 0L2.94 7.48a1 1 0 010-1.42z" />
        </svg>
      </button>

      {/* Social Media Icons */}
      <div className="flex space-x-4 mt-10">
        {/* Instagram */}
        <a
          href="#"
          className="social-icon w-10 h-10 flex items-center justify-center bg-white text-gray-900 rounded-full hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608.058-1.266.07-1.646.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.627.074-3.042.414-4.123 1.495S2.149 4.263 2.075 5.89c-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.074 1.627.414 3.042 1.495 4.123S5.89 21.751 7.517 21.825c1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.627-.074 3.042-.414 4.123-1.495S21.751 18.737 21.825 17.11c.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.074-1.627-.414-3.042-1.495-명을 4.123S18.737 2.149 17.11 2.075c-1.28-.058-1.688-.072-4.947-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
          </svg>
        </a>
        {/* Dribbble */}
        <a
          href="#"
          className="social-icon w-10 h-10 flex items-center justify-center bg-white text-gray-900 rounded-full hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.565-1.456-1.198-2.907-1.875-4.295 2.622 1.115 4.88 2.315 6.978 3.368zM15.293 5.35c-1.983-.987-4.136-1.996-6.375-2.85 1.206 2.025 2.128 4.248 2.704 6.566 2.015-.48 4.104-.674 6.123-.674.255 0 .51.008.765.016-.406-1.043-.834-2.038-1.217-3.058zM7.824 4.14c2.346.886 4.562 1.953 6.642 3.005-.535 1.966-1.348 3.888-2.385 5.697-3.03-.885-5.988-1.208-8.77-.556.614-2.683 2.183-5.15 4.513-7.146zm-4.885 8.693c2.888-.65 5.98-.302 9.142.638-1.032 1.74-2.23 3.387-3.588 4.896-2.43-1.756-4.128-4.048-5.установить 554-6.534zm5.85 8.326c1.43-1.614 2.68-3.347 3.757-5.203 2.243.378 4.396 1.156 6.296 2.27-.664 2.363-2.198 4.385-4.312 5.628-2.24-.747-4.198-1.744-5.741-2.695zm7.83-1.72c-1.885-1.073-4.015-1.806-6.24-2.166.626-1.24 1.17-2.515 1.63-3.825 2.252.27 4.536.91 6.55 1.875-.312 1.352-.762 2.646-1.94 4.116z" />
          </svg>
        </a>
        {/* LinkedIn */}
        <a
          href="#"
          className="social-icon w-10 h-10 flex items-center justify-center bg-white text-gray-900 rounded-full hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        {/* Website (Generic Globe Icon) */}
        <a
          href="#"
          className="social-icon w-10 h-10 flex items-center justify-center bg-white text-gray-900 rounded-full hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-10H5.5c0 3.038 2.462 5.5 5.5 5.5s5.5-2.462 5.5-5.5H11zm6.5 0c0 3.038-2.462 5.5-5.5 5.5s-5.5-2.462-5.5-5.5H2c0 5.514 4.486 10 10 10s10-4.486 10-10h-4.5z" />
          </svg>
        </a>
        {/* Behance */}
        <a
          href="#"
          className="social-icon w-10 h-10 flex items-center justify-center bg-white text-gray-900 rounded-full hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M22 7h-5v-2h5v2zm-8.5 2.5c1.5 0 2.5.5 3 1.5.5 1 0 2-.5 3s-1.5 2-3 2-2.5-.5-3-1.5c-.5-1 0-2 .5-3s1.5-2 3-2zm-7 0c1 0 2 .5 2.5 1.5s0 2-.5 3-1.5 2-2.5 2h-3v-6h3zm15.5 7.5c0 3-2.5 5.5-5.5 5.5h-11c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5h11c3 0 5.5 2.5 5.5 5.5zm-17-1.5v2h2c.5 0 1-.5 1-1s-.5-1-1-1h-2zm8 2c1 0 2-.5 2-1.5s-1-1.5-2-1.5-2 .5-2 1.5 1 1.5 2 1.5z" />
          </svg>
        </a>
      </div>

      {isAnimating && (
        <div
          ref={contactFormRef}
          className="fixed bottom-0 left-0 w-1/2 md:w-1/2 h-3/4 bg-white text-gray-900 p-6 md:p-8 shadow-lg z-50 overflow-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <button onClick={toggleContact} className="text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                rows="4"
                placeholder="Your Message"
              />
            </div>
            <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition">
              Send Message
            </button>
          </div>
        </div>
      )}

      {/* Right Half with "Let's Connect!" Text */}
      {isAnimating && (
        <div
          ref={skillsSectionRef}
          className="fixed top-0 right-0 pl-8 pr-8 w-1/2 md:w-1/2 h-3/4 flex items-center justify-center z-50"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2
            ref={connectTextRef}
            className="text-4xl md:text-5xl lg:text-9xl pl-10 h-auto w-[90%]  text-gray-300 tracking-wide overflow-hidden  font-cormorant font-extrabold"
            style={{
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            Let's Connect!
          </h2>
        </div>
      )}

      <div className="absolute bottom-4 text-xs sm:text-sm">
        © ALL RIGHTS RESERVED - Akshat Sharma 2025
      </div>

      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 hidden md:block">
        <div className="text-2xl font-bold">W.</div>
        <a href="#" className="block text-sm mt-2 hover:underline">
          RESUME
        </a>
        <a href="#" className="block text-sm mt-1 hover:underline">
          PREV-FOLIO
        </a>
        <a href="#" className="block text-sm mt-1 hover:underline">
          HONORS
        </a>
      </div>
    </div>
  );
};

export default Contact;

 
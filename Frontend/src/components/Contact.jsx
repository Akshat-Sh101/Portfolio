import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Akshat-Sh101',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7
                 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236
                 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
                 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267
                 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24
                 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81
                 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297
                 c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/akshat-sharma-289328289/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136
                 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37
                 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063
                 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782
                 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792
                 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// ─── Field ─────────────────────────────────────────────────────────────────
// IMPORTANT: this must live OUTSIDE the Contact component. Defining a
// component inline inside another component's function body means React
// sees a brand-new component type on every render (every keystroke), so it
// unmounts the old <input>/<textarea> and mounts a new one — which is why
// the field lost focus after a single character. Declaring it once at
// module scope fixes that.
const Field = ({ label, name, type = 'text', rows, value, error, onChange }) => {
  const isTextarea = rows > 0;
  const base =
    `w-full bg-transparent border-b border-white/20 text-white placeholder-white/30
     text-sm sm:text-base py-3 focus:outline-none focus:border-white/70
     transition-colors duration-300 resize-none`;
  const errClass = error ? 'border-red-400' : '';

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] tracking-[0.2em] uppercase text-white/50">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={`Your ${label.toLowerCase()}`}
          className={`${base} ${errClass}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Your ${label.toLowerCase()}`}
          className={`${base} ${errClass}`}
        />
      )}
      {error && <span className="text-red-400 text-xs mt-0.5">{error}</span>}
    </div>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const Contact = () => {
  const sectionRef    = useRef(null);
  const line1Ref      = useRef(null);
  const line2Ref      = useRef(null);
  const line3Ref      = useRef(null);
  const formRef       = useRef(null);
  const socialsRef    = useRef(null);
  const footerRef     = useRef(null);

  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error
  const [errors, setErrors]   = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading lines — 3D entrance, staggered
      gsap.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { opacity: 0, rotateX: 80, y: 60 },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.4,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.to(line1Ref.current, {
        x: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
      gsap.to(line2Ref.current, {
        x: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
      gsap.to(line3Ref.current, {
        x: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        socialsRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: socialsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Form helpers ──────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim())                         e.name    = 'Name is required';
    if (!form.email.trim())                        e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))    e.email   = 'Enter a valid email';
    if (!form.message.trim())                      e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        // response wasn't JSON — fall through to the res.ok check below
      }

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to send message.');
      setStatus('error');
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col items-center min-h-screen bg-gray-900 text-white
                 px-4 py-16 sm:py-20 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* ── Heading ── */}
      <div
        className="w-full text-center mb-12 sm:mb-16"
        style={{ perspective: '1000px' }}
      >
        <h1
          ref={line1Ref}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif
                     leading-tight"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Let's create
        </h1>
        <h1
          ref={line2Ref}
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl
                     font-bold font-cormorant leading-none mt-2 sm:mt-3
                     whitespace-nowrap overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          SOMETHING MEANINGFUL
        </h1>
        <h1
          ref={line3Ref}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl
                     font-serif font-extrabold mt-2 sm:mt-3 leading-tight"
          style={{ transformStyle: 'preserve-3d' }}
        >
          TOGETHER{' '}
          <span className="italic font-light text-lg sm:text-2xl md:text-3xl text-white/60">
            (but not forever)
          </span>
        </h1>
      </div>

      {/* ── Main content — form + contact info side by side on desktop ── */}
      <div ref={formRef} className="form-grid">
        {/* ── Left — inline contact form ── */}
        <div>
          <h2 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">
            Send a message
          </h2>

          {status === 'success' ? (
            <div className="flex flex-col items-start gap-4 py-8">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white/80 text-base leading-relaxed">
                Message sent! I'll get back to you as soon as I can.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white
                           transition-colors duration-300 border-b border-white/20 pb-0.5"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
              <Field
                label="Name"
                name="name"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
              />
              <Field
                label="Message"
                name="message"
                rows={5}
                value={form.message}
                error={errors.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                className="self-start flex items-center gap-3 text-sm tracking-[0.2em] uppercase
                           font-medium border border-white/30 text-white px-7 py-3 rounded-full
                           hover:bg-white hover:text-gray-900 transition-all duration-300
                           disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-sm -mt-4">
                  {errorMsg || 'Something went wrong. Please try again.'}
                </p>
              )}
            </form>
          )}
        </div>

        {/* ── Right — contact info ── */}
        <div className="flex flex-col justify-between gap-10 lg:gap-0">
          <div>
            <h2 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">
              Or reach out directly
            </h2>
            <div className="flex flex-col gap-5">
              <a
                href="mailto:akshatsharmap42@gmail.com"
                className="group flex items-center gap-3 text-white/70 hover:text-white
                           transition-colors duration-300 text-sm sm:text-base"
              >
                <span className="w-8 h-8 rounded-full border border-white/20
                                 flex items-center justify-center flex-shrink-0
                                 group-hover:border-white/60 transition-colors duration-300">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                akshatsharmap42@gmail.com
              </a>

              <div className="flex items-center gap-3 text-white/70 text-sm sm:text-base">
                <span className="w-8 h-8 rounded-full border border-white/20
                                 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                Gurgaon, India
              </div>
            </div>
          </div>

          {/* ── Social links ── */}
          <div ref={socialsRef}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-5">
              Find me online
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 border border-white/20 text-white/70
                             hover:text-white hover:border-white/70 hover:bg-white/5
                             rounded-full px-4 py-2 text-xs tracking-[0.15em] uppercase
                             transition-all duration-300"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        ref={footerRef}
        className="mt-20 sm:mt-28 w-full max-w-5xl flex flex-col sm:flex-row
                   items-center justify-between gap-4 border-t border-white/10 pt-6"
      >
        <p className="text-xs text-white/30 tracking-wider">
          © {new Date().getFullYear()} Akshat Sharma — All rights reserved
        </p>
        <p className="text-xs text-white/20 tracking-wider">
          Built with React · Vite · Tailwind · GSAP
        </p>
      </div>
    </div>
  );
};

export default Contact;
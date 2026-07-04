import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ima1 from '/images/all certificates_pages-to-jpg-0002.jpg';
import ima2 from '/images/DL.jpg';
import ima3 from '/images/da.jpg';
import ima4 from '/images/Azure Data Fundamentals_page-0001.jpg';

// ─── Extra certificates ───────────────────────────────────────────────────────
// Drop these in /public/images/ with exactly these filenames:
import certIBM  from '/images/all certificates_pages-to-jpg-0009.jpg';
import certDL   from '/images/all certificates_pages-to-jpg-0007.jpg';
import certSM  from '/images/all certificates_pages-to-jpg-0005.jpg';
import certnptel from '/images/nptel.jpg'
import certoracle from '/images/eCertificate_copy_page-0001.jpg';
import certCNN   from '/images/all certificates_pages-to-jpg-0001.jpg';

gsap.registerPlugin(ScrollTrigger);

const FEATURED = [
  {
    title: 'Machine Learning',
    issuer: 'Coursera · DeepLearning.AI',
    description: 'Advanced AI, prediction and regression modelling.',
    image: ima1,
    dark: false,
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'Coursera · DeepLearning.AI',
    description: 'Neural networks, CNN, RNN and deep learning algorithms.',
    image: ima2,
    dark: true,
  },
  {
    title: 'Gen AI and Fine Tuning Transformers',
    issuer: 'IBM',
    description: 'Completed hands-on training in Generative AI, Transformer architectures, and parameter-efficient fine-tuning of large language models.',
    image: ima3,
    dark: true,
  },
  {
    title: 'Azure Data Fundamentals',
    issuer: 'Microsoft',
    description: 'Acquired practical understanding of Azure data fundamentals and cloud-based databases. Explored data storage, processing, and analytics services on Microsoft Azure.',
    image: ima4,
    dark: false,
  },
];

const MORE = [
  { title: 'Generative AI Language Modeling', issuer: 'IBM',    image: certIBM  },
  { title: 'Neural Netwrok Optimization',  issuer: 'Deeplearning.ai',     image: certDL   },
  { title: 'Sequence Modeling',        issuer: 'Deeplearning.ai',     image: certSM  },
  { title: 'Data Science & Analytics',  issuer: 'NPTEL',     image: certnptel },
  { title: 'Gen AI Professional',    issuer: 'Oracle',   image: certoracle },
  { title: 'Convolution Neural Network',   issuer: 'Deeplearning.ai', image: certCNN   },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ cert, onClose }) {
  const overlayRef = useRef(null);
  const boxRef     = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(boxRef.current,
      { scale: 0.88, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(boxRef.current,     { scale: 0.88, opacity: 0, duration: 0.2 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, delay: 0.05, onComplete: onClose });
  };

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[200] px-4"
      onClick={handleClose}
    >
      <div
        ref={boxRef}
        className="relative bg-white rounded-2xl p-6 sm:p-10 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xl font-bold transition-colors"
        >
          ×
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 pr-10">
          {cert.title}
        </h2>
        {cert.issuer && (
          <p className="text-sm text-gray-500 tracking-wide mb-6">{cert.issuer}</p>
        )}
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-auto rounded-xl border border-gray-100 shadow"
        />
        {cert.description && (
          <p className="text-gray-600 mt-5 text-sm sm:text-base leading-relaxed">
            {cert.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── More-certs list row ──────────────────────────────────────────────────────
// Renders as a <div> — wrapped by <li> in MoreList to keep valid HTML.
function MoreRow({ cert, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const fillRef = useRef(null);

  useEffect(() => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, {
      scaleX: hovered ? 1 : 0,
      duration: 0.38,
      ease: hovered ? 'power3.out' : 'power2.in',
      transformOrigin: 'left center',
    });
  }, [hovered]);

  return (
    <div
      className="relative flex items-center justify-between py-4 sm:py-5 cursor-pointer group overflow-hidden px-2 sm:px-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(cert)}
    >
      {/* Sliding fill background */}
      <div
        ref={fillRef}
        className="absolute inset-0 bg-gray-900 pointer-events-none rounded-xl"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
      />

      {/* Left — thumbnail + text */}
      <div className="relative flex items-center gap-3 sm:gap-5 z-10 min-w-0">
        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0
                        border-2 border-gray-200 group-hover:border-gray-600 transition-colors duration-300">
          <img
            src={cert.image}
            alt=""
            className="w-full h-full object-cover object-top"
            draggable={false}
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 group-hover:text-white
                        transition-colors duration-300 leading-tight">
            {cert.title}
          </p>
          <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300
                        transition-colors duration-300 mt-0.5">
            {cert.issuer}
          </p>
        </div>
      </div>

      {/* Right — "view" label on desktop + arrow */}
      <div className="relative z-10 flex items-center gap-2 flex-shrink-0 ml-4">
        <span className="hidden sm:block text-xs tracking-[0.15em] uppercase text-gray-300
                         group-hover:text-white transition-colors duration-300 font-medium">
          View
        </span>
        <span className="text-gray-300 group-hover:text-white text-base
                         transition-all duration-300 group-hover:translate-x-1">
          ↗
        </span>
      </div>
    </div>
  );
}

// ─── More list ────────────────────────────────────────────────────────────────
function MoreList({ certs, onOpen }) {
  const listRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    if (!listRef.current) return;
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { x: -24, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.55,
          delay: i * 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <ul ref={listRef} className="divide-y divide-gray-200">
      {certs.map((cert, i) => (
        <li key={i} ref={el => (rowRefs.current[i] = el)} className="list-none">
          <MoreRow cert={cert} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Experience() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const moreRef    = useRef(null);
  const cardRefs   = useRef([]);
  const [lightbox, setLightbox] = useState(null);

  const headingChars = 'Certifications'.split('');
  const mid = Math.floor(headingChars.length / 2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scoped to sectionRef so selectors don't bleed into other sections
      const charL = sectionRef.current.querySelectorAll('.exp-char-l');
      const charR = sectionRef.current.querySelectorAll('.exp-char-r');

      gsap.fromTo(charL,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.05, duration: 1.4, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(charR,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: -0.05, duration: 1.4, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Sub-text
      gsap.fromTo(subRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: subRef.current, start: 'top 92%', toggleActions: 'play none none reverse' },
        }
      );

      // Featured cards alternating slide-in
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -90 : 90, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // More section fade-up
      gsap.fromTo(moreRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: moreRef.current, start: 'top 86%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-gray-100 min-h-screen overflow-x-hidden pb-24">

      {/* ── Giant decorative heading ── */}
      <div
        ref={headingRef}
        className="text-center py-6 sm:py-10 overflow-hidden"
      >
        <h1
          className="font-tangerine font-extrabold text-gray-900 leading-none select-none"
          style={{ fontSize: 'clamp(4.5rem, 18vw, 18rem)' }}
        >
          {headingChars.map((ch, i) => (
            <span
              key={i}
              className={`${i <= mid ? 'exp-char-l' : 'exp-char-r'} inline-block`}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>
      </div>

      {/* ── Intro ── */}
      <div ref={subRef} className="max-w-5xl mx-auto px-4 sm:px-8 mb-10 sm:mb-14">
        <div className="flex flex-row sm:flex-col  sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">Certifications</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-md">
              Professional certifications spanning ML, deep learning, data analytics,
              and cloud computing. Click any card to view the full certificate.
            </p>
          </div>
          <span className="text-xs tracking-[0.25em] uppercase text-gray-400 sm:hidden">
            {FEATURED.length + MORE.length} total
          </span>
        </div>
      </div>

      {/* ── Featured 4 cards ── */}
      <div
  className="responsive-grid max-w-7xl mx-auto px-4 sm:px-8 gap-6"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem",
  }}
>
        {FEATURED.map((cert, i) => {
          const isDark = cert.dark;
          return (
            <div
              key={i}
              ref={el => (cardRefs.current[i] = el)}
              onClick={() => setLightbox(cert)}
              className={`flex border-4 border-gray-900 rounded-3xl shadow-lg
                          p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                          cursor-pointer min-h-[200px] sm:min-h-[220px]
                          ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            >
              {/* Left — text */}
              <div className="flex-1 flex flex-col gap-3 sm:gap-4 justify-between pr-4 min-w-0">
                <div>
                  <h2
                    className={`text-base sm:text-lg lg:text-xl font-medium p-2 rounded-lg mb-2 sm:mb-3 leading-tight ${
                      isDark ? 'bg-white text-gray-900' : 'bg-yellow-300 text-gray-900'
                    }`}
                  >
                    {cert.title}
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-80">
                    {cert.description}
                  </p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setLightbox(cert); }}
                  className="flex items-center gap-2 text-sm sm:text-base font-medium self-start group"
                >
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 -rotate-45 transition-transform duration-300 group-hover:rotate-0 flex-shrink-0"
                    viewBox="0 0 24 24" fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10
                             10-4.477 10-10S17.523 2 12 2zm4.293 10.707l-4 4a1 1 0
                             01-1.414-1.414L13.586 13H8a1 1 0 110-2h5.586l-2.707-2.707a1
                             1 0 011.414-1.414l4 4a1 1 0 010 1.414z"/>
                  </svg>
                  <span className="hidden sm:inline">Learn More</span>
                </button>
              </div>

              {/* Right — image, fixed width so text area always gets breathing room */}
              <div className="w-[45%] flex-shrink-0 flex items-center justify-center">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-36 sm:h-44 lg:h-52 object-contain rounded-md"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── More Certifications ── */}
      <div
        ref={moreRef}
        className="max-w-5xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24"
      >
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs tracking-[0.3em] uppercase text-gray-500 font-medium whitespace-nowrap">
            More Certifications
          </span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <MoreList certs={MORE} onOpen={setLightbox} />
      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox cert={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
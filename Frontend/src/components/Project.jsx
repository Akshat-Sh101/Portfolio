import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import nuvioMain from '/projectIMG/collage.jpg';
import logimg from '/projectIMG/logimg.jpg'
import distml1 from '/projectIMG/dist.jpg';
import datecraftimg from '/projectIMG/datecraft.png'


const PROJECTS = [
  {
    id: '01',
    name: 'Distributed-ML',
    subtitle: 'Distributed Machine Learning Platform',
    period: 'Jan 2025 — Present',
    tags: ['Python', 'Node.js', 'REST API', 'Systems'],
    paragraphs: [
      <>A <strong>distributed task execution platform</strong> using a master-worker architecture for ML training, fine-tuning, and inference workloads.</>,
      <>REST API-based communication, task scheduling, worker monitoring, and real-time execution tracking — built for parallel execution and efficient resource utilisation.</>,
    ],
    link: 'https://github.com/Akshat-Sh101/Distributed-ML',
    mainImg: distml1,
    align: 'left',
    featured: true,
  },
  {
    id: '02',
    name: 'Nuvio',
    subtitle: 'MERN E-Commerce Platform',
    period: 'Jun 2023 — Aug 2023',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    paragraphs: [
      <>A <strong>full-stack e-commerce application</strong> with advanced filtering, secure checkout, and real-time inventory — built on the MERN stack.</>,
      <>Includes authentication, cart, order, and product management with a fully responsive React + Tailwind frontend.</>,
    ],
    link: 'https://github.com/Akshat-Sh101/Nuvio_EcommerceStore',
    mainImg: nuvioMain,
    // gallery: [nuvioFeat1, nuvioFeat2],
    align: 'right',
  },
  {
    id: '03',
    name: 'Log Summarizer',
    subtitle: 'LLM Fine-Tuning for Log Analysis',
    period: 'Sept 2024 — Nov 2024',
    tags: ['TensorFlow', 'HuggingFace', 'T5', 'NLP'],
    paragraphs: [
      <>A fine-tuned <strong>transformer-based T5 model</strong> for automated summarisation of application and system logs.</>,
      <>Custom preprocessing and inference pipelines built with HuggingFace Transformers — improving readability across large-scale log streams.</>,
    ],
    link: 'https://github.com/Portable-Log-Monitoring/LogginApp/tree/main',
    mainImg: logimg,
    align: 'left',
  },
  {
    id: '04',
    name: 'DateCraft',
    subtitle: 'Intelligent Date Formatter',
    period: 'Jan 2024 — Mar 2024',
    tags: ['TensorFlow', 'NLP', 'Regex-free'],
    paragraphs: [
      <>An <strong>NLP-based date extraction and normalisation system</strong> that standardises dates from noisy, unstructured text.</>,
      <>Custom preprocessing pipelines deliver meaningfully better extraction accuracy than traditional regex-based approaches.</>,
    ],
    link: 'https://github.com/Akshat-Sh101/DateCraft',
    mainImg: datecraftimg,
    align: 'right',
  },
];

const STATS = [
  { value: '04', label: 'Projects Shipped' },
  { value: '03', label: 'ML Models Fine-Tuned' },
  { value: '100%', label: 'Open Source' },
];

// ─── Marquee strip ─────────────────────────────────────────────────────────────
const MARQUEE_WORDS = ['React', 'Node.js', 'Python', 'TensorFlow', 'PyTorch', 'HuggingFace', 'MongoDB', 'REST API', 'NLP', 'Transformers'];

function MarqueeStrip() {
  const repeated = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="w-full overflow-hidden border-y border-black/8 py-3 my-2 select-none">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {repeated.map((w, i) => (
          <span key={i} className="text-[11px] tracking-[0.3em] uppercase text-black/25 font-medium flex-shrink-0">
            {w} <span className="text-black/15 mx-3">·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }`}</style>
    </div>
  );
}

// ─── Project row ──────────────────────────────────────────────────────────────
function ProjectRow({ project, index, onEnterView }) {
  const rowRef = useRef(null);
  const isRight = project.align === 'right';

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Image block rises up
      gsap.fromTo(
        rowRef.current.querySelector('.proj-img-wrap'),
        { opacity: 0, y: 50, scale: 0.5 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.0, ease: 'power3.out',
          scrollTrigger: {
            trigger: rowRef.current, start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rowRef.current.querySelectorAll('.proj-reveal'),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.75, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: {
            trigger: rowRef.current, start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Background numeral slides in from side
      gsap.fromTo(
        rowRef.current.querySelector('.proj-num'),
        { opacity: 0, x: isRight ? 30 : -30 },
        {
          opacity: 1, x: 0,
          duration: 0.9, ease: 'power2.out',
          scrollTrigger: {
            trigger: rowRef.current, start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax drift on image
      gsap.to(rowRef.current.querySelector('.proj-img'), {
        y: -10, ease: 'none',
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top bottom', end: 'bottom top',
          scrub: 1.4,
        },
      });

      // Drive side index
      ScrollTrigger.create({
        trigger: rowRef.current,
        start: 'top center', end: 'bottom center',
        onToggle: (self) => { if (self.isActive) onEnterView(index); },
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`relative flex flex-col ${isRight ? 'lg:flex-row-reverse' : 'lg:flex-row'}
                  items-start lg:items-center gap-10 lg:gap-14
                  py-16 sm:py-24 lg:py-28
                  border-b border-black/8 last:border-b-0`}
    >
      {/* Ghost numeral */}
      <span
        className={`proj-num pointer-events-none select-none absolute
                    ${isRight ? 'right-0' : 'left-0'} -top-2 sm:-top-6
                    text-[5.5rem] sm:text-[8rem] lg:text-[10rem]
                    font-cormorant font-bold text-black/[0.04] leading-none`}
      >
        {project.id}
      </span>

      {/* ── Image ── */}
      <div className="proj-img-wrap relative w-full lg:w-[56%] group" style={{ willChange: 'transform, opacity' }}>
        {project.featured && (
          <span className="absolute -top-3.5 left-3 z-10 bg-black text-white
                           text-[9px] tracking-[0.25em] uppercase px-3 py-1.5
                           rounded-full shadow-md font-medium">
            ★ Featured
          </span>
        )}

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-md overflow-hidden
                     shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)]
                     ring-1 ring-black/6"
        >
          <div className="aspect-[4/3] overflow-hidden bg-zinc-100/80">
            <img
              src={project.mainImg}
              alt={`${project.name} preview`}
              className="proj-img w-auto h-auto object-cover object-top
                         scale-[1] group-hover:scale-100
                         transition-transform duration-700 ease-out"
            />
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8
                          transition-colors duration-500
                          flex items-end justify-end p-4 sm:p-5">
            <span className="opacity-0 group-hover:opacity-100
                             translate-y-2 group-hover:translate-y-0
                             transition-all duration-300
                             bg-white text-black text-[10px] tracking-[0.2em]
                             font-semibold uppercase px-4 py-2 rounded-full shadow-sm">
              View on GitHub ↗
            </span>
          </div>
        </a>

      </div>

      {/* ── Text ── */}
      <div className="relative z-10 w-full lg:w-[44%] flex flex-col items-start text-left">
        {/* Period + index */}
        <div className="proj-reveal flex items-center gap-3 mb-4">
          <span className="text-[10px] tracking-[0.3em] text-black/35 font-medium uppercase">
            {project.period}
          </span>
          <span className="w-6 h-px bg-black/15" />
          <span className="text-[10px] tracking-[0.2em] text-black/25 font-medium">
            {project.id} / 04
          </span>
        </div>

        <h3 className="proj-reveal font-cormorant font-bold text-black leading-[0.92]
                       text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
          {project.name}
        </h3>

        <p className="proj-reveal font-cormorant italic font-light text-black/55
                      text-lg sm:text-xl mt-2 leading-snug">
          {project.subtitle}
        </p>

        {/* Thin rule */}
        <div className="proj-reveal w-8 h-px bg-black/20 my-5" />

        {/* Description */}
        <div className="space-y-3 max-w-sm">
          {project.paragraphs.map((p, i) => (
            <p key={i}
              className="proj-reveal text-black/60 text-sm sm:text-[0.9rem] leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="proj-reveal flex flex-wrap gap-1.5 mt-5">
          {project.tags.map((tag) => (
            <span key={tag}
              className="text-[9px] tracking-[0.18em] uppercase
                             border border-black/12 text-black/45
                             px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-reveal group inline-flex items-center gap-2 mt-7
                     text-black text-xs tracking-[0.18em] uppercase font-semibold
                     border-b border-black/25 pb-1
                     hover:border-black hover:gap-3
                     transition-all duration-300"
        >
          View on GitHub
          <span className="transition-transform duration-300 group-hover:translate-x-1 text-sm">→</span>
        </a>
      </div>
    </div>
  );
}

function Project() {
  const projectRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const indexBarRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indexVisible, setIndexVisible] = useState(false);

  // Show / hide the side index bar only while the project section is in view
  useEffect(() => {
    const el = projectRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIndexVisible(entry.isIntersecting),
      // Fire when the section is at least 5% visible — hides it the moment it
      // scrolls fully out of view in either direction
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fade the index bar in/out smoothly
  useEffect(() => {
    if (!indexBarRef.current) return;
    gsap.to(indexBarRef.current, {
      opacity: indexVisible ? 1 : 0,
      pointerEvents: indexVisible ? 'auto' : 'none',
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [indexVisible]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      headingRef.current.querySelectorAll('.head-reveal'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 1.1, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: {
          trigger: headingRef.current, start: 'top 87%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      statsRef.current.querySelectorAll('.stat-item'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.75, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: {
          trigger: statsRef.current, start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: projectRef });

  return (
    <div ref={projectRef} className="bg-[#fafaf9] text-black relative">

      {/* ── Side project index — only visible while this section is on-screen ── */}
      <div
        ref={indexBarRef}
        className="sidebar"
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        {PROJECTS.map((p, i) => (
          <div key={p.id} className="flex items-center gap-2.5 cursor-default">
            <span className={`h-px transition-all duration-400
                             ${activeIndex === i ? 'w-7 bg-black' : 'w-3.5 bg-black/18'}`} />
            <span className={`text-[11px] tracking-[0.22em] uppercase transition-colors duration-400
                             ${activeIndex === i ? 'text-black font-semibold' : 'text-black/25'}`}>
              {p.name}
            </span>
          </div>
        ))}
      </div>

      {/* ── Heading ── */}
      <section
        ref={headingRef}
        className="flex flex-col justify-center items-center
                   px-4 pt-28 sm:pt-36 pb-0"
      >
        <span style={{
          fontSize: "12px",
          letterSpacing: "0.45em",
          color: "rgba(0,0,0,.35)",
          fontWeight: 500,
          marginBottom: "20px",
          textTransform: "uppercase",
        }}>
          ( 01 — {String(PROJECTS.length).padStart(2, '0')} )
        </span>

        <h2 className="head-reveal"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: "0.88",
            letterSpacing: "-2px",
            fontSize: "clamp(3.2rem,8vw,8rem)",
            margin: 0,
          }} >
          Selected Work
        </h2>

        <p className="head-reveal "
          style={{
            color: "rgba(0,0,0,.45)",
            fontSize: "16px",
            marginTop: "20px",
            maxWidth: "520px",
            textAlign: "center",
            fontWeight: 300,
            lineHeight: 1.8,
          }} >
          Machine learning systems and full-stack applications — built end to end.
        </p>

        {/* Thin horizontal rule */}
        <div className="head-reveal w-16 h-1 bg-black/15 mt-8" />
      </section>

      {/* ── Marquee ── */}
      <div style={{
        marginTop: "40px",
      }}>
        <MarqueeStrip />
      </div>

      {/* ── Stats bar ── */}
      <section
        ref={statsRef}
        style={{
          maxWidth: "768px",
          margin: "0 auto",
          padding: "48px 16px",
        }}
      >
        <div className="grid grid-cols-3 divide-x divide-black/8 border-y border-black/8">
          {STATS.map((stat) => (
            <div key={stat.label}
              className="stat-item flex flex-col items-center text-center
                            py-5 sm:py-7 px-2">
              <span className="font-cormorant font-bold text-2xl sm:text-4xl lg:text-5xl text-black">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.18em]
                               uppercase text-black/40 mt-1.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Project rows ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {PROJECTS.map((project, idx) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={idx}
            onEnterView={setActiveIndex}
          />
        ))}
      </div>

      <div className="h-14 sm:h-20" />
    </div>
  );
}

export default Project;
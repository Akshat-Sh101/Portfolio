"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GateResultsPopup from "./Gateresultspopup";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const aboutRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);
  const gateBtnRef = useRef(null);
  const [isGateOpen, setIsGateOpen] = useState(false);

  useEffect(() => {
    // Split description text into spans for letters and spaces
    const textElement = textRef.current;
    const content = textElement.textContent;
    textElement.textContent = "";
    content.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.className =
        char === " " ? "inline-block w-2" : "letter inline-block text-gray-400";
      textElement.appendChild(span);
    });

    // Animate title lines with scrolling
    const lines = aboutRef.current.querySelectorAll(".line");
    lines.forEach((line, index) => {
      gsap.fromTo(
        line,
        {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          rotateY: index % 2 === 0 ? 30 : -30,
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            end: "bottom 20%",
            scrub: 0.5,
          },
        }
      );
    });

    // Animate photo with X and Y rotation
    let enterHandler, leaveHandler;
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        {
          scale: 0.8,
          rotateX: 30,
          rotateY: 30,
          opacity: 0,
        },
        {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.5,
          },
        }
      );

      enterHandler = () =>
        gsap.to(photoRef.current, {
          scale: 1.1,
          rotate: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      leaveHandler = () =>
        gsap.to(photoRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        });

      photoRef.current.addEventListener("mouseenter", enterHandler);
      photoRef.current.addEventListener("mouseleave", leaveHandler);
    }

    // Animate description text (letter-by-letter color change)
    const letterSpans = textRef.current.querySelectorAll(".letter");
    gsap.fromTo(
      letterSpans,
      { color: "#9CA3AF" },
      {
        color: "#1F2937",
        duration: 0.05,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      }
    );

    // GATE button entrance
    gsap.fromTo(
      gateBtnRef.current,
      { opacity: 0, y: 24, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: gateBtnRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate development logos
    const logos = aboutRef.current.querySelectorAll(".dev-logo");
    const logoHandlers = [];
    logos.forEach((logo, index) => {
      gsap.fromTo(
        logo,
        { scale: 0, opacity: 0, rotate: 90 },
        {
          scale: 1,
          opacity: 0.3,
          rotate: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.5,
          },
        }
      );

      const onEnter = () =>
        gsap.to(logo, {
          scale: 1.2,
          opacity: 1,
          rotate: 15,
          duration: 0.8,
          ease: "power2.out",
        });
      const onLeave = () =>
        gsap.to(logo, {
          scale: 1,
          opacity: 0.3,
          rotate: 0,
          duration: 0.8,
          ease: "power2.out",
        });

      logo.addEventListener("mouseenter", onEnter);
      logo.addEventListener("mouseleave", onLeave);
      logoHandlers.push({ logo, onEnter, onLeave });
    });

    return () => {
      if (photoRef.current && enterHandler) {
        photoRef.current.removeEventListener("mouseenter", enterHandler);
        photoRef.current.removeEventListener("mouseleave", leaveHandler);
      }
      logoHandlers.forEach(({ logo, onEnter, onLeave }) => {
        logo.removeEventListener("mouseenter", onEnter);
        logo.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={aboutRef}
      className="bg-gradient-to-b from-[#E5E5E5] to-[#F5F5F5] min-h-screen w-full relative overflow-hidden py-16 md:py-24 flex flex-col items-center justify-center gap-5 sm:gap-6 px-4"
      style={{ backgroundSize: "cover", backgroundPosition: "50% 0%"}}
    >
      {/* Development Logos — hidden on small screens to avoid clutter/overlap */}
      <div className="block sm:hidden ">
        {[
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/react.svg", position: { top: "20%", left: "15%" } },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/python.svg", position: { top: "20%", right: "15%" } },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/pytorch.svg", position: { bottom: "40%", left: "35%" } },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/tensorflow.svg", position: { bottom: "15%", right: "15%" } },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/tailwindcss.svg", position: { top: "40%", left: "15%" } },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/nodedotjs.svg", position: { bottom: "20%", left: "10%" } },
          { src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/huggingface.svg", position: { bottom: "32%", right: "30%" } },
        ].map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt="Dev Logo"
            className="dev-logo absolute w-10 h-10 lg:w-12 lg:h-12 opacity-30 cursor-pointer transition-all"
            style={logo.position}
          />
        ))}
      </div>

      {/* Title Lines */}
      <h1 className="line text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold font-['Inter'] tracking-tight text-gray-800 text-center">
        ML / DEEP LEARNING
      </h1>
      <h1 className="line text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light font-['Playfair_Display'] italic text-gray-700 text-center">
        Engineer
      </h1>
      <h1 className="line text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-extrabold font-['Inter'] tracking-tight text-gray-800 text-center">
        AND FULL-STACK
      </h1>
      <h1 className="line text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-light font-['Playfair_Display'] italic text-gray-700 text-center">
        Developer
      </h1>

      {/* Photo */}
      <div
        ref={photoRef}
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full overflow-hidden mt-6 sm:mt-8 shadow-lg cursor-pointer transition-all"
      >
        <img
          src="./images/image.png"
          alt="Akshat Sharma"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description */}
      <div
        ref={textRef}
        className="max-w-2xl mx-auto text-center px-2 sm:px-4 mt-6 sm:mt-8 font-['Inter'] text-base sm:text-lg md:text-xl"
      >
        Machine Learning and Deep Learning enthusiast with a strong focus on Transformer architectures, Large Language Models, and fine-tuning for real-world NLP applications. Experienced in building intelligent systems such as log summarization, anomaly detection, and semantic text processing using TensorFlow, PyTorch, and the HuggingFace ecosystem. Skilled in the MERN stack for creating scalable, AI-powered web applications and dashboards — combining advanced AI research with robust software engineering to solve real-world problems.
      </div>

      {/* GATE Qualified button */}
      <button
        ref={gateBtnRef}
        onClick={() => setIsGateOpen(true)}
        className="group relative mt-4 sm:mt-6 inline-flex items-center gap-3 bg-black text-white px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm tracking-[0.15em] font-medium overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          GATE QUALIFIED — VIEW SCORES
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-zinc-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      <GateResultsPopup isOpen={isGateOpen} onClose={() => setIsGateOpen(false)} />
    </div>
  );
};

export default AboutSection;
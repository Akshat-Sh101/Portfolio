
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const aboutRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);

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

      // Photo hover effect
      gsap.to(photoRef.current, {
        scale: 1.1,
        rotate: 5,
        duration: 0.3,
        ease: "power2.out",
        paused: true,
        onStart: () => photoRef.current.classList.add("shadow-2xl"),
        onReverseComplete: () =>
          photoRef.current.classList.remove("shadow-2xl"),
      }).play();

      photoRef.current.addEventListener("mouseenter", () =>
        gsap.to(photoRef.current, {
          scale: 1.1,
          rotate: 5,
          duration: 0.3,
          ease: "power2.out",
        })
      );
      photoRef.current.addEventListener("mouseleave", () =>
        gsap.to(photoRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      );
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

    // Animate development logos
    const logos = aboutRef.current.querySelectorAll(".dev-logo");
    logos.forEach((logo, index) => {
      // Entrance animation
      gsap.fromTo(
        logo,
        {
          scale: 0,
          opacity: 0,
          rotate: 90,
        },
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

      // Hover animation
      logo.addEventListener("mouseenter", () =>
        gsap.to(logo, {
          scale: 1.2,
          opacity: 1,
          rotate: 15,
          duration: 0.8,
          scrub: 2,
          ease: "power2.out",
        })
      );
      logo.addEventListener("mouseleave", () =>
        gsap.to(logo, {
          scale: 1,
          opacity: 0.3,
          rotate: 0,
          scrub: 2,
          duration: 0.8,
          ease: "power2.out",
        })
      );
    });

    // Parallax background effect
    gsap.to(aboutRef.current, {
      backgroundPosition: "80% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={aboutRef}
      className="bg-gradient-to-b from-[#E5E5E5] to-[#F5F5F5] min-h-screen w-full relative overflow-hidden py-16 md:py-24 flex flex-col items-center justify-center gap-6"
      style={{ backgroundSize: "cover", backgroundPosition: "50% 0%" }}
    >
      {/* Development Logos (Positioned around photo and text) */}
      {[
        {
          src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/react.svg",
          position: { top: "20%", left: "15%" },
        },
        {
          src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/nodedotjs.svg",
          position: { top: "20%", right: "15%" },
        },
        {
          src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/python.svg",
          position: { bottom: "40%", left: "35%" },
        },
        {
          src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/tensorflow.svg",
          position: { bottom: "15%", right: "15%" },
        },
        {
          src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/tailwindcss.svg",
          position: { top: "40%", left: "15%" },
        },
        {
          src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/amazonaws.svg",
          position: { bottom: "20%", left: "10%" },
        },
        {
          src: "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/javascript.svg",
          position: { bottom: "32%", right: "30%" },
        },
      ].map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt="Dev Logo"
          className="dev-logo absolute w-12 h-12 opacity-30 cursor-pointer transition-all"
          style={logo.position}
        />
      ))}

      {/* Title Lines */}
      <h1 className="line text-5xl md:text-7xl font-extrabold font-['Inter'] tracking-tight text-gray-800">
        AN ASPIRING
      </h1>
      <h1 className="line text-5xl md:text-7xl font-light font-['Playfair_Display'] italic text-gray-700">
        Web Developer
      </h1>
      <h1 className="line text-3xl md:text-7xl font-extrabold font-['Inter'] tracking-tight text-gray-800">
        AND MACHINE LEARNING
      </h1>
      <h1 className="line text-5xl md:text-7xl font-light font-['Playfair_Display'] italic text-gray-700">
        Engineer
      </h1>

      {/* Photo (Optional) */}
      <div
        ref={photoRef}
        className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden mt-8 shadow-lg cursor-pointer transition-all"
      >
        <img
          src="./images/image.png"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description */}
      <div
        ref={textRef}
        className="max-w-2xl mx-auto text-center px-4 mt-8 font-['Inter'] text-lg md:text-xl"
      >
        Passionate about crafting responsive, user-friendly web applications and
        harnessing the power of machine learning to solve complex problems. With
        expertise in modern web technologies like React, Node.js, and Tailwind
        CSS, combined with proficiency in Python, TensorFlow, and data analysis,
        I build innovative solutions that bridge the gap between intuitive design
        and intelligent systems.
      </div>
    </div>
  );
};

export default AboutSection;


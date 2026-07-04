import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Cta({ heroRef , skipIntro }) {
  const navigate = useNavigate();
  const ctaRef = useRef(null);

useGSAP(
  () => {
    // Set initial state immediately
    gsap.set(ctaRef.current, {
      opacity: skipIntro ? 1 : 0,
      scale: skipIntro ? 1 : 0.8,
    });

    // Only play intro animation if intro is playing
    if (!skipIntro) {
      gsap.to(ctaRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        delay: 6.5,
      });
    }

    // Scroll animation
    gsap.to(ctaRef.current, {
      opacity: 0,
      scale: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  },
  { dependencies: [skipIntro] }
);

  const handleViewResume = (e) => {
    e.preventDefault();
    navigate("/resume");
  };

  return (
    <div className="absolute bottom-28 md:bottom-16 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer">
      <div
  ref={ctaRef}
  className="cursor-pointer relative flex items-center justify-center w-40 h-40 sm:w-44 sm:h-44 md:w-40 md:h-40"
>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-full h-full"
          viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          <defs>
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text className="text-white text-[12px] font-cormorant font-normal tracking-[0.3em] uppercase fill-white">
            <textPath href="#circlePath" startOffset="0%">
              — View Resume
            </textPath>
            <textPath href="#circlePath" startOffset="33.33%">
              — View Resume
            </textPath>
            <textPath href="#circlePath" startOffset="66.66%">
              — View Resume
            </textPath>
          </text>
        </motion.svg>

        {/* Center Button */}
        <button
          type="button"
          onClick={handleViewResume}
          aria-label="View resume"
          className="cursor-pointer relative h-full w-full flex items-center justify-center rounded-full bg-transparent text-white text-sm font-cormorant font-medium tracking-wider hover:font-bold hover:text-gray-300 shadow-lg transition duration-300 ease-in-out"
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            VIEW
          </motion.span>
        </button>
      </div>
    </div>
  );
}
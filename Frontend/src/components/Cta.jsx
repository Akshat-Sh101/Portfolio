import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Cta({ heroRef }) {
  useGSAP(() => {
    gsap.fromTo(
      ".CtaButton",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 6.5 }
    );
    gsap.fromTo(
      ".CtaButton",
      { scale: 1 },
      {
        opacity: 0,
        scale: 0.2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  }, []);

  const handlePdfClick = (e) => {
    console.log("Attempting to open PDF: /images/AkshatSharma_resume.pdf");
    // Optional: Uncomment to test window.open
    // e.preventDefault();
    // window.open("/images/AkshatSharma_resume.pdf", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="absolute bottom-28 md:bottom-16 left-[52%] transform -translate-x-1/2 z-30 cursor-pointer">
      <div className="CtaButton cursor-pointer opacity-1 relative flex items-center justify-center w-48 h-48 md:w-40 md:h-40">
        {/* SVG Circle with Rotating Text */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-full h-full"
          viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          <defs>
            <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
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
        <a
          href="/images/AkshatSharma_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePdfClick}
          aria-label="Open resume in new tab"
        >
          <motion.button
            role="button"
            className="cursor-pointer relative h-[100%] w-[100%] px-9 py-11 flex items-center justify-center rounded-full bg-transparent text-white text-sm font-cormorant font-medium tracking-wider hover:font-bold hover:text-gray-300 shadow-lg transition duration-300 ease-in-out"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            VIEW
          </motion.button>
        </a>
      </div>
    </div>
  );
}
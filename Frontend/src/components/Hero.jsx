import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useState, useRef } from "react"
import Navbar from "./Navbar"
import CustomCursor from "./CustomCursor"
import Cta from "./Cta"

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ skipIntro = false }) {
  const [counter, setCounter]     = useState(skipIntro ? 100 : 0)
  const [showModel, setShowModel] = useState(skipIntro)       // skip counter overlay
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const bgRef   = useRef(null)

  useEffect(() => {
    if (skipIntro) return;

    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setShowModel(true), 1000)
          return 100
        }
        return Math.min(prev + Math.floor(Math.random() * 10) + 1, 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [skipIntro])

  useGSAP(() => {
    if (skipIntro) {

      gsap.fromTo(bgRef.current,
        { opacity: 0, y: 20, scale: 1.05 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.7, delay: 0.1 }
      );

      gsap.from(".header-letter", {
        opacity: 0, y: 20, stagger: 0.06, duration: 0.7, ease: "power2.out", delay: 0.2,
      });
      gsap.from(".last-name", {
        opacity: 0, scale: 0.96, duration: 0.8, ease: "power2.out", delay: 0.5,
      });
      gsap.from(".role-text", {
        opacity: 0, y: 14, duration: 0.7, ease: "power2.out", delay: 0.8,
      });
      gsap.from(".infocard", {
        opacity: 0, x: -20, duration: 0.6, ease: "power2.out", delay: 0.9,
      });
      gsap.from(".indecator", {
        opacity: 0, x: 20, duration: 0.6, ease: "power2.out", delay: 1.0,
      });
      gsap.from(".CtaButton", {
        opacity: 0, scale: 0.85, duration: 0.8, ease: "back.out(1.4)", delay: 1.1,
      });

    } else {
      gsap.to(".counter", { delay: 3, opacity: 0, duration: 0.5 });

      gsap.to(".bar", {
        delay: 2.5,
        height: 0,
        stagger: { amount: 0.5 },
        ease: "power4.inOut",
        duration: 1.5,
      });

      gsap.fromTo(bgRef.current,
        { opacity: 0, y: 100, scale: 1.3 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.8, delay: 3.6 }
      );

      gsap.from(".header-letter", {
        opacity: 0, y: 30, stagger: 0.08, duration: 1, ease: "power2.out", delay: 4.5,
      });
      gsap.from(".last-name", {
        opacity: 0, scale: 0.95, duration: 1.2, ease: "power2.out", delay: 5.2,
      });
      gsap.from(".role-text", {
        opacity: 0, y: 20, duration: 1, ease: "power2.out", delay: 5.8,
      });
    }

    gsap.to(".name-container", {
      y: -100,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to(".indecator", {
      x: 90, opacity: 0,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.fromTo(bgRef.current,
      { y: 0 },
      { y: 200, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 } }
    );
    gsap.to(".infocard", {
      x: -120, opacity: 0,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });
  }, [skipIntro])

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[100svh] overflow-hidden bg-[#383838]"
    >
      
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-[url('/images/temp.png')] opacity-0"
        style={{ zIndex: 0, filter: "blur(2px)" }}
      />

      <CustomCursor />
      
      {!skipIntro && !showModel && (
        <h1 className="counter absolute w-full h-[100svh] flex justify-center items-center z-50
                       font-mono text-white/80 text-6xl sm:text-7xl md:text-9xl">
          {counter}
        </h1>
      )}

      {!skipIntro && (
        <div className="overlay absolute w-full h-[105svh] z-20 flex">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bar w-[10vw] h-[105svh] bg-gray-700" />
          ))}
        </div>
      )}

      <div className="absolute w-full z-50 pointer-events-auto">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} skipIntro={skipIntro} />
      </div>

      <div
        ref={nameRef}
        className="name-container absolute inset-0 flex flex-col items-center justify-center px-4 z-30"
      >
        <div className="flex flex-col items-center space-y-1 sm:space-y-2">
          <div className="flex md:space-x-[0.01em]">
            {"AKSHAT".split("").map((char, index) => (
              <div
                key={index}
                className="header-letter text-white/80 font-extrabold font-bebas-neue
                           text-5xl xs:text-6xl sm:text-7xl md:text-[10rem] leading-none"
              >
                {char}
              </div>
            ))}
          </div>
          <div className="last-name text-white text-2xl sm:text-3xl md:text-4xl
                          font-medium font-bebas-neue tracking-wide">
            SHARMA
          </div>
          <div className="role-text text-white/90 text-xs sm:text-sm md:text-base
                          font-roboto-condensed tracking-[0.25em] sm:tracking-[0.3em]
                          font-normal mt-4 sm:mt-6 text-center">
            CREATIVE DEVELOPER &middot; ML/AI ENGINEER
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Cta className="ctabtn" heroRef={heroRef}  skipIntro={skipIntro}/>

      {/* Minimal info card */}
      <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-10 z-30 infocard">
        <div className="text-white/60 text-[10px] sm:text-xs tracking-wider">
          <div className="mb-1 sm:mb-2">BASED IN</div>
          <div className="text-white/90 text-xs sm:text-sm">INDIA</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 z-30
                      hidden sm:flex flex-col items-center indecator">
        <div className="text-white/60 text-xs tracking-wider mb-2">SCROLL</div>
        <div className="h-16 w-[1px] bg-white/20">
          <div className="h-4 w-[2px] bg-white/60 animate-[scroll_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  )
}
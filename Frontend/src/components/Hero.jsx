import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useState, useRef } from "react"
import Navbar from "./Navbar"
import CustomCursor from "./CustomCursor"
import Cta from "./Cta"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const [counter, setCounter] = useState(0)
  const [showModel, setShowModel] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const bgRef = useRef(null)

  // Loading counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setShowModel(true), 1000)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // GSAP animations
  useGSAP(() => {
    // Counter fade out
    gsap.to(".counter", {
      delay: 3,
      opacity: 0,
      duration: 0.5,
    })

    // Loading bars animation
    gsap.to(".bar", {
      delay: 2.5,
      height: 0,
      stagger: { amount: 0.5 },
      ease: "power4.inOut",
      duration: 1.5,
    })

    // background image enterence
    gsap.fromTo(
      bgRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 1.3
      },
      {
        opacity: 1,
        y: 0,
        scale:1,
        ease: "power2.out",
        duration: 0.8,
        delay: 3.6,
      }
    );

    // First name letters animation - more subtle and professional
    gsap.from(".header-letter", {
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 1,
      ease: "power2.out",
      delay: 4.5,
    })

    // Last name animation - clean scale effect
    gsap.from(".last-name", {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: "power2.out",
      delay: 5.2,
    })

    // Subtle role text animation
    gsap.from(".role-text", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
      delay: 5.8,
    })

    // Scroll-triggered parallax effects
    gsap.to(".name-container", {
      y: -100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })
    gsap.to(".indecator", {
      x: 90,
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })

    gsap.fromTo(bgRef.current,{
      y:0,
    }, {
      y:200,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })

    gsap.to(".infocard", {
      x: -120,
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top", 
        end: "bottom top",
        scrub: 1,
      },
    })

    gsap.to(".model-container", {
      y: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative  w-full h-screen overflow-hidden bg-[#383838]"
    >
      {/* Blurred Background Image */}
      <div
        ref={bgRef}
        className=" absolute inset-0 w-full h-full bg-cover bg-center bg-[url('/images/temp.png')] opacity-0"
        style={{
          zIndex: 0,
          filter: "blur(2px)"
        }}
      />
  
      {/* Custom cursor */}
      <CustomCursor />
  
      {/* Loading counter */}
      {!showModel && (
        <h1 className="counter absolute w-full h-screen flex justify-center items-center z-50 font-mono text-white/80 text-9xl">
          {counter}
        </h1>
      )}
  
      {/* Loading bars overlay */}
      <div className="overlay absolute w-full h-screen z-20 flex">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bar w-[10vw] h-[105vh] bg-gray-700"></div>
        ))}
      </div>
  
      {/* Navbar */}
      <div className="absolute w-full z-50 pointer-events-auto">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
  
      {/* Name animation - minimal and professional */}
      <div
        ref={nameRef}
        className="name-container absolute inset-0 flex flex-col items-center top-40 md:top-30 md:left-[5%] z-30 "
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="flex md:space-x-[0.01em]">
            {"AKSHAT".split("").map((char, index) => (
              <div
                key={index}
                className="header-letter text-white/80 font-extrabold font-bebas-neue text-7xl  md:text-[10rem]"
              >
                {char}
              </div>
            ))}
          </div>
          <div className="last-name text-white text-3xl md:text-4xl font-medium font-bebas-neue">
            SHARMA
          </div>
          <div className="role-text text-white/90 text-lg md:text-base font-roboto-condensed tracking-[0.3em] font-normal mt-6">
            CREATIVE DEVELOPER
          </div>
        </div>
      </div>
  
      {/* CTA Button */}
      <Cta className='ctabtn' heroRef={heroRef} />
  
      {/* Minimal info card */}
      <div className="absolute bottom-10 left-10 z-30 md:block infocard">
        <div className="text-white/60 text-xs tracking-wider">
          <div className="mb-2">BASED IN</div>
          <div className="text-white/90 text-sm">INDIA</div>
        </div>
      </div>
  
      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 z-30 md:flex flex-col items-center indecator">
        <div className="text-white/60 text-xs tracking-wider mb-2">SCROLL</div>
        <div className="h-16 w-[1px] bg-white/20">
          <div className="h-4 w-[2px] bg-white/60 animate-[scroll_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  )
}  
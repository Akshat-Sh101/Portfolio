import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

// Maps each section id to the navbar color that should be active while
// that section is the one most visible in the viewport.
const SECTION_THEME = {
  home: "light",       // white navbar on Hero
  about: "dark",        // black navbar on About
  project: "dark",     // white navbar on Project
  experience: "dark",  // white navbar on Experience
  contact: "light",      // black navbar on Contact
}

export default function Navbar({ isMenuOpen, setIsMenuOpen , skipIntro }) {
  const navRef = useRef(null)
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  )
  const [theme, setTheme] = useState("light") 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsMenuOpen])

  
  useEffect(() => {
    const sectionIds = Object.keys(SECTION_THEME)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          const id = visible[0].target.id
          const nextTheme = SECTION_THEME[id] ?? "light"
          setTheme(nextTheme)
        }
      },
      {
        // Thin horizontal band at the very top of the viewport, where the
        // navbar sits, so color changes exactly when a new section reaches
        // the navbar's strip.
        rootMargin: "-1% 0px -97% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { name: "HOME", to: "home" },
    { name: "ABOUT", to: "about" },
    { name: "PROJECTS", to: "project" },
    { name: "EXPERIENCE", to: "experience" },
    { name: "CONTACT", to: "contact" },
  ]

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false)
    setTimeout(() => scrollToSection(sectionId), 150)
  }

  useGSAP(() => {
    gsap.from(".navbar", { opacity: 0, y: -20, duration: 1.5, delay: skipIntro ? 0 : 5, ease: "power2.out" })
    gsap.from(".nav-item", { opacity: 0, y: -10, stagger: 0.08, duration: 0.8, delay: skipIntro ? 0 : 5.5, ease: "power2.out" })
    gsap.from(".logo", { opacity: 0, x: -20, duration: 1, delay: skipIntro ? 0 : 5, ease: "power2.out" })
  }, [])

  const isDark = theme === "dark"

  return (
    <nav ref={navRef} className="navbar fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-5">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <Link
          to="/"
          className={`logo text-3xl sm:text-4xl px-1 sm:px-3 font-tangerine font-extrabold tracking-widest transition-colors duration-500 ${
            isDark ? "text-black" : "text-white"
          }`}
        >
          AS
        </Link>

        {/* Desktop Navigation */}
        <div className={`${isMobile ? "hidden" : "flex"} space-x-8 lg:space-x-10`}>
          {navItems.map((item, index) => (
            <div key={index} className="nav-item">
              <button
                onClick={() => scrollToSection(item.to)}
                className={`relative bg-transparent border-none cursor-pointer ${
                  isDark ? "text-black font-medium" : "text-white font-normal"
                } text-xs tracking-widest transition-colors duration-500 group hover:font-bold`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-[1px] ${
                    isDark ? "bg-black" : "bg-white"
                  } transition-all duration-300 group-hover:w-full`}
                ></span>
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden cursor-pointer relative z-50">
          <button
            className={`transition-colors duration-300 ${
              isMenuOpen ? "text-white" : isDark ? "text-black" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 left-0 top-0 w-full h-[100svh] bg-black z-40 flex flex-col items-center justify-center space-y-8 pb-8"
            initial={{ opacity: 0, y: -120 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -120 }}
            transition={{ duration: 0.4 }}
          >

            {navItems.map((item, index) => (
              <motion.button
                key={index}
                className="text-white/80 hover:text-white text-2xl font-light tracking-widest hover:font-medium bg-transparent border-none cursor-pointer"
                onClick={() => handleNavClick(item.to)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
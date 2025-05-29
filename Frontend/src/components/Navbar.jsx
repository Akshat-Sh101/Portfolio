
// "use client"

// import { useGSAP } from "@gsap/react"
// import gsap from "gsap"
// import { useEffect, useRef, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Link } from "react-router-dom"

// export default function Navbar() {
//   const navRef = useRef(null)
//   const [isMobile, setIsMobile] = useState(false)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }
//     if(window.innerWidth < 768){
//       setIsMobile(true)
//     } 
//     else{
//       setIsMobile(false)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [window.innerWidth])

//   const navItems = [
//     { name: "HOME", to: "/" },
//     { name: "ABOUT", to: "/about" },
//     { name: "PROJECTS", to: "#projects" },
//     { name: "EXPERIENCE", to: "#experience" },
//     { name: "CONTACT", to: "#contact" },
//   ]

//   useGSAP(() => {
//     // Navbar entrance animation
//     gsap.from(".navbar", {
//       opacity: 0,
//       y: -20,
//       duration: 1.5,
//       delay: 6,
//       ease: "power2.out",
//     })

//     // Staggered nav items animation
//     gsap.from(".nav-item", {
//       opacity: 0,
//       y: -10,
//       stagger: 0.08,
//       duration: 0.8,
//       delay: 6.5,
//       ease: "power2.out",
//     })

//     // Logo animation
//     gsap.from(".logo", {
//       opacity: 0,
//       x: -20,
//       duration: 1,
//       delay: 6,
//       ease: "power2.out",
//     })
//   }, [])

//   return (
//     <nav ref={navRef} className={`navbar fixed top-0  left-0 w-full z-50 px-6 py-4 ${
//       isScrolled ? "bg-white/10 shadow-md backdrop-blur-sm" : "bg-transparent"
//     }`}>
//       <div className="max-w-7xl w-full mx-auto ">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <Link to="/" className="logo text-4xl font-tangerine font-extrabold  tracking-widest text-white ">
//             AS
//           </Link>

//           {/* Desktop Navigation */}
//           <div className={` ${isMobile ? 'hidden' : '' } md:flex  space-x-10`}>
//             {navItems.map((item, index) => (
//               <div key={index} className="nav-item">
//                 <Link
//                   to={item.to}
//                   className="relative text-white/70 hover:text-white text-xs tracking-widest font-normal transition-colors duration-300 group"
//                 >
//                   {item.name}
//                   <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
//                 </Link>
//               </div>
//             ))}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               className="text-white/80"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               className="fixed top-0 left-0 w-full h-full bg-black/95 z-50 flex flex-col items-center justify-center space-y-8"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               {navItems.map((item, index) => (
//                 <Link
//                   key={index}
//                   to={item.to}
//                   className="text-white/80 hover:text-white text-2xl font-light tracking-widest"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   )
// }

"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const navRef = useRef(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if(window.innerWidth > 768){
        setIsMenuOpen(false)
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600 && window.scrollY < 1650 || window.scrollY > 4250 && window.scrollY < 5350)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: "HOME", to: "home" },
    { name: "ABOUT", to: "about" },
    { name: "PROJECTS", to: "project" },
    { name: "EXPERIENCE", to: "experience" },
    { name: "CONTACT", to: "contact" },
  ]
  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false); // Close the menu
    scrollToSection(sectionId); // Scroll to section
  };

  useGSAP(() => {
    gsap.from(".navbar", { opacity: 0, y: -20, duration: 1.5, delay: 5, ease: "power2.out" })
    gsap.from(".nav-item", { opacity: 0, y: -10, stagger: 0.08, duration: 0.8, delay: 5.5, ease: "power2.out" })
    gsap.from(".logo", { opacity: 0, x: -20, duration: 1, delay: 5, ease: "power2.out" })
  }, [])

  return (
    <nav ref={navRef} className={`navbar fixed top-0 -left-0 w-full z-50 pl-6 py-5  `}>
      <div className={` max-w-7xl w-full flex justify-between items-center`}>
        <Link to="/" className={` logo text-4xl px-3 font-tangerine font-extrabold tracking-widest ${isScrolled ? " text-black " : "text-white"} `}>
          AS
        </Link>

        {/* Desktop Navigation */}
        <div className={` ${isMobile ? 'hidden' : ' '} md:flex space-x-10`}>
          {navItems.map((item, index) => (
            <div key={index} className="nav-item"> 
            {/* to={item.to} */}
              <Link  onClick={() => scrollToSection(`${item.to}`)} className={` relative  ${isScrolled ? " text-black font-medium" : "text-white font-normal"}  text-xs tracking-widest  transition-colors duration-300 group hover:font-bold `}>
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden mx-5 cursor-pointer">
          <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
          className="fixed left-0 w-full h-screen bg-black z-45 flex flex-col items-center justify-center space-y-8 pb-8"
          initial={{ opacity: 0, y:-120 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -120 }}
          transition={{ duration: 0.4, staggerChildren: 0.1 }}
        >
            {navItems.map((item, index) => (
              <Link
                key={index}
                className="text-white/80 hover:text-white text-2xl font-light tracking-widest hover:font-medium"
                onClick={() => handleNavClick(item.to)}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

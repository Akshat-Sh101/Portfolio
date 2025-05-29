import { useEffect, useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Project from './components/Project';
import Contact from './components/Contact';

function App() {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1300);

  useEffect(() => {
    // Handle scroll locking for 7 seconds
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
      setIsScrollable(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle window resize for mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div
        className={`${
          isMobile ? 'block' : 'hidden'
        } text-center mt-20 bg-stone-700 p-4 h-screen w-screen`}
      >
        <h1 className="font-cormorant text-3xl font-bold text-white">
          Coming Soon...
        </h1>
      </div>
      <div className={`${isMobile ? 'hidden' : ''}`}>
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="project">
          <Project />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
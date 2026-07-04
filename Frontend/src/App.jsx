import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Project from './components/Project';
import Contact from './components/Contact';
import Resume from './pages/Resume';

// sessionStorage key — persists for the tab session but clears when the tab is closed.
// This means the intro plays once per browser session, not on every refresh/navigation.
const INTRO_SEEN_KEY = 'portfolio_intro_seen';

function MainLayout() {
  // True = this is a revisit within the same session → skip the intro entirely
  const [skipIntro] = useState(() => {
    try { return sessionStorage.getItem(INTRO_SEEN_KEY) === '1'; }
    catch { return false; }
  });

  useEffect(() => {
    if (skipIntro) {
      // Already seen — make sure scroll is never locked
      document.body.style.overflow = 'auto';
      return;
    }

    // First visit this session — lock scroll for the intro duration, then unlock
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
      try { sessionStorage.setItem(INTRO_SEEN_KEY, '1'); }
      catch { /* storage unavailable, silently ignore */ }
    }, 7000);

    return () => clearTimeout(timer);
  }, [skipIntro]);

  return (
    <div>
      <div id="home">
        <Hero skipIntro={skipIntro} />
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
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/resume" element={<Resume />} />
    </Routes>
  );
}

export default App;
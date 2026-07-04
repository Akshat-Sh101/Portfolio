import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

// Path to your resume PDF — place the file in /public/resume/
const RESUME_PATH = "/resume/AkshatSharma_resume.pdf";

export default function Resume() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      ".resume-page",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
    // Lock body scroll bleed-through isn't needed here since this is its own page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="resume-page min-h-screen w-full bg-[#1c1c1c] flex flex-col">
      {/* Top bar */}
      <div className="w-full flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-[#1c1c1c]/95 backdrop-blur sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/70 hover:text-white text-sm tracking-wide transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          BACK
        </button>

        <h1 className="text-white text-sm sm:text-base font-medium tracking-[0.2em] uppercase">
          Akshat Sharma — Resume
        </h1>

        <a
          href={RESUME_PATH}
          download="AkshatSharma_Resume.pdf"
          className="flex items-center gap-2 bg-white text-black px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide hover:bg-white/85 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
            />
          </svg>
          <span className="hidden sm:inline">Download</span>
        </a>
      </div>

      {/* PDF viewer */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-6 md:p-10">
        <div className="w-full max-w-4xl h-[80vh] bg-white rounded-lg overflow-hidden shadow-2xl">
          <object
            data={RESUME_PATH}
            type="application/pdf"
            className="w-full h-full"
          >
            {/* Fallback for browsers/devices that can't render embedded PDFs (mainly mobile) */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center p-8">
              <p className="text-gray-700 text-base">
                Your browser can't preview PDFs inline.
              </p>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-300"
              >
                Open Resume in New Tab
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const GATE_RESULTS = {
  cse: {
    label: "CSE",
    fullName: "Computer Science & Engineering",
    air: "2519",
    year: "2026",
    accent: "from-zinc-800 to-black",
    scorecardImg: "/images/gatecse.png",
  },
  da: {
    label: "DA",
    fullName: "Data Science & Artificial Intelligence",
    air: "3024",
    year: "2026",
    accent: "from-neutral-800 to-zinc-900",
    scorecardImg: "/images/gateda.png",
  },
};

export default function GateResultsPopup({ isOpen, onClose }) {
  const [flipped, setFlipped] = useState(false);
  const backdropRef = useRef(null);
  const cardRef = useRef(null);
  const imgWrapRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFlipped(false);

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -40, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)", delay: 0.1 }
      );
      gsap.fromTo(
        imgWrapRef.current,
        { opacity: 0, x: 40, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)", delay: 0.2 }
      );
    }
  }, [isOpen]);

  // Animate the scorecard image swap whenever the card flips
  useEffect(() => {
    if (!isOpen || !imgWrapRef.current) return;
    gsap.fromTo(
      imgWrapRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [flipped, isOpen]);

  const handleClose = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      x: -30,
      scale: 0.92,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(imgWrapRef.current, {
      opacity: 0,
      x: 30,
      scale: 0.92,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.05,
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  const front = GATE_RESULTS.cse;
  const back = GATE_RESULTS.da;
  const active = flipped ? back : front;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm px-4"
      onClick={handleClose}
      style={{ opacity: 0 }}
    >
      <div
  className="relative w-full max-w-6xl flex flex-row items-center justify-center gap-12"
  onClick={(e) => e.stopPropagation()}
>
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors duration-200 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* LEFT — Flip card */}
        <div
          ref={cardRef}
          className="relative w-full max-w-[19rem] flex-shrink-0"
          style={{ opacity: 0 }}
        >
          <div
            className="relative w-full aspect-[3/4] cursor-pointer"
            style={{ perspective: "1200px" }}
            onClick={() => setFlipped((f) => !f)}
          >
            <div
              className="relative w-full h-full transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <ScoreFace data={front} side="front" />
              <ScoreFace data={back} side="back" />
            </div>
          </div>

          <p className="text-center text-white/50 text-xs tracking-[0.2em] mt-5 uppercase">
            Tap card to flip &middot; {flipped ? "Showing DA" : "Showing CSE"}
          </p>
        </div>

        {/* RIGHT — Real scorecard image, synced with the active face */}
        <div
          ref={imgWrapRef}
          className="scorecard-container relative w-full max-w-[19rem] sm:max-w-sm flex-shrink-0"
          style={{ opacity: 0 }}
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white ring-1 ring-white/10">
            <img
              src={active.scorecardImg}
              alt={`GATE ${active.label} scorecard`}
              className="w-full h-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/600x800/f4f4f5/52525b?text=GATE+${active.label}+Scorecard`;
              }}
            />
          </div>
          <p className="text-center text-white/40 text-[10px] tracking-[0.2em] mt-3 uppercase">
            Official GATE {active.year} {active.label} Scorecard
          </p>
        </div>
      </div>
    </div>
  );
}

function ScoreFace({ data, side }) {
  return (
    <div
      className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${data.accent} flex flex-col items-center justify-center text-white px-8 py-10`}
      style={{
        backfaceVisibility: "hidden",
        transform: side === "back" ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] text-white/40 uppercase">
        GATE {data.year}
      </div>
      <div className="absolute top-5 right-5 text-[10px] tracking-[0.3em] text-white/40 uppercase">
        Qualified ✓
      </div>

      <span className="text-xs tracking-[0.35em] text-white/50 uppercase mb-3 text-center px-2">
        {data.fullName}
      </span>

      <h3 className="font-cormorant font-bold text-7xl sm:text-8xl tracking-tight">
        {data.label}
      </h3>

      <div className="mt-8 flex flex-col items-center">
        <span className="text-[11px] tracking-[0.3em] text-white/40 uppercase mb-1">
          All India Rank
        </span>
        <span className="font-cormorant font-bold text-5xl sm:text-6xl text-white">
          {data.air}
        </span>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="h-[2px] w-12 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}
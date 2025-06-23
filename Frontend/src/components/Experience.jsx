
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ima1 from '/images/ML.jpg';
import ima2 from '/images/ir.jpg';
import ima3 from '/images/da.jpg';
import ima4 from '/images/DL.jpg';

function Experience() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedindex, setSelectedindex] = useState(null);

  // Split heading text into spans
  const headingText = 'Certifications';
  const splitText = headingText.split('');
  const len = Math.floor(splitText.length / 2);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation for the heading (whole text)
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
          toggleActions: 'restart none none none',
        },
      }
    );

    // Animation for the underline
    gsap.fromTo(
      headingRef.current,
      { '--underline-width': '0%' },
      {
        '--underline-width': '100%',
        duration: 0.8,
        ease: 'power2.out',
        delay: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
          toggleActions: 'restart none none none',
        },
      }
    );

    // Animation for individual characters (.a)
    gsap.from('.a', {
      y: 80,
      opacity: 0,
      delay: 0.5,
      stagger: 0.15,
      duration: 1.8,
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 90%',
        end: '80% bottom',
        scrub: 2,
        toggleActions: 'restart none none none',
      },
    });

    // Animation for individual characters (.b)
    gsap.from('.b', {
      y: 80,
      opacity: 0,
      delay: 0.5,
      stagger: -0.15,
      duration: 1.8,
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 90%',
        end: '80% bottom',
        scrub: 2,
        toggleActions: 'restart none none none',
      },
    });

    // Animation for the text section
    gsap.from(textRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top -10%',
        scrub: 2,
      },
    });

    // Animation for cards (line1)
    gsap.from(cardRefs.current[0], {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top -10%',
        scrub: 2,
      },
    });

    gsap.from(cardRefs.current[1], {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top -10%',
        scrub: 2,
      },
    });

    // Animation for cards (line2)
    gsap.from(cardRefs.current[2], {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top -10%',
        scrub: 2,
      },
    });

    gsap.from(cardRefs.current[3], {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top -10%',
        scrub: 2,
      },
    });
  }, []);

  const certificates = [
    {
      title: 'Machine Learning Certification',
      description: 'Advanced AI and prediction and Regression modeling ',
      image: ima1,
    },
    {
      title: 'IR 4.0 Mastery',
      description: 'Hands on practice of development with modern frameworks,linux etc.',
      image: ima2,
    },
    {
      title: 'Data Analytics and Visualization',
      description: 'Expertise in data manipulation and visualization techniques',
      image: ima3,
    },
    {
      title: 'Deep Learning Specialization',
      description: 'In-depth understanding of neural networks, CNN, RNN and deep learning algorithms',
      image: ima4,
    },
  ];

  const handleCardClick = (cert, index) => {
    setSelectedCert(cert);
    setSelectedindex(index);
  };

  const closeFullScreen = () => {
    setSelectedCert(null);
    setSelectedindex(null);
  };

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-x-hidden">
      <div
        ref={headingRef}
        className="text-center text-[35vh] font-extrabold text-gray-900 font-tangerine py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:bg-gray-900 after:transition-all after:duration-300"
      >
        {splitText.map((char, i) => (
          <span key={i} className={i <= len ? 'a' : 'b'}>
            {char}
          </span>
        ))}
      </div>

      <div
        ref={sectionRef}
        className="w-[96%] mx-auto flex flex-wrap justify-between gap-12 py-3 px-8"
      >
        <div ref={textRef} className="w-full md:w-[40%]">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Certifications</h1>
          <p className="text-lg text-gray-700">
            Explore my professional certifications showcasing expertise in various domains. Click on any card to view the certificate in detail.
          </p>
        </div>

        <div className="w-full md:w-[55%] flex flex-wrap gap-8">
          {certificates.map((cert, index) => (
            <div
              id='cert-card'
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`flex border-4 border-gray-900 rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${
                index === 1 || index === 2 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <div className="w-1/2 flex flex-col gap-6">
                <h2
                  className={`text-2xl font-medium p-2 rounded-lg ${
                    index === 1 || index === 2 ? 'bg-white text-gray-900' : 'bg-yellow-300 text-gray-900'
                  }`}
                >
                  {cert.title}
                </h2>
                <p className="text-base">{cert.description}</p>
                <button
                  onClick={() => handleCardClick(cert, index)}
                  className="flex items-center text-lg font-medium"
                >
                  <i className="ri-arrow-right-circle-fill text-5xl mr-2 -rotate-45"></i>
                  Learn More
                </button>
              </div>
              <div className="w-1/2">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-56 object-contain pl-6 rounded-md"
                  onError={() => console.error(`Failed to load image: ${cert.title}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className={`relative w-[90%] max-w-4xl bg-white rounded-lg p-8 ${selectedindex == 1 ? 'scale-55' : 'scale-80'}`}>
            <button
              onClick={closeFullScreen}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-900"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedCert.title}</h2>
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full h-auto rounded-md border border-gray-200 shadow-md p-10"
            />
            <p className="text-lg text-gray-700 mt-4">{selectedCert.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Experience;
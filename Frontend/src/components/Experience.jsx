// "use client"

// import { useEffect, useRef } from "react"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"

// export default function Experience() {
//   const sectionRef = useRef(null)
//   const titleRef = useRef(null)
//   const timelineRef = useRef(null)
//   const lineRef = useRef(null)
//   const earthRef = useRef(null)
//   const dottedLinesRef = useRef([])

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger)

//     // Title animation
//     gsap.fromTo(
//       titleRef.current,
//       { y: 30, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: titleRef.current,
//           start: "top 80%",
//         },
//       },
//     )

//     // Tree completion effect with Earth logo at end
//     gsap.fromTo(
//       lineRef.current,
//       { height: "0%" },
//       {
//         height: "100%",
//         duration: 2,
//         ease: "power2.inOut",
//         scrollTrigger: {
//           trigger: timelineRef.current,
//           start: "top 70%",
//           end: "bottom 30%",
//           scrub: 1.5,
//         },
//       },
//     )

//     // Earth logo animation - now at the end of the timeline
//     gsap.fromTo(
//       earthRef.current,
//       { opacity: 0, scale: 0.5, rotate: 0 },
//       {
//         opacity: 1,
//         scale: 1,
//         rotate: 360,
//         duration: 2,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: timelineRef.current,
//           start: "bottom 70%",
//           end: "bottom 30%",
//           scrub: 1,
//         },
//       },
//     )

//     // Timeline items and dotted lines animation
//     const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item")
//     if (timelineItems) {
//       timelineItems.forEach((item, index) => {
//         const isEven = index % 2 === 0
//         const dottedLine = dottedLinesRef.current[index]
//         const box = item.querySelector(isEven ? ".left-box" : ".right-box")

//         // Box animation (slow, from left/right)
//         gsap.fromTo(
//           box,
//           {
//             x: isEven ? -120 : 120,
//             opacity: 0,
//             scale: 0.9,
//           },
//           {
//             x: isEven ? -75 : 75,
//             opacity: 1,
//             scale: 1,
//             duration: 1.2,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: item,
//               start: "top 80%",
//               toggleActions: "play none none reverse",
//             },
//           },
//         )

//         // Dotted line animation
//         gsap.fromTo(
//           dottedLine,
//           { width: 0 },
//           {
//             width: "100%",
//             duration: 0.8,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: item,
//               start: "top 80%",
//               end: "top 60%",
//               scrub: 0.5,
//             },
//           },
//         )

//         // Interactive hover effect
//         box.addEventListener("mouseenter", () => {
//           gsap.to(box, {
//             scale: 1.03,
//             boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
//             duration: 0.3,
//             ease: "power2.out",
//           })
//         })
//         box.addEventListener("mouseleave", () => {
//           gsap.to(box, {
//             scale: 1,
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
//             duration: 0.3,
//             ease: "power2.out",
//           })
//         })
//       })
//     }

//     // Cleanup event listeners and ScrollTriggers on unmount
//     return () => {
//       const boxes = document.querySelectorAll(".left-box, .right-box")
//       boxes.forEach((box) => {
//         box.removeEventListener("mouseenter", () => {})
//         box.removeEventListener("mouseleave", () => {})
//       })
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
//     }
//   }, [])

//   const experiences = [
//     {
//       role: "B.Tech in Computer Science and Engineering",
//       company: "Dronacharya College of Engineering",
//       period: "2023 - Present",
//       description:
//         "Currently pursuing a B.Tech in Computer Science with a CGPA of 8.7/10. Relevant coursework includes Data Structures & Algorithms, Full-Stack Web Development, and Machine Learning.",
//     },
//     {
//       role: "ML Projects Portfolio",
//       company: "GitHub Repository",
//       period: "June 2024 - Present",
//       description:
//         "Developed 18 ML predictive models, including House Price Prediction (85% accuracy) and Spam Mail Detection (90% accuracy). Tech stack: Python, Scikit-learn, TensorFlow.",
//     },
//     {
//       role: "Hackathon Achievement",
//       company: "CodeStreet Hackathon 2024",
//       period: "2024",
//       description:
//         "Secured Top 3 position by solving algorithmic challenges in real-time, demonstrating strong problem-solving skills.",
//     },
//     {
//       role: "Core Member",
//       company: "Dronacharya College of Engineering",
//       period: "2023 - Present",
//       description:
//         "Organized 5+ workshops on MERN stack and ML basics, enhancing technical skills of peers and fostering a collaborative learning environment.",
//     },
//   ]

//   return (
//     <section ref={sectionRef} className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 bg-white text-gray-800">
//       <div ref={titleRef} className="text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">My Journey</h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           A timeline of my academic and project-based experiences
//         </p>
//       </div>

//       <div ref={timelineRef} className="relative">
//         {/* Timeline line */}
//         <div ref={lineRef} className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gray-400" />

//         {/* Earth logo at end of timeline */}
//         <div
//           ref={earthRef}
//           className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 text-4xl bg-white rounded-full p-2 z-10 shadow-md"
//         >
//           🌍
//         </div>

//         {experiences.map((exp, index) => {
//           const isEven = index % 2 === 0
//           return (
//             <div key={index} className="timeline-item relative mb-16">
//               {/* Timeline dot */}
//               <div className="absolute left-1/2 top-0 w-4 h-4 rounded-full bg-gray-600 transform -translate-x-1/2 border-2 border-white z-10" />

//               <div className="flex justify-center items-start">
//                 {/* Left box (visible on even indices) */}
//                 <div className={`w-[35%] pr-4 text-right z-10 ${!isEven && "invisible"}`}>
//                   {isEven && (
//                     <div className="left-box bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 max-w-xs ml-auto cursor-pointer">
//                       <span className="inline-block text-sm font-medium text-gray-500 mb-1">{exp.period}</span>
//                       <h3 className="text-lg font-bold mb-1 text-black">{exp.role}</h3>
//                       <h4 className="text-md font-medium text-gray-700 mb-2">{exp.company}</h4>
//                       <p className="text-sm text-gray-600">{exp.description}</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Dotted line container */}
//                 <div className="w-[15%] relative ">
//                   {/* Dotted line connecting to the main line */}
//                   <div
//                     ref={(el) => (dottedLinesRef.current[index] = el)}
//                     className={`absolute h-px bg-gray-400 top-2 ${
//                       isEven ? "right-24 w-[calc(50%-2px)]" : "left-24 w-[calc(50%-2px)]"
//                     }`}
//                     style={{
//                       borderTop: "2px dashed gray",
//                     }}
//                   />
//                 </div>

//                 {/* Right box (visible on odd indices) */}
//                 <div className={`w-[35%] pl-4 text-left ${isEven && "invisible"}`}>
//                   {!isEven && (
//                     <div className="right-box bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 max-w-xs cursor-pointer">
//                       <span className="inline-block text-sm font-medium text-gray-500 mb-1">{exp.period}</span>
//                       <h3 className="text-lg font-bold mb-1 text-black">{exp.role}</h3>
//                       <h4 className="text-md font-medium text-gray-700 mb-2">{exp.company}</h4>
//                       <p className="text-sm text-gray-600">{exp.description}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </section>
//   )
// }
// // -----
// // import React from 'react'

// // function Experience() {
// //   return (
// //     <div  className='flex flex-col items-center h-screen bg-gray-500 overflow-hidden py-10'>
// //       <div className='text-[28vw] flex items-center font-bold translate-x-[150vh] text-gray-300 font-tangerine shadow-black shadow-8xl '>
// //         Certifications <span className='text-[8vh] ml-10 mr-8'>⚪</span> Researchpaper
// //       </div>
// //     </div>
// //   )
// // }

// // export default Experience

// // import React from 'react'

// // function Experience() {
// //   return (
// //     <div>
// //     <section className='sticky top-0 h-screen bg-gray-500 p-10'>
// //             <div className='slider'>
// //                 <div className='slide'>
// //                     <div className='img'><img src="" alt="" /></div>
// //                     <div className='text'> <h1>Title line 1 <br/> Title line 2</h1></div>
// //                 </div>
// //                 <div className='slide'>
// //                     <div className='img'><img src="" alt="" /></div>
// //                     <div className='text'> <h1>Title line 1 <br/> Title line 2</h1></div>
// //                 </div>
// //                 <div className='slide'>
// //                     <div className='img'><img src="" alt="" /></div>
// //                     <div className='text'> <h1>Title line 1 <br/> Title line 2</h1></div>
// //                 </div>
// //             </div>
// //     </section>

// //     <section className='outro'>
// //     </section>
// //     </div>
// //   )
// // }

// // export default Experience

// import { useGSAP } from '@gsap/react'
// import { gsap } from 'gsap'
// import React from 'react'
// // import { rightImg, watchImg } from '../utils'
// // import VideoCarousel from './VideoCarousel'

// const Experience = () => {
//     useGSAP(()=>{
//         gsap.to('#title',{ opacity:1,y:0})
//         gsap.to('.link',{ opacity:1,y:0,duration:1,stagger:0.25})
//     },[])
//     return (
//         <section id='highlights' className='w-screen overflow-hidden h-full common-padding bg-zinc'>
//             <div className='screen-max-width'>
//                 <div className='mb-12 md:flex w-full items-end justify-between'>
//                     <h1 id='title' className='section-heading'>Get the highlights.</h1>
//                     <div className='flex flex-wrap items-end gap-5'>
//                         {/* <p className='link'>Watch the film
//                         <img src={watchImg} alt="watch" className='ml-2' />
//                         </p>
//                         <p className='link'>Watch the event
//                         <img src={rightImg} alt="right" className='ml-2' />
//                         </p> */}
//                     </div>
//                 </div>

//                 {/* <VideoCarousel/> */}
//             </div>
//         </section>
//     )
// }

// export default Experience
// import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ima1 from '/images/c.jpg';
import ima2 from '/images/ir.jpg';
import ima3 from '/images/da.jpg';

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
      description: 'Advanced AI and predictive modeling from Stanford Online',
      image: ima1,
    },
    {
      title: 'Web Development Mastery',
      description: 'Full-stack development with modern frameworks',
      image: ima2,
    },
    {
      title: 'UI/UX Design Excellence',
      description: 'Creating intuitive and visually stunning interfaces',
      image: ima3,
    },
    {
      title: 'Data Science Specialization',
      description: 'Mastering data analysis and visualization techniques',
      image: ima1,
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
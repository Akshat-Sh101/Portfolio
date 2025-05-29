
// import React, { useRef } from 'react';
// import { gsap } from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import img1 from '/images/image.png'

// gsap.registerPlugin(ScrollTrigger);

// function Project() {
//   const projectRef = useRef(null);
//   const headingRef = useRef(null);
//   const section2Ref = useRef(null);
//   const section3Ref = useRef(null);
//   const section4Ref = useRef(null);

//   useGSAP(() => {
//     // Initial animations for Section 1 (entrance)
//     gsap.fromTo(
//       headingRef.current.querySelectorAll('span'),
//       { opacity: 0, y: 50 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1.5,
//         ease: 'power2.out',
//         stagger: 0.2,
//         scrollTrigger: {
//           trigger: headingRef.current,
//           start: 'top 80%',
//           toggleActions: 'play none none reverse',
//         },
//       }
//     );

//     gsap.fromTo(
//       headingRef.current.querySelectorAll('img'),
//       { opacity: 0, scale: 0.8 },
//       {
//         opacity: 1,
//         scale: 1,
//         duration: 0.8,
//         ease: 'power2.out',
//         stagger: 0.2,
//         scrollTrigger: {
//           trigger: headingRef.current,
//           start: 'top 80%',
//           toggleActions: 'play none none reverse',
//         },
//       }
//     );

//     // Section 2 Timeline
//     const section2Timeline = gsap.timeline({
//       defaults: { duration: 2 },
//       scrollTrigger: {
//         trigger: section2Ref.current,
//         start: 'top 100%',
//         end: 'top 5%',
//         scrub: 1,
//         toggleActions: 'play none none reverse',
//       },
//     });

//     section2Timeline.fromTo(
//       headingRef.current,
//       { borderRadius: '0px', scale: 1, rotate: 0, opacity: 1 },
//       {
//         scale: 0.8,
//         rotate: -5,
//         borderRadius: '30px',
//         opacity: 0.8,
//         duration: 2,
//         ease: 'power2.inOut',
//       },
//       0
//     );

//     section2Timeline.fromTo(
//       section2Ref.current,
//       { scale: 0.9, rotate: -5, borderRadius: '30px' },
//       {
//         scale: 1,
//         rotate: 0,
//         borderRadius: '0px',
//         duration: 1.5,
//         ease: 'power2.inOut',
//       },
//       0
//     );

//     section2Timeline.fromTo(
//       '#exploreVideo',
//       { opacity: 0, scale: 1.2, y: 50 },
//       { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' },
//       0.2
//     );

//     section2Timeline.fromTo(
//       '#features_title',
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
//       0.4
//     );

//     section2Timeline.fromTo(
//       '.g_grow',
//       { scale: 1.3, opacity: 0, y: 50 },
//       { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power1.out', stagger: 0.2 },
//       0.6
//     );

//     section2Timeline.fromTo(
//       '.g_text',
//       { opacity: 0, y: 40 },
//       { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.15 },
//       0.8
//     );

//     // Section 3 Timeline
//     const section3Timeline = gsap.timeline({
//       defaults: { duration: 2 },
//       scrollTrigger: {
//         trigger: section3Ref.current,
//         start: 'top 100%',
//         end: 'top 5%',
//         scrub: 1,
//         toggleActions: 'play none none reverse',
//       },
//     });

//     section3Timeline.fromTo(
//       section2Ref.current,
//       { borderRadius: '0px', scale: 1, rotate: 0, opacity: 1 },
//       {
//         scale: 0.8,
//         rotate: -5,
//         borderRadius: '30px',
//         opacity: 0.8,
//         duration: 2,
//         ease: 'power2.inOut',
//       },
//       0
//     );

//     section3Timeline.fromTo(
//       section3Ref.current,
//       { scale: 0.9, rotate: -5, borderRadius: '30px' },
//       {
//         scale: 1,
//         rotate: 0,
//         borderRadius: '0px',
//         duration: 1.5,
//         ease: 'power2.inOut',
//       },
//       0
//     );

//     section3Timeline.fromTo(
//       '#taskImage',
//       { opacity: 0, scale: 1.2, y: 50 },
//       { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' },
//       0.2
//     );

//     section3Timeline.fromTo(
//       '#taskTitle',
//       { opacity: 0, x: -50 },
//       { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
//       0.4
//     );

//     section3Timeline.fromTo(
//       '.task_text',
//       { opacity: 0, x: -50 },
//       { opacity: 1, x: 0, duration: 1, ease: 'power2.out', stagger: 0.15 },
//       0.6
//     );

//     section3Timeline.fromTo(
//       '#taskSmallImage',
//       { opacity: 0, rotate: 15 },
//       { opacity: 1, rotate: 0, duration: 1, ease: 'power1.out' },
//       0.8
//     );

//     // Section 4 Timeline
//     const section4Timeline = gsap.timeline({
//       defaults: { duration: 2 },
//       scrollTrigger: {
//         trigger: section4Ref.current,
//         start: 'top 50%',
//         end: 'top 5%',
//         scrub: 1,
//         toggleActions: 'play none none reverse',
//       },
//   });

//     section4Timeline.fromTo(
//       section3Ref.current,
//       { borderRadius: '0px', scale: 1, rotate: 0, opacity: 1 },
//       {
//         scale: 0.8,
//         rotate: -5,
//         borderRadius: '30px',
//         opacity: 0.8,
//         duration: 2,
//         ease: 'power2.inOut',
//       },
//       0
//     );

//     section4Timeline.fromTo(
//       section4Ref.current,
//       { scale: 0.9, rotate: -5, borderRadius: '30px' },
//       {
//         scale: 1,
//         rotate: 0,
//         borderRadius: '0px',
//         duration: 1.5,
//         ease: 'power2.inOut',
//       },
//       0
//     );

//     section4Timeline.fromTo(
//       '.portfolio_image',
//       { opacity: 0, y: 100 },
//       { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.4)', stagger: 0.2 },
//       0.2
//     );

//     section4Timeline.fromTo(
//       '#portfolioTitle',
//       { opacity: 0, scale: 0.8, rotate: 10 },
//       { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'power2.out' },
//       0.4
//     );

//     section4Timeline.fromTo(
//       '.portfolio_text',
//       { opacity: 0, scale: 0.8 },
//       { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', stagger: 0.15 },
//       0.6
//     );

//     // Hover animations for portfolio cards
//     const cards = document.querySelectorAll('.portfolio_card');
//     cards.forEach((card) => {
//       card.addEventListener('mouseenter', () => {
//         gsap.to(card, {
//           scale: 1.05,
//           boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
//           duration: 0.3,
//           ease: 'power2.out',
//         });
//         gsap.to(card.querySelector('.portfolio_overlay'), {
//           opacity: 1,
//           duration: 0.3,
//           ease: 'power2.out',
//         });
//       });
//       card.addEventListener('mouseleave', () => {
//         gsap.to(card, {
//           scale: 1,
//           boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
//           duration: 0.3,
//           ease: 'power2.out',
//         });
//         gsap.to(card.querySelector('.portfolio_overlay'), {
//           opacity: 0,
//           duration: 0.3,
//           ease: 'power2.out',
//         });
//       });
//     });
//   }, { scope: projectRef });

//   return (
//     <div
//       ref={projectRef}
//       className="h-[400vh] bg-zinc-800"
//       style={{ perspective: '1000px' }}
//     >
//       {/* Section 1: Unchanged */}
//       <section
//         ref={headingRef}
//         className="section1 sticky top-0 flex flex-col justify-center items-center p-4 sm:p-8 md:p-14 h-screen bg-gray-200 z-10"
//       >
//         <div className="flex sm:flex-row flex-col items-center justify-center gap-4 sm:gap-8 md:gap-12 w-full max-w-4xl">
//           <div className="flex items-center justify-center gap-4 sm:gap-14">
//             <a className="font-tangerine text-6xl sm:text-14xl md:text-[10rem] lg:text-[13rem] font-extrabold">Selected</a>
//             <img
//               src="https://th.bing.com/th/id/OIP.Il917OtNZ1fSQcSz_I5fPAHaDh?w=323&h=166&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3"
//               alt="Selected Icon"
//               className="h-24 sm:h-32 md:h-40 lg:h-[12rem] rounded-2xl w-auto object-contain lg:ml-6"
//             />
//           </div>
//           <div className="flex items-center justify-center gap-4 sm:gap-6">
//             <img
//               src="https://th.bing.com/th/id/OIP.kBxMMbGxG9meJ6mjVSdGTgHaEn?w=311&h=194&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3"
//               alt="Projects Icon"
//               className="h-24 sm:h-32 md:h-40 lg:h-[13rem] rounded-2xl w-auto object-contain"
//             />
//             <a className="font-tangerine text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-extrabold">Projects</a>
//           </div>
//         </div>
//       </section>

//       {/* Section 2: Nuvio - Added GitHub Link */}
//       <section
//         ref={section2Ref}
//         className="section2 h-screen bg-zinc-300 sticky top-0 overflow-hidden z-20 py-12 md:py-16"
//       >
//         <div className="mx-auto max-w-[1200px] px-6 md:px-12 flex md:flex-col flex-row gap-8 md:gap-12 h-full items-center">
//           <div className="flex flex-col w-full md:w-[40%]">
//             <div className="mt-8 md:mt-12 mb-6">
//               <h2 id="features_title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
//                 Nuvio
//               </h2>
//               <h2 id="features_title" className="text-3xl md:text-4xl font-semibold text-gray-700 mt-2">
//                 The E-commerce Store
//               </h2>
//               <div className="mt-6 max-w-md">
//                 <p className="feature-text g_text text-gray-600 text-base md:text-lg font-medium leading-relaxed">
//                   Nuvio is{' '}
//                   <span className="text-gray-900 font-semibold">
//                     a modern e-commerce platform built with cutting-edge technology
//                   </span>
//                   , offering seamless shopping experiences with advanced product filtering and secure checkout.
//                 </p>
//                 <p className="feature-text g_text text-gray-600 mt-4 text-base md:text-lg font-medium leading-relaxed">
//                   Designed for scalability,{' '}
//                   <span className="text-gray-900 font-semibold">
//                     Nuvio integrates real-time inventory management
//                   </span>
//                   and personalized recommendations to enhance user satisfaction.
//                 </p>
//                 <a
//                   href="#"
//                   className="inline-block mt-4 bg-gradient-to-r from-gray-500 to-zinc-600 text-white px-6 py-3 rounded-full font-medium hover:from-zinc-600 hover:to-gray-700 transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   View on GitHub
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col w-full md:w-[60%] gap-6 md:gap-8 justify-center">
//             <div className="relative h-[35vh] md:h-[50vh] w-full rounded-2xl overflow-hidden">
//               <img
//                 src={img1}
//                 id="exploreVideo"
//                 className="w-full h-full object-cover object-center rounded-2xl"
//                 alt="Nuvio Main"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4 md:gap-6">
//               <div className="overflow-hidden rounded-2xl h-[20vh] md:h-[25vh]">
//                 <img
//                   src={img1}
//                   alt="Nuvio Feature 1"
//                   className="feature-video g_grow w-full h-full object-cover object-center"
//                 />
//               </div>
//               <div className="overflow-hidden rounded-2xl h-[20vh] md:h-[25vh]">
//                 <img
//                   src={img1}
//                   alt="Nuvio Feature 2"
//                   className="feature-video g_grow w-full h-full object-cover object-center"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 3: RideSync - Uber Clone */}
//       <section
//         ref={section3Ref}
//         className="section3 h-screen bg-gray-100 sticky top-0 overflow-hidden z-20 py-12 md:py-16"
//       >
//         <div className="mx-auto max-w-[1200px] px-6 md:px-12 flex md:flex-col flex-row gap-8 md:gap-12 h-full items-center">
//           <div className="flex flex-col w-full md:w-[60%]">
//             <div className="relative h-[50vh] md:h-[70vh] w-full rounded-2xl overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600"
//                 id="taskImage"
//                 className="w-full h-full object-cover object-center rounded-2xl"
//                 alt="RideSync Main"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col w-full md:w-[40%] gap-6">
//             <div className="mt-8 md:mt-0">
//               <h2 id="taskTitle" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
//                 RideSync
//               </h2>
//               <h2 id="taskTitle" className="text-3xl md:text-4xl font-semibold text-gray-700 mt-2">
//                 Ride-Sharing App
//               </h2>
//               <div className="mt-6 max-w-md">
//                 <p className="task_text text-gray-600 text-base md:text-lg font-medium leading-relaxed">
//                   RideSync is{' '}
//                   <span className="text-gray-900 font-semibold">
//                     a ride-sharing app built with React Native and Google Maps API
//                   </span>
//                   , enabling real-time driver tracking and booking.
//                 </p>
//                 <p className="task_text text-gray-600 mt-4 text-base md:text-lg font-medium leading-relaxed">
//                   With{' '}
//                   <span className="text-gray-900 font-semibold">
//                     seamless navigation and user-friendly interfaces
//                   </span>
//                   , it enhances the ride-sharing experience for users and drivers.
//                 </p>
//                 <a
//                   href="#"
//                   className="inline-block mt-4 bg-gradient-to-r from-gray-500 to-zinc-600 text-white px-6 py-3 rounded-full font-medium hover:from-zinc-600 hover:to-gray-700 transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   View on GitHub
//                 </a>
//               </div>
//               <div className="mt-6 h-[20vh] md:h-[25vh] rounded-2xl overflow-hidden">
//                 <img
//                   src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=300"
//                   id="taskSmallImage"
//                   className="w-full h-full object-cover object-center rounded-2xl"
//                   alt="RideSync Feature"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 4: PredictPro - Predictive ML Models */}
//       <section
//         ref={section4Ref}
//         className="section4 h-screen bg-gradient-to-b from-zinc-200 to-gray-300 relative overflow-hidden z-20 md:py-16 py-24"
//       >
//         <div className="mx-auto max-w-[1400px] md:px-6 px-12 flex flex-col md:gap-8 gap-12 h-full justify-center mt-7">
//           <div className="text-center">
//             <h2 id="portfolioTitle" className="md:text-4xl lg:text-5xl text-6xl font-bold text-gray-900">
//               PredictPro
//             </h2>
//             <h2 id="portfolioTitle" className="md:text-3xl text-4xl font-semibold text-gray-700 mt-2">
//               Predictive ML Models
//             </h2>
//           </div>
//           <div className="grid grid-cols-3 sm:grid-cols-2 md:gap-6 gap-8 ">
//             <div className="portfolio_card relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <img
//                 src="https://images.unsplash.com/photo-1551288049-b1f3a7c6fefd?w=300"
//                 className="portfolio_image w-full md:h-[30vh] h-[40vh] object-cover object-center rounded-2xl"
//                 alt="PredictPro Image 1"
//               />
//               <div className="portfolio_overlay absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-10 transition-opacity duration-300">
//                 <p className="text-white text-lg font-semibold">Explore Project</p>
//               </div>
//             </div>
//             <div className="portfolio_card relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <img
//                 src="https://images.unsplash.com/photo-1551288049-b1f3a7c6fefd?w=300"
//                 className="portfolio_image w-full md:h-[30vh] h-[40vh] object-cover object-center rounded-2xl"
//                 alt="PredictPro Image 2"
//               />
//               <div className="portfolio_overlay absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-10 transition-opacity duration-300">
//                 <p className="text-white text-lg font-semibold">Explore Project</p>
//               </div>
//             </div>
//             <div className="portfolio_card relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <img
//                 src="https://images.unsplash.com/photo-1551288049-b1f3a7c6fefd?w=300"
//                 className="portfolio_image w-full md:h-[30vh] h-[40vh] object-cover object-center rounded-2xl"
//                 alt="PredictPro Image 3"
//               />
//               <div className="portfolio_overlay absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-10 transition-opacity duration-300">
//                 <p className="text-white text-lg font-semibold">Explore Project</p>
//               </div>
//             </div>
//           </div>
//           <div className="text-center max-w-2xl mx-auto">
//             <p className="portfolio_text text-gray-600 md:text-base text-lg font-medium leading-relaxed mt-1">
//               PredictPro is{' '}
//               <span className="text-gray-900 font-semibold">
//                 a suite of machine learning models built with Python and TensorFlow
//               </span>
//               , delivering predictive analytics for data-driven decisions.
//             </p>
//             <p className="portfolio_text text-gray-600 md:text-base text-lg font-medium leading-relaxed mt-1">
//               It leverages{' '}
//               <span className="text-gray-900 font-semibold">
//                 scikit-learn and advanced algorithms
//               </span>
//               for accurate forecasting and insights.
//             </p>
//             <a
//               href="#"
//               className="inline-block mt-4 bg-gradient-to-r from-gray-500 to-zinc-600 text-white px-6 py-3 rounded-full font-medium hover:from-zinc-600 hover:to-gray-700 transition-all duration-300 transform hover:-translate-y-1"
//             >
//               View on GitHub
//             </a>
//             {/* <a
//               href="#"
//               className="inline-block mt-2 bg-gradient-to-r from-gray-500 to-zinc-600 text-white px-6 py-3 rounded-full font-medium hover:from-zinc-600 hover:to-gray-700 transition-all duration-300 transform hover:-translate-y-1"
//             >
//               View All Projects
//             </a> */}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Project;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Placeholder image (replace with your actual image paths)
import img1 from '/projectIMG/nuvio3.png';
import img2 from '/projectIMG/nuvio1.png';
import img3 from '/projectIMG/nuvio2.png';


function Project() {
  const projectRef = useRef(null);
  const headingRef = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const portfolioTitleRef = useRef(null);
  const portfolioSubtitleRef = useRef(null);
  const portfolioTextRefs = useRef([]);
  const portfolioCardRefs = useRef([]);

  useGSAP(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Section 1: Heading animation
    gsap.fromTo(
      headingRef.current.querySelectorAll('span'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      headingRef.current.querySelectorAll('img'),
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      headingRef.current,
      { opacity: 1, scale: 1 },
      {
        opacity: 0,
        scale: 0.7,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Section 2: Nuvio Timeline
    const section2Timeline = gsap.timeline({
      defaults: { duration: 1.5 },
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top 90%',
        end: 'top 10%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
    });

    section2Timeline.fromTo(
      section2Ref.current,
      { scale: 0.95, rotate: -3, opacity: 0.8 },
      { scale: 1, rotate: 0, opacity: 1, ease: 'power3.inOut' },
      0
    );

    section2Timeline.fromTo(
      '#exploreVideo',
      { opacity: 0, scale: 1.1, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
      0.2
    );

    section2Timeline.fromTo(
      '#features_title',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0.4
    );

    section2Timeline.fromTo(
      '.g_grow',
      { scale: 1.2, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2 },
      0.6
    );

    section2Timeline.fromTo(
      '.g_text',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15 },
      0.8
    );

    section2Timeline.fromTo(
      section2Ref.current,
      { scale: 1, rotate: 0, opacity: 1 },
      {
        scale: 0.6,
        rotate: -3,
        opacity: 0,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top -5%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Section 3: RideSync Timeline
    const section3Timeline = gsap.timeline({
      defaults: { duration: 1.5 },
      scrollTrigger: {
        trigger: section3Ref.current,
        start: 'top 90%',
        end: 'top 10%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
    });

    section3Timeline.fromTo(
      section3Ref.current,
      { scale: 0.95, rotate: -3, opacity: 0.8 },
      { scale: 1, rotate: 0, opacity: 1, ease: 'power3.inOut' },
      0
    );

    section3Timeline.fromTo(
      '#taskImage',
      { opacity: 0, scale: 1.1, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
      0.2
    );

    section3Timeline.fromTo(
      '#taskTitle',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      0.4
    );

    section3Timeline.fromTo(
      '.task_text',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15 },
      0.6
    );

    section3Timeline.fromTo(
      '#taskSmallImage',
      { opacity: 0, rotate: 10 },
      { opacity: 1, rotate: 0, duration: 1, ease: 'power2.out' },
      0.8
    );

    section3Timeline.fromTo(
      section3Ref.current,
      { scale: 1, rotate: 0, opacity: 1 },
      {
        scale: 0.6,
        rotate: -3,
        opacity: 0,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'top -5%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Section 4: PredictPro Timeline
    const section4Timeline = gsap.timeline({
      defaults: { duration: 1.5 },
      scrollTrigger: {
        trigger: section4Ref.current,
        start: 'top 90%',
        end: 'top 10%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
    });

    section4Timeline.fromTo(
      section4Ref.current,
      { scale: 0.95, rotate: -3, opacity: 0.8 },
      { scale: 1, rotate: 0, opacity: 1, ease: 'power3.inOut' },
      0
    );

    section4Timeline.fromTo(
      [portfolioTitleRef.current, portfolioSubtitleRef.current],
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
      0.2
    );

    section4Timeline.fromTo(
      portfolioTextRefs.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      0.4
    );

    section4Timeline.fromTo(
      portfolioCardRefs.current,
      { opacity: 0, scale: 0.9, x: 50 },
      { opacity: 1, scale: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      0.6
    );

    // Hover animations for portfolio cards
    const cards = document.querySelectorAll('.portfolio_card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.03,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(card.querySelector('.portfolio_overlay'), {
          opacity: 0.8,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(card.querySelector('.portfolio_overlay'), {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }, { scope: projectRef });

  return (
    <div
      ref={projectRef}
      className="h-[400vh] text-white"
      style={{
        background: 'url(https://images.unsplash.com/photo-1618477461853-e18db238a7a0?q=80&w=1974&auto=format&fit=crop) no-repeat center center fixed',
        backgroundSize: 'cover',
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* Section 1: Heading */}
      <section
        ref={headingRef}
        className="section1 sticky top-0 flex flex-col justify-center items-center sm:p-4 md:p-8 p-12 h-screen z-10"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-4 md:gap-8 gap-12 max-w-7xl">
          <div className="flex items-center justify-center gap-4 sm:gap-8 font-cormorant">
            <span className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold">
              Selected
            </span>
            <img
              src="https://th.bing.com/th/id/OIP.Il917OtNZ1fSQcSz_I5fPAHaDh?w=323&h=166&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3"
              alt="Selected Icon"
              className="h-20 sm:h-24 md:h-28 lg:h-32 rounded-xl w-auto object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <img
              src="https://th.bing.com/th/id/OIP.kBxMMbGxG9meJ6mjVSdGTgHaEn?w=311&h=194&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3"
              alt="Projects Icon"
              className="h-20 sm:h-24 md:h-28 lg:h-32 rounded-xl w-auto object-cover"
            />
            <span className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold">
              Projects
            </span>
          </div>
        </div>
      </section>

      {/* Section 2: Nuvio */}
      <section
        ref={section2Ref}
        className="section2 h-screen sticky top-0 z-20 md:py-12 py-14 relative"
      >
        <div className="absolute bottom-0 left-4 text-gray-400 text-2xl sm:text-[10rem] font-bold font-cormorant">
          01
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-12 flex md:flex-col flex-row md:gap-8 gap-12 h-full items-center">
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 id="features_title" className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Nuvio
            </h2>
            <h3 id="features_title" className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mt-2">
              The E-commerce Store
            </h3>
            <div className="mt-6 max-w-md">
              <p className="g_text text-gray-300 text-base sm:text-lg font-medium leading-relaxed">
                Nuvio is <span className="text-white font-semibold">a modern e-commerce platform</span> built with cutting-edge technology, offering seamless shopping with advanced filtering and secure checkout.
              </p>
              <p className="g_text text-gray-300 mt-4 text-base sm:text-lg font-medium leading-relaxed">
                Designed for scalability, <span className="text-white font-semibold">Nuvio integrates real-time inventory</span> and personalized recommendations for an enhanced user experience.
              </p>
              <a
                href="https://github.com/Akshat-Sh101/Nuvio_EcommerceStore"
                target='_blank'
                className="inline-block mt-6 bg-gradient-to-r from-gray-700 to-zinc-800 text-white px-6 py-3 rounded-full font-medium hover:from-zinc-800 hover:to-gray-900 transition-all duration-300 transform hover:-translate-y-1"
              >
                View on GitHub
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="relative h-[40vh] sm:h-[50vh] rounded-xl overflow-hidden shadow-lg">
              <img
                src={img1}
                id="exploreVideo"
                className="w-full h-full object-cover rounded-xl"
                alt="Nuvio Main"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden h-[20vh] sm:h-[25vh] shadow-md">
                <img
                  src={img2}
                  alt="Nuvio Feature 1"
                  className="g_grow w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[20vh] sm:h-[25vh] shadow-md">
                <img
                  src={img3}
                  alt="Nuvio Feature 2"
                  className="g_grow w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: RideSync */}
      <section
        ref={section3Ref}
        className="section3 h-screen sticky top-0 z-20 py-5 relative"
      >
        <div className="absolute bottom-1 left-4 text-gray-400 text-2xl sm:text-[10rem] font-bold font-cormorant">
          02
        </div>
        <div className="mx-auto max-w-6xl sm:px-4 md:px-8 px-12 flex md:flex-row sm:flex-col gap-8 md:gap-12 h-full items-center">
          <div className="w-full md:w-1/2">
            <div className="relative h-[90vh] sm:h-[100vh] rounded-xl overflow-hidden shadow-lg">
              <img
                src="/projectIMG/uber2.png"
                id="taskImage"
                className="w-auto h-[90%] object-contain rounded-xl translate-28"
                alt="RideSync Main"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 id="taskTitle" className="text-3xl sm:text-4xl md:text-5xl font-bold">
              RideSync
            </h2>
            <h3 id="taskTitle" className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mt-2">
              Ride-Sharing App
            </h3>
            <div className="mt-6 max-w-md">
              <p className="task_text text-gray-300 text-base sm:text-lg font-medium leading-relaxed">
                RideSync is <span className="text-white font-semibold">a ride-sharing app</span> built with React Native and Google Maps API, enabling real-time driver tracking and booking.
              </p>
              <p className="task_text text-gray-300 mt-4 text-base sm:text-lg font-medium leading-relaxed">
                With <span className="text-white font-semibold">seamless navigation</span> and user-friendly interfaces, it enhances the ride-sharing experience.
              </p>
              <a
                href="https://github.com/Akshat-Sh101/Project3UberClone"
                target='_blank'
                className="inline-block mt-6 bg-gradient-to-r from-gray-700 to-zinc-800 text-white px-6 py-3 rounded-full font-medium hover:from-zinc-800 hover:to-gray-900 transition-all duration-300 transform hover:-translate-y-1"
              >
                View on GitHub
              </a>
            </div>
            <div className="mt-6 h-[20vh] sm:h-[25vh] rounded-xl overflow-hidden shadow-md">
              <img
                src="/projectIMG/uber1.png"
                id="taskSmallImage"
                className="w-full h-full object-cover rounded-xl"
                alt="RideSync Feature"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: PredictPro */}
      <section
        ref={section4Ref}
        className="section4 h-screen sticky top-0 z-20 py-12 sm:py-16 md:py-20 flex items-center relative"
      >
        <div className="absolute bottom-1 left-6 text-gray-400 text-2xl sm:text-[10rem] font-bold font-cormorant">
          03
        </div>
        <div className="relative w-screen mx-auto px-4 sm:px-6 md:px-8 flex md:flex-col flex-row items-center gap-8 md:gap-12">
          <div className="absolute inset-0"></div>
          <div className="relative md:w-1/2 text-center md:text-left">
            <h2
              ref={portfolioTitleRef}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
            >
              PredictPro
            </h2>
            <h3
              ref={portfolioSubtitleRef}
              className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-300 mt-2"
            >
              Predictive ML Models
            </h3>
            <div className="mt-4 h-1 w-20 sm:w-24 md:w-28 mx-auto md:mx-0 bg-white rounded-full shadow-sm"></div>
            <p
              ref={(el) => (portfolioTextRefs.current[0] = el)}
              className="portfolio_text text-gray-300 text-base sm:text-lg md:text-lg font-medium leading-relaxed mt-6 max-w-md mx-auto md:mx-0"
            >
              PredictPro is <span className="text-white font-semibold">a suite of machine learning models</span> built with Python and TensorFlow for predictive analytics.
            </p>
            <p
              ref={(el) => (portfolioTextRefs.current[1] = el)}
              className="portfolio_text text-gray-300 text-base sm:text-lg md:text-lg font-medium leading-relaxed mt-4 max-w-md mx-auto md:mx-0"
            >
              It leverages <span className="text-white font-semibold">scikit-learn and advanced algorithms</span> for accurate forecasting and insights.
            </p>
            <a
              href="https://github.com/Akshat-Sh101/ML-projects"
              target='_blank'
              className="inline-block mt-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:-translate-y-1"
            >
              View on GitHub
            </a>
          </div>
          <div className="md:w-1/2 h-atuo gap-6 sm:gap-8">
            {[
              {
                src: '/projectIMG/ml1.png',
                alt: 'PredictPro Image 1',
              },
              // {
              //   src: 'https://images.unsplash.com/photo-1556740738-8e3e6f8e8b2f?q=80&w=2070&auto=format&fit=crop',
              //   alt: 'PredictPro Image 2',
              // },
            ].map((item, index) => (
              <div
                key={index}
                ref={(el) => (portfolioCardRefs.current[index] = el)}
                className="portfolio_card relative h-auto rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.src}
                  className="portfolio_image w-full h-auto object-cover rounded-xl"
                  alt={item.alt}
                />
                <div className="portfolio_overlay absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-base sm:text-lg font-semibold">Explore Project</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Project;
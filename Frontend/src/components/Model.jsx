
// import { useGLTF, useAnimations } from "@react-three/drei";
// import React, { Suspense, useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import * as THREE from "three";
// import { useFrame, useThree } from "@react-three/fiber";

// function Model({ playAnimation = true }) {
//   const groupRef = useRef(); // Reference for animations
//   const { scene, animations } = useGLTF("/models/cool-man/source/dhana.gltf");
//   const { actions } = useAnimations(animations, groupRef);
//   const [isVisible, setIsVisible] = useState(false);
//   const [mousePos, setMousePos] = useState({ x: 0, y: -5 });

//   const { camera } = useThree();

//   // ✅ Track Mouse Position for Dynamic Rotation
//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const { clientX, clientY } = event;
//       const x = (clientX / window.innerWidth - 0.5) * 2; // Normalize (-1 to 1)
//       const y = (clientY / window.innerHeight - 0.5) * -2; // Invert Y
//       setMousePos({ x, y });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // ✅ Smooth Rotation Based on Mouse
//   useFrame(() => {
//     if (groupRef.current) {
//       gsap.to(groupRef.current.rotation, {
//         y: mousePos.x * 0.3, // More subtle rotation
//         duration: 0.5,
//         ease: "power2.out",
//       });
//     }
//   });

//   // ✅ Initial Fade-in & Scale Animation
//   useEffect(() => {
//     if (groupRef.current) {
//       gsap.fromTo(
//         groupRef.current.scale,
//         { x: 0, y: 0, z: 0 }, // Hidden scale
//         { x: 5, y: 5, z: 5, duration: 1.5, ease: "power3.out" } // Expand
//       );

//       gsap.fromTo(
//         groupRef.current.position,
//         { y: -10, opacity: 0 }, // Start lower & transparent
//         { y: -6, opacity: 1, duration: 1.5, ease: "power3.out" } // Smooth rise
//       );

//       setTimeout(() => setIsVisible(true), 1500);
//     }
//   }, []);

//   // ✅ Exit Animation on Scroll Down
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;

//       if (scrollY > window.innerHeight/50  && groupRef.current) {
//         gsap.to(groupRef.current.scale, {
//           x: 0,
//           y: 0,
//           z: 0,
//           duration: 0.8,
//           ease: "power3.inOut",
//         });

//         gsap.to(groupRef.current.position, {
//           y: -10,
//           opacity: 0,
//           duration: 0.8,
//           ease: "power3.inOut",
//         });
//       } else if (scrollY < window.innerHeight / 25 && groupRef.current) {
//         gsap.to(groupRef.current.scale, {
//           x: 5,
//           y: 5,
//           z: 5,
//           duration: 1.5,
//           ease: "power3.out",
//         });

//         gsap.to(groupRef.current.position, {
//           y: -6,
//           opacity: 1,
//           duration: 1.5,
//           ease: "power3.out",
//         });
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ✅ Play Animation on Load
//   useEffect(() => {
//     if (playAnimation && actions && Object.keys(actions).length > 0) {
//       const animation = actions[Object.keys(actions)[2]]; // Select an animation
//       animation.clampWhenFinished = true;
//       animation.loop = THREE.LoopRepeat;
//       animation.reset().play();

//       // Stop animation after 7.8 seconds
//       const stopTimeout = setTimeout(() => {
//         animation.paused = true;
//       }, 7800);

//       return () => clearTimeout(stopTimeout); // Cleanup on unmount
//     }
//   }, [playAnimation, actions]);

//   return (
//     <group ref={groupRef} position={[0, -6, 2]} scale={8} castShadow>
//       <primitive object={scene} />
//       {/* ✅ Soft Shadow Plane */}
//       <mesh position={[0, -6.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[10, 10]} />
//         <shadowMaterial transparent opacity={0.3} />
//       </mesh>
//     </group>
//   );
// }

// // ✅ Suspense Wrapper for Smooth Loading
// export default function ModelWrapper() {
//   return (
//     <Suspense fallback={<LoadingSpinner />}>
//       <Model />
//     </Suspense>
//   );
// }

// // ✅ Simple Loading Indicator
// function LoadingSpinner() {
//   return (
//     <mesh position={[0, 0, 0]}>
//       <sphereGeometry args={[1, 32, 32]} />
//       <meshStandardMaterial color="gray" wireframe />
//     </mesh>
//   );
// }
import { useGLTF, useAnimations, Environment } from "@react-three/drei"
import { Suspense, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"

function Model({ playAnimation = true }) {
  const groupRef = useRef()
  const { scene, animations } = useGLTF("/models/cool-man/source/dhana.gltf")
  const { actions } = useAnimations(animations, groupRef)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 4) // Adjusted for a closer view
  }, [camera])

  // Track mouse position for subtle rotation
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event
      const x = (clientX / window.innerWidth - 0.5) * 2 // Normalize (-1 to 1)
      const y = (clientY / window.innerHeight - 0.5) * -2 // Invert Y
      setMousePos({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Subtle rotation based on mouse movement
  useFrame(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: mousePos.x * 0.1,
        x: mousePos.y * 0.05,
        duration: 1,
        ease: "power2.out",
      })
    }
  })

  // Increase Model Size and Brightness
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(7, 7, 7) // Increased width coverage
      scene.traverse((child) => {
        if (child.isMesh) {
          // child.material.emissive = new THREE.Color(0xffffff) // Bright glow effect
          child.material.emissiveIntensity = 0.4 // Increased brightness
        }
      })
    }
  }, [scene])

  // Scroll-Based Sliding Down Effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      gsap.to(groupRef.current.position, {
        y: -6 - scrollY * 0.01, // Move down with scroll
        duration: 1,
        ease: "power2.out",
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Play animation on load
  useEffect(() => {
    if (playAnimation && actions && Object.keys(actions).length > 0) {
      const animation = actions[Object.keys(actions)[2]]
      animation.clampWhenFinished = true
      animation.loop = THREE.LoopRepeat
      animation.reset().play()
    }
  }, [playAnimation, actions])

  return (
    <group ref={groupRef} position={[0, -8, 0]} castShadow>
      <primitive object={scene} />
    </group>
  )
}

export default function ModelWrapper() {
  return (
    <>
      <Environment preset="studio" />
      <Suspense fallback={<LoadingSpinner />}>
        <Model />
      </Suspense>
    </>
  )
}

function LoadingSpinner() {
  const spinnerRef = useRef()

  return (
    <mesh ref={spinnerRef} position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.1, 16, 32]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} wireframe />
    </mesh>
  )
}

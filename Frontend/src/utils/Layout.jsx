import { useLayoutEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Picture1 from '/images/image.png';
import Picture2 from '/images/temp.png';
import Picture3 from '/images/image.png';
// import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);
const word = "with gsap";

export default function Layout() {
    const container = useRef(null);
    const images = [Picture1, Picture2, Picture3];
    const lettersRef = useRef([]);
    const imagesRef = useRef([]);
    const title1 = useRef(null);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            })
            .to(title1.current, { y: -50 }, 0)
            .to(imagesRef.current[1], { y: -150 }, 0)
            .to(imagesRef.current[2], { y: -255 }, 0);
            lettersRef.current.forEach((letter, i) => {
                tl.to(letter, {
                    top: Math.floor(Math.random() * -75) - 25,
                }, 0);
            });
        });
        return () => context.revert();
    }, []);

    return (
        <div ref={container} className="mt-[10vh] min-h-screen ">
            <div className="ml-[10vw]">
                <h1 ref={title1} className="m-0 mt-2.5 text-[5vw] leading-[5vw] uppercase">Parallax</h1>
                <h1 className="m-0 mt-2.5 text-[5vw] leading-[5vw] uppercase">Scroll</h1>
                <div className="word">
                    <p className="text-white m-0 mt-2.5 text-[3vw] uppercase">
                        {word.split("").map((letter, i) => (
                            <span
                                key={`l_${i}`}
                                ref={(el) => (lettersRef.current[i] = el)}
                                className="relative"
                            >
                                {letter}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
            <div className="flex w-full justify-center relative mt-[1vh]">
                {images.map((image, i) => (
                    <div
                        key={`i_${i}`}
                        ref={(el) => (imagesRef.current[i] = el)}
                        className={`absolute ${
                            i === 0
                                ? 'h-[60vh] w-[50vh] z-10'
                                : i === 1
                                ? 'left-[55vw] top-[15vh] h-[40vh] w-[30vh] z-20'
                                : 'left-[27.5vw] top-[40vh] h-[25vh] w-[20vh] z-30'
                        }`}
                    >
                        <img
                            src={image}
                            placeholder="blur"
                            alt="image"
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
            
        </div>
    );
}
"use client";

import FloatingShapes from "@/components/FloatingShapes";
import Link from "next/link";
import Lottie from "lottie-react";
import starAnimation from "@/lotties/star.json";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const lottieRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Container fade-in
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2 }
    )
      // Lottie scale and fade
      .fromTo(
        lottieRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.3 },
        "-=1"
      )
      // Headline slide & fade
      .fromTo(
        headlineRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4 },
        "-=1"
      )
      // Sub text
      .fromTo(
        subRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4 },
        "-=1.1"
      )
      // Buttons fade & float up
      .fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4 },
        "-=1.2"
      );
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative flex flex-col items-center justify-center text-center p-10 min-h-screen overflow-hidden bg-black"
    >
      {/* Floating background */}
      <FloatingShapes />

      {/* Lottie icon */}
      <div ref={lottieRef} className="w-48 h-48 mb-6 relative z-10">
        <Lottie animationData={starAnimation} loop autoplay />
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6 relative z-10"
      >
        Discover star-worthy dining,
        <br />
        one fork at a time.
      </h1>

      {/* Subtext */}
      <p
        ref={subRef}
        className="text-lg text-gray-300 mb-8 max-w-xl relative z-10"
      >
        Explore the best Michelin-starred, Green Star, and top critic–approved
        restaurants across the USA and world. Curated for true food lovers.
      </p>

      {/* Buttons */}
      <div
        ref={buttonsRef}
        className="flex flex-wrap gap-4 justify-center relative z-10"
      >
        <Link
          href="/explore"
          className="gradient-hover px-6 py-3 rounded-full font-semibold transition-all"
        >
          Explore Restaurants
        </Link>
        <Link
          href="/favorites"
          className="gradient-hover px-6 py-3 rounded-full font-semibold transition-all"
        >
          View Favorites
        </Link>
      </div>
    </main>
  );
}
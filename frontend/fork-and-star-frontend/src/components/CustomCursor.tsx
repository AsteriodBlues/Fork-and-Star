"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 7;

export default function CustomCursor() {
  const mainRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  // Initialize refs array for trails
  if (trailsRef.current.length !== TRAIL_LENGTH - 1) {
    trailsRef.current = Array(TRAIL_LENGTH - 1)
      .fill(null)
      .map((_, i) => trailsRef.current[i] || null);
  }

  useEffect(() => {
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let positions = Array(TRAIL_LENGTH)
      .fill(0)
      .map(() => ({ x: mouse.x, y: mouse.y }));

    function onMove(e: MouseEvent) {
      mouse = { x: e.clientX, y: e.clientY };
    }

    document.addEventListener("mousemove", onMove);

    function animate() {
      positions[0].x += (mouse.x - positions[0].x) * 0.22;
      positions[0].y += (mouse.y - positions[0].y) * 0.22;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.32;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.32;
      }

      // Main cursor
      if (mainRef.current) {
        mainRef.current.style.transform = `translate3d(${positions[0].x - 16}px,${positions[0].y - 16}px,0)`;
      }

      // Trails (length TRAIL_LENGTH-1)
      trailsRef.current.forEach((dot, i) => {
        if (dot) {
          const scale = 1 - i * 0.13;
          dot.style.transform = `translate3d(${positions[i + 1].x - 12}px,${positions[i + 1].y - 12}px,0) scale(${scale})`;
          dot.style.opacity = `${0.7 - i * 0.08}`;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={mainRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, #facc15, #fb7185 60%, #818cf8 100%)",
          boxShadow: "0 0 32px 6px #fb718570, 0 0 0px 0px #fff0",
          mixBlendMode: "difference",
          transition: "background 0.2s cubic-bezier(.76,0,.24,1)",
        }}
      />

      {/* Trails */}
      {Array.from({ length: TRAIL_LENGTH - 1 }).map((_, i) => (
        <div
          key={i}
          ref={el => (trailsRef.current[i] = el!)}
          className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9998]"
          style={{
            background:
              "radial-gradient(circle at 60% 20%, #facc1580, #fb718580 80%, #818cf850 100%)",
            filter: "blur(1.5px)",
            transition: "background 0.18s cubic-bezier(.76,0,.24,1)",
          }}
        />
      ))}
    </>
  );
}
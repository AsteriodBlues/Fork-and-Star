"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,      // Easing between scroll positions
      duration: 1.2,  // How "slow and buttery" the scroll feels
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
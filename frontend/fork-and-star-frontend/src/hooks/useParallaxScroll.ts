import { useEffect, useState, useCallback } from "react";

interface ParallaxScrollData {
  scrollY: number;
  scrollProgress: number;
  scrollDirection: 'up' | 'down';
  isScrolling: boolean;
}

export function useParallaxScroll(): ParallaxScrollData {
  const [scrollData, setScrollData] = useState<ParallaxScrollData>({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'down',
    isScrolling: false
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const updateScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? currentScrollY / maxScroll : 0;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

    setScrollData({
      scrollY: currentScrollY,
      scrollProgress: Math.min(Math.max(scrollProgress, 0), 1),
      scrollDirection,
      isScrolling: true
    });

    setLastScrollY(currentScrollY);

    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set new timeout to detect when scrolling stops
    const newTimeout = setTimeout(() => {
      setScrollData(prev => ({ ...prev, isScrolling: false }));
    }, 150);

    setScrollTimeout(newTimeout);
  }, [lastScrollY, scrollTimeout]);

  useEffect(() => {
    // Throttled scroll handler for better performance
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial scroll position
    updateScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [updateScroll, scrollTimeout]);

  return scrollData;
}
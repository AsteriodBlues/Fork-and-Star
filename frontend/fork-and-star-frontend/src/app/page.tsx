"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function LuxuryVideoLanding() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  // Simple autoplay attempt
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try autoplay after page loads
    const tryAutoplay = () => {
      video.play()
        .then(() => {
          console.log('✅ Autoplay successful!');
          setIsPlaying(true);
          setShowPlayButton(false);
        })
        .catch(() => {
          console.log('⚠️ Autoplay blocked - showing play button');
          setShowPlayButton(true);
        });
    };

    setTimeout(tryAutoplay, 1000);
  }, []);

  // Manual play function
  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      video.play()
        .then(() => {
          console.log('✅ Manual play successful!');
          setIsPlaying(true);
          setShowPlayButton(false);
        })
        .catch((error) => {
          console.error('❌ Manual play failed:', error);
        });
    }
  };

  // Entrance animations
  useEffect(() => {
    if (isPlaying) {
      const tl = gsap.timeline({ delay: 0.5 });
      
      // Title entrance
      tl.fromTo(titleRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power3.out"
      })
      
      // Subtitle entrance
      .fromTo(subtitleRef.current, {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1")
      
      // CTA entrance
      .fromTo(ctaRef.current, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
      }, "-=0.8");
    }
  }, [isPlaying]);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        style={{
          objectFit: 'cover',
          objectPosition: 'center center'
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Elegant overlay gradients */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* Play Button Overlay */}
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <button
              onClick={handlePlay}
              className="group flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-full transition-all duration-500 hover:scale-110 hover:bg-white/30 hover:border-white/60 mb-4"
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '24px solid white',
                  borderTop: '14px solid transparent',
                  borderBottom: '14px solid transparent',
                  borderRight: '0 solid transparent',
                  marginLeft: '6px',
                  transition: 'border-left-width 0.3s, border-top-width 0.3s, border-bottom-width 0.3s'
                }}
                className="group-hover:border-l-[28px] group-hover:border-t-[16px] group-hover:border-b-[16px]"
              />
            </button>
            
            <p className="text-white/90 text-lg font-light tracking-wide">
              Click to begin the experience
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        
        {/* Luxury Title */}
        <div ref={titleRef} className="mb-8">
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light text-white leading-none tracking-tight"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              textShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 100px rgba(0,0,0,0.4)',
              filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))'
            }}
          >
            Fork & Star
          </h1>
        </div>

        {/* Elegant Subtitle */}
        <div ref={subtitleRef} className="mb-16 max-w-3xl">
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed tracking-wide"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.05em',
              textShadow: '0 0 30px rgba(0,0,0,0.8)'
            }}
          >
            Where culinary artistry meets digital innovation
            <br />
            <span className="text-lg md:text-xl text-gray-300 mt-2 block">
              Discover the world's most extraordinary dining experiences
            </span>
          </p>
        </div>

        {/* Luxury CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/culinary-journey"
            className="group relative px-10 py-5 bg-white text-black rounded-full font-semibold"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.02em',
              fontSize: '1.125rem',
              boxShadow: '0 20px 40px rgba(255,255,255,0.1), 0 0 60px rgba(255,255,255,0.05)'
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              ✨ Explore Culinary World
            </span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000" />
          </Link>
          
          <Link
            href="/analytics"
            className="px-10 py-5 border-2 border-white/30 text-white rounded-full font-semibold backdrop-blur-md transition-all duration-700 transform hover:scale-105 hover:border-white/60 hover:bg-white/10"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.02em',
              fontSize: '1.125rem'
            }}
          >
            📊 View Analytics
          </Link>
        </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-80">
        <div className="mb-2 text-white/60 animate-bounce">↑</div>
        <div className="w-px h-12 bg-white/60 animate-pulse" />
        <span
          className="text-sm text-white/80 uppercase tracking-widest font-medium mt-4"
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            letterSpacing: '0.2em'
          }}
        >
          Click to Explore
        </span>
      </div>
      {/* Close main content container */}
      </div>

      {/* Debug Info (remove in production) */}
      <div className="absolute bottom-4 left-4 text-white/60 text-sm bg-black/30 p-2 rounded">
        <p>Video: {isPlaying ? '✅ Playing' : '⏸️ Stopped'}</p>
        <p>Play Button: {showPlayButton ? '👁️ Visible' : '🙈 Hidden'}</p>
      </div>

      {/* Premium Fonts */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom selection styling */
        ::selection {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
        
        /* Ensure smooth transitions */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </main>
  );
}
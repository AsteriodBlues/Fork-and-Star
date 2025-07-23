"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Star, Award, MapPin, ChefHat, Play, Pause, Camera, Heart, Utensils, Sparkles } from 'lucide-react';

const JapaneseCulinaryJourney = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuote, setShowQuote] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Jiro Quote Animation Component - Transition from Italy
  const JiroQuote = () => {
    const quoteRef = useRef(null);
    const isInView = useInView(quoteRef, { once: false });

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowQuote(false);
      }, 12000); // Extended for deeper contemplation
      return () => clearTimeout(timer);
    }, []);

    if (!showQuote) return null;

    return (
      <motion.div
        ref={quoteRef}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 182, 193, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(75, 0, 130, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a0a 100%)
          `
        }}
      >
        {/* Floating Cherry Blossoms */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => {
            // Use deterministic values based on index
            const leftPos = (i * 13.7) % 100;
            const topPos = (i * 7.3) % 100;
            const xMovement = (i % 2 === 0 ? 1 : -1) * (30 + (i % 20));
            const yMovement = (i % 2 === 0 ? 1 : -1) * (30 + (i % 20));
            const duration = 6 + (i % 6);
            const delay = (i % 8) * 0.5;
            
            return (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${leftPos}%`,
                  top: `${topPos}%`,
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  rotate: [0, 180, 360],
                  x: [0, xMovement],
                  y: [0, yMovement]
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut"
                }}
              >
                🌸
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-6xl px-8 text-center relative z-10">
          {/* Transition Line */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <div className="flex items-center justify-center gap-8">
              <motion.span 
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🇮🇹
              </motion.span>
              <div className="w-32 h-px bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-400"></div>
              <motion.span 
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                🇯🇵
              </motion.span>
            </div>
          </motion.div>

          {/* Main Quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 2 }}
            className="mb-12"
          >
            <blockquote 
              className="text-3xl md:text-4xl lg:text-5xl text-white font-light leading-relaxed mb-8"
              style={{
                fontFamily: '"Playfair Display", serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #ffc0cb 30%, #dda0dd 60%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 60px rgba(255,192,203,0.5)',
                letterSpacing: '0.02em'
              }}
            >
              "Once you decide on your occupation, you must immerse yourself in your work. 
              You have to fall in love with your work. Never complain about your job. 
              You must dedicate your life to mastering your skill. 
              That's the secret of success."
            </blockquote>
            
            <motion.cite
              className="text-2xl text-pink-300 font-medium tracking-wider block"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                textShadow: '0 0 30px rgba(255,182,193,0.6)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2 }}
            >
              — Jiro Ono, Sushi Master
            </motion.cite>
          </motion.div>

          {/* Journey Beginning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 8, duration: 2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
              <span className="text-lg text-pink-200 uppercase tracking-[0.3em] font-medium">
                Enter the Art of Seasonal Perfection
              </span>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>
            
            <motion.div
              className="text-6xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🌸
            </motion.div>
          </motion.div>
        </div>

        {/* Video Preview */}
        <motion.div
          className="absolute bottom-8 right-8 w-32 h-24 rounded-lg overflow-hidden border border-pink-400/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 10, duration: 1 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/japan/japan-opening-cherry-blossoms-falling.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>
    );
  };

  // Enhanced Video Player Component
  type VideoSectionProps = {
    src: string;
    title: string;
    description: string;
    className?: string;
  };

  const VideoSection: React.FC<VideoSectionProps> = ({ src, title, description, className = "" }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    return (
      <motion.div 
        className={`relative overflow-hidden rounded-3xl group ${className}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-16 h-16 bg-pink-500/20 backdrop-blur-md rounded-full border border-pink-300/30 transition-all duration-300 hover:bg-pink-500/30 hover:scale-110"
          >
            {isPlaying ? 
              <Pause className="w-6 h-6 text-white" /> : 
              <Play className="w-6 h-6 text-white ml-1" />
            }
          </button>
        </motion.div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-medium text-lg mb-1">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </motion.div>
    );
  };

  // Main Japanese Journey Section
  const JapaneseSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

    const fourPillars = [
      {
        japanese: "旬",
        romaji: "Shun",
        english: "Seasonality",
        description: "Ingredients at their peak perfection, honoring nature's rhythm",
        image: "/assets/japan/japan-pillar-seasonality-spring-ingredients.jpg",
        color: "from-green-400 to-emerald-600"
      },
      {
        japanese: "簡素", 
        romaji: "Kanso",
        english: "Simplicity",
        description: "Less is more - finding profound beauty in minimal presentation",
        image: "/assets/japan/japan-pillar-simplicity-white-plate-minimal.jpg",
        color: "from-gray-200 to-white"
      },
      {
        japanese: "精密",
        romaji: "Seimitsu", 
        english: "Precision",
        description: "Every cut, every grain of rice, every detail matters",
        image: "/assets/japan/japan-pillar-precision-knife-cutting-board.jpg",
        color: "from-slate-600 to-black"
      },
      {
        japanese: "尊敬",
        romaji: "Sonkei",
        english: "Respect", 
        description: "Honoring ingredients, traditions, and the diner's experience",
        image: "/assets/japan/japan-pillar-respect-bamboo-natural.jpg",
        color: "from-amber-600 to-yellow-700"
      }
    ];

    const masters = [
      {
        name: "Jiro Ono",
        restaurant: "Sukiyabashi Jiro",
        stars: 3,
        title: "The Shokunin Master",
        philosophy: "90+ years perfecting the art of sushi - every grain of rice matters",
        portrait: "/assets/japan/japan-master-jiro-portrait.jpg",
        signature: "/assets/japan/japan-master-jiro-sushi-tuna-red-white.jpg",
        pillar: "Precision"
      },
      {
        name: "Yoshihiro Narisawa", 
        restaurant: "Narisawa",
        stars: 2,
        title: "The Nature Philosopher",
        philosophy: "Satoyama cuisine - cooking the forest, mountain, and sea of Japan",
        portrait: "/assets/japan/japan-master-narisawa-portrait.jpg",
        signature: "/assets/japan/japan-master-narisawa-satoyama-dish.jpg", 
        pillar: "Seasonality"
      },
      {
        name: "Takashi Saito",
        restaurant: "Sushi Saito", 
        stars: 3,
        title: "The Perfectionist",
        philosophy: "Temperature harmony - rice, fish, and hands in perfect balance",
        portrait: "/assets/japan/japan-master-saito-portrait.jpg",
        signature: "/assets/japan/japan-master-saito-minimalist-plating.jpg",
        pillar: "Respect"
      },
      {
        name: "Seiji Yamamoto",
        restaurant: "Nihonryori RyuGin",
        stars: 3, 
        title: "The Modernist",
        philosophy: "Traditional kaiseki meets innovation - honoring past, embracing future",
        portrait: "/assets/japan/japan-master-yamamoto-portrait.jpg",
        signature: "/assets/japan/japan-master-yamamoto-kaiseki-presentation.jpg",
        pillar: "Simplicity"
      }
    ];

    const seasons = [
      {
        season: "Spring",
        japanese: "春",
        description: "Cherry blossoms, bamboo shoots, delicate renewal",
        colors: "from-pink-300 to-green-300",
        images: [
          "/assets/japan/japan-spring-cherry-blossoms-pink.jpg",
          "/assets/japan/japan-spring-bamboo-shoots-green.jpg",
          "/assets/japan/japan-spring-kaiseki-spring-colors.jpg"
        ]
      },
      {
        season: "Summer", 
        japanese: "夏",
        description: "Cool soba, fresh uni, minimal cooking techniques",
        colors: "from-blue-300 to-teal-300", 
        images: [
          "/assets/japan/japan-summer-cool-soba-blue.jpg",
          "/assets/japan/japan-summer-fresh-uni-white.jpg",
          "/assets/japan/japan-summer-minimalist-summer-dish.jpg"
        ]
      },
      {
        season: "Autumn",
        japanese: "秋", 
        description: "Matsutake mushrooms, persimmons, warming comfort",
        colors: "from-orange-400 to-red-400",
        images: [
          "/assets/japan/japan-autumn-matsutake-mushrooms-orange.jpg",
          "/assets/japan/japan-autumn-persimmons-golden.jpg", 
          "/assets/japan/japan-autumn-warming-broth-rich.jpg"
        ]
      },
      {
        season: "Winter",
        japanese: "冬",
        description: "Hot pot ceremonies, preserved foods, contemplative purity", 
        colors: "from-gray-100 to-slate-600",
        images: [
          "/assets/japan/japan-winter-hot-pot-ceremony-white.jpg",
          "/assets/japan/japan-winter-preserved-foods-silver.jpg",
          "/assets/japan/japan-winter-snow-lanterns.jpg"
        ]
      }
    ];

    const frenchJapaneseRestaurants = [
      {
        name: "L'Effervescence",
        chef: "Shinobu Namae", 
        stars: 3,
        principle: "Seasonality",
        philosophy: "I don't cook French food in Japan - I cook Japanese terroir with French soul",
        portrait: "/assets/japan/japan-french-leffervescence-chef-namae-portrait.jpg",
        interior: "/assets/japan/japan-french-leffervescence-restaurant-interior.jpg",
        dish: "/assets/japan/japan-french-leffervescence-nature-cuisine-dish.jpg"
      },
      {
        name: "L'OSIER",
        chef: "Olivier Chaignon",
        stars: 3, 
        principle: "Simplicity",
        philosophy: "Less is more - Japanese aesthetics taught me to let ingredients speak without noise",
        portrait: "/assets/japan/japan-french-losier-chef-chaignon-portrait.jpg",
        interior: "/assets/japan/japan-french-losier-elegant-dining-room.jpg", 
        dish: "/assets/japan/japan-french-losier-minimalist-french-dish.jpg"
      },
      {
        name: "SÉZANNE", 
        chef: "Daniel Calvert",
        stars: 3,
        principle: "Precision", 
        philosophy: "Every cut, every sauce dot, every garnish placement - precision creates perfection",
        portrait: "/assets/japan/japan-french-sezanne-chef-calvert-portrait.jpg",
        interior: "/assets/japan/japan-french-sezanne-modern-interior.jpg",
        dish: "/assets/japan/japan-french-sezanne-precision-plating.jpg"
      },
      {
        name: "Quintessence",
        chef: "Shuzo Kishida",
        stars: 3,
        principle: "Respect",
        philosophy: "Respect for ingredients is universal - French technique, Japanese heart", 
        portrait: "/assets/japan/japan-french-quintessence-chef-kishida-portrait.jpg",
        interior: "/assets/japan/japan-french-quintessence-restaurant-atmosphere.jpg",
        dish: "/assets/japan/japan-french-quintessence-ingredient-respect-dish.jpg"
      }
    ];

    return (
      <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
        
        {/* Enhanced Video Background with Multiple Videos */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-40"
            >
              <source src="/assets/japan/japan-opening-cherry-blossoms-falling.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-30"
            >
              <source src="/assets/japan/japan-opening-sushi-knife-precision.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-40" 
            >
              <source src="/assets/japan/japan-opening-mount-fuji-sunrise.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-transparent to-pink-900/30" />
        </div>

        {/* Country Header with Japanese Aesthetics */}
        <motion.div
          className="absolute top-20 left-8 right-8 z-20"
          initial={{ opacity: 0, y: -100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.span 
                className="text-8xl md:text-9xl drop-shadow-2xl"
                animate={{ 
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                🇯🇵
              </motion.span>
              <div>
                <motion.h1 
                  className="text-8xl md:text-9xl lg:text-[10rem] font-light tracking-tight mb-4"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffc0cb 20%, #dda0dd 40%, #87ceeb 60%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 80px rgba(255,192,203,0.4)'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 2 }}
                >
                  日本料理
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl text-pink-300 font-light tracking-[0.3em]"
                  style={{ 
                    textShadow: '0 0 40px rgba(255,182,193,0.8)',
                    fontFamily: '"Inter", system-ui, sans-serif'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 2 }}
                >
                  THE ART OF SEASONAL PERFECTION
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Content Sections */}
        <div className="relative z-10 pt-[30rem]">

          {/* Architecture Evolution Section */}
          <motion.section className="min-h-screen flex items-center px-8 py-20">
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                <h2 
                  className="text-7xl md:text-8xl font-light mb-8"
                  style={{ 
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffc0cb 50%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Where Philosophy Shapes Form
                </h2>
                <p className="text-2xl text-pink-200 max-w-5xl mx-auto leading-relaxed">
                  Japanese architecture and cuisine share the same soul - both expressions 
                  of harmony between nature, seasons, and human artistry.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-16 mb-32">
                <motion.div
                  className="text-center group"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                >
                  <div className="relative mb-8 overflow-hidden rounded-3xl">
                    <img
                      src="/assets/japan/japan-arch-traditional-temple-wood-gold.jpg"
                      alt="Traditional Japanese Architecture"
                      className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="text-amber-200 font-medium text-xl tracking-wider">TRADITIONAL</span>
                    </div>
                  </div>
                  <h3 className="text-4xl text-amber-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Ancient Wisdom
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Wooden temples and tea houses where culinary traditions were born, 
                    honoring the sacred relationship between nature and nourishment.
                  </p>
                </motion.div>

                <motion.div
                  className="text-center group"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                >
                  <div className="relative mb-8 overflow-hidden rounded-3xl">
                    <img
                      src="/assets/japan/japan-arch-modern-tokyo-skyline-blue.jpg"
                      alt="Modern Tokyo Architecture"
                      className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="text-blue-200 font-medium text-xl tracking-wider">CONTEMPORARY</span>
                    </div>
                  </div>
                  <h3 className="text-4xl text-blue-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Refined Precision
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Glass towers and minimalist restaurants where traditional techniques 
                    meet contemporary elegance, creating new forms of culinary artistry.
                  </p>
                </motion.div>

                <motion.div
                  className="text-center group"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                >
                  <div className="relative mb-8 overflow-hidden rounded-3xl">
                    <img
                      src="/assets/japan/japan-arch-futuristic-neon-tokyo-night.jpg"
                      alt="Futuristic Tokyo"
                      className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="text-purple-200 font-medium text-xl tracking-wider">FUTURISTIC</span>
                    </div>
                  </div>
                  <h3 className="text-4xl text-purple-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Boundless Innovation
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Neon-lit laboratories and molecular gastronomy studios where 
                    Japanese philosophy guides the future of culinary possibilities.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Four Sacred Pillars */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.2) 0%, rgba(25, 25, 112, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)'
            }}
          >
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-24"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                <h2 
                  className="text-7xl md:text-8xl font-light mb-12"
                  style={{ 
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #dda0dd 50%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  四つの柱
                </h2>
                <p className="text-3xl text-purple-200 font-light mb-6">The Four Sacred Pillars</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  Ancient principles that guide every knife cut, every grain of rice, 
                  every moment of culinary meditation in Japanese cuisine.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {fourPillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.english}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800/30 to-black/50 backdrop-blur-lg border border-purple-500/20">
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={pillar.image}
                          alt={pillar.english}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${pillar.color} opacity-40 group-hover:opacity-20 transition-opacity duration-500`} />
                        
                        {/* Japanese Character */}
                        <div className="absolute top-8 right-8">
                          <span className="text-6xl font-light text-white drop-shadow-2xl">
                            {pillar.japanese}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <div className="mb-4">
                          <h3 className="text-4xl font-light text-white mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                            {pillar.english}
                          </h3>
                          <p className="text-purple-300 text-xl italic">
                            {pillar.romaji}
                          </p>
                        </div>
                        
                        <p className="text-gray-200 leading-relaxed text-lg">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Living Legends - Michelin Masters */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90">
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-24"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                <h2 
                  className="text-7xl md:text-8xl font-light mb-12"
                  style={{ 
                    fontFamily: '"Playfair Display", serif',
                    color: '#ffffff',
                    textShadow: '0 0 60px rgba(255,255,255,0.3)'
                  }}
                >
                  生きる伝説
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">The Living Legends</p>
                <p className="text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
                  Masters who have dedicated their lives to perfection, each embodying 
                  one of the sacred pillars through decades of unwavering devotion.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {masters.map((master, index) => (
                  <motion.div
                    key={master.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                    whileHover={{ y: -20 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800 to-black border border-pink-500/20 backdrop-blur-lg">
                      
                      {/* Portrait and Signature Dish Split */}
                      <div className="grid grid-cols-2 h-96">
                        <div className="relative overflow-hidden">
                          <img
                            src={master.portrait}
                            alt={master.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
                        </div>
                        <div className="relative overflow-hidden">
                          <img
                            src={master.signature}
                            alt={`${master.name} signature dish`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50" />
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="absolute top-6 left-6 flex gap-1">
                        {[...Array(master.stars)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + (i * 0.1), duration: 0.3 }}
                          >
                            <Star className="w-7 h-7 fill-pink-400 text-pink-400 drop-shadow-lg" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Pillar Badge */}
                      <div className="absolute top-6 right-6">
                        <span className="px-4 py-2 bg-pink-500/20 backdrop-blur-md rounded-full text-pink-300 text-sm font-medium border border-pink-400/30">
                          {master.pillar}
                        </span>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {master.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <ChefHat className="w-6 h-6 text-pink-400" />
                          <p className="text-pink-300 font-medium text-xl">
                            {master.restaurant}
                          </p>
                        </div>
                        
                        <p className="text-2xl text-gray-200 font-light mb-6 italic">
                          {master.title}
                        </p>
                        
                        <blockquote className="text-gray-300 leading-relaxed text-lg italic border-l-2 border-pink-500 pl-6">
                          "{master.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Seasonal Journey */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(45deg, rgba(255, 192, 203, 0.1) 0%, rgba(221, 160, 221, 0.1) 25%, rgba(135, 206, 235, 0.1) 50%, rgba(255, 165, 0, 0.1) 75%, rgba(255, 192, 203, 0.1) 100%)'
          }}>
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-24"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                <h2 
                  className="text-7xl md:text-8xl font-light mb-12"
                  style={{ 
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(90deg, #ff69b4 0%, #98fb98 25%, #87ceeb 50%, #ffa500 75%, #ff69b4 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  季節の詩
                </h2>
                <p className="text-3xl font-light mb-6" style={{ 
                  background: 'linear-gradient(90deg, #ff69b4 0%, #98fb98 25%, #87ceeb 50%, #ffa500 75%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Poetry of the Seasons</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  In Japan, each season brings its own ingredients, techniques, and emotional resonance. 
                  Food becomes a calendar, marking time through taste and presentation.
                </p>
              </motion.div>

              {seasons.map((season, index) => (
                <motion.div
                  key={season.season}
                  className="mb-32 last:mb-0"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: index * 0.3 }}
                >
                  <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-8 mb-8">
                      <span className="text-8xl font-light">{season.japanese}</span>
                      <h3 className="text-6xl font-light" style={{ 
                        fontFamily: '"Playfair Display", serif',
                        background: season.colors,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {season.season}
                      </h3>
                    </div>
                    <p className="text-2xl text-gray-300 leading-relaxed italic">
                      {season.description}
                    </p>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    {season.images.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        className="group overflow-hidden rounded-2xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={image}
                          alt={`${season.season} cuisine`}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Interactive Technique Showcase */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20">
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <h2 
                  className="text-7xl md:text-8xl font-light mb-8"
                  style={{ 
                    fontFamily: '"Playfair Display", serif',
                    color: '#ffffff',
                    textShadow: '0 0 60px rgba(255,255,255,0.3)'
                  }}
                >
                  技の詩
                </h2>
                <p className="text-3xl text-indigo-200 font-light mb-6">Poetry in Technique</p>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Witness the meditative artistry of Japanese culinary techniques, 
                  where every movement is a brushstroke in an edible painting.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                <VideoSection
                  src="/assets/japan/japan-technique-knife-skills-slow-motion.mp4"
                  title="刃技 - Blade Mastery"
                  description="The meditative art of knife work - each cut a prayer, each slice poetry"
                  className="h-80"
                />
                
                <VideoSection
                  src="/assets/japan/japan-technique-luxury-plating-poetry.mp4"
                  title="盛り付け - Plating Poetry"
                  description="Where ingredients become art, and plates become canvases for seasonal stories"
                  className="h-80"
                />
                
                <VideoSection
                  src="/assets/japan/japan-technique-kaiseki-plating-poetry.mp4"
                  title="懐石 - Kaiseki Ceremony"
                  description="The haute couture of Japanese cuisine - multiple courses, multiple emotions"
                  className="h-80"
                />
              </div>
            </div>
          </motion.section>

          {/* French-Japanese Bridge Section */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 20, 147, 0.1) 0%, rgba(138, 43, 226, 0.2) 50%, rgba(75, 0, 130, 0.1) 100%)'
            }}
          >
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-24"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                <h2 
                  className="text-6xl md:text-7xl font-light mb-12"
                  style={{ 
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ff1493 0%, #8a2be2 50%, #4b0082 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Where French Artistry Meets Japanese Soul
                </h2>
                <p className="text-xl text-purple-200 max-w-5xl mx-auto leading-relaxed">
                  In Tokyo's finest kitchens, French techniques are elevated by Japanese principles, 
                  creating a sublime fusion that honors both cultures while transcending both.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {frenchJapaneseRestaurants.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-purple-800/20 to-black/80 backdrop-blur-xl border border-purple-500/30">
                      
                      {/* Three-Image Layout */}
                      <div className="grid grid-cols-3 h-64">
                        <div className="relative overflow-hidden">
                          <img
                            src={restaurant.portrait}
                            alt={restaurant.chef}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="relative overflow-hidden">
                          <img
                            src={restaurant.interior}
                            alt={`${restaurant.name} interior`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="relative overflow-hidden">
                          <img
                            src={restaurant.dish}
                            alt={`${restaurant.name} dish`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="absolute top-4 right-4 flex gap-1">
                        {[...Array(restaurant.stars)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-purple-400 text-purple-400" />
                        ))}
                      </div>

                      {/* Principle Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-md rounded-full text-purple-300 text-sm font-medium border border-purple-400/30">
                          {restaurant.principle}
                        </span>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-3xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {restaurant.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <ChefHat className="w-5 h-5 text-purple-400" />
                          <p className="text-purple-300 font-medium text-lg">
                            {restaurant.chef}
                          </p>
                        </div>
                        
                        <blockquote className="text-gray-300 leading-relaxed italic text-lg border-l-2 border-purple-500 pl-4">
                          "{restaurant.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Epic Finale Transition to France */}
          <motion.section 
            className="h-screen flex items-center justify-center px-8 relative overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(255, 20, 147, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(75, 0, 130, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(138, 43, 226, 0.2) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a0a 0%, #2d1a2d 50%, #0a0a0a 100%)
              `
            }}
          >
            {/* Floating Elements */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => {
                // Deterministic positioning and animation
                const leftPos = (i * 17.3) % 100;
                const topPos = (i * 11.7) % 100;
                const yMovement = -30 - (i % 20);
                const duration = 8 + (i % 4);
                const delay = (i % 10) * 0.5;
                const emoji = i % 2 === 0 ? '🌸' : '🍷';
                
                return (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                    }}
                    animate={{
                      y: [0, yMovement, 0],
                      opacity: [0.3, 1, 0.3],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut"
                    }}
                  >
                    {emoji}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="text-center relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            >
              <motion.p 
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-16 max-w-6xl mx-auto leading-relaxed"
                style={{ 
                  fontFamily: '"Playfair Display", serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffc0cb 30%, #dda0dd 60%, #ffffff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 60px rgba(255,192,203,0.4)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                "As cherry blossoms fall and give way to the vineyards of France, 
                we see how Japanese principles have elevated French cuisine to its highest form. 
                These masters prove that culinary excellence knows no borders—only dedication, 
                respect, and the eternal pursuit of perfection."
              </motion.p>
              
              <motion.div
                className="flex items-center justify-center gap-16 mt-20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2, duration: 2 }}
              >
                <motion.span 
                  className="text-8xl drop-shadow-2xl"
                  animate={{ 
                    rotateY: [0, 15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🇯🇵
                </motion.span>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="w-48 h-px bg-gradient-to-r from-transparent via-pink-400 via-purple-400 to-transparent"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-12 h-12 text-purple-400" />
                  </motion.div>
                  <div className="w-48 h-px bg-gradient-to-r from-transparent via-purple-400 via-blue-400 to-transparent"></div>
                </div>
                
                <motion.span 
                  className="text-8xl drop-shadow-2xl"
                  animate={{ 
                    rotateY: [0, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.5
                  }}
                >
                  🇫🇷
                </motion.span>
              </motion.div>
              
              <motion.p 
                className="text-purple-300 mt-12 text-2xl tracking-[0.3em] font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 3.5, duration: 1.5 }}
              >
                NEXT: FRENCH MASTERY
              </motion.p>
            </motion.div>
          </motion.section>
        </div>

        {/* Enhanced Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 w-20 h-20 z-30"
          style={{
            background: `conic-gradient(#ff1493 ${scrollYProgress.get() * 360}deg, rgba(255,255,255,0.1) 0deg)`,
            borderRadius: '50%',
            padding: '3px'
          }}
        >
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-pink-500/30 backdrop-blur-md">
            <div className="text-center">
              <span className="text-white text-sm font-bold block">
                {Math.round(scrollYProgress.get() * 100)}%
              </span>
              <span className="text-pink-400 text-lg">
                🌸
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative">
      <AnimatePresence>
        {showQuote && <JiroQuote />}
      </AnimatePresence>
      
      {!showQuote && <JapaneseSection />}
    </div>
  );
};

export default JapaneseCulinaryJourney; 
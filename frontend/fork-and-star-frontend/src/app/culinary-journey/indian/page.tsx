"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Star, Award, MapPin, ChefHat, Play, Pause, Sparkles, Crown, Globe, Flame, Coffee, Heart, Utensils, Leaf } from 'lucide-react';

const IndianCulinaryJourney = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuote, setShowQuote] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Vikas Khanna Quote Animation Component - Transition from France
  const VikasKhannaQuote = () => {
    const quoteRef = useRef(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowQuote(false);
      }, 15000); // Extended for deeper contemplation
      return () => clearTimeout(timer);
    }, []);

    if (!showQuote) return null;

    return (
      <motion.div
        ref={quoteRef}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 69, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, rgba(220, 20, 60, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #1a0f06 0%, #2d1a0a 50%, #1a0f06 100%)
          `
        }}
      >
        {/* Floating Indian Spices */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => {
            const leftPos = (i * 12.7) % 100;
            const topPos = (i * 9.3) % 100;
            const xMovement = (i % 2 === 0 ? 1 : -1) * (20 + (i % 12));
            const yMovement = (i % 2 === 0 ? 1 : -1) * (20 + (i % 12));
            const duration = 8 + (i % 6);
            const delay = (i % 15) * 0.3;
            const spices = ['🌶️', '🧄', '🧅', '🌿', '⭐', '🥥', '🍛', '🫖', '🔥'];
            const spice = spices[i % spices.length];
            
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
                  opacity: [0, 0.9, 0],
                  scale: [0, 1, 0.7],
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
                {spice}
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
                🇫🇷
              </motion.span>
              <div className="w-32 h-px bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600"></div>
              <motion.span 
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                🇮🇳
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
              className="text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed mb-8"
              style={{
                fontFamily: '"Playfair Display", serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 15%, #ff8c00 30%, #ff4500 45%, #dc143c 60%, #8b008b 75%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 80px rgba(255,140,0,0.6)',
                letterSpacing: '0.02em'
              }}
            >
              "A great introduction to cultures is their cuisine. 
              It not only reflects their evolution, 
              but also their beliefs and traditions."
            </blockquote>
            
            <motion.cite
              className="text-2xl text-orange-300 font-medium tracking-wider block"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                textShadow: '0 0 30px rgba(255,140,0,0.7)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2 }}
            >
              — Vikas Khanna, Global Ambassador of Indian Cuisine
            </motion.cite>
          </motion.div>

          {/* Journey Beginning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 12, duration: 2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
              <span className="text-lg text-orange-200 uppercase tracking-[0.3em] font-medium">
                Enter the Spices of the Soul
              </span>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
            </div>
            
            <motion.div
              className="text-6xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🌶️
            </motion.div>
          </motion.div>
        </div>

        {/* Video Preview */}
        <motion.div
          className="absolute bottom-8 right-8 w-32 h-24 rounded-lg overflow-hidden border border-orange-400/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 13, duration: 1 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center text-4xl">
            🌶️
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Enhanced Video Player Component
  type VideoSectionProps = {
    title: string;
    description: string;
    emoji: string;
    className?: string;
  };

  const VideoSection: React.FC<VideoSectionProps> = ({ title, description, emoji, className = "" }) => {
    const [showControls, setShowControls] = useState(false);

    return (
      <motion.div 
        className={`relative overflow-hidden rounded-3xl group ${className}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center">
          <span className="text-8xl">{emoji}</span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="flex items-center justify-center w-16 h-16 bg-orange-500/20 backdrop-blur-md rounded-full border border-orange-300/30 transition-all duration-300 hover:bg-orange-500/30 hover:scale-110">
            <Play className="w-6 h-6 text-white ml-1" />
          </button>
        </motion.div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-medium text-lg mb-1">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </motion.div>
    );
  };

  // Main Indian Journey Section
  const IndianSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

    const sixTastes = [
      {
        sanskrit: "मधुर",
        transliteration: "Madhura",
        english: "Sweet",
        description: "Jaggery, cardamom, coconut - nourishing earth energy",
        color: "from-yellow-500 to-amber-700",
        emoji: "🍯"
      },
      {
        sanskrit: "अम्ल",
        transliteration: "Amla", 
        english: "Sour",
        description: "Tamarind, lime, yogurt - digestive fire activation",
        color: "from-lime-400 to-yellow-600",
        emoji: "🍋"
      },
      {
        sanskrit: "लवण",
        transliteration: "Lavana",
        english: "Salty", 
        description: "Rock salt, sea salt - mineral essence of life",
        color: "from-gray-200 to-slate-400",
        emoji: "🧂"
      },
      {
        sanskrit: "कटु",
        transliteration: "Katu",
        english: "Pungent",
        description: "Chilies, ginger, pepper - inner fire awakening",
        color: "from-red-500 to-orange-700",
        emoji: "🌶️"
      },
      {
        sanskrit: "तिक्त",
        transliteration: "Tikta", 
        english: "Bitter",
        description: "Turmeric, fenugreek - cleansing and healing",
        color: "from-green-500 to-emerald-700",
        emoji: "🌿"
      },
      {
        sanskrit: "कषाय",
        transliteration: "Kashaya",
        english: "Astringent",
        description: "Pomegranate, tea - grounding and centering",
        color: "from-purple-500 to-indigo-700",
        emoji: "🫖"
      }
    ];

    const regionalKingdoms = [
      {
        state: "Maharashtra",
        description: "Street food capital, bold flavors, coastal-inland fusion",
        specialties: ["Vada Pav", "Misal Pav", "Puran Poli", "Bhel Puri"],
        colors: "from-red-600 to-orange-700",
        emoji: "🌶️"
      },
      {
        state: "Bengal", 
        description: "Fish curries, sweets, intellectual food culture",
        specialties: ["Hilsa Fish", "Rasgulla", "Mishti Doi", "Kosha Mangsho"],
        colors: "from-blue-500 to-teal-600",
        emoji: "🐟"
      },
      {
        state: "Kerala",
        description: "Coconut coastlines, spice trade routes, backwater cuisine", 
        specialties: ["Fish Curry", "Appam", "Coconut Oil", "Black Pepper"],
        colors: "from-green-600 to-emerald-700",
        emoji: "🥥"
      },
      {
        state: "Karnataka",
        description: "Coffee kingdom, dosa mastery, royal Mysore cuisine",
        specialties: ["Filter Coffee", "Mysore Pak", "Bisi Bele Bath", "Udupi Cuisine"],
        colors: "from-yellow-700 to-amber-800",
        emoji: "☕"
      },
      {
        state: "Tamil Nadu", 
        description: "Temple food, fermentation mastery, vegetarian excellence",
        specialties: ["Sambar", "Rasam", "Chettinad Spices", "Filter Coffee"],
        colors: "from-pink-500 to-rose-600",
        emoji: "🌺"
      },
      {
        state: "Andhra Pradesh",
        description: "Spice capital, pickle mastery, Telugu culinary pride",
        specialties: ["Guntur Chilies", "Gongura", "Hyderabadi Biryani", "Pickles"],
        colors: "from-red-700 to-orange-800",
        emoji: "🔥"
      },
      {
        state: "Goa",
        description: "Portuguese fusion, coastal seafood, tropical flavors",
        specialties: ["Fish Curry", "Vindaloo", "Bebinca", "Feni"],
        colors: "from-blue-400 to-cyan-600", 
        emoji: "🌴"
      }
    ];

    const modernMasters = [
      {
        name: "Gaggan Anand",
        location: "Bangkok/Mumbai",
        title: "Progressive Indian Pioneer", 
        philosophy: "Indian cuisine through emoji storytelling",
        innovation: "Deconstructed Indian classics with molecular techniques",
        color: "from-purple-600 to-indigo-800",
        emoji: "🧪"
      },
      {
        name: "Vikas Khanna",
        location: "NYC/Global",
        title: "Global Ambassador", 
        philosophy: "Food is culture, culture is identity",
        innovation: "Documentary cooking, humanitarian gastronomy",
        color: "from-orange-600 to-red-700",
        emoji: "🌍"
      },
      {
        name: "Atul Kochhar", 
        location: "London",
        title: "First Indian Michelin Star",
        philosophy: "Tradition with contemporary techniques",
        innovation: "Indian fine dining in European context", 
        color: "from-blue-600 to-purple-700",
        emoji: "⭐"
      },
      {
        name: "Manish Mehrotra",
        location: "Delhi", 
        title: "Modern Indian Pioneer",
        philosophy: "Playful reinvention of classics",
        innovation: "Indian tapas, creative presentations",
        color: "from-green-600 to-teal-700",
        emoji: "🎨"
      }
    ];

    const michelinRestaurants = [
      {
        name: "Tresind Studio",
        location: "Dubai",
        stars: 3,
        chef: "Himanshu Saini",
        description: "Progressive Indian with molecular techniques"
      },
      {
        name: "Rania", 
        location: "Washington DC",
        stars: 1,
        chef: "Chetan Shetty",
        description: "Regional Indian elevated to fine dining"
      },
      {
        name: "Indienne",
        location: "Washington DC", 
        stars: 1,
        chef: "",
        description: "Indian techniques in American fine dining context"
      },
      {
        name: "Semma",
        location: "NYC",
        stars: 1, 
        chef: "Vijay Kumar",
        description: "South Indian village cuisine elevated"
      }
    ];

    const ukMichelinRestaurants = [
      {
        name: "Opheem",
        location: "Birmingham",
        stars: 2,
        description: "Progressive Indian fine dining"
      },
      {
        name: "Quilon", 
        location: "London",
        stars: 1,
        description: "Coastal South Indian cuisine"
      },
      {
        name: "Gymkhana",
        location: "London",
        stars: 2,
        description: "British Raj club atmosphere"
      },
      {
        name: "Benares",
        location: "London",
        stars: 1,
        description: "Atul Kochhar's pioneering restaurant"
      },
      {
        name: "Amaya",
        location: "London", 
        stars: 1,
        description: "Modern Indian grilling mastery"
      },
      {
        name: "Trishna",
        location: "London",
        stars: 1,
        description: "Modern Indian seafood"
      }
    ];

    return (
      <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
        
        {/* Enhanced Multi-Video Background */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            <div className="w-full h-full bg-gradient-to-br from-orange-600 to-red-700 opacity-25 flex items-center justify-center text-9xl">
              🌶️
            </div>
            <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-orange-700 opacity-20 flex items-center justify-center text-9xl">
              🧄
            </div>
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-purple-700 opacity-25 flex items-center justify-center text-9xl">
              🔥
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/40 via-transparent to-red-900/40" />
        </div>

        {/* Country Header with Indian Elegance */}
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
                🇮🇳
              </motion.span>
              <div>
                <motion.h1 
                  className="text-8xl md:text-9xl lg:text-[10rem] font-light tracking-tight mb-4"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 15%, #ff8c00 30%, #ff4500 45%, #dc143c 60%, #8b008b 75%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 80px rgba(255,140,0,0.5)'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 2 }}
                >
                  भारतीय व्यंजन
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl text-orange-300 font-light tracking-[0.3em]"
                  style={{ 
                    textShadow: '0 0 40px rgba(255,140,0,0.8)',
                    fontFamily: '"Inter", system-ui, sans-serif'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 2 }}
                >
                  SPICES OF THE SOUL
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Content Sections */}
        <div className="relative z-10 pt-[30rem]">

          {/* Ancient Wisdom Section */}
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 30%, #ff8c00 60%, #ff4500 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  From Ancient Wisdom to Global Mastery
                </h2>
                <p className="text-2xl text-orange-200 max-w-5xl mx-auto leading-relaxed">
                  A 5000-year culinary journey from Indus Valley spice mastery to Michelin-starred 
                  innovation, where every dish carries the soul of ancient traditions.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-4 gap-12 mb-32">
                <motion.div
                  className="text-center group"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.1 }}
                >
                  <div className="relative mb-8 overflow-hidden rounded-3xl">
                    <div className="w-full h-80 bg-gradient-to-br from-amber-700 to-orange-800 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-700">
                      🏺
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="text-amber-200 font-medium text-lg tracking-wider">INDUS VALLEY</span>
                    </div>
                  </div>
                  <h3 className="text-3xl text-amber-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Ancient Spice Mastery
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    5000-year-old civilization perfecting spice cultivation and fermentation wisdom
                  </p>
                </motion.div>

                <motion.div
                  className="text-center group"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                >
                  <div className="relative mb-8 overflow-hidden rounded-3xl">
                    <div className="w-full h-80 bg-gradient-to-br from-red-700 to-purple-800 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-700">
                      👑
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="text-red-200 font-medium text-lg tracking-wider">MUGHAL</span>
                    </div>
                  </div>
                  <h3 className="text-3xl text-red-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Royal Court Cuisine
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Persian influences creating biryanis and rich gravies in imperial kitchens
                  </p>
                </motion.div>

                <motion.div
                  className="text-center group"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                >
                  <div className="relative mb-8 overflow-hidden rounded-3xl">
                    <div className="w-full h-80 bg-gradient-to-br from-green-700 to-teal-800 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-700">
                      🕉️
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="text-green-200 font-medium text-lg tracking-wider">AYURVEDIC</span>
                    </div>
                  </div>
                  <h3 className="text-3xl text-green-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Food as Medicine
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Doshas, six tastes, and seasonal eating for complete wellness
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
                    <div className="w-full h-80 bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-700">
                      ⭐
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="text-blue-200 font-medium text-lg tracking-wider">GLOBAL</span>
                    </div>
                  </div>
                  <h3 className="text-3xl text-blue-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Michelin Mastery
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Indian chefs conquering world stages with traditional wisdom
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Six Sacred Tastes */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.2) 0%, rgba(220, 20, 60, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 20%, #ff8c00 40%, #ff4500 60%, #dc143c 80%, #8b008b 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  षड्रस
                </h2>
                <p className="text-3xl text-orange-200 font-light mb-6">The Six Sacred Tastes</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  Ancient Ayurvedic wisdom recognizes six fundamental tastes that create 
                  perfect nutritional and spiritual balance in every meal.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8">
                {sixTastes.map((taste, index) => (
                  <motion.div
                    key={taste.english}
                    className="group text-center"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800/40 to-black/60 backdrop-blur-lg border border-orange-500/20 p-8">
                      <div className="text-7xl mb-6">{taste.emoji}</div>
                      
                      {/* Sanskrit */}
                      <div className="text-3xl font-light text-orange-300 mb-2">
                        {taste.sanskrit}
                      </div>
                      
                      <h3 className="text-2xl font-light text-white mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {taste.english}
                      </h3>
                      
                      <p className="text-orange-200 text-lg mb-4 italic">
                        {taste.transliteration}
                      </p>
                      
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {taste.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Regional Culinary Kingdoms */}
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
                  राज्य पाक परंपरा
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">Regional Culinary Kingdoms</p>
                <p className="text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
                  Each state of India tells its own culinary story, shaped by geography, 
                  history, and centuries of regional tradition and innovation.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
                {regionalKingdoms.map((region, index) => (
                  <motion.div
                    key={region.state}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -20 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800 to-black border border-orange-500/20 backdrop-blur-lg">
                      
                      <div className="relative h-64">
                        <div className={`w-full h-full bg-gradient-to-br ${region.colors} opacity-80 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700`}>
                          {region.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {region.state}
                        </h3>
                        
                        <p className="text-gray-300 leading-relaxed text-lg mb-6">
                          {region.description}
                        </p>
                        
                        <div className="space-y-3">
                          <p className="text-orange-300 font-medium">Signature Specialties:</p>
                          <div className="flex flex-wrap gap-2">
                            {region.specialties.map((specialty, i) => (
                              <span key={i} className="px-3 py-1 bg-orange-500/20 backdrop-blur-sm rounded-full text-orange-200 text-sm border border-orange-400/30">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Modern Indian Masters */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.3) 0%, rgba(255, 140, 0, 0.2) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #ff4500 50%, #ff8c00 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Modern Culinary Masters
                </h2>
                <p className="text-2xl text-orange-200 max-w-5xl mx-auto leading-relaxed">
                  Contemporary innovators bridging ancient wisdom with global techniques, 
                  carrying Indian cuisine to new heights of recognition and artistry.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {modernMasters.map((master, index) => (
                  <motion.div
                    key={master.name}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-orange-900/30 to-black/80 backdrop-blur-lg border border-orange-500/30">
                      
                      <div className="relative h-80">
                        <div className={`w-full h-full bg-gradient-to-br ${master.color} flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700`}>
                          {master.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {master.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <Globe className="w-6 h-6 text-orange-400" />
                          <p className="text-orange-300 font-medium text-lg">
                            {master.location}
                          </p>
                        </div>
                        
                        <p className="text-2xl text-orange-200 font-light mb-4 italic">
                          {master.title}
                        </p>
                        
                        <p className="text-gray-300 mb-4">
                          {master.innovation}
                        </p>
                        
                        <blockquote className="text-orange-200 leading-relaxed italic border-l-2 border-orange-500 pl-4">
                          "{master.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Michelin Mastery - Global */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 140, 0, 0.3) 50%, rgba(0, 0, 0, 0.9) 100%)'
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
                  className="text-6xl md:text-7xl font-light mb-12"
                  style={{ 
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #ff8c00 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  From Street to Stars
                </h2>
                <p className="text-2xl text-yellow-200 max-w-5xl mx-auto leading-relaxed">
                  Indian restaurants conquering the global fine dining scene, 
                  earning Michelin recognition from Dubai to New York to Washington DC.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 mb-20">
                {michelinRestaurants.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.name}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-yellow-900/30 to-black/80 backdrop-blur-lg border border-yellow-500/30 p-8">
                      
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-3xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                            {restaurant.name}
                          </h3>
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin className="w-5 h-5 text-yellow-400" />
                            <span className="text-yellow-300">{restaurant.location}</span>
                          </div>
                          {restaurant.chef && (
                            <div className="flex items-center gap-3">
                              <ChefHat className="w-5 h-5 text-yellow-400" />
                              <span className="text-yellow-300">{restaurant.chef}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-1">
                          {[...Array(restaurant.stars)].map((_, i) => (
                            <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {restaurant.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Ancient Techniques, Modern Science */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.3) 0%, rgba(255, 140, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #228b22 30%, #ffd700 70%, #ff8c00 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Ancient Techniques, Modern Science
                </h2>
                <p className="text-2xl text-green-200 max-w-5xl mx-auto leading-relaxed">
                  4000-year-old cooking wisdom meets contemporary understanding, 
                  especially in the art of South Indian breakfast mastery.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16 mb-20">
                {/* South Indian Breakfast */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  <h3 className="text-5xl text-green-300 font-light mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
                    South Indian Breakfast Revolution
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🥞</span>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Dosa Mastery</h4>
                        <p className="text-gray-300">1000+ varieties, fermentation perfection, crispy artistry spanning regions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">⚪</span>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Idli Science</h4>
                        <p className="text-gray-300">Steam cooking, probiotic fermentation, complete protein nutrition</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🟡</span>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Vada Expertise</h4>
                        <p className="text-gray-300">Lentil donuts, oil temperature precision, perfect texture mastery</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🍲</span>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Sambar Symphony</h4>
                        <p className="text-gray-300">Tamarind base, lentil proteins, vegetable harmony in every spoonful</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Traditional Techniques */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                >
                  <h3 className="text-5xl text-orange-300 font-light mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Traditional Mastery
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🏺</span>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Tandoor Technology</h4>
                        <p className="text-gray-300">4000-year-old clay oven science, temperature control mastery</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">♨️</span>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Dum Cooking Philosophy</h4>
                        <p className="text-gray-300">Slow steam cooking where patience becomes the secret ingredient</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🦠</span>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Fermentation Wisdom</h4>
                        <p className="text-gray-300">Ancient probiotics for gut health through traditional fermentation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🔥</span>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Spice Tempering (Tadka)</h4>
                        <p className="text-gray-300">Oil temperature precision, aromatic chemistry, flavor release timing</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Indian Diaspora Influence */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.3) 0%, rgba(255, 20, 147, 0.2) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                  className="text-6xl md:text-7xl font-light mb-12"
                  style={{ 
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #4b0082 30%, #ff1493 70%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Global Indian Diaspora Excellence
                </h2>
                <p className="text-2xl text-purple-200 max-w-5xl mx-auto leading-relaxed mb-8">
                  How Indian cuisine conquered Britain and the world, evolving from humble curry houses 
                  to multiple Michelin-starred temples of gastronomy.
                </p>
                
                <blockquote className="text-xl text-pink-300 italic font-light">
                  "A great introduction to cultures is their cuisine. It not only reflects their evolution, 
                  but also their beliefs and traditions."
                </blockquote>
                <cite className="text-pink-400 font-medium">— Vikas Khanna</cite>
              </motion.div>

              {/* UK Michelin Mastery */}
              <div className="mb-20">
                <h3 className="text-5xl text-center text-purple-300 font-light mb-16" style={{ fontFamily: '"Playfair Display", serif' }}>
                  UK Michelin Indian Excellence
                </h3>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  {ukMichelinRestaurants.map((restaurant, index) => (
                    <motion.div
                      key={restaurant.name}
                      className="group"
                      initial={{ opacity: 0, y: 80 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/40 to-black/80 backdrop-blur-lg border border-purple-500/30 p-6">
                        
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-2xl text-white font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
                            {restaurant.name}
                          </h4>
                          <div className="flex gap-1">
                            {[...Array(restaurant.stars)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-purple-400 text-purple-400" />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-purple-300" />
                          <span className="text-purple-200 text-sm">{restaurant.location}</span>
                        </div>
                        
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {restaurant.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Global Fusion Stories */}
              <div className="grid lg:grid-cols-3 gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  <h4 className="text-3xl text-pink-300 font-light mb-4">🍛 Chicken Tikka Masala Chronicles</h4>
                  <p className="text-gray-300 leading-relaxed">
                    The great Glasgow vs London debate - how adaptation created Britain's beloved national dish, 
                    bridging cultures through curry.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                >
                  <h4 className="text-3xl text-pink-300 font-light mb-4">🏮 Indian-Chinese Revolution</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Kolkata's Tangra Chinatown story - how Hakka Chinese immigrants created 
                    Gobi Manchurian and revolutionized Indian taste buds.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                >
                  <h4 className="text-3xl text-pink-300 font-light mb-4">🌍 Global Fusion Innovations</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Naan tacos, curry ramen, tandoori pizza - how Indian techniques 
                    blend with global cuisines to create new culinary languages.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Street Food Culture */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.4) 0%, rgba(255, 69, 0, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #ff8c00 50%, #ff4500 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Democratic Food Culture
                </h2>
                <p className="text-2xl text-orange-200 max-w-5xl mx-auto leading-relaxed">
                  From roadside stalls to royal palates - Indian street food represents 
                  the purest form of culinary democracy where flavor knows no boundaries.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-4 gap-8">
                {[
                  { city: "Mumbai", icon: "🌶️", specialties: ["Vada Pav", "Bhel Puri", "Pav Bhaji"] },
                  { city: "Delhi", icon: "🫓", specialties: ["Chole Bhature", "Paranthas", "Chaat"] },
                  { city: "Kolkata", icon: "🐟", specialties: ["Puchka", "Kathi Rolls", "Telebhaja"] },
                  { city: "Chennai", icon: "☕", specialties: ["Sundal", "Bajji", "Filter Coffee"] }
                ].map((city, index) => (
                  <motion.div
                    key={city.city}
                    className="group text-center"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-orange-900/40 to-black/80 backdrop-blur-lg border border-orange-500/30 p-6">
                      <div className="text-6xl mb-4">{city.icon}</div>
                      
                      <h3 className="text-3xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {city.city}
                      </h3>
                      
                      <div className="space-y-2">
                        {city.specialties.map((specialty, i) => (
                          <span key={i} className="block px-3 py-1 bg-orange-500/20 backdrop-blur-sm rounded-full text-orange-200 text-sm border border-orange-400/30">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Festival Food Traditions */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 20, 147, 0.2) 25%, rgba(75, 0, 130, 0.2) 50%, rgba(255, 140, 0, 0.2) 75%, rgba(255, 215, 0, 0.2) 100%)'
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
                    background: 'linear-gradient(90deg, #ffd700 0%, #ff1493 25%, #4b0082 50%, #ff8c00 75%, #ffd700 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  उत्सव का भोजन
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">Festival Food Traditions</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  Food as celebration, spirituality through cuisine - where every festival 
                  brings its own flavors, customs, and sacred culinary rituals.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {[
                  {
                    festival: "Diwali",
                    description: "Sweets across regions, family traditions, light and sweetness",
                    foods: ["Laddu", "Barfi", "Gulab Jamun", "Kheer"],
                    colors: "from-yellow-500 to-orange-600",
                    emoji: "🪔"
                  },
                  {
                    festival: "Durga Puja",
                    description: "Bengali feast culture, community cooking, divine offerings",
                    foods: ["Khichuri", "Luchi", "Aloo Dum", "Mishti"],
                    colors: "from-red-500 to-pink-600",
                    emoji: "🌺"
                  },
                  {
                    festival: "Onam",
                    description: "Kerala sadya, 26-course vegetarian feast, banana leaf tradition",
                    foods: ["Sadya", "Payasam", "Avial", "Pachadi"],
                    colors: "from-green-500 to-emerald-600",
                    emoji: "🌿"
                  },
                  {
                    festival: "Pongal",
                    description: "Tamil harvest celebration, rice dishes, gratitude to nature",
                    foods: ["Sweet Pongal", "Ven Pongal", "Sakkarai Pongal", "Vadai"],
                    colors: "from-amber-500 to-yellow-600",
                    emoji: "🌾"
                  }
                ].map((festival, index) => (
                  <motion.div
                    key={festival.festival}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800/40 to-black/80 backdrop-blur-lg border border-white/10">
                      
                      <div className="relative h-64">
                        <div className={`w-full h-full bg-gradient-to-br ${festival.colors} opacity-70 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700`}>
                          {festival.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {festival.festival}
                        </h3>
                        
                        <p className="text-gray-300 leading-relaxed text-lg mb-6">
                          {festival.description}
                        </p>
                        
                        <div className="space-y-3">
                          <p className="text-yellow-300 font-medium">Traditional Foods:</p>
                          <div className="flex flex-wrap gap-2">
                            {festival.foods.map((food, i) => (
                              <span key={i} className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-200 text-sm border border-yellow-400/30">
                                {food}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Interactive Technique Videos */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-br from-orange-900/30 via-black to-red-900/30">
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
                  कला और तकनीक
                </h2>
                <p className="text-3xl text-orange-200 font-light mb-6">Art and Technique</p>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Experience the poetry of Indian cooking techniques, where every spice, 
                  every flame, every fermentation is an act of cultural preservation.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                <VideoSection
                  title="Spice Market Symphony"
                  description="The aromatic artistry of Indian spice blending and tempering"
                  emoji="🌶️"
                  className="h-80"
                />
                
                <VideoSection
                  title="Tandoor Fire Mastery"
                  description="4000-year-old clay oven technology in blazing action"
                  emoji="🔥"
                  className="h-80"
                />
                
                <VideoSection
                  title="Fermentation Wisdom"
                  description="Ancient probiotic science creating dosas and idlis"
                  emoji="🥞"
                  className="h-80"
                />
              </div>
            </div>
          </motion.section>

          {/* Epic Finale Transition */}
          <motion.section 
            className="h-screen flex items-center justify-center px-8 relative overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 69, 0, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(220, 20, 60, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.2) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a0a 0%, #2d1a0a 50%, #0a0a0a 100%)
              `
            }}
          >
            {/* Floating Indian Elements */}
            <div className="absolute inset-0">
              {[...Array(25)].map((_, i) => {
                const leftPos = (i * 16.3) % 100;
                const topPos = (i * 11.7) % 100;
                const yMovement = -50 - (i % 30);
                const duration = 12 + (i % 8);
                const delay = (i % 20) * 0.25;
                const spices = ['🌶️', '🧄', '🧅', '🌿', '⭐', '🥥', '🍛', '🫖', '🔥'];
                const spice = spices[i % spices.length];
                
                return (
                  <motion.div
                    key={i}
                    className="absolute text-3xl"
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                    }}
                    animate={{
                      y: [0, yMovement, 0],
                      opacity: [0.2, 1, 0.2],
                      rotate: [0, 360],
                      scale: [0.8, 1.3, 0.8]
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay,
                      ease: "easeInOut"
                    }}
                  >
                    {spice}
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
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-12 max-w-6xl mx-auto leading-relaxed"
                style={{ 
                  fontFamily: '"Playfair Display", serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 20%, #ff8c00 40%, #ff4500 60%, #dc143c 80%, #8b008b 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 80px rgba(255,140,0,0.4)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                "Indian cuisine is not just about feeding the body—it's about nourishing the soul, 
                healing through spices, and celebrating life through every grain of rice, 
                every simmering curry. India proves that food is the most 
                beautiful expression of love, culture, that transcends all borders."
              </motion.p>
              
              <motion.div
                className="flex items-center justify-center gap-20 mt-20"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.5, duration: 2 }}
              >
                <motion.span 
                  className="text-9xl drop-shadow-2xl"
                  animate={{ 
                    rotateY: [0, 15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🇮🇳
                </motion.span>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-orange-400 via-red-500 to-transparent"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-16 h-16 text-orange-400" />
                  </motion.div>
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-red-500 via-yellow-500 to-transparent"></div>
                </div>
                
                <motion.span 
                  className="text-9xl drop-shadow-2xl"
                  animate={{ 
                    rotateY: [0, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                  }}
                >
                  🌍
                </motion.span>
              </motion.div>
              
              <motion.p 
                className="text-orange-300 mt-12 text-2xl tracking-[0.3em] font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 4, duration: 1.5 }}
              >
                CULINARY JOURNEY COMPLETE
              </motion.p>
            </motion.div>
          </motion.section>
        </div>

        {/* Enhanced Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 w-20 h-20 z-30"
          style={{
            background: `conic-gradient(#ff8c00 ${scrollYProgress.get() * 360}deg, rgba(255,255,255,0.1) 0deg)`,
            borderRadius: '50%',
            padding: '3px'
          }}
        >
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-orange-500/30 backdrop-blur-md">
            <div className="text-center">
              <span className="text-white text-sm font-bold block">
                {Math.round(scrollYProgress.get() * 100)}%
              </span>
              <span className="text-orange-400 text-lg">
                🌶️
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
        {showQuote && <VikasKhannaQuote />}
      </AnimatePresence>
      
      {!showQuote && <IndianSection />}
    </div>
  );
};

export default IndianCulinaryJourney;
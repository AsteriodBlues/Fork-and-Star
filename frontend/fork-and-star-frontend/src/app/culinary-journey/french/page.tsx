"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Star, Award, MapPin, ChefHat, Play, Pause, Wine, Crown, Utensils, Sparkles, Globe, Leaf } from 'lucide-react';

const FrenchCulinaryJourney = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuote, setShowQuote] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Joël Robuchon Quote Animation Component - Transition from Japan
  const RobuchonQuote = () => {
    const quoteRef = useRef(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowQuote(false);
      }, 14000); // Extended for deeper contemplation
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
            radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(75, 0, 130, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #1a0f0a 0%, #2d1a0d 50%, #1a0f0a 100%)
          `
        }}
      >
        {/* Floating French Elements */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => {
            const leftPos = (i * 14.3) % 100;
            const topPos = (i * 8.7) % 100;
            const xMovement = (i % 2 === 0 ? 1 : -1) * (25 + (i % 15));
            const yMovement = (i % 2 === 0 ? 1 : -1) * (25 + (i % 15));
            const duration = 7 + (i % 5);
            const delay = (i % 12) * 0.4;
            const emojis = ['🍷', '🥖', '🧀', '🥐', '🍾'];
            const emoji = emojis[i % emojis.length];
            
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
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.6],
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
                {emoji}
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
                🇯🇵
              </motion.span>
              <div className="w-32 h-px bg-gradient-to-r from-pink-400 via-yellow-400 to-red-600"></div>
              <motion.span 
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                🇫🇷
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
                background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 20%, #dc143c 40%, #8b4513 60%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 60px rgba(255,215,0,0.5)',
                letterSpacing: '0.02em'
              }}
            >
              "As a chef you take certain measures to ensure that when you are cooking 
              for someone important, maybe your mother or your girlfriend, that you don't make mistakes - 
              when you cook for other people, whether it is strangers or not, 
              you have to make sure it is absolutely perfect."
            </blockquote>
            
            <motion.cite
              className="text-2xl text-yellow-300 font-medium tracking-wider block"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                textShadow: '0 0 30px rgba(255,215,0,0.6)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2 }}
            >
              — Joël Robuchon, Master of Perfection
            </motion.cite>
          </motion.div>

          {/* Journey Beginning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 10, duration: 2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <span className="text-lg text-yellow-200 uppercase tracking-[0.3em] font-medium">
                Enter the Art of Culinary Mastery
              </span>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
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
              🍾
            </motion.div>
          </motion.div>
        </div>

        {/* Video Preview */}
        <motion.div
          className="absolute bottom-8 right-8 w-32 h-24 rounded-lg overflow-hidden border border-yellow-400/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 12, duration: 1 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-red-700 flex items-center justify-center text-4xl">
            🍾
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
        <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-red-700 flex items-center justify-center">
          <span className="text-8xl">{emoji}</span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="flex items-center justify-center w-16 h-16 bg-yellow-500/20 backdrop-blur-md rounded-full border border-yellow-300/30 transition-all duration-300 hover:bg-yellow-500/30 hover:scale-110">
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

  // Main French Journey Section
  const FrenchSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

    const fivePillars = [
      {
        french: "Technique",
        english: "Technical Mastery",
        description: "Mother sauces, knife skills, and classical methods perfected over centuries",
        color: "from-slate-400 to-gray-600",
        emoji: "🔪"
      },
      {
        french: "Terroir",
        english: "Connection to Land",
        description: "Deep respect for regional specialties and local ingredient mastery",
        color: "from-green-600 to-emerald-800",
        emoji: "🌱"
      },
      {
        french: "Savoir-Vivre",
        english: "Art of Living",
        description: "Dining as cultural ceremony, meals as theatrical art forms",
        color: "from-yellow-500 to-amber-700",
        emoji: "🍷"
      },
      {
        french: "Innovation",
        english: "Constant Evolution",
        description: "Pushing boundaries while deeply respecting classical foundations",
        color: "from-blue-500 to-indigo-700",
        emoji: "⚡"
      },
      {
        french: "Excellence",
        english: "Pursuit of Perfection",
        description: "Michelin standards, relentless perfectionism, culinary artistry supreme",
        color: "from-red-600 to-burgundy-800",
        emoji: "⭐"
      }
    ];

    const frenchMasters = [
      {
        name: "Auguste Escoffier",
        title: "The King of Chefs",
        era: "Classical Foundation (1846-1935)",
        restaurant: "Savoy Hotel London",
        signature: "Peach Melba, Tournedos Rossini",
        philosophy: "Good cooking is when things taste of what they are",
        color: "from-yellow-600 to-amber-700",
        emoji: "👑"
      },
      {
        name: "Joël Robuchon",
        title: "Most Michelin Stars Ever",
        era: "Modern Perfection (32 Stars)",
        restaurant: "L'Atelier de Joël Robuchon",
        signature: "Pommes de terre purée",
        philosophy: "Simplicity is the ultimate sophistication",
        color: "from-red-600 to-black",
        emoji: "⭐"
      },
      {
        name: "Alain Ducasse",
        title: "Global Empire Builder", 
        era: "Contemporary Innovation (21 Stars)",
        restaurant: "Le Louis XV Monaco",
        signature: "Mediterranean luxury cuisine",
        philosophy: "Cooking is about emotion, it's about love",
        color: "from-blue-600 to-teal-700",
        emoji: "🌍"
      },
      {
        name: "Anne-Sophie Pic",
        title: "Female Excellence",
        era: "New Generation (First woman 3★ in France)",
        restaurant: "Maison Pic (Valence)",
        signature: "White millefeuille with Périgord caviar",
        philosophy: "I cook with my emotions and my memories",
        color: "from-pink-400 to-rose-600",
        emoji: "👩‍🍳"
      }
    ];

    const innovationMasters = [
      {
        name: "Pierre Gagnaire",
        restaurant: "Pierre Gagnaire Paris",
        stars: 3,
        specialty: "Molecular Gastronomy Pioneer",
        innovation: "Fusion cuisine, unexpected flavor combinations",
        color: "from-purple-600 to-indigo-800"
      },
      {
        name: "Guy Savoy", 
        restaurant: "Monnaie de Paris",
        stars: 3,
        specialty: "Sous Vide Mastery",
        innovation: "Temperature precision, texture perfection",
        color: "from-blue-600 to-cyan-800"
      },
      {
        name: "Thierry Marx",
        restaurant: "Sur Mesure",
        stars: 2,
        specialty: "Scientific Precision",
        innovation: "Military precision meets molecular techniques",
        color: "from-gray-600 to-slate-800"
      },
      {
        name: "Christophe Michalak",
        restaurant: "Pastry Innovation",
        stars: 0,
        specialty: "Fermentation Artistry",
        innovation: "Fermentation in desserts, bread-pastry fusion",
        color: "from-orange-500 to-red-700"
      }
    ];

    const sustainabilityMasters = [
      {
        name: "Alain Passard",
        restaurant: "L'Arpège",
        stars: 3,
        focus: "Vegetable Garden Revolution",
        innovation: "Removed meat, focused on garden vegetables",
        philosophy: "The vegetable is the new luxury",
        emoji: "🥬"
      },
      {
        name: "Mauro Colagreco",
        restaurant: "Mirazur",
        stars: 3,
        focus: "Biodynamic Gardens",
        innovation: "Lunar calendar cooking, garden-to-table",
        philosophy: "We cook with the moon and the seasons",
        emoji: "🌿"
      },
      {
        name: "Christopher Coutanceau",
        restaurant: "La Table",
        stars: 2,
        focus: "Ocean Sustainability",
        innovation: "Sustainable seafood, ocean-to-table philosophy",
        philosophy: "The ocean is our garden, we must protect it",
        emoji: "🌊"
      },
      {
        name: "Olivier Roellinger",
        restaurant: "Le Coquillage",
        stars: 0,
        focus: "Ethical Spice Routes",
        innovation: "Sustainable sourcing, spice heritage preservation",
        philosophy: "Spices tell the story of humanity",
        emoji: "🌶️"
      }
    ];

    const regions = [
      {
        name: "Provence",
        description: "Lavender fields, Mediterranean soul, olive grove mastery",
        colors: "from-purple-500 to-green-600",
        specialties: ["Bouillabaisse", "Ratatouille", "Tapenade"],
        emoji: "💜"
      },
      {
        name: "Burgundy",
        description: "Ancient vineyards, truffle hunting, wine ceremonies",
        colors: "from-red-700 to-yellow-600", 
        specialties: ["Coq au Vin", "Boeuf Bourguignon", "Escargots"],
        emoji: "🍷"
      },
      {
        name: "Normandy",
        description: "Apple orchards, coastal cream, rustic elegance",
        colors: "from-green-500 to-yellow-400",
        specialties: ["Calvados", "Camembert", "Cider"],
        emoji: "🍎"
      },
      {
        name: "Brittany",
        description: "Wild coastlines, seafood traditions, Celtic influences",
        colors: "from-blue-600 to-teal-500",
        specialties: ["Crêpes", "Oysters", "Cider"],
        emoji: "🌊"
      }
    ];

    return (
      <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
        
        {/* Enhanced Multi-Video Background */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-red-700 opacity-30 flex items-center justify-center text-9xl">
              🍾
            </div>
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-purple-700 opacity-25 flex items-center justify-center text-9xl">
              🥖
            </div>
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-700 opacity-30 flex items-center justify-center text-9xl">
              🍷
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-yellow-900/30" />
        </div>

        {/* Country Header with French Elegance */}
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
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                🇫🇷
              </motion.span>
              <div>
                <motion.h1 
                  className="text-8xl md:text-9xl lg:text-[10rem] font-light tracking-tight mb-4"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 20%, #dc143c 40%, #8b4513 60%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 80px rgba(255,215,0,0.4)'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 2 }}
                >
                  FRANÇAISE
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl text-yellow-300 font-light tracking-[0.3em]"
                  style={{ 
                    textShadow: '0 0 40px rgba(255,215,0,0.8)',
                    fontFamily: '"Inter", system-ui, sans-serif'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 2 }}
                >
                  THE ART OF CULINARY MASTERY
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Content Sections */}
        <div className="relative z-10 pt-[30rem]">

          {/* Evolution Timeline Section */}
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #dc143c 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  From Royal Courts to Global Mastery
                </h2>
                <p className="text-2xl text-yellow-200 max-w-5xl mx-auto leading-relaxed">
                  French cuisine's journey from medieval guilds to modern molecular gastronomy - 
                  a story of refinement, innovation, and the relentless pursuit of perfection.
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
                    <div className="w-full h-96 bg-gradient-to-br from-yellow-600 to-amber-800 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700">
                      👑
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="text-yellow-200 font-medium text-xl tracking-wider">MEDIEVAL</span>
                    </div>
                  </div>
                  <h3 className="text-4xl text-yellow-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Royal Foundations
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Versailles banquets and guild masters laid the groundwork for culinary excellence, 
                    establishing France as the epicenter of gastronomic artistry.
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
                    <div className="w-full h-96 bg-gradient-to-br from-red-600 to-burgundy-800 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700">
                      🎩
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="text-red-200 font-medium text-xl tracking-wider">CLASSICAL</span>
                    </div>
                  </div>
                  <h3 className="text-4xl text-red-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Escoffier Revolution
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    The brigade system and mother sauces codified French cooking, creating 
                    the foundation upon which all modern cuisine stands.
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
                    <div className="w-full h-96 bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700">
                      ⚗️
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="text-blue-200 font-medium text-xl tracking-wider">MODERN</span>
                    </div>
                  </div>
                  <h3 className="text-4xl text-blue-400 font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Innovation Era
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Nouvelle cuisine and molecular gastronomy push boundaries while honoring 
                    classical traditions, creating the future of French cuisine.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Five Sacred Pillars */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, rgba(25, 25, 112, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #dc143c 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Les Cinq Piliers
                </h2>
                <p className="text-3xl text-yellow-200 font-light mb-6">The Five Sacred Pillars</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  The fundamental principles that elevate French cuisine from mere cooking 
                  to high art, refined over centuries of culinary excellence.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {fivePillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.english}
                    className="group text-center"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15, scale: 1.05 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800/40 to-black/60 backdrop-blur-lg border border-yellow-500/20 p-8">
                      <div className="text-6xl mb-6">{pillar.emoji}</div>
                      
                      <h3 className="text-2xl font-light text-white mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {pillar.french}
                      </h3>
                      
                      <p className="text-yellow-300 text-lg mb-4 font-medium">
                        {pillar.english}
                      </p>
                      
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* French Masters Across Eras */}
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
                  Maîtres de la Cuisine
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">Masters Across the Ages</p>
                <p className="text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
                  Four generations of culinary giants who shaped not just French cuisine, 
                  but the very concept of fine dining around the world.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {frenchMasters.map((master, index) => (
                  <motion.div
                    key={master.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                    whileHover={{ y: -20 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800 to-black border border-yellow-500/20 backdrop-blur-lg">
                      
                      {/* Master Portrait */}
                      <div className="relative h-80">
                        <div className={`w-full h-full bg-gradient-to-br ${master.color} flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700`}>
                          {master.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        
                        {/* Era Badge */}
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-yellow-500/20 backdrop-blur-md rounded-full text-yellow-300 text-sm font-medium border border-yellow-400/30">
                            {master.era.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {master.name}
                        </h3>
                        
                        <p className="text-2xl text-yellow-300 font-light mb-4 italic">
                          {master.title}
                        </p>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <ChefHat className="w-6 h-6 text-yellow-400" />
                          <p className="text-yellow-300 font-medium text-lg">
                            {master.restaurant}
                          </p>
                        </div>
                        
                        <p className="text-gray-300 mb-4">
                          <strong>Signature:</strong> {master.signature}
                        </p>
                        
                        <blockquote className="text-gray-300 leading-relaxed text-lg italic border-l-2 border-yellow-500 pl-6">
                          "{master.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Innovation Showcase */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.4) 0%, rgba(25, 25, 112, 0.3) 50%, rgba(75, 0, 130, 0.4) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #8b0000 50%, #4b0082 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Innovation Laboratory
                </h2>
                <p className="text-2xl text-red-200 max-w-5xl mx-auto leading-relaxed">
                  Where French chefs pioneered molecular gastronomy, sous vide precision, 
                  and fermentation artistry - transforming cooking into culinary science.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {innovationMasters.map((master, index) => (
                  <motion.div
                    key={master.name}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-red-900/30 to-black/80 backdrop-blur-lg border border-red-500/30">
                      
                      <div className="relative h-64">
                        <div className={`w-full h-full bg-gradient-to-br ${master.color} flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-700`}>
                          ⚗️
                        </div>
                        
                        {/* Stars */}
                        {master.stars > 0 && (
                          <div className="absolute top-4 right-4 flex gap-1">
                            {[...Array(master.stars)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-red-400 text-red-400" />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-2xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {master.name}
                        </h3>
                        
                        <p className="text-red-300 font-medium mb-2">
                          {master.restaurant}
                        </p>
                        
                        <p className="text-red-200 text-lg font-medium mb-3">
                          {master.specialty}
                        </p>
                        
                        <p className="text-gray-300 leading-relaxed">
                          {master.innovation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Green Sustainability Revolution */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.3) 0%, rgba(0, 100, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #228b22 50%, #006400 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Révolution Verte
                </h2>
                <p className="text-3xl text-green-200 font-light mb-6">The Green Revolution</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  French chefs leading the sustainable cuisine movement, proving that 
                  environmental consciousness and culinary excellence are inseparable.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                {sustainabilityMasters.map((master, index) => (
                  <motion.div
                    key={master.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-green-800/40 to-black/80 backdrop-blur-lg border border-green-500/30">
                      
                      <div className="relative h-64 flex items-center justify-center">
                        <span className="text-9xl">{master.emoji}</span>
                        
                        {/* Stars */}
                        {master.stars > 0 && (
                          <div className="absolute top-4 right-4 flex gap-1">
                            {[...Array(master.stars)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-green-400 text-green-400" />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-3xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {master.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <Leaf className="w-6 h-6 text-green-400" />
                          <p className="text-green-300 font-medium text-lg">
                            {master.restaurant}
                          </p>
                        </div>
                        
                        <p className="text-green-200 text-xl font-medium mb-4">
                          {master.focus}
                        </p>
                        
                        <p className="text-gray-300 mb-4">
                          {master.innovation}
                        </p>
                        
                        <blockquote className="text-green-200 leading-relaxed italic border-l-2 border-green-500 pl-4">
                          "{master.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Regional Terroir */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(45deg, rgba(128, 0, 128, 0.2) 0%, rgba(255, 165, 0, 0.2) 25%, rgba(0, 128, 0, 0.2) 50%, rgba(0, 191, 255, 0.2) 75%, rgba(128, 0, 128, 0.2) 100%)'
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
                    background: 'linear-gradient(90deg, #800080 0%, #ffa500 25%, #008000 50%, #00bfff 75%, #800080 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Terroir Français
                </h2>
                <p className="text-2xl text-gray-200 max-w-5xl mx-auto leading-relaxed">
                  Each region of France tells its story through ingredients, techniques, and flavors 
                  shaped by centuries of local tradition and geographical identity.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {regions.map((region, index) => (
                  <motion.div
                    key={region.name}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800/30 to-black/70 backdrop-blur-lg border border-white/10">
                      
                      <div className="relative h-80">
                        <div className={`w-full h-full bg-gradient-to-br ${region.colors} opacity-80 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700`}>
                          {region.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {region.name}
                        </h3>
                        
                        <p className="text-gray-300 leading-relaxed text-lg mb-6">
                          {region.description}
                        </p>
                        
                        <div className="space-y-2">
                          <p className="text-yellow-300 font-medium">Signature Specialties:</p>
                          <div className="flex flex-wrap gap-2">
                            {region.specialties.map((specialty, i) => (
                              <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
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

          {/* Interactive Technique Videos */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-br from-yellow-900/30 via-black to-red-900/30">
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
                  L'Art Technique
                </h2>
                <p className="text-3xl text-yellow-200 font-light mb-6">The Art of Technique</p>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Witness the precision and artistry of French culinary techniques, 
                  where every movement is choreographed perfection.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                <VideoSection
                  title="Sauce Mastery"
                  description="The five mother sauces - foundation of all French cooking"
                  emoji="🥄"
                  className="h-80"
                />
                
                <VideoSection
                  title="Pastry Architecture"
                  description="Building edible sculptures with precision and artistry"
                  emoji="🎂"
                  className="h-80"
                />
                
                <VideoSection
                  title="Wine Ceremony"
                  description="The ritual of wine service - from cork to glass"
                  emoji="🍷"
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
                radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(220, 20, 60, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a0a 0%, #2d1a0d 50%, #0a0a0a 100%)
              `
            }}
          >
            {/* Floating French Elements */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => {
                const leftPos = (i * 18.7) % 100;
                const topPos = (i * 13.3) % 100;
                const yMovement = -40 - (i % 25);
                const duration = 10 + (i % 6);
                const delay = (i % 15) * 0.3;
                const emojis = ['🍾', '🥖', '🧀', '🍷', '👨‍🍳'];
                const emoji = emojis[i % emojis.length];
                
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
                      scale: [0.8, 1.2, 0.8]
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
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 30%, #dc143c 60%, #8b4513 80%, #ffffff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 80px rgba(255,215,0,0.4)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                "French cuisine taught the world that cooking is not just sustenance—it is culture, 
                it is art, it is the expression of a civilization's soul through the alchemy of fire, 
                technique, and passion. From royal courts to molecular laboratories, 
                France continues to define culinary excellence."
              </motion.p>
              
              <motion.div
                className="flex items-center justify-center gap-20 mt-20"
                initial={{ opacity: 0, scale: 0.8 }}
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
                  🇫🇷
                </motion.span>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-yellow-400 via-red-500 to-transparent"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Crown className="w-16 h-16 text-yellow-400" />
                  </motion.div>
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-red-500 via-purple-500 to-transparent"></div>
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
                  🇮🇳
                </motion.span>
              </motion.div>
              
              <motion.p 
                className="text-yellow-300 mt-12 text-2xl tracking-[0.3em] font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 4, duration: 1.5 }}
              >
                NEXT: INDIAN MASTERY
              </motion.p>
            </motion.div>
          </motion.section>
        </div>

        {/* Enhanced Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 w-20 h-20 z-30"
          style={{
            background: `conic-gradient(#ffd700 ${scrollYProgress.get() * 360}deg, rgba(255,255,255,0.1) 0deg)`,
            borderRadius: '50%',
            padding: '3px'
          }}
        >
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-yellow-500/30 backdrop-blur-md">
            <div className="text-center">
              <span className="text-white text-sm font-bold block">
                {Math.round(scrollYProgress.get() * 100)}%
              </span>
              <span className="text-yellow-400 text-lg">
                🍾
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
        {showQuote && <RobuchonQuote />}
      </AnimatePresence>
      
      {!showQuote && <FrenchSection />}
    </div>
  );
};

export default FrenchCulinaryJourney;
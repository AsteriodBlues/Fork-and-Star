"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Award, ChefHat, Play, Pause, Crown, Globe, Leaf, Zap, Heart, Users, ArrowDown } from 'lucide-react';

// Define the rich color palette for Spanish culture
const spanishColors = {
  passion: '#C41E3A', // Deep Spanish Red - passion, intensity, flamenco
  oro: '#FFD700',     // Spanish Gold - luxury, triumph, excellence
  sangre: '#8B0000',    // Dark Red - tradition, heritage, intensity
  fuego: '#FF4500',    // Fire Orange - creativity, energy, innovation
  tierra: '#8B4513',   // Earth Brown - authenticity, roots, tradition
  mar: '#006994',      // Mediterranean Blue - freedom, exploration, modernity
  oliva: '#6B8E23',    // Olive Green - peace, sustainability, Mediterranean life
  noche: '#0F0F23',    // Spanish Night - mystery, elegance, sophistication
};

const SpanishCulinaryJourney = () => {
  const containerRef = useRef(null);
  const [showQuote, setShowQuote] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Ferran Adrià Quote Animation Component
  const AdriaQuote = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowQuote(false);
      }, 14000); // Allow time for the quote to be appreciated
      return () => clearTimeout(timer);
    }, []);

    if (!showQuote) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(196, 30, 58, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 69, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #1a0a0a 0%, #2d1a0d 50%, #1a0a0a 100%)
          `
        }}
      >
        {/* Floating Spanish Elements */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => {
            const leftPos = (i * 14.7) % 100;
            const topPos = (i * 10.3) % 100;
            const xMovement = (i % 2 === 0 ? 1 : -1) * (20 + (i % 10));
            const yMovement = (i % 2 === 0 ? 1 : -1) * (20 + (i % 10));
            const duration = 9 + (i % 7);
            const delay = (i % 12) * 0.35;
            const emojis = ['💃', '🔥', '🍷', '🥘', '🇪🇸'];
            const emoji = emojis[i % emojis.length];

            return (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{ left: `${leftPos}%`, top: `${topPos}%` }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.7],
                  rotate: [0, 180, 360],
                  x: [0, xMovement],
                  y: [0, yMovement]
                }}
                transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
              >
                {emoji}
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-6xl px-8 text-center relative z-10">
           {/* Transition Line from India to Spain */}
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
                🇮🇳
              </motion.span>
              <div className="w-32 h-px bg-gradient-to-r from-red-600 via-yellow-500 to-red-600"></div>
              <motion.span 
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                🇪🇸
              </motion.span>
            </div>
          </motion.div>

          {/* Main Quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 2.5 }}
            className="mb-12"
          >
            <blockquote
              className="text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed mb-8"
              style={{
                fontFamily: '"Playfair Display", serif',
                background: `linear-gradient(135deg, #ffffff 0%, ${spanishColors.oro} 30%, ${spanishColors.passion} 60%, ${spanishColors.sangre} 80%, #ffffff 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 0 80px ${spanishColors.fuego}40`,
                letterSpacing: '0.02em'
              }}
            >
              "La creatividad significa no copiar."
              <span className="block text-2xl md:text-3xl text-gray-300 font-sans italic mt-4">
                (Creativity means not copying.)
              </span>
            </blockquote>
            <motion.cite
              className="text-2xl text-yellow-300 font-medium tracking-wider block"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                textShadow: `0 0 30px ${spanishColors.oro}90`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 2 }}
            >
              — Ferran Adrià, Father of Molecular Gastronomy
            </motion.cite>
          </motion.div>

          {/* Journey Beginning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 11, duration: 2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
              <span className="text-lg text-yellow-200 uppercase tracking-[0.3em] font-medium">
                Enter the Soul of Innovation
              </span>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            </div>
            <motion.div
              className="text-6xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              🔥
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  interface VideoSectionProps {
    title: string;
    description: string;
    emoji: string;
    className?: string;
  }

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
        <div className="w-full h-full bg-gradient-to-br from-red-600 to-yellow-700 flex items-center justify-center">
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

  const SpanishSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

    const spanishValues = [
      { name: "Sobremesa", spanish: "La Sobremesa", description: "The sacred time spent lingering at the table after a meal, where real connections are forged through conversation and shared presence.", culinaryExpression: "Restaurants design experiences that encourage guests to stay, savor, and connect.", colorTheme: "passion", icon: <Heart/> },
      { name: "Convivencia", spanish: "La Convivencia", description: "The art of living together harmoniously, celebrating diversity and finding unity through shared experiences.", culinaryExpression: "Fusion cuisine that honors multiple traditions simultaneously, creating harmony from diversity.", colorTheme: "oliva", icon: <Users/> },
      { name: "Tertulia", spanish: "La Tertulia", description: "Informal gatherings where ideas are debated with passion. A feast for the mind.", culinaryExpression: "Chef's tables and open kitchens that treat cooking as an intellectual and artistic pursuit.", colorTheme: "fuego", icon: <Zap/> },
      { name: "Duende", spanish: "El Duende", description: "The untranslatable concept of soulful, authentic expression that transcends technique.", culinaryExpression: "Dishes that move beyond mere technique to evoke deep emotions, touching the soul.", colorTheme: "noche", icon: <motion.div animate={{scale: [1, 1.1, 1]}} transition={{duration: 2, repeat: Infinity}}>✨</motion.div> }
    ];

    type SpanishColorKey = keyof typeof spanishColors;
    interface CulinaryEra {
      period: string;
      title: string;
      description: string;
      colorTheme: SpanishColorKey;
      icon: string;
    }
    const culinaryEras: CulinaryEra[] = [
      { period: "1939-1975", title: "La Dictadura Gastronómica", description: "Franco's regime suppressed regional cuisines, forcing underground preservation of culinary traditions.", colorTheme: "noche", icon: "🕯️" },
      { period: "1975-1990", title: "La Transición Culinaria", description: "A post-Franco explosion of regional pride and international exchange transformed Spanish kitchens.", colorTheme: "passion", icon: "🦋" },
      { period: "1990-2005", title: "La Revolución Molecular", description: "Ferran Adrià's elBulli sparked a scientific approach to cooking that redefined global gastronomy.", colorTheme: "fuego", icon: "🧪" },
      { period: "2005-Present", title: "La Nueva Escuela Española", description: "Young chefs blend global techniques with hyper-local ingredients, creating a diverse culinary landscape.", colorTheme: "oro", icon: "🌟" }
    ];

    const modernMasters = [
      { name: "Dabiz Muñoz", restaurant: "DiverXO", location: "Madrid", innovation: "Asian-Spanish fusion that breaks all culinary rules.", colorTheme: "fuego", emoji: "💥" },
      { name: "Quique Dacosta", restaurant: "Quique Dacosta", location: "Dénia", innovation: "Reimagining Mediterranean vegetables as luxury ingredients.", colorTheme: "mar", emoji: "🌊" },
      { name: "Ángel León", restaurant: "Aponiente", location: "El Puerto de Santa María", innovation: "The 'Chef of the Sea' who cooks with marine bioluminescence and plankton.", colorTheme: "mar", emoji: "🐠" },
      { name: "Joan Roca", restaurant: "El Celler de Can Roca", location: "Girona", innovation: "A trio of brothers who masterfully blend tradition, science, and emotion.", colorTheme: "tierra", emoji: "🌍" }
    ];
    
    return (
      <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            <div className="w-full h-full bg-gradient-to-br from-red-700 to-yellow-800 opacity-30 flex items-center justify-center text-9xl">💃</div>
            <div className="w-full h-full bg-gradient-to-br from-yellow-700 to-orange-800 opacity-25 flex items-center justify-center text-9xl">🔥</div>
            <div className="w-full h-full bg-gradient-to-br from-orange-700 to-red-800 opacity-30 flex items-center justify-center text-9xl">🍷</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-transparent to-yellow-900/40" />
        </div>

        {/* Header */}
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
                animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                🇪🇸
              </motion.span>
              <div>
                <motion.h1 
                  className="text-8xl md:text-9xl lg:text-[10rem] font-light tracking-tight mb-4"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    background: `linear-gradient(135deg, #ffffff 0%, ${spanishColors.oro} 30%, ${spanishColors.passion} 60%, ${spanishColors.sangre} 80%, #ffffff 100%)`,
                    backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    textShadow: `0 0 80px ${spanishColors.fuego}50`
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 2 }}
                >
                  ESPAÑA
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl text-yellow-300 font-light tracking-[0.3em]"
                  style={{ textShadow: `0 0 40px ${spanishColors.oro}80`, fontFamily: '"Inter", system-ui, sans-serif' }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 2 }}
                >
                  THE SOUL OF INNOVATION
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 pt-[30rem]">
          {/* Section 1: The Soul of Spain */}
          <motion.section 
              className="min-h-screen flex items-center px-8 py-20"
              style={{ background: 'linear-gradient(135deg, rgba(196, 30, 58, 0.2) 0%, rgba(255, 69, 0, 0.15) 50%, rgba(0, 0, 0, 0.8) 100%)' }}
          >
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-24"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.5 }}
              >
                <h2 className="text-7xl md:text-8xl font-light mb-8" style={{ fontFamily: '"Playfair Display", serif', color: spanishColors.oro, textShadow: `0 0 60px ${spanishColors.oro}40`}}>
                  El Alma Española
                </h2>
                <p className="text-2xl text-yellow-200 max-w-4xl mx-auto leading-relaxed">
                  Spanish cuisine is the culinary expression of profound cultural values that shape its unique identity.
                </p>
              </motion.div>
              <div className="grid lg:grid-cols-2 gap-12">
                {spanishValues.map((value, index) => (
                  <motion.div
                    key={value.name}
                    className="group"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800/40 to-black/60 backdrop-blur-lg border p-8" style={{borderColor: `${spanishColors[value.colorTheme as keyof typeof spanishColors]}40`}}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl" style={{color: spanishColors[value.colorTheme as keyof typeof spanishColors]}}>{value.icon}</div>
                        <h3 className="text-3xl text-white font-light" style={{ fontFamily: '"Playfair Display", serif' }}>{value.spanish}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-4">{value.description}</p>
                      <p className="text-sm text-yellow-200 italic border-l-2 pl-4" style={{borderColor: spanishColors[value.colorTheme as keyof typeof spanishColors]}}>{value.culinaryExpression}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 2: Modern Evolution */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90">
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-24"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.5 }}
              >
                <h2 className="text-7xl md:text-8xl font-light mb-8" style={{ fontFamily: '"Playfair Display", serif', color: '#fff', textShadow: `0 0 60px ${spanishColors.passion}40` }}>
                  La Evolución Moderna
                </h2>
                <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">From dictatorship to global dominance — how Spain's tumultuous 20th century forged a culinary revolution.</p>
              </motion.div>
              <div className="grid lg:grid-cols-2 gap-10">
                {culinaryEras.map((era, index) => (
                  <motion.div
                    key={era.period}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.2, delay: index * 0.25 }}
                  >
                    <div className="relative p-8 rounded-3xl bg-gray-900/50 border border-gray-700/50 h-full">
                      <div className="absolute -top-5 -left-5 text-5xl" style={{color: spanishColors[era.colorTheme as SpanishColorKey]}}>{era.icon}</div>
                      <h4 className="text-xl font-mono" style={{color: spanishColors[era.colorTheme as SpanishColorKey]}}>{era.period}</h4>
                      <h3 className="text-4xl text-white font-light my-3" style={{ fontFamily: '"Playfair Display", serif' }}>{era.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{era.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 3: The New Masters */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{ background: `linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 69, 0, 0.25) 50%, rgba(0, 0, 0, 0.8) 100%)` }}
          >
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-24"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.5 }}
              >
                <h2 className="text-7xl md:text-8xl font-light mb-8" style={{ fontFamily: '"Playfair Display", serif', background: `linear-gradient(135deg, #ffffff, ${spanishColors.oro})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  Los Nuevos Maestros
                </h2>
                <p className="text-2xl text-yellow-200 max-w-4xl mx-auto leading-relaxed">Visionary chefs writing the next chapter of Spanish gastronomy, bringing their region's soul to the global stage.</p>
              </motion.div>
              <div className="grid lg:grid-cols-2 gap-16">
                {modernMasters.map((master, index) => (
                  <motion.div
                    key={master.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-yellow-900/30 to-black/80 backdrop-blur-lg border border-yellow-500/30">
                      <div className={`relative h-80 bg-gradient-to-br from-${master.colorTheme}-600 to-${master.colorTheme}-800 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700`}>
                        {master.emoji}
                      </div>
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>{master.name}</h3>
                        <div className="flex items-center gap-3 mb-4">
                          <ChefHat className="w-6 h-6 text-yellow-400" />
                          <p className="text-yellow-300 font-medium text-lg">{master.restaurant}</p>
                        </div>
                        <p className="text-lg text-gray-300 mb-4">{master.innovation}</p>
                        <div className="flex items-center gap-2 text-sm text-yellow-400">
                          <MapPin className="w-4 h-4" />
                          <span>{master.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
            
          {/* Interactive Technique Videos */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-br from-red-900/30 via-black to-yellow-900/30">
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.5 }}
              >
                  <h2 className="text-7xl md:text-8xl font-light mb-8" style={{ fontFamily: '"Playfair Display", serif', color: '#fff', textShadow: '0 0 60px rgba(255,255,255,0.3)' }}>
                    Arte y Técnica
                  </h2>
                  <p className="text-3xl text-yellow-200 font-light mb-6">Art and Technique</p>
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    Experience the poetry of Spanish cooking, where every flame and every ingredient is an act of cultural preservation.
                  </p>
              </motion.div>
              <div className="grid lg:grid-cols-3 gap-12">
                  <VideoSection title="The Art of Jamón" description="Generations of mastery in every slice of Ibérico ham." emoji="🍖" className="h-80" />
                  <VideoSection title="Paella Fire Mastery" description="The ritual of fire and rice that unites communities." emoji="🥘" className="h-80" />
                  <VideoSection title="The Science of Tapas" description="From classic Gilda to modern spherification, the art of small plates." emoji="🍸" className="h-80" />
              </div>
            </div>
          </motion.section>

          {/* Epic Finale */}
          <motion.section
            className="h-screen flex items-center justify-center px-8"
            style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #2d1a0d 50%, #0a0a0a 100%)' }}
          >
            <motion.div
              className="text-center relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            >
              <motion.p 
                className="text-4xl md:text-5xl font-light mb-12 max-w-6xl mx-auto leading-relaxed"
                style={{ 
                  fontFamily: '"Playfair Display", serif',
                  background: `linear-gradient(135deg, #ffffff 0%, ${spanishColors.oro} 40%, ${spanishColors.passion} 70%, #ffffff 100%)`,
                  backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  textShadow: `0 0 80px ${spanishColors.fuego}50`
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                "Spanish cuisine is a conversation between the past and the future. It is the soul of a nation served on a plate, proving that the most profound innovation is born from the deepest respect for tradition."
              </motion.p>
              <motion.p 
                className="text-yellow-300 mt-12 text-2xl tracking-[0.3em] font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2, duration: 1.5 }}
              >
                CULINARY JOURNEY COMPLETE
              </motion.p>
            </motion.div>
          </motion.section>
        </div>
        
        {/* Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 w-20 h-20 z-30"
          style={{
            background: `conic-gradient(${spanishColors.oro} ${scrollYProgress.get() * 360}deg, rgba(255,255,255,0.1) 0deg)`,
            borderRadius: '50%', padding: '3px'
          }}
        >
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-yellow-500/30 backdrop-blur-md">
            <div className="text-center">
              <span className="text-white text-sm font-bold block">{Math.round(scrollYProgress.get() * 100)}%</span>
              <span className="text-yellow-400 text-lg">💃</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative bg-black">
      <AnimatePresence>
        {showQuote && <AdriaQuote />}
      </AnimatePresence>
      {!showQuote && <SpanishSection />}
    </div>
  );
};

export default SpanishCulinaryJourney;
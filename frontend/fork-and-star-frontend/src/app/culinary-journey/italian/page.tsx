"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Star, Award, MapPin, ChefHat, Play, Pause, Camera, Instagram, Utensils } from 'lucide-react';

const EnhancedItalianJourney = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuote, setShowQuote] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Enhanced Quote Animation Component
  const BourdainQuote = () => {
    const quoteRef = useRef(null);
    const isInView = useInView(quoteRef, { once: false });

    const quoteText = [
      "I've long believed that good food, good eating, is all about the risk.",
      "Whether we're talking about unpasteurized Stilton, raw oysters or working for organized crime 'associates,'",
      "Food, for me, has always been an adventure.",
    ];

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowQuote(false);
      }, 9000); // Extended to 9 seconds
      return () => clearTimeout(timer);
    }, []);

    if (!showQuote) return null;

    return (
      <motion.div
        ref={quoteRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)'
        }}
      >
        <div className="max-w-5xl px-8 text-center">
          {quoteText.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.8,
                duration: 1.2,
                ease: "easeOut"
              }}
              className="mb-6"
            >
              <span 
                className="text-3xl md:text-4xl lg:text-5xl text-white font-light leading-relaxed"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  textShadow: '0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(212,175,55,0.3)',
                  letterSpacing: '0.02em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #d4af37 50%, #ffffff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {line}
              </span>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6, duration: 2 }}
            className="mt-12"
          >
            <span 
              className="text-xl md:text-2xl text-amber-400 font-medium tracking-wider"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                letterSpacing: '0.15em',
                textShadow: '0 0 30px rgba(245,158,11,0.6)'
              }}
            >
              — Anthony Bourdain
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 8, duration: 1.5 }}
            className="mt-16"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <span className="text-sm text-gray-300 uppercase tracking-[0.3em] font-medium">
                Begin Italian Journey
              </span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Floating Particles (client-only) */}
        {typeof window !== "undefined" && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0 
                }}
                animate={{ 
                  y: [null, -100, -200],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}
          </div>
        )}
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
        transition={{ duration: 0.3 }}
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
        
        {/* Video Controls */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transition-all duration-300 hover:bg-white/30 hover:scale-110"
          >
            {isPlaying ? 
              <Pause className="w-6 h-6 text-white" /> : 
              <Play className="w-6 h-6 text-white ml-1" />
            }
          </button>
        </motion.div>

        {/* Video Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-medium text-lg mb-1">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </motion.div>
    );
  };

  // Enhanced Italian Section Component
  const ItalianSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

    const restaurants = [
      {
        name: "Osteria Francescana",
        chef: "Massimo Bottura",
        location: "Modena",
        stars: 3,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop",
        specialty: "Tortellini in Brodo"
      },
      {
        name: "Le Calandre",
        chef: "Massimiliano Alajmo",
        location: "Rubano", 
        stars: 3,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop",
        specialty: "Modern Venetian Cuisine"
      },
      {
        name: "Dal Pescatore",
        chef: "Nadia Santini",
        location: "Canneto sull'Oglio",
        stars: 3,
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
        specialty: "River Fish Preparations"
      }
    ];

    const foodEvolution = [
      {
        dish: "Carbonara",
        classic: "/assets/italy/italy-food-classic-carbonara-traditional.jpg",
        current: "/assets/italy/italy-food-current-carbonara-refined.jpg",
        modern: "/assets/italy/italy-food-modern-carbonara-deconstructed.jpg"
      },
      {
        dish: "Pizza Margherita",
        classic: "/assets/italy/italy-food-classic-pizza-margherita-wood-oven.jpg",
        current: "/assets/italy/italy-food-current-pizza-elevated-ingredients.jpg",
        modern: "/assets/italy/italy-food-modern-pizza-molecular-style.jpg"
      },
      {
        dish: "Pasta Bolognese",
        classic: "/assets/italy/italy-food-classic-pasta-bolognese-rustic.jpg",
        current: "/assets/italy/italy-food-current-pasta-bolognese-plated.jpg",
        modern: "/assets/italy/italy-food-modern-pasta-innovation-foam.jpg"
      }
    ];

    const chefGenerations = [
      {
        era: "Traditional",
        title: "Nonna's Wisdom",
        image: "/assets/italy/italy-chef-classic-nonna-traditional-kitchen.jpg",
        description: "500 years of family recipes passed down through loving hands",
        philosophy: "\"Food is love made visible through generations of tradition\""
      },
      {
        era: "Michelin",
        title: "Master Craftsman",
        image: "/assets/italy/italy-chef-current-established-michelin-chef.jpg", 
        description: "Technical perfection meets Italian soul in starred kitchens",
        philosophy: "\"Respect tradition, but never stop innovating\""
      },
      {
        era: "Innovation",
        title: "New Generation",
        image: "/assets/italy/italy-chef-modern-young-innovative-chef.jpg",
        description: "Young chefs redefining Italian cuisine for the modern world",
        philosophy: "\"Italian cuisine is not bound by rules—it's bound by passion\""
      }
    ];

    return (
      <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
        {/* Enhanced Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-105"
            style={{ filter: 'brightness(0.5) contrast(1.2)' }}
          >
            <source src="/assets/italy/amalfi-coast.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        {/* Enhanced Country Header */}
        <motion.div
          className="absolute top-20 left-8 right-8 z-20"
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.span 
                className="text-7xl md:text-8xl drop-shadow-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🇮🇹
              </motion.span>
              <div>
                <motion.h1 
                  className="text-7xl md:text-8xl lg:text-9xl text-white font-light tracking-tight"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    textShadow: '0 0 60px rgba(0,0,0,0.8), 0 0 120px rgba(212,175,55,0.3)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #d4af37 30%, #ffffff 70%, #f5d76e 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                >
                  ITALIANA
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-amber-300 font-light mt-3 tracking-[0.2em]"
                  style={{ textShadow: '0 0 30px rgba(245,158,11,0.6)' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                >
                  FROM NONNA'S KITCHEN TO GLOBAL INNOVATION
                </motion.p>
              </div>
            </div>
            
            {/* Journey Progress */}
            <motion.div
              className="hidden lg:flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <span className="text-amber-400 text-sm tracking-widest">CULINARY JOURNEY</span>
              <div className="w-px h-16 bg-gradient-to-b from-amber-400 via-white/50 to-transparent"></div>
              <span className="text-white/70 text-xs">SCROLL TO EXPLORE</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Content Sections */}
        <div className="relative z-10 pt-96">
          
          {/* Architecture Meets Cuisine Section */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-b from-transparent via-black/40 to-transparent">
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <h2 
                  className="text-6xl md:text-7xl text-white mb-8 font-light"
                  style={{ 
                    fontFamily: '"Playfair Display", serif',
                    textShadow: '0 0 40px rgba(255,255,255,0.3)'
                  }}
                >
                  Where Architecture Meets Artistry
                </h2>
                <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                  Italian cuisine has evolved alongside its magnificent architecture, each era bringing 
                  new flavors while honoring timeless traditions carved in stone and stirred in sauce.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12 mb-20">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="relative mb-8 group">
                    <img
                      src="/assets/italy/italy-architecture-classic-trevi-fountain.jpg"
                      alt="Classic Italian Architecture"
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                  </div>
                  <h3 className="text-3xl text-amber-400 font-light mb-4">Classic Era</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Timeless architecture inspired timeless recipes. Where fountains flow and flavors endure.
                  </p>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <div className="relative mb-8 group">
                    <img
                      src="/assets/italy/italy-architecture-current-milan-skyline.jpg"
                      alt="Modern Italian Architecture"
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                  </div>
                  <h3 className="text-3xl text-amber-400 font-light mb-4">Contemporary</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Glass towers reflect refined techniques. Modern spaces for elevated traditions.
                  </p>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <div className="relative mb-8 group">
                    <img
                      src="/assets/italy/italy-architecture-modern-zaha-hadid-building.jpg"
                      alt="Futuristic Italian Architecture"
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                  </div>
                  <h3 className="text-3xl text-amber-400 font-light mb-4">Futuristic</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Bold architecture inspires bold flavors. Where innovation shapes the future of taste.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Food Evolution Timeline */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(160, 82, 45, 0.9) 50%, rgba(101, 67, 33, 0.95) 100%)'
            }}
          >
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <h2 
                  className="text-6xl md:text-7xl text-white mb-8 font-light"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  The Evolution of Flavor
                </h2>
                <p className="text-xl text-amber-200 max-w-4xl mx-auto leading-relaxed">
                  Witness how iconic Italian dishes have transformed through the decades, 
                  from rustic family tables to avant-garde culinary theaters.
                </p>
              </motion.div>

              {foodEvolution.map((food, index) => (
                <motion.div
                  key={food.dish}
                  className="mb-32 last:mb-0"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.3 }}
                >
                  <h3 
                    className="text-5xl text-center text-white mb-16 font-light"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {food.dish}
                  </h3>
                  
                  <div className="grid lg:grid-cols-3 gap-12">
                    <motion.div
                      className="group text-center"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative mb-6 overflow-hidden rounded-2xl">
                        <img
                          src={food.classic}
                          alt={`Classic ${food.dish}`}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-white font-medium text-lg tracking-wider">CLASSIC</span>
                        </div>
                      </div>
                      <p className="text-amber-200 text-lg leading-relaxed">
                        Traditional preparation honoring centuries of family recipes
                      </p>
                    </motion.div>

                    <motion.div
                      className="group text-center"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative mb-6 overflow-hidden rounded-2xl">
                        <img
                          src={food.current}
                          alt={`Current ${food.dish}`}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-white font-medium text-lg tracking-wider">REFINED</span>
                        </div>
                      </div>
                      <p className="text-amber-200 text-lg leading-relaxed">
                        Elevated techniques and premium ingredients for sophisticated palates
                      </p>
                    </motion.div>

                    <motion.div
                      className="group text-center"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative mb-6 overflow-hidden rounded-2xl">
                        <img
                          src={food.modern}
                          alt={`Modern ${food.dish}`}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-white font-medium text-lg tracking-wider">INNOVATIVE</span>
                        </div>
                      </div>
                      <p className="text-amber-200 text-lg leading-relaxed">
                        Deconstructed artistry pushing the boundaries of Italian cuisine
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Chef Generations Section */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90">
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <h2 
                  className="text-6xl md:text-7xl text-white mb-8 font-light"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Masters of Three Generations
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  From grandmother's kitchen wisdom to molecular gastronomy, 
                  meet the hands that have shaped Italian cuisine across the decades.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                {chefGenerations.map((chef, index) => (
                  <motion.div
                    key={chef.era}
                    className="group"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                    whileHover={{ y: -15 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800 to-black border border-amber-500/20 backdrop-blur-lg">
                      <div className="relative h-96 overflow-hidden">
                        <img
                          src={chef.image}
                          alt={chef.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 bg-amber-500/20 backdrop-blur-md rounded-full text-amber-300 text-sm font-medium border border-amber-500/30">
                            {chef.era}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-3xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {chef.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {chef.description}
                        </p>
                        
                        <blockquote className="text-amber-300 italic text-lg leading-relaxed border-l-2 border-amber-500 pl-4">
                          {chef.philosophy}
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Interactive Video Showcase */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-br from-amber-900/20 via-black to-orange-900/20">
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <h2 
                  className="text-6xl md:text-7xl text-white mb-8 font-light"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Artistry in Motion
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Experience the poetry of Italian cooking through the lens of master craftsmen
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                <VideoSection
                  src="/assets/italy/pizza-wood-oven.mp4"
                  title="Wood-Fired Mastery"
                  description="The ancient art of Neapolitan pizza making in blazing ovens"
                  className="h-96"
                />
                
                <VideoSection
                  src="/assets/italy/italy-video-modern-plating-technique.mp4"
                  title="Modern Plating Poetry"
                  description="Contemporary Italian chefs transforming ingredients into art"
                  className="h-96"
                />
              </div>
            </div>
          </motion.section>

          {/* Wine Culture Evolution */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.3) 0%, rgba(139, 69, 19, 0.4) 50%, rgba(25, 25, 112, 0.3) 100%)'
          }}>
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <h2 
                  className="text-6xl md:text-7xl text-white mb-8 font-light"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Liquid Poetry of Italy
                </h2>
                <p className="text-xl text-purple-200 max-w-4xl mx-auto leading-relaxed">
                  From ancient amphoras to modern natural wine bars, Italian wine culture 
                  has flowed through centuries of tradition into contemporary innovation.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-4 gap-8">
                <motion.div
                  className="group text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img
                      src="/assets/italy/italy-wine-classic-chianti-bottle-straw.jpg"
                      alt="Classic Chianti"
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                  </div>
                  <h3 className="text-2xl text-amber-300 font-light mb-3">Classic Chianti</h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    Traditional straw-wrapped bottles carrying centuries of Tuscan heritage
                  </p>
                </motion.div>

                <motion.div
                  className="group text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img
                      src="/assets/italy/italy-wine-classic-chianti-bottle-straw.jpg"
                      alt="Modern Wine Cellar"
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                  </div>
                  <h3 className="text-2xl text-amber-300 font-light mb-3">Refined Cellars</h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    Temperature-controlled sanctuaries preserving liquid treasures
                  </p>
                </motion.div>

                <motion.div
                  className="group text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img
                      src="/assets/italy/italy-wine-modern-natural-wine-tasting.jpg"
                      alt="Natural Wine Tasting"
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                  </div>
                  <h3 className="text-2xl text-amber-300 font-light mb-3">Natural Movement</h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    Minimal intervention wines expressing pure terroir and innovation
                  </p>
                </motion.div>

                <motion.div
                  className="group text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img
                      src="/assets/italy/italy-wine-modern-rooftop-wine-bar.jpg"
                      alt="Rooftop Wine Bar"
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                  </div>
                  <h3 className="text-2xl text-amber-300 font-light mb-3">Urban Elegance</h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    Skyline wine bars blending tradition with contemporary lifestyle
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <blockquote className="text-2xl md:text-3xl text-white font-light italic mb-6 max-w-4xl mx-auto leading-relaxed"
                  style={{ fontFamily: '"Playfair Display", serif' }}>
                  "Wine is the poetry of the earth, and in Italy, every bottle tells a story 
                  written in sun-soaked vineyards and aged in the cellars of time."
                </blockquote>
                <cite className="text-amber-400 text-lg tracking-wider">— Italian Wine Philosophy</cite>
              </motion.div>
            </div>
          </motion.section>

          {/* Modern Italian Lifestyle */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <h2 
                  className="text-6xl md:text-7xl text-white mb-8 font-light"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  The Instagram Generation
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  How social media transformed Italian dining culture, creating a new language 
                  of visual storytelling that honors tradition while embracing modernity.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="relative overflow-hidden rounded-xl group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src="/assets/italy/italy-lifestyle-classic-market-vendors.jpg"
                        alt="Traditional Market"
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="text-white text-sm font-medium">Classic Markets</span>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="relative overflow-hidden rounded-xl group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src="/assets/italy/italy-lifestyle-current-food-photography.jpg"
                        alt="Food Photography"
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">Food Art</span>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="relative overflow-hidden rounded-xl group col-span-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src="/assets/italy/italy-lifestyle-modern-instagram-dining.jpg"
                        alt="Instagram Dining"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <Instagram className="w-5 h-5 text-pink-400" />
                        <span className="text-white font-medium">Social Dining Culture</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                >
                  <h3 className="text-4xl text-amber-400 font-light mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Visual Storytelling Revolution
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">The Aesthetic Evolution</h4>
                        <p className="text-gray-400 leading-relaxed">
                          Italian chefs now design dishes as visual experiences, where every plate 
                          becomes a canvas for artistic expression and social media storytelling.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                        <Utensils className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Sustainable Showcase</h4>
                        <p className="text-gray-400 leading-relaxed">
                          The Instagram generation champions sustainable Italian cooking, sharing 
                          stories of local ingredients, zero-waste kitchens, and eco-conscious dining.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl text-white font-medium mb-2">Democratized Excellence</h4>
                        <p className="text-gray-400 leading-relaxed">
                          Social media has democratized Italian cuisine, allowing hidden trattorias 
                          and young chefs to gain recognition alongside Michelin-starred establishments.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Enhanced Restaurant Showcase */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(25,25,25,0.98) 50%, rgba(0,0,0,0.95) 100%)'
          }}>
            <div className="max-w-8xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <h2 
                  className="text-6xl md:text-7xl text-white mb-8 font-light"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Temples of Italian Mastery
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Where tradition meets innovation in Italy's most celebrated kitchens, 
                  these restaurants represent the pinnacle of culinary artistry.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                {restaurants.map((restaurant, index) => (
                  <motion.div
                    key={index}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    whileHover={{ y: -20, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800/50 to-black/80 border border-amber-500/20 backdrop-blur-xl shadow-2xl">
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        
                        {/* Stars with Animation */}
                        <div className="absolute top-6 right-6 flex gap-1">
                          {[...Array(restaurant.stars)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1 + (i * 0.1), duration: 0.3 }}
                            >
                              <Star className="w-6 h-6 fill-amber-400 text-amber-400 drop-shadow-lg" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Specialty Badge */}
                        <div className="absolute top-6 left-6">
                          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20">
                            {restaurant.specialty}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-3xl text-white font-light mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {restaurant.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <ChefHat className="w-5 h-5 text-amber-400" />
                          <p className="text-amber-300 font-medium text-lg">
                            {restaurant.chef}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-6">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <p className="text-gray-400">
                            {restaurant.location}
                          </p>
                        </div>
                        
                        <div className="pt-6 border-t border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-amber-400 font-medium text-lg">
                              Michelin {restaurant.stars} Star{restaurant.stars > 1 ? 's' : ''}
                            </span>
                            <motion.div
                              className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Award className="w-6 h-6 text-white" />
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 blur-xl" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Enhanced Transition to Next Cuisine */}
          <motion.section 
            className="h-screen flex items-center justify-center px-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1810 50%, #1a1a1a 75%, #0f0f0f 100%)'
            }}
          >
            {/* Animated Background Elements */}
            {/* Animated Background Elements (client-only) */}
            {typeof window !== "undefined" && (
              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-amber-400/20 rounded-full"
                    initial={{ 
                      x: Math.random() * window.innerWidth, 
                      y: window.innerHeight + 50,
                      opacity: 0 
                    }}
                    animate={{ 
                      y: -50,
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 8 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 5
                    }}
                  />
                ))}
              </div>
            )}

            <motion.div
              className="text-center relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            >
              <motion.p 
                className="text-3xl md:text-4xl lg:text-5xl text-white font-light mb-12 max-w-5xl mx-auto leading-relaxed"
                style={{ 
                  fontFamily: '"Playfair Display", serif',
                  textShadow: '0 0 40px rgba(255,255,255,0.3)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                "Italian cuisine is not just about the food—it's about the passion, 
                the family, the celebration of life itself. From ancient recipes 
                to modern innovations, Italy continues to lead the world in 
                culinary excellence."
              </motion.p>
              
              <motion.div
                className="flex items-center justify-center gap-12 mt-16"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 1.5 }}
              >
                <motion.span 
                  className="text-8xl drop-shadow-2xl"
                  animate={{ 
                    rotateY: [0, 15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🇮🇹
                </motion.span>
                
                <div className="flex flex-col items-center gap-4">
                  <div className="w-40 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                  <span className="text-amber-400 font-medium tracking-[0.3em]">TO BE CONTINUED</span>
                  <div className="w-40 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                </div>
                
                <motion.span 
                  className="text-8xl drop-shadow-2xl"
                  animate={{ 
                    rotateY: [0, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  🇯🇵
                </motion.span>
              </motion.div>
              
              <motion.p 
                className="text-amber-400 mt-8 text-xl tracking-[0.2em] font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                NEXT: JAPANESE MASTERY
              </motion.p>
            </motion.div>
          </motion.section>
        </div>

        {/* Enhanced Scroll Progress */}
        <motion.div
          className="fixed bottom-8 right-8 w-20 h-20 z-30"
          style={{
            background: `conic-gradient(#f59e0b ${scrollYProgress.get() * 360}deg, rgba(255,255,255,0.1) 0deg)`,
            borderRadius: '50%',
            padding: '3px'
          }}
        >
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-amber-500/30 backdrop-blur-md">
            <div className="text-center">
              <span className="text-white text-sm font-bold block">
                {Math.round(scrollYProgress.get() * 100)}%
              </span>
              <span className="text-amber-400 text-xs">
                🇮🇹
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
        {showQuote && <BourdainQuote />}
      </AnimatePresence>
      
      {!showQuote && <ItalianSection />}
    </div>
  );
};

export default EnhancedItalianJourney;
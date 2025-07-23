"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Star, Award, MapPin, ChefHat, Play, Pause, Sparkles, Flag, Utensils, Leaf, Flame, Globe, Trophy, Heart } from 'lucide-react';

const AmericanCulinaryJourney = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuote, setShowQuote] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Thomas Keller Quote Animation Component - Transition from Spain
  const KellerQuote = () => {
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
            radial-gradient(circle at 20% 80%, rgba(220, 20, 60, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 0, 139, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a1a 0%, #1a0a0a 50%, #0a0a1a 100%)
          `
        }}
      >
        {/* Floating American Elements */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => {
            const leftPos = (i * 15.3) % 100;
            const topPos = (i * 11.7) % 100;
            const xMovement = (i % 2 === 0 ? 1 : -1) * (30 + (i % 20));
            const yMovement = (i % 2 === 0 ? 1 : -1) * (30 + (i % 20));
            const duration = 8 + (i % 6);
            const delay = (i % 15) * 0.3;
            const emojis = ['🍔', '🍕', '🌮', '🥧', '🍖', '🌽', '🦅'];
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
                🇪🇸
              </motion.span>
              <div className="w-32 h-px bg-gradient-to-r from-red-500 via-white-400 to-blue-600"></div>
              <motion.span 
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                🇺🇸
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
                background: 'linear-gradient(135deg, #ffffff 0%, #dc143c 20%, #ffffff 40%, #0000ff 60%, #ffffff 80%, #dc143c 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 60px rgba(255,255,255,0.4)',
                letterSpacing: '0.02em'
              }}
            >
              "A recipe has no soul. You, as the cook, must bring soul to the recipe. 
              In America, we took the souls of every cuisine that crossed our borders 
              and created something entirely new."
            </blockquote>
            
            <motion.cite
              className="text-2xl text-blue-300 font-medium tracking-wider block"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                textShadow: '0 0 30px rgba(100,150,255,0.6)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2 }}
            >
              — Thomas Keller, Master of American Perfection
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
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <span className="text-lg text-blue-200 uppercase tracking-[0.3em] font-medium">
                Enter the Great Melting Pot
              </span>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
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
              🍔
            </motion.div>
          </motion.div>
        </div>

        {/* Video Preview */}
        <motion.div
          className="absolute bottom-8 right-8 w-32 h-24 rounded-lg overflow-hidden border border-blue-400/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 12, duration: 1 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-red-700 flex items-center justify-center text-4xl">
            🦅
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
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-red-700 flex items-center justify-center">
          <span className="text-8xl">{emoji}</span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transition-all duration-300 hover:bg-white/30 hover:scale-110">
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

  // Main American Journey Section
  const AmericanSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

    const classicToModern = [
      {
        era: "Classic Americana",
        period: "1950s-1970s",
        description: "Comfort, abundance, family-style dining culture",
        dishes: ["Meatloaf", "Mac & Cheese", "Apple Pie", "Hamburgers"],
        masters: ["Julia Child", "James Beard"],
        philosophy: "Food as comfort and family connection",
        colors: "from-amber-600 to-orange-700",
        emoji: "🥧"
      },
      {
        era: "California Revolution",
        period: "1980s-1990s",
        description: "Fresh ingredients, seasonal cooking, farm-to-table movement",
        dishes: ["California Cuisine", "Fusion Experiments", "Seasonal Menus"],
        masters: ["Alice Waters", "Wolfgang Puck", "Jeremiah Tower"],
        philosophy: "Let ingredients speak, celebrate seasonality",
        colors: "from-green-500 to-emerald-700",
        emoji: "🥗"
      },
      {
        era: "Innovation Era",
        period: "2000s-2010s",
        description: "Food as art, molecular gastronomy, theatrical presentations",
        dishes: ["Edible Balloons", "Liquid Nitrogen", "Deconstructed Classics"],
        masters: ["Grant Achatz", "Thomas Keller", "Daniel Humm"],
        philosophy: "Push boundaries, create experiences",
        colors: "from-purple-600 to-indigo-800",
        emoji: "⚗️"
      },
      {
        era: "Conscious Era",
        period: "2010s-Present",
        description: "Sustainability, plant-forward, social responsibility",
        dishes: ["Zero-Waste Cooking", "Plant Proteins", "Hyper-Local"],
        masters: ["Dan Barber", "Dominique Crenn", "Joshua Skenes"],
        philosophy: "Heal the planet through food",
        colors: "from-teal-600 to-green-800",
        emoji: "🌱"
      }
    ];

    const michelinTemples = [
      {
        name: "The French Laundry",
        location: "Napa Valley, CA",
        chef: "Thomas Keller",
        stars: 3,
        innovation: "American precision meets French technique",
        philosophy: "Perfection in simplicity, obsessive attention to detail",
        signature: "Oysters and Pearls",
        color: "from-yellow-600 to-amber-800"
      },
      {
        name: "Alinea",
        location: "Chicago, IL", 
        chef: "Grant Achatz",
        stars: 3,
        innovation: "Theatrical molecular gastronomy",
        philosophy: "Food as art, dining as theater",
        signature: "Edible balloon dessert",
        color: "from-purple-600 to-indigo-800"
      },
      {
        name: "Per Se",
        location: "New York, NY",
        chef: "Thomas Keller",
        stars: 3,
        innovation: "Urban sophistication, tasting menu mastery",
        philosophy: "French technique, American ingredients",
        signature: "Tasting of vegetables",
        color: "from-blue-600 to-slate-800"
      },
      {
        name: "Eleven Madison Park",
        location: "New York, NY",
        chef: "Daniel Humm",
        stars: 3,
        innovation: "Plant-based fine dining revolution",
        philosophy: "Vegetables as the star, not supporting cast",
        signature: "Lavender honey and beet",
        color: "from-green-600 to-emerald-800"
      }
    ];

    const greenStarLeaders = [
      {
        name: "Atelier Crenn",
        location: "San Francisco, CA",
        chef: "Dominique Crenn",
        stars: 3,
        greenStar: true,
        focus: "Poetic Culinaria",
        innovation: "Art, poetry, and sustainability unified",
        philosophy: "Nature is our teacher, art is our language",
        emoji: "🎨"
      },
      {
        name: "SingleThread",
        location: "Healdsburg, CA",
        chef: "Kyle & Katina Connaughton",
        stars: 3,
        greenStar: true,
        focus: "Farm-Winery-Restaurant Trinity",
        innovation: "11-acre farm directly connected to kitchen",
        philosophy: "From soil to glass, everything in harmony",
        emoji: "🍇"
      },
      {
        name: "Blue Hill at Stone Barns",
        location: "Pocantico Hills, NY", 
        chef: "Dan Barber",
        stars: 2,
        greenStar: true,
        focus: "Farm-to-Table Cathedral",
        innovation: "No menu, just what the farm provides",
        philosophy: "The chef doesn't choose ingredients, the farm does",
        emoji: "🚜"
      },
      {
        name: "Quince",
        location: "San Francisco, CA",
        chef: "Michael Tusk",
        stars: 3,
        greenStar: true,
        focus: "Seasonal California Excellence",
        innovation: "California ingredients, Italian technique",
        philosophy: "Respect for ingredients above all else",
        emoji: "🌿"
      }
    ];

    const pizzaLegends = [
      {
        name: "Lucali",
        location: "Brooklyn, NY",
        specialty: "Thin crust artistry with basil drizzle",
        description: "Mark Iacono's minimalist masterpiece where less is infinitely more",
        philosophy: "Perfect dough, perfect sauce, perfect simplicity",
        emoji: "🎯"
      },
      {
        name: "Joe's Pizza",
        location: "NYC (Multiple)",
        specialty: "Classic NY slice perfection",
        description: "The gold standard of New York pizza - foldable, greasy, perfect",
        philosophy: "If it ain't broke, don't fix it",
        emoji: "🗽"
      },
      {
        name: "Di Fara",
        location: "Brooklyn, NY",
        specialty: "Handcrafted by Dom DeMarco since 1965",
        description: "Watch the 85-year-old master hand-cut basil for every single pizza",
        philosophy: "Each pizza is a personal creation, not mass production",
        emoji: "👴"
      },
      {
        name: "Roberta's",
        location: "Brooklyn, NY", 
        specialty: "Wood-fired innovation in converted shipping containers",
        description: "Hipster haven that proved pizza could be both trendy and excellent",
        philosophy: "Innovation within tradition, creativity with respect",
        emoji: "🔥"
      }
    ];

    const americanTastes = [
      {
        taste: "Smoky",
        description: "BBQ culture defining the American palate across all regions",
        examples: ["Texas Brisket", "Carolina Pulled Pork", "Kansas City Ribs"],
        science: "Wood smoke compounds creating umami depth",
        emoji: "🔥"
      },
      {
        taste: "Sweet",
        description: "From maple syrup to corn syrup - sweetness as comfort",
        examples: ["Maple Bacon", "Sweet Tea", "Funnel Cakes"],
        science: "Sugar triggering dopamine and nostalgia pathways",
        emoji: "🍯"
      },
      {
        taste: "Char",
        description: "Grilling as the national cooking method and cultural ritual",
        examples: ["Charred Burgers", "Blackened Fish", "Grilled Corn"],
        science: "Maillard reaction creating complex flavor compounds",
        emoji: "🔥"
      },
      {
        taste: "Fusion",
        description: "Combining cultures in one dish - uniquely American approach",
        examples: ["Korean Tacos", "Ramen Burgers", "Sushi Burritos"],
        science: "Cultural mixing creating entirely new flavor profiles",
        emoji: "🌍"
      },
      {
        taste: "Comfort",
        description: "Emotional satisfaction prioritized over refinement",
        examples: ["Mac & Cheese", "Chicken & Waffles", "Loaded Fries"],
        science: "Familiar flavors triggering memory and emotion centers",
        emoji: "🤗"
      }
    ];

    const regionalKingdoms = [
      {
        region: "Pacific Northwest",
        ingredients: ["Salmon", "Coffee", "Apples", "Dungeness Crab"],
        description: "Rain-fed excellence and coffee culture mastery",
        colors: "from-green-600 to-blue-700",
        emoji: "🌲"
      },
      {
        region: "California",
        ingredients: ["Avocados", "Wine", "Almonds", "Artisanal Everything"],
        description: "Innovation central and farm-to-table birthplace",
        colors: "from-yellow-500 to-green-600",
        emoji: "☀️"
      },
      {
        region: "Texas",
        ingredients: ["Beef", "Jalapeños", "BBQ Culture", "Pecans"],
        description: "Everything's bigger, including the flavors",
        colors: "from-red-600 to-orange-700",
        emoji: "🤠"
      },
      {
        region: "Southeast",
        ingredients: ["Bourbon", "Peaches", "Grits", "Pecans"],
        description: "Comfort food capital and hospitality culture",
        colors: "from-amber-600 to-red-700",
        emoji: "🍑"
      },
      {
        region: "Northeast",
        ingredients: ["Lobster", "Maple Syrup", "Cranberries", "Clams"],
        description: "Colonial roots meet modern sophistication",
        colors: "from-blue-600 to-purple-700",
        emoji: "🦞"
      },
      {
        region: "Midwest",
        ingredients: ["Corn", "Cheese", "Beer Culture", "Beef"],
        description: "America's breadbasket and comfort food heartland",
        colors: "from-yellow-600 to-amber-700",
        emoji: "🌽"
      }
    ];

    const festivalCulture = [
      {
        festival: "State Fairs",
        description: "Deep-fried innovation laboratories where anything goes",
        foods: ["Deep-Fried Oreos", "Corn Dogs", "Funnel Cakes", "Turkey Legs"],
        philosophy: "If it exists, we can deep fry it",
        emoji: "🎡"
      },
      {
        festival: "Thanksgiving",
        description: "The great American food ritual uniting all families",
        foods: ["Turkey", "Stuffing", "Cranberry Sauce", "Pumpkin Pie"],
        philosophy: "Gratitude expressed through abundance",
        emoji: "🦃"
      },
      {
        festival: "4th of July",
        description: "Grilling as patriotic expression and summer celebration",
        foods: ["Hamburgers", "Hot Dogs", "Potato Salad", "Apple Pie"],
        philosophy: "Freedom tastes like backyard BBQ",
        emoji: "🎆"
      },
      {
        festival: "Food Truck Festivals",
        description: "Mobile culinary democracy where innovation meets the street",
        foods: ["Gourmet Tacos", "Fusion Burgers", "Artisanal Ice Cream"],
        philosophy: "Good food shouldn't need white tablecloths",
        emoji: "🚚"
      }
    ];

    const americanValues = [
      {
        value: "Innovation as Tradition",
        description: "Constantly reinventing classics while keeping their soul",
        examples: ["Impossible Burger", "Cronut", "Ramen Burger"],
        emoji: "💡"
      },
      {
        value: "Democratic Dining",
        description: "Great food for everyone, not just the elite",
        examples: ["Food Trucks", "Chain Innovation", "Accessibility"],
        emoji: "🗳️"
      },
      {
        value: "Size as Expression",
        description: "Portion sizes reflecting cultural abundance",
        examples: ["Texas Steaks", "Loaded Nachos", "Giant Burgers"],
        emoji: "📏"
      },
      {
        value: "Celebrity Chef Culture",
        description: "Food as entertainment and chefs as rock stars",
        examples: ["Food Network", "Chef Competitions", "Social Media"],
        emoji: "⭐"
      }
    ];

    return (
      <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
        
        {/* Enhanced Multi-Video Background */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-red-700 opacity-25 flex items-center justify-center text-9xl">
              🦅
            </div>
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-white opacity-20 flex items-center justify-center text-9xl">
              🍔
            </div>
            <div className="w-full h-full bg-gradient-to-br from-white to-blue-600 opacity-25 flex items-center justify-center text-9xl">
              🗽
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-red-900/40" />
        </div>

        {/* Country Header with American Boldness */}
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
                🇺🇸
              </motion.span>
              <div>
                <motion.h1 
                  className="text-8xl md:text-9xl lg:text-[10rem] font-light tracking-tight mb-4"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #dc143c 20%, #ffffff 40%, #0000ff 60%, #ffffff 80%, #dc143c 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 80px rgba(255,255,255,0.4)'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 2 }}
                >
                  AMERICANA
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl text-blue-300 font-light tracking-[0.3em]"
                  style={{ 
                    textShadow: '0 0 40px rgba(100,150,255,0.8)',
                    fontFamily: '"Inter", system-ui, sans-serif'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 2 }}
                >
                  THE GREAT MELTING POT
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Content Sections */}
        <div className="relative z-10 pt-[30rem]">

          {/* Classic to Modern Evolution */}
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #dc143c 30%, #0000ff 70%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  From Classic to Revolutionary
                </h2>
                <p className="text-2xl text-blue-200 max-w-5xl mx-auto leading-relaxed">
                  American cuisine's remarkable evolution from comfort food classics to 
                  global culinary innovation - constantly reinventing while honoring tradition.
                </p>
              </motion.div>

              <div className="space-y-24">
                {classicToModern.map((era, index) => (
                  <motion.div
                    key={era.era}
                    className="grid lg:grid-cols-2 gap-16 items-center"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  >
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="relative overflow-hidden rounded-3xl">
                        <div className={`w-full h-96 bg-gradient-to-br ${era.colors} flex items-center justify-center text-9xl hover:scale-110 transition-transform duration-700`}>
                          {era.emoji}
                        </div>
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium">
                            {era.period}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <h3 className="text-5xl text-white font-light mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {era.era}
                      </h3>
                      
                      <p className="text-xl text-gray-300 leading-relaxed mb-8">
                        {era.description}
                      </p>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-blue-300 font-medium mb-3 text-lg">Iconic Dishes:</h4>
                          <div className="flex flex-wrap gap-2">
                            {era.dishes.map((dish, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm border border-blue-400/30">
                                {dish}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-red-300 font-medium mb-3 text-lg">Masters:</h4>
                          <div className="flex flex-wrap gap-2">
                            {era.masters.map((master, i) => (
                              <span key={i} className="px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-full text-red-200 text-sm border border-red-400/30">
                                {master}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <blockquote className="text-white italic text-lg leading-relaxed border-l-2 border-white/30 pl-6">
                          "{era.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 3-Star Michelin Temples */}
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
                  Temples of American Excellence
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">3-Star Michelin Mastery</p>
                <p className="text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
                  Where American innovation meets global recognition - restaurants that redefined 
                  what American cuisine could achieve on the world stage.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {michelinTemples.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                    whileHover={{ y: -20 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800 to-black border border-white/10 backdrop-blur-lg">
                      
                      <div className="relative h-80">
                        <div className={`w-full h-full bg-gradient-to-br ${restaurant.color} flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700`}>
                          ⭐
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        
                        {/* Stars */}
                        <div className="absolute top-6 right-6 flex gap-1">
                          {[...Array(restaurant.stars)].map((_, i) => (
                            <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {restaurant.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <MapPin className="w-6 h-6 text-blue-400" />
                          <p className="text-blue-300 font-medium text-lg">
                            {restaurant.location}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <ChefHat className="w-6 h-6 text-white" />
                          <p className="text-white font-medium text-lg">
                            {restaurant.chef}
                          </p>
                        </div>
                        
                        <p className="text-yellow-300 text-lg font-medium mb-4">
                          {restaurant.innovation}
                        </p>
                        
                        <p className="text-gray-300 mb-4">
                          <strong>Signature:</strong> {restaurant.signature}
                        </p>
                        
                        <blockquote className="text-gray-300 leading-relaxed italic border-l-2 border-yellow-500 pl-4">
                          "{restaurant.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Green Star Sustainability Leaders */}
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
                  Green Star Pioneers
                </h2>
                <p className="text-3xl text-green-200 font-light mb-6">Sustainability Leaders</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  American restaurants leading the global sustainability movement, proving that 
                  environmental consciousness and culinary excellence go hand in hand.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                {greenStarLeaders.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-green-800/40 to-black/80 backdrop-blur-lg border border-green-500/30">
                      
                      <div className="relative h-64 flex items-center justify-center">
                        <span className="text-9xl">{restaurant.emoji}</span>
                        
                        {/* Stars and Green Star */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(restaurant.stars)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          {restaurant.greenStar && (
                            <Leaf className="w-6 h-6 fill-green-400 text-green-400" />
                          )}
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-3xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {restaurant.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <MapPin className="w-6 h-6 text-green-400" />
                          <p className="text-green-300 font-medium text-lg">
                            {restaurant.location}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <ChefHat className="w-6 h-6 text-green-400" />
                          <p className="text-green-300 font-medium text-lg">
                            {restaurant.chef}
                          </p>
                        </div>
                        
                        <p className="text-green-200 text-xl font-medium mb-4">
                          {restaurant.focus}
                        </p>
                        
                        <p className="text-gray-300 mb-4">
                          {restaurant.innovation}
                        </p>
                        
                        <blockquote className="text-green-200 leading-relaxed italic border-l-2 border-green-500 pl-4">
                          "{restaurant.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Pizza Culture Deep Dive */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.3) 0%, rgba(220, 20, 60, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135degrees, #ffffff 0%, #ff8c00 50%, #dc143c 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  🍕 Pizza Nation
                </h2>
                <p className="text-2xl text-orange-200 max-w-5xl mx-auto leading-relaxed">
                  How America took Italian pizza and made it our own - from New York slices 
                  to artisanal wood-fired perfection.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {pizzaLegends.map((pizza, index) => (
                  <motion.div
                    key={pizza.name}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-orange-900/30 to-black/80 backdrop-blur-lg border border-orange-500/30">
                      
                      <div className="relative h-64 flex items-center justify-center">
                        <span className="text-8xl">{pizza.emoji}</span>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-3xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {pizza.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <MapPin className="w-5 h-5 text-orange-400" />
                          <p className="text-orange-300 font-medium">
                            {pizza.location}
                          </p>
                        </div>
                        
                        <p className="text-orange-200 text-lg font-medium mb-4">
                          {pizza.specialty}
                        </p>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {pizza.description}
                        </p>
                        
                        <blockquote className="text-orange-200 leading-relaxed italic border-l-2 border-orange-500 pl-4">
                          "{pizza.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Five American Tastes */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(45deg, rgba(220, 20, 60, 0.2) 0%, rgba(255, 140, 0, 0.2) 25%, rgba(0, 100, 0, 0.2) 50%, rgba(0, 0, 139, 0.2) 75%, rgba(128, 0, 128, 0.2) 100%)'
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
                    background: 'linear-gradient(90deg, #dc143c 0%, #ff8c00 25%, #008000 50%, #00008b 75%, #800080 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  The Five American Tastes
                </h2>
                <p className="text-2xl text-gray-200 max-w-5xl mx-auto leading-relaxed">
                  Beyond the traditional five senses - how American cuisine created 
                  entirely new taste categories that define our culinary identity.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-5 gap-8">
                {americanTastes.map((taste, index) => (
                  <motion.div
                    key={taste.taste}
                    className="group text-center"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15, scale: 1.05 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800/40 to-black/60 backdrop-blur-lg border border-white/10 p-6">
                      <div className="text-6xl mb-6">{taste.emoji}</div>
                      
                      <h3 className="text-2xl font-light text-white mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {taste.taste}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed text-sm mb-4">
                        {taste.description}
                      </p>
                      
                      <div className="space-y-2">
                        {taste.examples.map((example, i) => (
                          <span key={i} className="block px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Regional Ingredient Kingdoms */}
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
                  Regional Kingdoms
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">America's Ingredient Map</p>
                <p className="text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
                  From sea to shining sea, each region contributes its signature ingredients 
                  to the great American culinary tapestry.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                {regionalKingdoms.map((region, index) => (
                  <motion.div
                    key={region.region}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800/30 to-black/70 backdrop-blur-lg border border-white/10">
                      
                      <div className="relative h-64">
                        <div className={`w-full h-full bg-gradient-to-br ${region.colors} opacity-80 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-700`}>
                          {region.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-3xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {region.region}
                        </h3>
                        
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {region.description}
                        </p>
                        
                        <div className="space-y-2">
                          <p className="text-blue-300 font-medium">Signature Ingredients:</p>
                          <div className="flex flex-wrap gap-2">
                            {region.ingredients.map((ingredient, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm border border-blue-400/30">
                                {ingredient}
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

          {/* Festival Food Culture */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.3) 0%, rgba(255, 140, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                  Festival Food Nation
                </h2>
                <p className="text-2xl text-orange-200 max-w-5xl mx-auto leading-relaxed">
                  Where American food culture comes alive through celebration, innovation, 
                  and the shared joy of eating together.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {festivalCulture.map((festival, index) => (
                  <motion.div
                    key={festival.festival}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-orange-800/40 to-black/80 backdrop-blur-lg border border-orange-500/30">
                      
                      <div className="relative h-64 flex items-center justify-center">
                        <span className="text-9xl">{festival.emoji}</span>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {festival.festival}
                        </h3>
                        
                        <p className="text-gray-300 leading-relaxed text-lg mb-6">
                          {festival.description}
                        </p>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-orange-300 font-medium mb-3">Traditional Foods:</p>
                            <div className="flex flex-wrap gap-2">
                              {festival.foods.map((food, i) => (
                                <span key={i} className="px-3 py-1 bg-orange-500/20 backdrop-blur-sm rounded-full text-orange-200 text-sm border border-orange-400/30">
                                  {food}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <blockquote className="text-orange-200 leading-relaxed italic border-l-2 border-orange-500 pl-4">
                            "{festival.philosophy}"
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* American Values & Traditions */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 139, 0.3) 0%, rgba(220, 20, 60, 0.4) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #00008b 0%, #dc143c 30%, #ffffff 60%, #dc143c 80%, #00008b 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Values & Traditions
                </h2>
                <p className="text-2xl text-blue-200 max-w-5xl mx-auto leading-relaxed">
                  The fundamental beliefs and customs that make American cuisine 
                  unique in the global culinary landscape.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {americanValues.map((value, index) => (
                  <motion.div
                    key={value.value}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-900/30 to-black/80 backdrop-blur-lg border border-blue-500/30 p-8">
                      
                      <div className="text-6xl mb-6">{value.emoji}</div>
                      
                      <h3 className="text-3xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {value.value}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed text-lg mb-6">
                        {value.description}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-blue-300 font-medium">Examples:</p>
                        <div className="flex flex-wrap gap-2">
                          {value.examples.map((example, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm border border-blue-400/30">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Interactive Technique Videos */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-br from-red-900/30 via-black to-blue-900/30">
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
                  Innovation in Action
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">American Technique Mastery</p>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Witness how American chefs revolutionized cooking techniques, from 
                  molecular gastronomy to sustainable practices.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                <VideoSection
                  title="Molecular Magic"
                  description="Grant Achatz pioneering edible art and theatrical dining"
                  emoji="⚗️"
                  className="h-80"
                />
                
                <VideoSection
                  title="Farm-to-Table"
                  description="Alice Waters' revolution connecting kitchen to garden"
                  emoji="🌱"
                  className="h-80"
                />
                
                <VideoSection
                  title="BBQ Mastery" 
                  description="Low and slow - America's gift to the grilling world"
                  emoji="🔥"
                  className="h-80"
                />
              </div>
            </div>
          </motion.section>

          {/* Epic Finale */}
          <motion.section 
            className="h-screen flex items-center justify-center px-8 relative overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(220, 20, 60, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0, 0, 139, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a1a 0%, #1a0a0a 50%, #0a0a1a 100%)
              `
            }}
          >
            {/* Floating American Elements */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => {
                const leftPos = (i * 17.3) % 100;
                const topPos = (i * 13.7) % 100;
                const yMovement = -60 - (i % 40);
                const duration = 15 + (i % 10);
                const delay = (i % 20) * 0.25;
                const emojis = ['🍔', '🍕', '🌮', '🥧', '🍖', '🌽', '🦅', '🗽', '⭐'];
                const emoji = emojis[i % emojis.length];
                
                return (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                    }}
                    animate={{
                      y: [0, yMovement, 0],
                      opacity: [0.1, 1, 0.1],
                      rotate: [0, 360],
                      scale: [0.5, 1.5, 0.5]
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
                  background: 'linear-gradient(135deg, #ffffff 0%, #dc143c 20%, #ffffff 40%, #0000ff 60%, #ffffff 80%, #dc143c 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 80px rgba(255,255,255,0.4)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                "American cuisine proved that tradition isn't about preserving the past unchanged—
                it's about taking the best of every culture, every technique, every flavor, 
                and creating something bold, new, and uniquely our own. 
                From sea to shining sea, we didn't just feed a nation—we fed the world's imagination."
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
                  🇺🇸
                </motion.span>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-red-500 via-white via-blue-500 to-transparent"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Flag className="w-16 h-16 text-white" />
                  </motion.div>
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-blue-500 via-white via-red-500 to-transparent"></div>
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
                className="text-blue-300 mt-12 text-2xl tracking-[0.3em] font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 4, duration: 1.5 }}
              >
                CULINARY JOURNEY COMPLETE
              </motion.p>
              
              <motion.div
                className="mt-8 flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 5, duration: 1.5 }}
              >
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                <span className="text-white text-lg">Thank you for joining our culinary adventure</span>
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* Enhanced Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 w-20 h-20 z-30"
          style={{
            background: `conic-gradient(#dc143c ${scrollYProgress.get() * 360}deg, rgba(255,255,255,0.1) 0deg)`,
            borderRadius: '50%',
            padding: '3px'
          }}
        >
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-red-500/30 backdrop-blur-md">
            <div className="text-center">
              <span className="text-white text-sm font-bold block">
                {Math.round(scrollYProgress.get() * 100)}%
              </span>
              <span className="text-red-400 text-lg">
                🇺🇸
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
        {showQuote && <KellerQuote />}
      </AnimatePresence>
      
      {!showQuote && <AmericanSection />}
    </div>
  );
};

export default AmericanCulinaryJourney;
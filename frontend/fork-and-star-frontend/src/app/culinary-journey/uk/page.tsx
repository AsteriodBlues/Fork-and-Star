"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Star, Award, MapPin, ChefHat, Play, Pause, Sparkles, Crown, Utensils, Leaf, Flame, Globe, Trophy, Heart, Shield } from 'lucide-react';

const UKCulinaryJourney = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuote, setShowQuote] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Marco Pierre White Quote Animation Component - Transition from America
  const MarcoQuote = () => {
    const quoteRef = useRef(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowQuote(false);
      }, 16000); // Extended for deeper contemplation
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
            radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(25, 25, 112, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(220, 20, 60, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0a0f1a 0%, #1a0a0f 50%, #0f0a1a 100%)
          `
        }}
      >
        {/* Floating British Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => {
            const leftPos = (i * 13.7) % 100;
            const topPos = (i * 9.3) % 100;
            const xMovement = (i % 2 === 0 ? 1 : -1) * (25 + (i % 15));
            const yMovement = (i % 2 === 0 ? 1 : -1) * (25 + (i % 15));
            const duration = 10 + (i % 8);
            const delay = (i % 20) * 0.2;
            const emojis = ['🏰', '🫖', '🥧', '🍺', '🧀', '🐟', '👑', '⚽'];
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
                  opacity: [0, 0.7, 0],
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
                {emoji}
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-7xl px-8 text-center relative z-10">
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
                🇺🇸
              </motion.span>
              <div className="w-32 h-px bg-gradient-to-r from-blue-500 via-white to-red-600"></div>
              <motion.span 
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                🇬🇧
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
                background: 'linear-gradient(135deg, #ffffff 0%, #8B4513 20%, #191970 40%, #DC143C 60%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 60px rgba(25,25,112,0.4)',
                letterSpacing: '0.02em'
              }}
            >
              "Cooking is not about convenience. It's about love, it's about caring, 
              it's about the relationship between the chef and his product and the chef and his customer. 
              You cannot buy that. And that's the difference between a cook and a chef."
            </blockquote>
            
            <motion.cite
              className="text-2xl text-blue-300 font-medium tracking-wider block"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                textShadow: '0 0 30px rgba(25,25,112,0.6)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 2 }}
            >
              — Marco Pierre White, The Godfather of British Cuisine
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
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <span className="text-lg text-blue-200 uppercase tracking-[0.3em] font-medium">
                Enter the Renaissance Kingdom
              </span>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
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
              👑
            </motion.div>
          </motion.div>
        </div>

        {/* Video Preview */}
        <motion.div
          className="absolute bottom-8 right-8 w-32 h-24 rounded-lg overflow-hidden border border-blue-400/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 14, duration: 1 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-800 to-red-700 flex items-center justify-center text-4xl">
            🏰
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
        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-blue-900 flex items-center justify-center">
          <span className="text-8xl">{emoji}</span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="flex items-center justify-center w-16 h-16 bg-slate-500/20 backdrop-blur-md rounded-full border border-slate-300/30 transition-all duration-300 hover:bg-slate-500/30 hover:scale-110">
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

  // Main UK Journey Section
  const UKSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

    const culinaryTimeline = [
      {
        era: "Medieval Heritage",
        period: "1066-1500",
        description: "Norman conquest brings sophistication to Anglo-Saxon traditions",
        dishes: ["Roasted Meats", "Pottage", "Meat Pies", "Ale & Mead"],
        legacy: "Foundation of British comfort food culture",
        colors: "from-amber-700 to-orange-800",
        emoji: "🏰"
      },
      {
        era: "Empire Influences", 
        period: "1600-1900",
        description: "Colonial spice routes transform British palates forever",
        dishes: ["Curry", "Tea Culture", "Kedgeree", "Mulligatawny"],
        legacy: "Global flavors become British staples",
        colors: "from-purple-700 to-indigo-800",
        emoji: "🌍"
      },
      {
        era: "Post-War Innovation",
        period: "1945-1990",
        description: "From rationing to television chefs - culinary awakening begins",
        dishes: ["TV Dinners", "Prawn Cocktail", "Chicken Kiev", "Black Forest Gateau"],
        legacy: "Celebrity chef culture emerges",
        colors: "from-slate-600 to-gray-700",
        emoji: "📺"
      },
      {
        era: "Renaissance Revolution",
        period: "1990-Present",
        description: "Marco, Gordon, Heston transform Britain into culinary powerhouse",
        dishes: ["Molecular Gastronomy", "Nose-to-Tail", "Modern British", "Gastropubs"],
        legacy: "Global recognition and Michelin stardom",
        colors: "from-emerald-600 to-teal-800",
        emoji: "⭐"
      }
    ];

    const michelinTemples = [
      {
        name: "The Fat Duck",
        location: "Bray, Berkshire",
        chef: "Heston Blumenthal",
        stars: 3,
        innovation: "Multi-sensory molecular gastronomy",
        philosophy: "Food is emotional, scientific, theatrical",
        signature: "Sound of the Sea",
        color: "from-purple-600 to-indigo-800"
      },
      {
        name: "Waterside Inn",
        location: "Bray, Berkshire",
        chef: "Alain Roux",
        stars: 3,
        innovation: "French perfection by the Thames",
        philosophy: "Classical French technique, impeccable service",
        signature: "Soufflé Suissesse",
        color: "from-blue-700 to-slate-800"
      },
      {
        name: "CORE by Clare Smyth",
        location: "London",
        chef: "Clare Smyth",
        stars: 3,
        innovation: "Female excellence, British ingredients",
        philosophy: "Nature-driven, technically perfect",
        signature: "Crown of Lamb",
        color: "from-rose-600 to-pink-700"
      },
      {
        name: "Alain Ducasse at The Dorchester",
        location: "London",
        chef: "Alain Ducasse",
        stars: 3,
        innovation: "French luxury in British capital",
        philosophy: "Naturalness, authenticity, respect",
        signature: "Sauté of Lobster",
        color: "from-amber-600 to-yellow-700"
      },
      {
        name: "The Ledbury",
        location: "London", 
        chef: "Brett Graham",
        stars: 3,
        innovation: "Australian-British fusion mastery",
        philosophy: "Seasonal, creative, precise",
        signature: "Flame-grilled Mackerel",
        color: "from-green-600 to-emerald-700"
      }
    ];

    const greenStarHeroes = [
      {
        name: "L'Enclume",
        location: "Cartmel, Cumbria",
        chef: "Simon Rogan",
        stars: 3,
        greenStar: true,
        focus: "Farm-to-Table Pioneer",
        innovation: "12-acre farm, wild foraging, preservation",
        philosophy: "The land dictates the menu, not the chef",
        emoji: "🌿"
      },
      {
        name: "Moor Hall",
        location: "Aughton, Lancashire", 
        chef: "Mark Birchall",
        stars: 3,
        greenStar: true,
        focus: "Sustainable Luxury",
        innovation: "5-acre garden, zero-waste philosophy",
        philosophy: "Luxury through sustainability, not excess",
        emoji: "🌱"
      },
      {
        name: "Restaurant Sat Bains",
        location: "Nottingham",
        chef: "Sat Bains", 
        stars: 2,
        greenStar: true,
        focus: "Kitchen Garden Innovation",
        innovation: "Hydroponic growing, energy efficiency",
        philosophy: "Innovation serves sustainability",
        emoji: "💚"
      },
      {
        name: "Interlude",
        location: "London",
        chef: "Robin Gill",
        stars: 1,
        greenStar: true,
        focus: "Urban Sustainability",
        innovation: "City farming, waste reduction",
        philosophy: "London can lead in green dining",
        emoji: "🏙️"
      },
      {
        name: "Black Swan at Oldstead",
        location: "Yorkshire",
        chef: "Tommy Banks",
        stars: 1,
        greenStar: true,
        focus: "Yorkshire Farm Heritage",
        innovation: "Farm pub elevated to fine dining",
        philosophy: "Tradition is the ultimate sustainability",
        emoji: "🦢"
      },
      {
        name: "Forge",
        location: "Sheffield",
        chef: "Luke French",
        stars: 1,
        greenStar: true,
        focus: "Steel City Sustainability",
        innovation: "Industrial city, natural cuisine",
        philosophy: "Beauty from unexpected places",
        emoji: "⚒️"
      }
    ];

    const localHeroes = [
      {
        name: "Borough Market",
        location: "London",
        specialty: "Food Market Heritage",
        description: "1000 years of London's food soul - from medieval trading to artisanal paradise",
        philosophy: "Community through food, tradition through innovation",
        emoji: "🏪"
      },
      {
        name: "St. John",
        location: "London",
        specialty: "Nose-to-Tail Revolution",
        description: "Fergus Henderson's temple to whole animal cooking - nothing wasted, everything respected",
        philosophy: "If you're going to kill an animal, use every part",
        emoji: "🐷"
      },
      {
        name: "Dishoom",
        location: "Multiple UK",
        specialty: "Bombay Café Culture",
        description: "Bringing authentic Parsi café culture to Britain - bridging colonial past with modern respect",
        philosophy: "Food as cultural bridge, not appropriation",
        emoji: "☕"
      },
      {
        name: "Rules",
        location: "London",
        specialty: "Oldest Restaurant (1798)",
        description: "225 years of British dining history - from Dickens to modern day, tradition evolving",
        philosophy: "Honor the past, serve the present",
        emoji: "📜"
      }
    ];

    const britishTastes = [
      {
        taste: "Umami",
        description: "Aged cheeses, Worcestershire, Marmite - Britain's secret umami mastery",
        examples: ["Stilton", "HP Sauce", "Mature Cheddar"],
        science: "Fermentation and aging creating complex glutamates",
        emoji: "🧀"
      },
      {
        taste: "Bitter",
        description: "Hoppy ales, burnt ends, char - embracing bitter as sophisticated",
        examples: ["IPA", "Burnt Cream", "Charred Vegetables"],
        science: "Bitter compounds enhancing other flavors",
        emoji: "🍺"
      },
      {
        taste: "Comforting",
        description: "Stews, pies, puddings - emotional warmth through food",
        examples: ["Shepherd's Pie", "Sticky Toffee", "Bangers & Mash"],
        science: "Familiar flavors triggering comfort responses",
        emoji: "🥧"
      },
      {
        taste: "Preserved",
        description: "Pickles, chutneys, smoking - preservation as flavor enhancement",
        examples: ["Branston Pickle", "Smoked Salmon", "Piccalilli"],
        science: "Preservation techniques concentrating flavors",
        emoji: "🫙"
      },
      {
        taste: "Tea Culture",
        description: "Afternoon tea sophistication - ceremony meets comfort",
        examples: ["Earl Grey", "Scones", "Cucumber Sandwiches"],
        science: "Tannins and ritual creating social bonding",
        emoji: "🫖"
      }
    ];

    const regionalHeroes = [
      {
        region: "Scotland",
        ingredients: ["Salmon", "Whisky", "Haggis", "Shortbread"],
        description: "Highland pride and coastal excellence",
        colors: "from-purple-600 to-blue-700",
        emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿"
      },
      {
        region: "Wales",
        ingredients: ["Lamb", "Leeks", "Laverbread", "Caerphilly"],
        description: "Dragon's breath warmth and valley traditions",
        colors: "from-red-600 to-green-700",
        emoji: "🐉"
      },
      {
        region: "Cornwall",
        ingredients: ["Seafood", "Clotted Cream", "Pasties", "Saffron"],
        description: "Celtic coastlines and cream tea mastery",
        colors: "from-blue-500 to-yellow-600",
        emoji: "🌊"
      },
      {
        region: "Yorkshire",
        ingredients: ["Beef", "Yorkshire Pudding", "Wensleydale", "Rhubarb"],
        description: "God's own county with honest, hearty flavors",
        colors: "from-amber-600 to-brown-700",
        emoji: "🥩"
      },
      {
        region: "Northern Ireland",
        ingredients: ["Irish Stew", "Soda Bread", "Bushmills", "Dulse"],
        description: "Emerald isle comfort and whiskey warmth",
        colors: "from-green-600 to-orange-700",
        emoji: "☘️"
      },
      {
        region: "London",
        ingredients: ["Jellied Eels", "Pie & Mash", "Gin", "Markets"],
        description: "Capital cosmopolitan meets East End tradition",
        colors: "from-gray-600 to-red-700",
        emoji: "🏙️"
      }
    ];

    const britishRenaissance = [
      {
        name: "Marco Pierre White",
        title: "The Godfather",
        era: "1980s-1990s",
        impact: "First British chef to earn 3 Michelin stars",
        revolution: "Brought French technique to British kitchens",
        philosophy: "Perfection through passion and discipline",
        legacy: "Trained Gordon Ramsay, changed British dining forever",
        color: "from-slate-700 to-black",
        emoji: "👨‍🍳"
      },
      {
        name: "Gordon Ramsay",
        title: "The Empire Builder",
        era: "1990s-Present", 
        impact: "Global brand, television personality, business empire",
        revolution: "Made British chefs celebrities worldwide",
        philosophy: "Excellence demands everything you have",
        legacy: "Michelin stars on three continents",
        color: "from-red-600 to-orange-700",
        emoji: "🔥"
      },
      {
        name: "Heston Blumenthal", 
        title: "The Mad Scientist",
        era: "2000s-Present",
        impact: "Molecular gastronomy pioneer, The Fat Duck legend",
        revolution: "Food as multi-sensory experience",
        philosophy: "Question everything, innovate constantly",
        legacy: "Inspired global experimental cuisine movement",
        color: "from-purple-600 to-indigo-800",
        emoji: "⚗️"
      },
      {
        name: "Clare Smyth",
        title: "The Pioneer",
        era: "2010s-Present",
        impact: "First female chef to run 3-star kitchen in UK",
        revolution: "British ingredients elevated to highest level",
        philosophy: "Nature and technique in perfect harmony",
        legacy: "Inspiring new generation of female chefs",
        color: "from-pink-600 to-rose-700", 
        emoji: "👩‍🍳"
      }
    ];

    const chelseaFC = [
      {
        aspect: "Stamford Bridge Traditions",
        description: "Pre-match rituals at historic pubs around the ground",
        culture: "The Butcher's Hook, The Imperial Arms - where legends gather",
        impact: "Community dining before sporting glory",
        emoji: "🍺"
      },
      {
        aspect: "Roman Abramovich Era",
        description: "Russian oligarch influence on London's dining scene",
        culture: "Caviar culture, vodka excellence, Eastern European luxury",
        impact: "Elevated London restaurant standards globally",
        emoji: "🍾"
      },
      {
        aspect: "Global Player Influence",
        description: "International squad bringing world flavors to London",
        culture: "Spanish tapas, Italian trattorias, French bistros",
        impact: "West London as global food destination",
        emoji: "🌍"
      },
      {
        aspect: "Todd Boehly Era",
        description: "American ownership bringing new energy and investment",
        culture: "Sports bar culture, American BBQ, innovative dining",
        impact: "Modern approach to matchday hospitality",
        emoji: "🇺🇸"
      },
      {
        aspect: "Blue Pride Culture",
        description: "Chelsea's success paralleling British culinary renaissance",
        culture: "Winning mentality, never giving up, pride in excellence",
        impact: "Champions League success mirrors UK's Michelin achievements",
        emoji: "🏆"
      }
    ];

    const festivalCulture = [
      {
        festival: "Christmas",
        description: "Traditional roasts, puddings, and family gathering ceremonies",
        foods: ["Turkey", "Christmas Pudding", "Mince Pies", "Mulled Wine"],
        philosophy: "Abundance, tradition, family unity",
        emoji: "🎄"
      },
      {
        festival: "Burns Night",
        description: "Scottish celebration with haggis, whisky, and poetry",
        foods: ["Haggis", "Neeps & Tatties", "Whisky", "Shortbread"],
        philosophy: "Heritage, pride, cultural celebration",
        emoji: "🥃"
      },
      {
        festival: "Harvest Festival", 
        description: "Celebrating British produce and seasonal abundance",
        foods: ["Apples", "Root Vegetables", "Preserves", "Bread"],
        philosophy: "Gratitude for the land, seasonal eating",
        emoji: "🍎"
      },
      {
        festival: "Royal Occasions",
        description: "State banquets, jubilees, and ceremonial dining",
        foods: ["Coronation Chicken", "Victoria Sponge", "Champagne", "Canapés"],
        philosophy: "Pomp, ceremony, national pride",
        emoji: "👑"
      }
    ];

    return (
      <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
        
        {/* Enhanced Multi-Video Background */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-blue-900 opacity-30 flex items-center justify-center text-9xl">
              👑
            </div>
            <div className="w-full h-full bg-gradient-to-br from-blue-800 to-red-700 opacity-25 flex items-center justify-center text-9xl">
              🏰
            </div>
            <div className="w-full h-full bg-gradient-to-br from-red-700 to-slate-800 opacity-30 flex items-center justify-center text-9xl">
              ⚽
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-blue-900/40" />
        </div>

        {/* Country Header with British Sophistication */}
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
                🇬🇧
              </motion.span>
              <div>
                <motion.h1 
                  className="text-8xl md:text-9xl lg:text-[10rem] font-light tracking-tight mb-4"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #8B4513 20%, #191970 40%, #DC143C 60%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 80px rgba(25,25,112,0.4)'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 2 }}
                >
                  BRITANNIA
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl text-blue-300 font-light tracking-[0.3em]"
                  style={{ 
                    textShadow: '0 0 40px rgba(25,25,112,0.8)',
                    fontFamily: '"Inter", system-ui, sans-serif'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 2 }}
                >
                  FROM EMPIRE TO RENAISSANCE
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Content Sections */}
        <div className="relative z-10 pt-[30rem]">

          {/* Culinary History Timeline */}
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #8B4513 30%, #191970 70%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  A Thousand Years of Transformation
                </h2>
                <p className="text-2xl text-slate-200 max-w-5xl mx-auto leading-relaxed">
                  From Norman castles to molecular laboratories - how British cuisine evolved 
                  from ridicule to global reverence through empire, innovation, and renaissance.
                </p>
              </motion.div>

              <div className="space-y-24">
                {culinaryTimeline.map((era, index) => (
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
                        
                        <blockquote className="text-white italic text-lg leading-relaxed border-l-2 border-white/30 pl-6">
                          "{era.legacy}"
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
                  British Michelin Royalty
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">3-Star Excellence</p>
                <p className="text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
                  The temples where British cuisine achieved its highest recognition, 
                  proving that innovation and tradition can create culinary magic.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
                {michelinTemples.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -20 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800 to-black border border-slate-500/20 backdrop-blur-lg">
                      
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
                        <h3 className="text-3xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {restaurant.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <MapPin className="w-6 h-6 text-slate-400" />
                          <p className="text-slate-300 font-medium text-lg">
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

          {/* Green Star Sustainability Heroes */}
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
                  Green Revolution Leaders
                </h2>
                <p className="text-3xl text-green-200 font-light mb-6">Sustainability Pioneers</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  British restaurants leading the global sustainability movement, proving that 
                  environmental consciousness creates the most profound culinary experiences.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                {greenStarHeroes.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.15 }}
                    whileHover={{ y: -15 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-green-800/40 to-black/80 backdrop-blur-lg border border-green-500/30">
                      
                      <div className="relative h-64 flex items-center justify-center">
                        <span className="text-8xl">{restaurant.emoji}</span>
                        
                        {/* Stars and Green Star */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(restaurant.stars)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          {restaurant.greenStar && (
                            <Leaf className="w-5 h-5 fill-green-400 text-green-400" />
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-2xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {restaurant.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <MapPin className="w-5 h-5 text-green-400" />
                          <p className="text-green-300 font-medium">
                            {restaurant.location}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <ChefHat className="w-5 h-5 text-green-400" />
                          <p className="text-green-300 font-medium">
                            {restaurant.chef}
                          </p>
                        </div>
                        
                        <p className="text-green-200 text-lg font-medium mb-3">
                          {restaurant.focus}
                        </p>
                        
                        <p className="text-gray-300 mb-4 text-sm">
                          {restaurant.innovation}
                        </p>
                        
                        <blockquote className="text-green-200 leading-relaxed italic border-l-2 border-green-500 pl-4 text-sm">
                          "{restaurant.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Local Heroes */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, rgba(160, 82, 45, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #8B4513 50%, #A0522D 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Local Legends
                </h2>
                <p className="text-2xl text-amber-200 max-w-5xl mx-auto leading-relaxed">
                  The institutions that define British food culture - from ancient markets 
                  to revolutionary concepts that changed how Britain eats.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {localHeroes.map((place, index) => (
                  <motion.div
                    key={place.name}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-900/30 to-black/80 backdrop-blur-lg border border-amber-500/30">
                      
                      <div className="relative h-64 flex items-center justify-center">
                        <span className="text-8xl">{place.emoji}</span>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-3xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {place.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <MapPin className="w-5 h-5 text-amber-400" />
                          <p className="text-amber-300 font-medium">
                            {place.location}
                          </p>
                        </div>
                        
                        <p className="text-amber-200 text-lg font-medium mb-4">
                          {place.specialty}
                        </p>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {place.description}
                        </p>
                        
                        <blockquote className="text-amber-200 leading-relaxed italic border-l-2 border-amber-500 pl-4">
                          "{place.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Five British Tastes */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(45deg, rgba(139, 69, 19, 0.2) 0%, rgba(25, 25, 112, 0.2) 25%, rgba(220, 20, 60, 0.2) 50%, rgba(34, 139, 34, 0.2) 75%, rgba(255, 140, 0, 0.2) 100%)'
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
                    background: 'linear-gradient(90deg, #8B4513 0%, #191970 25%, #DC143C 50%, #228B22 75%, #FF8C00 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  The Five British Tastes
                </h2>
                <p className="text-2xl text-gray-200 max-w-5xl mx-auto leading-relaxed">
                  Beyond sweet, sour, salty, bitter, umami - how British cuisine developed 
                  its own unique taste categories through centuries of culinary evolution.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-5 gap-6">
                {britishTastes.map((taste, index) => (
                  <motion.div
                    key={taste.taste}
                    className="group text-center"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    whileHover={{ y: -15, scale: 1.05 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800/40 to-black/60 backdrop-blur-lg border border-white/10 p-6">
                      <div className="text-5xl mb-4">{taste.emoji}</div>
                      
                      <h3 className="text-xl font-light text-white mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
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

          {/* Regional Ingredient Heroes */}
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
                  Regional Pride
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">Britain's Ingredient Map</p>
                <p className="text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
                  From Scottish highlands to Cornish coasts, each region contributes 
                  its signature ingredients to the great British culinary tapestry.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                {regionalHeroes.map((region, index) => (
                  <motion.div
                    key={region.region}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.15 }}
                    whileHover={{ y: -15 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800/30 to-black/70 backdrop-blur-lg border border-white/10">
                      
                      <div className="relative h-64">
                        <div className={`w-full h-full bg-gradient-to-br ${region.colors} opacity-80 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-700`}>
                          {region.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-2xl text-white font-light mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {region.region}
                        </h3>
                        
                        <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                          {region.description}
                        </p>
                        
                        <div className="space-y-2">
                          <p className="text-blue-300 font-medium text-sm">Signature Ingredients:</p>
                          <div className="flex flex-wrap gap-1">
                            {region.ingredients.map((ingredient, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-xs border border-blue-400/30">
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

          {/* The Great British Renaissance */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(128, 0, 128, 0.3) 0%, rgba(255, 20, 147, 0.2) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #800080 30%, #FF1493 70%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  The Great British Renaissance
                </h2>
                <p className="text-2xl text-purple-200 max-w-5xl mx-auto leading-relaxed">
                  How four legendary chefs transformed British cuisine from global laughingstock 
                  to worldwide inspiration in just three decades.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {britishRenaissance.map((master, index) => (
                  <motion.div
                    key={master.name}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                    whileHover={{ y: -20 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-purple-800/40 to-black/80 backdrop-blur-lg border border-purple-500/30">
                      
                      <div className="relative h-80">
                        <div className={`w-full h-full bg-gradient-to-br ${master.color} flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700`}>
                          {master.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        
                        {/* Era Badge */}
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-purple-500/20 backdrop-blur-md rounded-full text-purple-300 text-sm font-medium border border-purple-400/30">
                            {master.era}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {master.name}
                        </h3>
                        
                        <p className="text-2xl text-purple-300 font-light mb-4 italic">
                          {master.title}
                        </p>
                        
                        <p className="text-purple-200 text-lg font-medium mb-4">
                          {master.impact}
                        </p>
                        
                        <p className="text-gray-300 mb-4">
                          <strong>Revolution:</strong> {master.revolution}
                        </p>
                        
                        <p className="text-gray-300 mb-4">
                          <strong>Legacy:</strong> {master.legacy}
                        </p>
                        
                        <blockquote className="text-purple-200 leading-relaxed italic border-l-2 border-purple-500 pl-4">
                          "{master.philosophy}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Chelsea FC Culture */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 139, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #00008B 50%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  💙 Chelsea FC & Culinary Culture
                </h2>
                <p className="text-3xl text-blue-200 font-light mb-6">Blue Pride, Global Flavors</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  How Chelsea's rise to global glory paralleled London's transformation 
                  into a world culinary capital - where football passion meets food excellence.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
                {chelseaFC.map((aspect, index) => (
                  <motion.div
                    key={aspect.aspect}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-900/40 to-black/80 backdrop-blur-lg border border-blue-500/30 p-8">
                      
                      <div className="text-6xl mb-6 text-center">{aspect.emoji}</div>
                      
                      <h3 className="text-2xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {aspect.aspect}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {aspect.description}
                      </p>
                      
                      <p className="text-blue-200 italic mb-4">
                        {aspect.culture}
                      </p>
                      
                      <div className="pt-4 border-t border-blue-500/20">
                        <p className="text-blue-300 font-medium text-sm">
                          Impact: {aspect.impact}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Special Chelsea Section */}
              <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-3xl p-12 border border-blue-500/30">
                  <h3 className="text-4xl text-white font-light mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                    ⚽ Blue is the Color, Food is the Passion
                  </h3>
                  <p className="text-xl text-blue-200 leading-relaxed max-w-4xl mx-auto">
                    "Just as Chelsea transformed from local club to global powerhouse, 
                    British cuisine evolved from comfort food to culinary excellence. 
                    Both journeys required passion, investment, and never giving up. 
                    Champions League nights at Stamford Bridge mirror Michelin star achievements - 
                    proving that with enough heart, anything is possible."
                  </p>
                  <div className="flex items-center justify-center gap-8 mt-8">
                    <Trophy className="w-12 h-12 text-yellow-400" />
                    <span className="text-2xl text-white font-light">KTBFFH</span>
                    <Trophy className="w-12 h-12 text-yellow-400" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Festival Culture */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.3) 0%, rgba(255, 215, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #DC143C 30%, #FFD700 70%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Festivals & Traditions
                </h2>
                <p className="text-2xl text-red-200 max-w-5xl mx-auto leading-relaxed">
                  Where British food culture comes alive through celebration, ceremony, 
                  and the shared joy of traditional gatherings across the seasons.
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
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-red-800/40 to-black/80 backdrop-blur-lg border border-red-500/30">
                      
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
                            <p className="text-red-300 font-medium mb-3">Traditional Foods:</p>
                            <div className="flex flex-wrap gap-2">
                              {festival.foods.map((food, i) => (
                                <span key={i} className="px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-full text-red-200 text-sm border border-red-400/30">
                                  {food}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <blockquote className="text-red-200 leading-relaxed italic border-l-2 border-red-500 pl-4">
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

          {/* Interactive Technique Videos */}
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-br from-slate-900/30 via-black to-blue-900/30">
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
                  British Innovation
                </h2>
                <p className="text-3xl text-slate-200 font-light mb-6">Technique Mastery</p>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Witness how British chefs revolutionized cooking techniques, from 
                  molecular gastronomy to sustainable practices and nose-to-tail cooking.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                <VideoSection
                  title="Molecular Mastery"
                  description="Heston's scientific approach to flavor and texture"
                  emoji="⚗️"
                  className="h-80"
                />
                
                <VideoSection
                  title="Nose-to-Tail"
                  description="Fergus Henderson's whole animal respect philosophy"
                  emoji="🐷"
                  className="h-80"
                />
                
                <VideoSection
                  title="Garden-to-Table"
                  description="Simon Rogan's foraging and farm connection"
                  emoji="🌿"
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
                radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(25, 25, 112, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(220, 20, 60, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
                linear-gradient(135deg, #0a0f1a 0%, #1a0a0f 50%, #0f0a1a 100%)
              `
            }}
          >
            {/* Floating British Elements */}
            <div className="absolute inset-0">
              {[...Array(35)].map((_, i) => {
                const leftPos = (i * 15.7) % 100;
                const topPos = (i * 11.3) % 100;
                const yMovement = -70 - (i % 50);
                const duration = 18 + (i % 12);
                const delay = (i % 25) * 0.2;
                const emojis = ['🏰', '🫖', '🥧', '🍺', '🧀', '🐟', '👑', '⚽', '🌹', '☂️'];
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
                      scale: [0.3, 1.8, 0.3]
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
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-16 max-w-7xl mx-auto leading-relaxed"
                style={{ 
                  fontFamily: '"Playfair Display", serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #8B4513 20%, #191970 40%, #DC143C 60%, #ffffff 80%, #228B22 100%)',
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
                "British cuisine didn't just find its voice—it discovered it had been there all along, 
                waiting beneath layers of self-doubt. We took our humble ingredients, our love of comfort, 
                our global connections, and our never-say-die spirit, and created something uniquely, 
                proudly, brilliantly British. From empire to renaissance, 
                we proved that transformation is possible when you have enough heart."
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
                  🇬🇧
                </motion.span>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-blue-500 via-white via-red-500 to-transparent"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Crown className="w-16 h-16 text-yellow-400" />
                  </motion.div>
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-red-500 via-white via-blue-500 to-transparent"></div>
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
              
              <motion.div
                className="mt-12 space-y-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 4, duration: 1.5 }}
              >
                <p className="text-blue-300 text-2xl tracking-[0.3em] font-medium">
                  CULINARY JOURNEY COMPLETE
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                  <span className="text-white text-lg">God Save Our Gracious Cuisine</span>
                  <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                </div>
                
                <div className="flex items-center justify-center gap-6 mt-6">
                  <Shield className="w-8 h-8 text-blue-500" />
                  <span className="text-blue-300 text-lg font-medium">Keep The Blue Flag Flying High</span>
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* Enhanced Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 w-20 h-20 z-30"
          style={{
            background: `conic-gradient(#191970 ${scrollYProgress.get() * 360}deg, rgba(255,255,255,0.1) 0deg)`,
            borderRadius: '50%',
            padding: '3px'
          }}
        >
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-blue-500/30 backdrop-blur-md">
            <div className="text-center">
              <span className="text-white text-sm font-bold block">
                {Math.round(scrollYProgress.get() * 100)}%
              </span>
              <span className="text-blue-400 text-lg">
                🇬🇧
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
        {showQuote && <MarcoQuote />}
      </AnimatePresence>
      
      {!showQuote && <UKSection />}
    </div>
  );
};

export default UKCulinaryJourney;
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Star, Award, MapPin, ChefHat, Play, Pause, Sparkles, Crown, Utensils, Leaf, Flame, Globe, Trophy, Heart, Shield, Zap, Cog } from 'lucide-react';

// Define types for better type safety
interface TimelineEra {
  era: string;
  period: string;
  description: string;
  dishes: string[];
  legacy: string;
  colors: string;
  emoji: string;
}

interface MichelinRestaurant {
  name: string;
  location: string;
  chef: string;
  stars: number;
  innovation: string;
  philosophy: string;
  signature: string;
  color: string;
}

interface GreenStarRestaurant {
  name: string;
  location: string;
  chef: string;
  stars: number;
  greenStar: boolean;
  focus: string;
  innovation: string;
  philosophy: string;
  emoji: string;
}

interface LocalHero {
  name: string;
  location: string;
  specialty: string;
  description: string;
  philosophy: string;
  emoji: string;
}

interface GermanicTaste {
  taste: string;
  description: string;
  examples: string[];
  science: string;
  emoji: string;
}

interface RegionalPowerhouse {
  region: string;
  ingredients: string[];
  description: string;
  colors: string;
  emoji: string;
}

interface MolecularMaster {
  name: string;
  restaurant: string;
  innovation: string;
  technique: string;
  impact: string;
  philosophy: string;
  emoji: string;
}

interface BeerPairing {
  style: string;
  description: string;
  pairings: string[];
  science: string;
  region: string;
  emoji: string;
}

interface BayernAspect {
  aspect: string;
  description: string;
  culture: string;
  impact: string;
  emoji: string;
}

interface PorscheValue {
  value: string;
  description: string;
  connection: string;
  implementation: string;
  emoji: string;
}

interface Festival {
  festival: string;
  description: string;
  foods: string[];
  philosophy: string;
  emoji: string;
}

interface VideoSectionProps {
  title: string;
  description: string;
  emoji: string;
  className?: string;
}

const GermanCulinaryJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuote, setShowQuote] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Sven Elverfeld Quote Animation Component - Transition from UK
  const ElverfeldQuote = () => {
    const quoteRef = useRef<HTMLDivElement>(null);

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
            radial-gradient(circle at 20% 80%, rgba(139, 0, 0, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(34, 139, 34, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #1a1a0a 0%, #0a1a0a 50%, #1a0a0a 100%)
          `
        }}
      >
        {/* Floating German Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => {
            const leftPos = (i * 14.3) % 100;
            const topPos = (i * 10.7) % 100;
            const xMovement = (i % 2 === 0 ? 1 : -1) * (25 + (i % 18));
            const yMovement = (i % 2 === 0 ? 1 : -1) * (25 + (i % 18));
            const duration = 12 + (i % 8);
            const delay = (i % 20) * 0.25;
            const emojis = ['🍺', '🥨', '🏰', '⚙️', '🚗', '⚽', '🌲', '🍖'];
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
                🇬🇧
              </motion.span>
              <div className="w-32 h-px bg-gradient-to-r from-blue-500 via-red-600 to-yellow-500"></div>
              <motion.span 
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                🇩🇪
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
                background: 'linear-gradient(135deg, #ffffff 0%, #8B0000 20%, #FFD700 40%, #228B22 60%, #708090 80%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 60px rgba(255,215,0,0.4)',
                letterSpacing: '0.02em'
              }}
            >
              "In Germany, we don't just cook - we engineer flavor. 
              Every technique must be perfect, every ingredient must have purpose, 
              but above all, every dish must touch the soul. 
              This is German precision with German heart."
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
              — Sven Elverfeld, Master of German Precision
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
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
              <span className="text-lg text-red-200 uppercase tracking-[0.3em] font-medium">
                Enter the Engineering Kitchen
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
              ⚙️
            </motion.div>
          </motion.div>
        </div>

        {/* Video Preview */}
        <motion.div
          className="absolute bottom-8 right-8 w-32 h-24 rounded-lg overflow-hidden border border-red-400/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 14, duration: 1 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-red-800 to-yellow-700 flex items-center justify-center text-4xl">
            🏰
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Enhanced Video Player Component
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
        <div className="w-full h-full bg-gradient-to-br from-red-800 to-yellow-600 flex items-center justify-center">
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

  // Main German Journey Section
  const GermanSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

    const culinaryTimeline: TimelineEra[] = [
      {
        era: "Medieval Feasts",
        period: "800-1500",
        description: "Holy Roman Empire banquets and guild tradition foundations",
        dishes: ["Roasted Game", "Guild Breads", "Monastery Beers", "Feast Halls"],
        legacy: "Precision and community dining culture established",
        colors: "from-amber-800 to-brown-900",
        emoji: "🏰"
      },
      {
        era: "Baroque Abundance", 
        period: "1600-1800",
        description: "Royal court refinement meets regional kingdom specialties",
        dishes: ["Court Pastries", "Regional Wines", "Spiced Meats", "Royal Banquets"],
        legacy: "Sophisticated techniques and regional pride",
        colors: "from-purple-700 to-gold-800",
        emoji: "👑"
      },
      {
        era: "Industrial Precision",
        period: "1800-1980",
        description: "Post-war efficiency, technical innovation, systematic approach",
        dishes: ["Systematic Cooking", "Precision Timing", "Quality Standards", "Technical Methods"],
        legacy: "Engineering approach to cuisine",
        colors: "from-gray-600 to-slate-800",
        emoji: "⚙️"
      },
      {
        era: "Modern Renaissance",
        period: "1980-Present",
        description: "Molecular mastery, sustainability leadership, global recognition",
        dishes: ["Molecular Gastronomy", "Sustainable Practices", "Technical Innovation", "Global Standards"],
        legacy: "German precision meets culinary artistry",
        colors: "from-green-600 to-teal-800",
        emoji: "🔬"
      }
    ];

    const michelinTemples: MichelinRestaurant[] = [
      {
        name: "Waldhotel Sonnora",
        location: "Dreis, Eifel",
        chef: "Clemens Rambichler",
        stars: 3,
        innovation: "Forest-to-table perfectionism",
        philosophy: "Nature's precision through technical mastery",
        signature: "Eifel lamb with forest herbs",
        color: "from-green-700 to-brown-800"
      },
      {
        name: "Aqua",
        location: "Wolfsburg",
        chef: "Sven Elverfeld",
        stars: 3,
        innovation: "Scientific precision in every technique",
        philosophy: "Engineering excellence applied to cuisine",
        signature: "Lobster with precision vegetables",
        color: "from-blue-700 to-gray-800"
      },
      {
        name: "JAN",
        location: "Munich",
        chef: "Jan Hartwig",
        stars: 3,
        innovation: "Modern European with German precision",
        philosophy: "Technical perfection, emotional connection",
        signature: "Alpine char with mountain herbs",
        color: "from-red-700 to-amber-800"
      },
      {
        name: "ES:SENZ",
        location: "Munich",
        chef: "Boris Rommel",
        stars: 3,
        innovation: "Sensory engineering and flavor architecture",
        philosophy: "All senses engaged through technical mastery",
        signature: "Multi-sensory tasting journey",
        color: "from-purple-600 to-indigo-800"
      },
      {
        name: "Schwarzwaldstube",
        location: "Baiersbronn",
        chef: "Torsten Michel",
        stars: 3,
        innovation: "Black Forest ingredients, global techniques",
        philosophy: "Regional pride through technical excellence",
        signature: "Venison with Black Forest mushrooms",
        color: "from-green-800 to-brown-900"
      }
    ];

    const greenStarHeroes: GreenStarRestaurant[] = [
      {
        name: "Rutz",
        location: "Berlin",
        chef: "Marco Müller",
        stars: 3,
        greenStar: true,
        focus: "Urban Sustainability Pioneer",
        innovation: "City restaurant, country connections, zero waste",
        philosophy: "Urban sophistication through rural sustainability",
        emoji: "🌱"
      },
      {
        name: "einsunternull",
        location: "Berlin",
        chef: "Andreas Rieger",
        stars: 2,
        greenStar: true,
        focus: "Zero-Waste Engineering",
        innovation: "Mathematical approach to waste elimination",
        philosophy: "German efficiency applied to sustainability",
        emoji: "♻️"
      },
      {
        name: "Horvath",
        location: "Berlin",
        chef: "Sebastian Frank",
        stars: 2,
        greenStar: true,
        focus: "Vegetable-Forward Innovation",
        innovation: "Plants as protagonists, not supporting cast",
        philosophy: "Vegetables deserve technical precision too",
        emoji: "🥬"
      },
      {
        name: "AURA",
        location: "Zurich",
        chef: "Various",
        stars: 2,
        greenStar: true,
        focus: "Sustainable Luxury Redefined",
        innovation: "Luxury through environmental consciousness",
        philosophy: "True luxury sustains the future",
        emoji: "✨"
      }
    ];

    const localHeroes: LocalHero[] = [
      {
        name: "Zur Letzten Instanz",
        location: "Berlin",
        specialty: "Oldest Restaurant (1621)",
        description: "400 years of German dining history - Napoleon ate here, tradition endures",
        philosophy: "Honor history while serving the present",
        emoji: "📜"
      },
      {
        name: "Ratskeller Bremen",
        location: "Bremen",
        specialty: "Medieval Guild Dining",
        description: "600-year-old wine cellar where merchants and guilds shaped German food culture",
        philosophy: "Community through shared tables and traditions",
        emoji: "🍷"
      },
      {
        name: "Münchener Weissbier",
        location: "Munich",
        specialty: "Beer Garden Culture",
        description: "Biergarten tradition where beer and food unite communities under chestnut trees",
        philosophy: "Gemütlichkeit through food and fellowship",
        emoji: "🍺"
      },
      {
        name: "Christmas Markets",
        location: "Throughout Germany",
        specialty: "Seasonal Tradition Keepers",
        description: "Glühwein, Lebkuchen, and Bratwurst bring warmth to winter nights",
        philosophy: "Tradition creates comfort and connection",
        emoji: "🎄"
      }
    ];

    const germanicTastes: GermanicTaste[] = [
      {
        taste: "Säuerlich",
        description: "Sour mastery through sauerkraut, pickles, vinegar traditions",
        examples: ["Sauerkraut", "Sauerbraten", "Pickled Vegetables"],
        science: "Fermentation creating complex acidic profiles",
        emoji: "🥒"
      },
      {
        taste: "Herzlich",
        description: "Hearty, warming, substantial flavors that nourish body and soul",
        examples: ["Schnitzel", "Eintopf", "Schweinshaxe"],
        science: "Rich proteins and fats providing satisfaction",
        emoji: "❤️"
      },
      {
        taste: "Röstung",
        description: "Roasted mastery in bread, beer, coffee - Maillard reaction perfection",
        examples: ["Dark Bread", "Roasted Malts", "Coffee Culture"],
        science: "Controlled browning creating complex flavors",
        emoji: "🍞"
      },
      {
        taste: "Würzig",
        description: "Complex spice blends and mustard culture - subtle heat and flavor",
        examples: ["Lebkuchen Spices", "Mustard Varieties", "Herb Blends"],
        science: "Layered spicing creating depth without overwhelming",
        emoji: "🌿"
      },
      {
        taste: "Bier",
        description: "Hop bitterness and malt sweetness in perfect German balance",
        examples: ["IPA", "Weissbier", "Märzen"],
        science: "Hop alpha acids balanced with malt sugars",
        emoji: "🍺"
      },
      {
        taste: "Gemütlich",
        description: "Cozy comfort through familiar flavors and warm presentation",
        examples: ["Apple Strudel", "Hot Soup", "Warm Bread"],
        science: "Familiar flavors triggering emotional comfort",
        emoji: "🏠"
      }
    ];

    const regionalPowerhouses: RegionalPowerhouse[] = [
      {
        region: "Bavaria",
        ingredients: ["Beer", "Pretzels", "Weisswurst", "Alpine Cuisine"],
        description: "Alpine traditions and beer culture perfection",
        colors: "from-blue-600 to-white",
        emoji: "🍺"
      },
      {
        region: "Black Forest",
        ingredients: ["Game", "Mushrooms", "Cherries", "Forest Herbs"],
        description: "Dark forest mystique and foraging traditions",
        colors: "from-green-800 to-brown-900",
        emoji: "🌲"
      },
      {
        region: "Rhineland",
        ingredients: ["Wine", "River Fish", "Refined Cuisine", "Valley Produce"],
        description: "Wine culture and sophisticated river cuisine",
        colors: "from-purple-600 to-green-700",
        emoji: "🍇"
      },
      {
        region: "Northern Coast",
        ingredients: ["Seafood", "Maritime Traditions", "Coastal Winds", "Salt"],
        description: "North Sea and Baltic maritime heritage",
        colors: "from-blue-600 to-gray-700",
        emoji: "🌊"
      },
      {
        region: "Berlin",
        ingredients: ["Currywurst", "Döner", "International Fusion", "Innovation"],
        description: "Capital creativity and multicultural fusion",
        colors: "from-red-600 to-black",
        emoji: "🏙️"
      },
      {
        region: "Saxony",
        ingredients: ["Royal Court", "Dresden Stollen", "Refined Sweets", "Porcelain Dining"],
        description: "Royal court influences and Dresden elegance",
        colors: "from-gold-600 to-blue-800",
        emoji: "👑"
      }
    ];

    const molecularRevolution: MolecularMaster[] = [
      {
        name: "Sven Elverfeld",
        restaurant: "Aqua",
        innovation: "Scientific Method Application",
        technique: "Temperature precision, molecular gastronomy",
        impact: "German engineering principles applied to cooking",
        philosophy: "Every variable controlled, every outcome predictable",
        emoji: "🔬"
      },
      {
        name: "Jan Hartwig",
        restaurant: "JAN",
        innovation: "Precision Flavor Engineering",
        technique: "Exact timing, measured techniques, consistent results",
        impact: "Mechanical precision creating emotional experiences",
        philosophy: "Technical mastery serves emotional connection",
        emoji: "⚙️"
      },
      {
        name: "Boris Rommel",
        restaurant: "ES:SENZ",
        innovation: "Sensory Laboratory Approach",
        technique: "Multi-sensory engineering, calculated experiences",
        impact: "All five senses engineered for maximum impact",
        philosophy: "Science serves sensation, technique serves emotion",
        emoji: "🧪"
      },
      {
        name: "Marco Müller",
        restaurant: "Rutz",
        innovation: "Systematic Sustainability",
        technique: "Engineered sustainability, calculated zero-waste",
        impact: "German efficiency applied to environmental consciousness",
        philosophy: "Sustainability requires systematic engineering",
        emoji: "🌱"
      }
    ];

    const beerPairingMastery: BeerPairing[] = [
      {
        style: "Hefeweizen",
        description: "Cloudy wheat beer with banana and clove notes",
        pairings: ["Weisswurst", "Pretzels", "Light Seafood", "Citrus Desserts"],
        science: "Wheat proteins complementing delicate flavors",
        region: "Bavaria",
        emoji: "🌾"
      },
      {
        style: "Pilsner",
        description: "Crisp, hoppy lager with clean finish",
        pairings: ["Schnitzel", "Grilled Fish", "Salads", "Light Cheeses"],
        science: "Hop bitterness cutting through rich foods",
        region: "Northern Germany",
        emoji: "🍺"
      },
      {
        style: "Märzen",
        description: "Malty Oktoberfest beer with toasted flavors",
        pairings: ["Roasted Meats", "Root Vegetables", "Aged Cheeses", "Apple Dishes"],
        science: "Malt sweetness balancing savory richness",
        region: "Bavaria",
        emoji: "🍂"
      },
      {
        style: "Schwarzbier",
        description: "Dark lager with coffee and chocolate notes",
        pairings: ["Game Meats", "Mushrooms", "Dark Chocolate", "Smoked Foods"],
        science: "Roasted malts complementing umami flavors",
        region: "Eastern Germany",
        emoji: "⚫"
      },
      {
        style: "Kölsch",
        description: "Light, delicate beer served in small glasses",
        pairings: ["Himmel un Ääd", "River Fish", "Light Sausages", "Fresh Herbs"],
        science: "Subtle flavors requiring frequent refreshing",
        region: "Cologne",
        emoji: "🥛"
      },
      {
        style: "Weissbock",
        description: "Strong wheat beer with complex fruit flavors",
        pairings: ["Rich Stews", "Game Birds", "Fruit Desserts", "Strong Cheeses"],
        science: "High alcohol and fruit esters enhancing rich foods",
        region: "Bavaria",
        emoji: "🍇"
      }
    ];

    const bayernMunich: BayernAspect[] = [
      {
        aspect: "Allianz Arena Traditions",
        description: "Weisswurst breakfast rituals before Champions League matches",
        culture: "Morning beer and white sausage - Bayern tradition since 1860",
        impact: "Football and food culture intertwined in Munich identity",
        emoji: "🥨"
      },
      {
        aspect: "Mia San Mia Philosophy",
        description: "Excellence mentality paralleling culinary perfectionism",
        culture: "We are who we are - pride in Bavarian identity and standards",
        impact: "Champion mindset applied to both football and cuisine",
        emoji: "🏆"
      },
      {
        aspect: "Global Bayern Family",
        description: "International players embracing Bavarian food culture",
        culture: "World-class talent discovering German culinary traditions",
        impact: "Global stars becoming ambassadors for German cuisine",
        emoji: "🌍"
      },
      {
        aspect: "Champions League Dining",
        description: "Victory celebrations at Munich's finest restaurants",
        culture: "Trophy wins celebrated with German precision dining",
        impact: "Success shared through food and community",
        emoji: "🥂"
      },
      {
        aspect: "Der Klassiker Food Rivalry",
        description: "Bayern vs Dortmund extends to regional food pride",
        culture: "Bavarian vs Westphalian cuisine friendly competition",
        impact: "Football rivalry celebrating regional food diversity",
        emoji: "⚽"
      }
    ];

    const porscheValues: PorscheValue[] = [
      {
        value: "Engineering Excellence",
        description: "Precision engineering principles applied to culinary techniques",
        connection: "Stuttgart's Porsche culture influencing regional fine dining",
        implementation: "Technical perfection in every cooking process",
        emoji: "🏎️"
      },
      {
        value: "Performance Optimization",
        description: "Every element perfected for maximum performance and efficiency",
        connection: "Restaurant kitchens designed like Porsche production lines",
        implementation: "Streamlined service, optimized flavor delivery",
        emoji: "⚡"
      },
      {
        value: "Innovation Leadership",
        description: "Constantly pushing boundaries while respecting heritage",
        connection: "Porsche's approach to tradition and innovation mirrors German cuisine",
        implementation: "Modern techniques honoring traditional foundations",
        emoji: "🔮"
      },
      {
        value: "Luxury Through Function",
        description: "Beauty emerging from perfect function, not empty decoration",
        connection: "German dining philosophy: substance first, beauty follows",
        implementation: "Elegant presentations rooted in technical excellence",
        emoji: "💎"
      },
      {
        value: "Stuttgart Sophistication",
        description: "Industrial city developing refined culinary culture",
        connection: "Engineering precision creating unexpectedly sophisticated cuisine",
        implementation: "Technical expertise enabling culinary artistry",
        emoji: "🏭"
      }
    ];

    const festivalCulture: Festival[] = [
      {
        festival: "Oktoberfest",
        description: "Beer and food harmony in the world's greatest celebration",
        foods: ["Weisswurst", "Pretzels", "Roasted Chicken", "Beer"],
        philosophy: "Community through shared tables and traditions",
        emoji: "🍺"
      },
      {
        festival: "Christmas Markets",
        description: "Winter comfort traditions warming hearts and bodies",
        foods: ["Glühwein", "Lebkuchen", "Bratwurst", "Stollen"],
        philosophy: "Tradition creates warmth in the darkest season",
        emoji: "🎄"
      },
      {
        festival: "Harvest Festivals",
        description: "Celebrating German ingredients and seasonal abundance",
        foods: ["Fresh Apples", "New Wine", "Root Vegetables", "Grain Breads"],
        philosophy: "Gratitude for the land's bounty",
        emoji: "🍎"
      },
      {
        festival: "Easter Traditions",
        description: "Spring renewal through traditional breads and sweets",
        foods: ["Easter Bread", "Chocolate Eggs", "Spring Herbs", "Lamb"],
        philosophy: "Renewal and rebirth through seasonal foods",
        emoji: "🐰"
      }
    ];

    return (
      <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
        
        {/* Enhanced Multi-Video Background */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            <div className="w-full h-full bg-gradient-to-br from-red-800 to-black opacity-30 flex items-center justify-center text-9xl">
              🏰
            </div>
            <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-red-700 opacity-25 flex items-center justify-center text-9xl">
              ⚙️
            </div>
            <div className="w-full h-full bg-gradient-to-br from-green-700 to-yellow-600 opacity-30 flex items-center justify-center text-9xl">
              🍺
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-transparent to-yellow-900/40" />
        </div>

        {/* Country Header with German Engineering */}
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
                🇩🇪
              </motion.span>
              <div>
                <motion.h1 
                  className="text-8xl md:text-9xl lg:text-[10rem] font-light tracking-tight mb-4"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #8B0000 20%, #FFD700 40%, #228B22 60%, #708090 80%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 80px rgba(255,215,0,0.4)'
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 2 }}
                >
                  DEUTSCHLAND
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
                  PRECISION MEETS HEART
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #8B0000 30%, #FFD700 70%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  From Guilds to Global Excellence
                </h2>
                <p className="text-2xl text-yellow-200 max-w-5xl mx-auto leading-relaxed">
                  German cuisine's methodical evolution from medieval precision to 
                  modern molecular mastery - where engineering principles create culinary art.
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
                          <h4 className="text-yellow-300 font-medium mb-3 text-lg">Key Developments:</h4>
                          <div className="flex flex-wrap gap-2">
                            {era.dishes.map((dish, i) => (
                              <span key={i} className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-200 text-sm border border-yellow-400/30">
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
                  German Michelin Mastery
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">3-Star Technical Excellence</p>
                <p className="text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
                  Where German engineering principles meet culinary artistry, creating 
                  experiences of unprecedented precision and emotional depth.
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
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-800 to-black border border-yellow-500/20 backdrop-blur-lg">
                      
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
                          <MapPin className="w-6 h-6 text-yellow-400" />
                          <p className="text-yellow-300 font-medium text-lg">
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
                  Sustainability Engineering
                </h2>
                <p className="text-3xl text-green-200 font-light mb-6">Green Star Pioneers</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  German efficiency applied to environmental consciousness, proving that 
                  systematic sustainability creates the most profound culinary experiences.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {greenStarHeroes.map((restaurant, index) => (
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
                        <span className="text-8xl">{restaurant.emoji}</span>
                        
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
                  The institutions that preserve German food culture - from ancient 
                  guildhalls to beer gardens where tradition meets community.
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

          {/* Six Germanic Tastes */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(45deg, rgba(139, 0, 0, 0.2) 0%, rgba(255, 215, 0, 0.2) 17%, rgba(34, 139, 34, 0.2) 34%, rgba(139, 69, 19, 0.2) 51%, rgba(0, 0, 139, 0.2) 68%, rgba(128, 128, 128, 0.2) 85%, rgba(139, 0, 0, 0.2) 100%)'
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
                    background: 'linear-gradient(90deg, #8B0000 0%, #FFD700 17%, #228B22 34%, #8B4513 51%, #00008B 68%, #808080 85%, #8B0000 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  The Six Germanic Tastes
                </h2>
                <p className="text-2xl text-gray-200 max-w-5xl mx-auto leading-relaxed">
                  How German cuisine developed its own precise taste categories through 
                  centuries of systematic culinary engineering and cultural tradition.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {germanicTastes.map((taste, index) => (
                  <motion.div
                    key={taste.taste}
                    className="group text-center"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    whileHover={{ y: -15, scale: 1.05 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800/40 to-black/60 backdrop-blur-lg border border-white/10 p-6 h-full">
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

          {/* Regional Powerhouses */}
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
                  Regional Powerhouses
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">Germany's Culinary Länder</p>
                <p className="text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
                  From Bavarian beer gardens to Black Forest mysteries, each region 
                  contributes its engineering precision to the German culinary federation.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                {regionalPowerhouses.map((region, index) => (
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
                          <p className="text-yellow-300 font-medium text-sm">Signature Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {region.ingredients.map((ingredient, i) => (
                              <span key={i} className="px-2 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-200 text-xs border border-yellow-400/30">
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

          {/* The Molecular Revolution */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.3) 0%, rgba(138, 43, 226, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #4B0082 30%, #8A2BE2 70%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  The Molecular Revolution
                </h2>
                <p className="text-2xl text-purple-200 max-w-5xl mx-auto leading-relaxed mb-8">
                  How German scientific precision revolutionized modern cooking, applying 
                  engineering principles to create unprecedented culinary experiences.
                </p>
                
                <blockquote className="text-xl text-purple-300 italic font-light max-w-4xl mx-auto">
                  "In Germany, we approach molecular gastronomy like we approach engineering - 
                  every variable controlled, every outcome predictable, but the result must still touch the soul."
                </blockquote>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16">
                {molecularRevolution.map((master, index) => (
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
                        <div className="w-full h-full bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700">
                          {master.emoji}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-4xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {master.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <Cog className="w-6 h-6 text-purple-400" />
                          <p className="text-purple-300 font-medium text-lg">
                            {master.restaurant}
                          </p>
                        </div>
                        
                        <p className="text-purple-200 text-xl font-medium mb-4">
                          {master.innovation}
                        </p>
                        
                        <p className="text-gray-300 mb-4">
                          <strong>Technique:</strong> {master.technique}
                        </p>
                        
                        <p className="text-gray-300 mb-4">
                          <strong>Impact:</strong> {master.impact}
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

          {/* Beer & Food Pairing Mastery */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.3) 0%, rgba(139, 69, 19, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #FF8C00 30%, #8B4513 70%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  🍺 Beer & Food Pairing Mastery
                </h2>
                <p className="text-3xl text-orange-200 font-light mb-6">1500+ German Beer Varieties</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-8">
                  Beyond bratwurst - how German beer culture created the world's most 
                  sophisticated pairing philosophy through centuries of brewing precision.
                </p>
                
                <blockquote className="text-xl text-orange-300 italic font-light max-w-4xl mx-auto">
                  "Beer is not just a drink in Germany - it's liquid bread, a meal companion, 
                  and the foundation of our social dining culture."
                </blockquote>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                {beerPairingMastery.map((beer, index) => (
                  <motion.div
                    key={beer.style}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-900/40 to-black/80 backdrop-blur-lg border border-amber-500/30 p-6 h-full">
                      
                      <div className="text-center mb-6">
                        <div className="text-6xl mb-4">{beer.emoji}</div>
                        <h3 className="text-2xl text-white font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                          {beer.style}
                        </h3>
                        <p className="text-amber-300 text-sm font-medium mb-2">{beer.region}</p>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed text-sm mb-4">
                        {beer.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-amber-300 font-medium text-sm mb-2">Perfect Pairings:</p>
                          <div className="flex flex-wrap gap-1">
                            {beer.pairings.map((pairing, i) => (
                              <span key={i} className="px-2 py-1 bg-amber-500/20 backdrop-blur-sm rounded-full text-amber-200 text-xs border border-amber-400/30">
                                {pairing}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-amber-500/20">
                          <p className="text-amber-200 text-xs italic">
                            <strong>Science:</strong> {beer.science}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Beer Sommelier Culture */}
              <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/30 rounded-3xl p-12 border border-amber-500/30">
                  <h3 className="text-4xl text-white font-light mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                    🍺 The German Beer Sommelier Revolution
                  </h3>
                  <p className="text-xl text-amber-200 leading-relaxed max-w-4xl mx-auto mb-6">
                    "German beer pairing goes far beyond tradition. Our sommeliers study hop chemistry, 
                    malt profiles, and fermentation science to create experiences as sophisticated 
                    as any wine pairing. From Kölsch with delicate fish to Weissbock with rich game - 
                    we've engineered the perfect liquid companion for every dish."
                  </p>
                  <div className="flex items-center justify-center gap-8">
                    <span className="text-2xl">🔬</span>
                    <span className="text-white font-medium">Science + Tradition = Perfect Pairing</span>
                    <span className="text-2xl">🍺</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Bayern Munich Culture */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #8B0000 50%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  🔴⚪ FC Bayern & Culinary Excellence
                </h2>
                <p className="text-3xl text-red-200 font-light mb-6">Mia San Mia - We Are Who We Are</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  How Bayern Munich's pursuit of perfection parallels Bavaria's culinary standards - 
                  where Champions League success meets Michelin star excellence.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
                {bayernMunich.map((aspect, index) => (
                  <motion.div
                    key={aspect.aspect}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-red-900/40 to-black/80 backdrop-blur-lg border border-red-500/30 p-8">
                      
                      <div className="text-6xl mb-6 text-center">{aspect.emoji}</div>
                      
                      <h3 className="text-2xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {aspect.aspect}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {aspect.description}
                      </p>
                      
                      <p className="text-red-200 italic mb-4">
                        {aspect.culture}
                      </p>
                      
                      <div className="pt-4 border-t border-red-500/20">
                        <p className="text-red-300 font-medium text-sm">
                          Impact: {aspect.impact}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Special Bayern Section */}
              <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-3xl p-12 border border-red-500/30">
                  <h3 className="text-4xl text-white font-light mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                    ⚽ Champions on the Pitch, Champions in the Kitchen
                  </h3>
                  <p className="text-xl text-red-200 leading-relaxed max-w-4xl mx-auto">
                    "Just as Bayern Munich demands perfection in every pass, every tackle, every goal, 
                    Bavarian cuisine demands perfection in every technique, every ingredient, every bite. 
                    Mia San Mia isn't just about football - it's about excellence in everything we do. 
                    From the Allianz Arena to the finest restaurants in Munich, we accept nothing less than world-class."
                  </p>
                  <div className="flex items-center justify-center gap-8 mt-8">
                    <Trophy className="w-12 h-12 text-yellow-400" />
                    <span className="text-2xl text-white font-light">MIA SAN MIA</span>
                    <Trophy className="w-12 h-12 text-yellow-400" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Porsche Values Culture */}
          <motion.section className="min-h-screen flex items-center px-8 py-20" style={{
            background: 'linear-gradient(135deg, rgba(105, 105, 105, 0.4) 0%, rgba(255, 215, 0, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)'
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
                    background: 'linear-gradient(135deg, #ffffff 0%, #696969 30%, #FFD700 70%, #ffffff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  🏎️ Porsche Engineering Philosophy
                </h2>
                <p className="text-3xl text-gray-200 font-light mb-6">Performance Through Precision</p>
                <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  How Stuttgart's automotive excellence parallels German culinary innovation - 
                  where engineering principles create both racing legends and gastronomic masterpieces.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
                {porscheValues.map((value, index) => (
                  <motion.div
                    key={value.value}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ y: -15, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800/40 to-black/80 backdrop-blur-lg border border-gray-500/30 p-8">
                      
                      <div className="text-6xl mb-6 text-center">{value.emoji}</div>
                      
                      <h3 className="text-2xl text-white font-light mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {value.value}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {value.description}
                      </p>
                      
                      <p className="text-yellow-200 italic mb-4 text-sm">
                        <strong>Connection:</strong> {value.connection}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-500/20">
                        <p className="text-gray-300 text-sm">
                          <strong>Implementation:</strong> {value.implementation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Special Porsche Section */}
              <motion.div
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 rounded-3xl p-12 border border-gray-500/30">
                  <h3 className="text-4xl text-white font-light mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                    🏎️ Engineering Excellence in Motion
                  </h3>
                  <p className="text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                    "Porsche doesn't just build cars - we engineer experiences. Every component optimized, 
                    every detail perfected, every performance metric maximized. German cuisine follows the same principles: 
                    precision engineering creating emotional experiences. From the 911 production line to the molecular laboratory, 
                    German excellence is about function creating beauty, performance enabling passion."
                  </p>
                  <div className="flex items-center justify-center gap-8 mt-8">
                    <Zap className="w-12 h-12 text-yellow-400" />
                    <span className="text-2xl text-white font-light">ENGINEERED FOR PERFORMANCE</span>
                    <Zap className="w-12 h-12 text-yellow-400" />
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
                  German Festival Traditions
                </h2>
                <p className="text-2xl text-red-200 max-w-5xl mx-auto leading-relaxed">
                  Where German precision meets celebration spirit - seasonal festivals 
                  that unite communities through food, beer, and centuries-old traditions.
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
          <motion.section className="min-h-screen flex items-center px-8 py-20 bg-gradient-to-br from-red-900/30 via-black to-yellow-900/30">
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
                  German Innovation
                </h2>
                <p className="text-3xl text-yellow-200 font-light mb-6">Engineering Excellence</p>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Witness how German precision and systematic approach revolutionized 
                  cooking techniques, sustainability practices, and molecular gastronomy.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                <VideoSection
                  title="Molecular Engineering"
                  description="Scientific precision applied to flavor transformation"
                  emoji="🔬"
                  className="h-80"
                />
                
                <VideoSection
                  title="Beer Brewing Science"
                  description="1500 years of fermentation perfection and innovation"
                  emoji="🍺"
                  className="h-80"
                />
                
                <VideoSection
                  title="Sustainability Systems"
                  description="German efficiency engineering zero-waste kitchens"
                  emoji="♻️"
                  className="h-80"
                />
              </div>
            </div>
          </motion.section>
                    

          {/* Epic Finale */}
          <motion.section 
            className="h-screen flex items-center justify-center px-8 relative overflow-hidden"
            style={{
              background: 
                'radial-gradient(circle at 20% 80%, rgba(139, 0, 0, 0.4) 0%, transparent 50%),' +
                'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),' +
                'radial-gradient(circle at 40% 40%, rgba(34, 139, 34, 0.3) 0%, transparent 50%),' +
                'radial-gradient(circle at 60% 60%, rgba(105, 105, 105, 0.2) 0%, transparent 50%),' +
                'linear-gradient(135deg, #1a1a0a 0%, #0a1a0a 50%, #1a0a0a 100%)'
            }}
          >
            {/* Floating German Elements */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => {
                const leftPos = (i * 17.3) % 100;
                const topPos = (i * 13.7) % 100;
                const yMovement = -80 - (i % 60);
                const duration = 20 + (i % 15);
                const delay = (i % 30) * 0.15;
                const emojis = ['🍺', '🥨', '🏰', '⚙️', '🚗', '⚽', '🌲', '🍖', '🏎️', '👑'];
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
                      scale: [0.2, 2, 0.2]
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
                  background: 'linear-gradient(135deg, #ffffff 0%, #8B0000 15%, #FFD700 30%, #228B22 45%, #708090 60%, #4B0082 75%, #ffffff 100%)',
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
                "German cuisine proves that precision and passion are not opposites—they are partners. 
                We engineered our way to culinary excellence through systematic innovation, 
                unwavering standards, and the understanding that true mastery comes from perfecting 
                every detail while never losing sight of the soul. From Bayern's championship spirit 
                to Porsche's performance philosophy, excellence is not just what we do—it's who we are."
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
                  🇩🇪
                </motion.span>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-red-500 via-yellow-500 via-green-500 to-transparent"></div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Cog className="w-16 h-16 text-yellow-400" />
                  </motion.div>
                  <div className="w-52 h-px bg-gradient-to-r from-transparent via-green-500 via-yellow-500 via-red-500 to-transparent"></div>
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
                <p className="text-yellow-300 text-2xl tracking-[0.3em] font-medium">
                  CULINARY JOURNEY COMPLETE
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                  <span className="text-white text-lg">Engineered for Excellence</span>
                  <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                </div>
                
                <div className="flex items-center justify-center gap-6 mt-6">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <span className="text-yellow-300 text-lg font-medium">Mia San Mia - Engineering Victory</span>
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* Enhanced Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 w-20 h-20 z-30"
          style={{
            background: `conic-gradient(#8B0000 ${scrollYProgress.get() * 360}deg, rgba(255,255,255,0.1) 0deg)`,
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
                🇩🇪
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
        {showQuote && <ElverfeldQuote />}
      </AnimatePresence>
      
      {!showQuote && <GermanSection />}
    </div>
  );
};

export default GermanCulinaryJourney;
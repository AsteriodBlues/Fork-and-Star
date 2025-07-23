"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, MapPin, ChefHat, Star, Sparkles } from 'lucide-react';

const MexicanCuisinePage: React.FC = () => {
  const [showQuote, setShowQuote] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Video Section Component
  interface VideoSectionProps {
    src: string;
    title: string;
    description: string;
    className?: string;
  }

  const VideoSection: React.FC<VideoSectionProps> = ({ src, title, description, className = "" }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

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
          loop
          muted
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
            className="flex items-center justify-center w-16 h-16 bg-orange-500/20 backdrop-blur-md rounded-full border border-orange-300/30 transition-all duration-300 hover:bg-orange-500/30 hover:scale-110"
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

  // Loading Quote Screen
  const LoadingQuote = () => (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FF4500 0%, #FFD700 50%, #E2725B 100%)'
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: showQuote ? 1 : 0 }}
      transition={{ duration: 1 }}
      onAnimationComplete={() => {
        if (!showQuote) {
          document.body.style.overflow = 'auto';
        }
      }}
    >
      {/* Papel Picado Animation */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-10"
          style={{
            background: ['#FF4500', '#FFD700', '#00A86B', '#E2725B'][i],
            top: `${10 + i * 20}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="max-w-4xl text-center px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-light text-black mb-8 leading-relaxed"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          "Food is a way of communicating. I think a lot of modern chefs think that cooking is more an art form and about ideas. I don't."
        </motion.h2>
        <motion.p
          className="text-xl text-black/80"
          style={{ fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          — Enrique Olvera
        </motion.p>
      </div>
    </motion.div>
  );

  // Main Mexican Section
  const MexicanSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "-50% 0px -50% 0px" });

    const cincoPilares = [
      {
        emoji: "🌽",
        title: "MAÍZ",
        subtitle: "La base sagrada de la vida",
        english: "The sacred foundation of life",
        description: "From nixtamalization to modern masa, corn connects us to our ancestors and nourishes our future.",
        color: "from-yellow-400 to-orange-600"
      },
      {
        emoji: "🔥",
        title: "FUEGO", 
        subtitle: "Técnicas ancestrales, pasión moderna",
        english: "Ancient techniques, modern passion",
        description: "From comal cooking to wood-fired ovens, fire transforms ingredients into soul-stirring experiences.",
        color: "from-red-500 to-orange-700"
      },
      {
        emoji: "👨‍👩‍👧‍👦",
        title: "FAMILIA",
        subtitle: "Recetas transmitidas por generaciones", 
        english: "Recipes passed through generations",
        description: "Every dish carries the love, wisdom, and stories of mothers and grandmothers.",
        color: "from-pink-400 to-red-600"
      },
      {
        emoji: "🎉",
        title: "FIESTA",
        subtitle: "Cada comida es una celebración",
        english: "Every meal is a celebration", 
        description: "From Day of the Dead to quinceañeras, food brings communities together in joyous unity.",
        color: "from-purple-500 to-pink-600"
      },
      {
        emoji: "🏛️",
        title: "TRADICIÓN",
        subtitle: "Honrando herencia indígena y colonial",
        english: "Honoring indigenous and colonial heritage",
        description: "The beautiful fusion of pre-Hispanic wisdom and Spanish influence creates our unique identity.",
        color: "from-amber-600 to-orange-800"
      }
    ];

    const maestros = [
      {
        name: "Enrique Olvera",
        restaurant: "Pujol",
        stars: 0,
        innovation: "\"Mole Madre, Mole Nuevo\"",
        description: "The godfather of modern Mexican cuisine, revolutionizing traditional techniques with his legendary 1,000+ day aged mole that evolves daily.",
        philosophy: "Mexican cuisine is not about being fancy, it's about being honest with ingredients and traditions.",
        portrait: "/assets/mexico/enrique-olvera-pujol-portrait.jpg",
        interior: "/assets/mexico/pujol-interior-modern-mexican.jpg",
        dish: "/assets/mexico/mole-madre-nuevo-evolution.jpg"
      },
      {
        name: "Eduardo García",
        restaurant: "Máximo Bistrot", 
        stars: 0,
        innovation: "Market-driven French technique",
        description: "Combining French culinary precision with Mexican soul, creating a daily-changing menu based on the finest local market ingredients.",
        philosophy: "The market dictates the menu, not the chef. We follow nature's rhythm.",
        portrait: "/assets/mexico/eduardo-garcia-maximo-portrait.jpg",
        interior: "/assets/mexico/maximo-bistrot-interior.jpg", 
        dish: "/assets/mexico/maximo-market-driven-dish.jpg"
      },
      {
        name: "Alejandra Flores",
        restaurant: "Sud777",
        stars: 0,
        innovation: "Contemporary Mexican with global influences",
        description: "Pioneering vegetable-forward cuisine that showcases Mexico's incredible biodiversity through artistic, Instagram-worthy presentations.",
        philosophy: "Vegetables can be the star when treated with respect and creativity.",
        portrait: "/assets/mexico/alejandra-flores-sud777-portrait.jpg",
        interior: "/assets/mexico/sud777-contemporary-interior.jpg",
        dish: "/assets/mexico/sud777-vegetable-artistry.jpg"
      },
      {
        name: "Lucho Martínez", 
        restaurant: "Em",
        stars: 0,
        innovation: "Molecular gastronomy meets tradition",
        description: "Using fermentation and modern techniques to deconstruct and rebuild traditional Mexican flavors into surprising new forms.",
        philosophy: "Tradition is the foundation, but innovation is the future.",
        portrait: "/assets/mexico/lucho-martinez-em-portrait.jpg",
        interior: "/assets/mexico/em-molecular-lab.jpg",
        dish: "/assets/mexico/em-molecular-mexican-dish.jpg"
      }
    ];

    const localFavorites = [
      {
        name: "Contramar",
        vibe: "Seafood temple in Roma Norte",
        signature: "Tuna tostadas, pescado a la talla with red and green salsas",
        why: "The freshest mariscos, vibrant atmosphere, and that iconic split-sauce fish presentation",
        image: "/assets/mexico/contramar-tuna-tostada.jpg"
      },
      {
        name: "El Vilsito", 
        vibe: "Taco stand by day, mechanic shop by night",
        signature: "Al pastor tacos with perfectly caramelized pineapple",
        why: "Authentic street food experience, unique setting, and some of the best al pastor in the city",
        image: "/assets/mexico/el-vilsito-al-pastor.jpg"
      },
      {
        name: "Botánico",
        vibe: "Garden-to-table in Polanco", 
        signature: "Seasonal Mexican ingredients, innovative cocktails with local herbs",
        why: "Fresh, modern take on classics in a beautiful garden setting",
        image: "/assets/mexico/botanico-garden-dish.jpg"
      },
      {
        name: "Sarde",
        vibe: "Mediterranean-Mexican fusion",
        signature: "Octopus preparations, creative small plates, wine pairings", 
        why: "International flavors with local ingredients, sophisticated yet approachable",
        image: "/assets/mexico/sarde-octopus-dish.jpg"
      },
      {
        name: "Azul Histórico",
        vibe: "Traditional Mexican in Centro Histórico",
        signature: "Mole poblano, regional specialties from across Mexico",
        why: "Authentic recipes, historic colonial setting, true taste of Mexico's culinary heritage", 
        image: "/assets/mexico/azul-historico-mole.jpg"
      }
    ];

    const seasons = [
      {
        season: "Primavera",
        english: "Spring", 
        description: "Fresh herbs, early chiles, tender nopales and corn emerge",
        colors: "from-green-400 to-emerald-600",
        emoji: "🌱",
        images: [
          "/assets/mexico/spring-fresh-herbs.jpg",
          "/assets/mexico/spring-early-chiles.jpg",
          "/assets/mexico/spring-tender-nopales.jpg"
        ]
      },
      {
        season: "Verano", 
        english: "Summer",
        description: "Peak tomato season, tropical fruits, coastal cuisine dominate",
        colors: "from-yellow-400 to-orange-500",
        emoji: "☀️",
        images: [
          "/assets/mexico/summer-tropical-fruits.jpg",
          "/assets/mexico/summer-coastal-ceviche.jpg", 
          "/assets/mexico/summer-agua-fresca.jpg"
        ]
      },
      {
        season: "Otoño",
        english: "Autumn",
        description: "Harvest time, Day of the Dead, mole season arrives",
        colors: "from-orange-500 to-red-600", 
        emoji: "🍂",
        images: [
          "/assets/mexico/autumn-day-of-dead.jpg",
          "/assets/mexico/autumn-mole-season.jpg",
          "/assets/mexico/autumn-harvest-corn.jpg"
        ]
      },
      {
        season: "Invierno",
        english: "Winter",
        description: "Pozole, hot chocolate, warming stews provide comfort",
        colors: "from-amber-600 to-brown-700",
        emoji: "🌶️", 
        images: [
          "/assets/mexico/winter-pozole-bowl.jpg",
          "/assets/mexico/winter-hot-chocolate.jpg",
          "/assets/mexico/winter-family-gathering.jpg"
        ]
      }
    ];

    return (
      <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
        
        {/* Enhanced Video Background */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-3 h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-30"
            >
              <source src="/assets/mexico/teotihuacan-sunrise.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-40"
            >
              <source src="/assets/mexico/mexico-city-skyline.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              muted
              loop
              playsInline 
              className="w-full h-full object-cover opacity-30"
            >
              <source src="/assets/mexico/agave-fields-sunset.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 via-transparent to-yellow-900/30" />
        </div>

        {/* Country Header */}
        <motion.div
          className="absolute top-20 left-8 right-8 z-20"
          initial={{ opacity: 0, y: -100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
          transition={{ duration: 2 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-8xl md:text-9xl font-bold mb-4"
              style={{ 
                fontFamily: 'Montserrat, sans-serif',
                background: 'linear-gradient(135deg, #FFD700 0%, #FF4500 50%, #E2725B 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent'
              }}
            >
              MÉXICO
            </motion.h1>
            <motion.h2
              className="text-3xl text-orange-200 font-light mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
            >
              Modern Culinary Heritage
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 2 }}
            >
              Where ancient Aztec wisdom meets contemporary innovation, creating a culinary revolution 
              that honors tradition while embracing the future.
            </motion.p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 pt-96">
          
          {/* Las Cinco Tradiciones */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)'
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
                  className="text-6xl md:text-7xl font-bold mb-12"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FF4500 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Las Cinco Tradiciones
                </h2>
              </motion.div>

              <div className="grid lg:grid-cols-5 gap-8">
                {cincoPilares.map((pilar, index) => (
                  <motion.div
                    key={pilar.title}
                    className="group"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-black/30 to-black/80 backdrop-blur-lg border border-orange-500/30 p-8 h-full">
                      
                      <div className="text-center mb-6">
                        <span className="text-6xl mb-4 block">{pilar.emoji}</span>
                        <h3 className="text-2xl font-bold text-orange-400 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {pilar.title}
                        </h3>
                        <p className="text-orange-200 italic text-sm mb-1">{pilar.subtitle}</p>
                        <p className="text-gray-300 text-sm">{pilar.english}</p>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed text-center">
                        {pilar.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Master Chefs */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(226, 114, 91, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%)'
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
                  className="text-6xl md:text-7xl font-bold mb-12"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    background: 'linear-gradient(135deg, #E2725B 0%, #FF4500 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Maestros Contemporáneos
                </h2>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                {maestros.map((chef, index) => (
                  <motion.div
                    key={chef.name}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-orange-900/30 to-black/80 backdrop-blur-lg border border-orange-500/30 p-8">
                      
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-3xl font-bold text-orange-400 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {chef.name}
                          </h3>
                          <div className="flex items-center gap-3 mb-3">
                            <ChefHat className="w-5 h-5 text-orange-400" />
                            <span className="text-orange-300">{chef.restaurant}</span>
                          </div>
                          <p className="text-yellow-300 font-medium mb-2">{chef.innovation}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {chef.description}
                      </p>
                      
                      <blockquote className="border-l-4 border-orange-500 pl-4 italic text-orange-200">
                        "{chef.philosophy}"
                      </blockquote>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Local Favorites */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 168, 107, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%)'
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
                  className="text-6xl md:text-7xl font-bold mb-12"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    background: 'linear-gradient(135deg, #00A86B 0%, #FFD700 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Donde Comen Los Chilangos
                </h2>
                <p className="text-xl text-green-200 mt-4">Where Mexico City Locals Actually Eat</p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8">
                {localFavorites.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.name}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-green-900/30 to-black/80 backdrop-blur-lg border border-green-500/30 p-6">
                      
                      <h3 className="text-2xl font-bold text-green-400 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {restaurant.name}
                      </h3>
                      
                      <p className="text-yellow-300 font-medium mb-3">{restaurant.vibe}</p>
                      
                      <div className="mb-3">
                        <span className="text-orange-400 font-medium">Signature: </span>
                        <span className="text-gray-300">{restaurant.signature}</span>
                      </div>
                      
                      <div>
                        <span className="text-green-400 font-medium">Why locals love it: </span>
                        <span className="text-gray-300 italic">{restaurant.why}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* México en el Mundo */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%)'
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
                  className="text-6xl md:text-7xl font-bold mb-12"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FF4500 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  México en el Mundo
                </h2>
                <p className="text-xl text-yellow-200 mt-4">Mexican Cuisine's Global Influence</p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  <div className="bg-gradient-to-r from-yellow-900/30 to-black/60 rounded-3xl p-8 border border-yellow-500/30">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-4">🌍 Global Mexican Restaurants</h3>
                    <p className="text-gray-300 leading-relaxed">
                      From Cosme in NYC to Californios in San Francisco, Mexican restaurants are earning Michelin stars worldwide, proving that Mexican cuisine belongs in the fine dining conversation.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-900/30 to-black/60 rounded-3xl p-8 border border-orange-500/30">
                    <h3 className="text-2xl font-bold text-orange-400 mb-4">🔄 Fusion Evolution</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Korean-Mexican tacos, Japanese-Mexican ramen, Indian-Mexican curry - how Mexican techniques and flavors are revolutionizing global street food and fine dining.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  <div className="bg-gradient-to-r from-red-900/30 to-black/60 rounded-3xl p-8 border border-red-500/30">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">🌶️ Ingredient Export</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Mexican chiles, chocolate, vanilla, and agave are transforming kitchens worldwide, with international chefs seeking authentic Mexican ingredients for their own creations.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-900/30 to-black/60 rounded-3xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-400 mb-4">👨‍🍳 Chef Exchange</h3>
                    <p className="text-gray-300 leading-relaxed">
                      International chefs training in Mexico, Mexican chefs opening restaurants globally - creating a beautiful cultural exchange that elevates Mexican cuisine's status.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Mezcal & Agave Culture */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 34, 0.3) 0%, rgba(0, 0, 0, 0.9) 100%)'
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
                  className="text-6xl md:text-7xl font-bold mb-12"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    background: 'linear-gradient(135deg, #8B4513 0%, #FFD700 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Mezcal & Agave Culture
                </h2>
                <p className="text-xl text-amber-200 mt-4">The Sacred Spirit of Mexico</p>
              </motion.div>

              <div className="grid lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "🌵 Artisanal Production",
                    description: "Traditional mezcal production using ancestral methods: tahona wheels, underground pit ovens, and wild fermentation that connects us to pre-Hispanic traditions spanning centuries."
                  },
                  {
                    title: "🏔️ Terroir & Varieties", 
                    description: "Over 30 agave species create distinct flavor profiles. From Espadín's reliability to Tobalá's rarity, each variety expresses the unique terroir of its growing region."
                  },
                  {
                    title: "🍸 Cocktail Revolution",
                    description: "Modern mixologists worldwide are embracing mezcal's smoky complexity, creating innovative cocktails that honor traditional flavors while pushing creative boundaries."
                  },
                  {
                    title: "🍽️ Food Pairing",
                    description: "Mezcal's diverse flavor profiles complement everything from delicate ceviches to rich moles, creating perfect harmony between Mexico's national spirit and cuisine."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-900/30 to-black/80 backdrop-blur-lg border border-amber-500/30 p-6 h-full">
                      <h3 className="text-xl font-bold text-amber-400 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Fine Dining Evolution */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%)'
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
                  className="text-6xl md:text-7xl font-bold mb-12"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    background: 'linear-gradient(135deg, #FF4500 0%, #FFD700 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Fine Dining Evolution
                </h2>
                <p className="text-xl text-orange-200 mt-4">From Street Food to Michelin Stars</p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Máximo Bistrot",
                    description: "Eduardo García's market-driven approach earned recognition as one of Mexico's finest restaurants. Daily menus reflect seasonal ingredients and French technique with Mexican soul.",
                    icon: "⭐"
                  },
                  {
                    name: "Rosetta", 
                    description: "Elena Reygadas' Italian-Mexican fusion in a beautiful colonial mansion. Winner of World's 50 Best Female Chef award, proving Mexican cuisine's international sophistication.",
                    icon: "🌹"
                  },
                  {
                    name: "Le Chique",
                    description: "Cancún's molecular gastronomy temple, where traditional Mexican flavors meet cutting-edge technique. Proving that Mexican fine dining isn't limited to Mexico City.",
                    icon: "🏖️"
                  },
                  {
                    name: "Evolution Timeline",
                    description: "From 'ethnic food' stereotype to global fine dining recognition - Mexican cuisine's journey reflects growing appreciation for its complexity and sophistication.",
                    icon: "🌮"
                  },
                  {
                    name: "Global Recognition", 
                    description: "Mexican restaurants worldwide earning Michelin stars, James Beard awards, and World's 50 Best recognition - finally getting the respect the cuisine deserves.",
                    icon: "🌍"
                  },
                  {
                    name: "Modern Techniques",
                    description: "Chefs using sous vide, liquid nitrogen, and fermentation to explore traditional flavors in new ways while maintaining authentic Mexican identity.",
                    icon: "🔬"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-red-900/30 to-black/80 backdrop-blur-lg border border-red-500/30 p-6 h-full">
                      <div className="text-center mb-4">
                        <span className="text-4xl mb-3 block">{item.icon}</span>
                        <h3 className="text-xl font-bold text-red-400 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-center">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Seasonal Calendar */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%)'
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
                  className="text-6xl md:text-7xl font-bold mb-12"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    background: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Calendario Mexicano
                </h2>
                <p className="text-xl text-orange-200 mt-4">Seasonal Rhythms of Mexican Cuisine</p>
              </motion.div>

              <div className="grid lg:grid-cols-4 gap-8">
                {seasons.map((season, index) => (
                  <motion.div
                    key={season.season}
                    className="group"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-b ${season.colors} bg-opacity-30 backdrop-blur-lg border border-orange-500/30 p-8 h-full text-center`}>
                      
                      <span className="text-6xl mb-4 block">{season.emoji}</span>
                      
                      <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {season.season}
                      </h3>
                      
                      <p className="text-orange-200 italic mb-4">{season.english}</p>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {season.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Interactive Technique Videos */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 34, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%)'
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
                  className="text-6xl md:text-7xl font-bold mb-12"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    background: 'linear-gradient(135deg, #8B4513 0%, #FFD700 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Técnicas Ancestrales
                </h2>
                <p className="text-xl text-amber-200 mt-4">Ancient Techniques, Modern Mastery</p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-12">
                <VideoSection
                  src="/assets/mexico/nixtamalization-process.mp4"
                  title="Nixtamalización - Sacred Corn"
                  description="The ancient process that transforms corn into masa - foundation of Mexican cuisine"
                  className="h-80"
                />
                
                <VideoSection
                  src="/assets/mexico/mole-preparation-traditional.mp4"
                  title="Mole Mastery - Complex Harmony"
                  description="20+ ingredients dancing together in Mexico's most complex sauce preparation"
                  className="h-80"
                />
                
                <VideoSection
                  src="/assets/mexico/comal-tortilla-making.mp4"
                  title="Comal Artistry - Fire & Masa"
                  description="Hand-pressed tortillas on clay comal - the heartbeat of Mexican cooking"
                  className="h-80"
                />
              </div>
            </div>
          </motion.section>

          {/* Final Celebration */}
          <motion.section 
            className="min-h-screen flex items-center px-8 py-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.4) 0%, rgba(255, 215, 0, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)'
            }}
          >
            <div className="max-w-8xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5 }}
              >
                <h2 
                  className="text-6xl md:text-8xl font-bold mb-12"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#ffffff',
                    textShadow: '0 0 60px rgba(255,215,0,0.5)'
                  }}
                >
                  ¡Viva México!
                </h2>
                <p className="text-2xl text-orange-200 max-w-4xl mx-auto leading-relaxed mb-16">
                  From ancient pyramids to modern kitchens, from street tacos to Michelin stars, 
                  Mexican cuisine continues its eternal dance between tradition and innovation. 
                  Each dish tells a story, each flavor carries history, each meal is a celebration of life itself.
                </p>
                
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
                    🇲🇽
                  </motion.span>
                  
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-48 h-px bg-gradient-to-r from-transparent via-orange-400 via-yellow-400 to-transparent"></div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-12 h-12 text-orange-400" />
                    </motion.div>
                    <div className="w-48 h-px bg-gradient-to-r from-transparent via-yellow-400 via-red-400 to-transparent"></div>
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
                    🌶️
                  </motion.span>
                </motion.div>
                
                <motion.p 
                  className="text-orange-300 mt-12 text-2xl tracking-[0.3em] font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 3.5, duration: 1.5 }}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  NEXT: EXPLORE MORE CULINARY JOURNEYS
                </motion.p>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (showQuote) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showQuote]);

  return (
    <div className="bg-black text-white min-h-screen">
      {showQuote && <LoadingQuote />}
      <MexicanSection />
    </div>
  );
};

export default MexicanCuisinePage;
"use client";

import { useState, useEffect, useRef } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import { fetchRestaurants } from "@/utils/api"; // ✅ Use same API as explore page
import Lottie from "lottie-react";
import emptyAnimation from "@/lotties/empty.json";
import { AnimatePresence, motion, useScroll, useTransform, useInView } from "framer-motion";
import { Heart, Star, Sparkles, Flame, Crown, Trophy, Zap, ChefHat, MapPin, Calendar, Filter } from "lucide-react";

// ✅ Use same interface as explore page
interface Restaurant {
  id?: any;
  name?: string;
  city?: string;
  country?: string;
  cuisine?: string;
  stars?: number;
  image_url?: string;
  awards?: any;
  source_lists?: any;
  momentum_score?: number;
  reputation?: string;
  badges?: string;
  final_score?: number;
}
interface FavoriteStats {
  total: number;
  michelinStars: number;
  greenStars: number;
  countries: string[];
  cuisines: string[];
  averageRating: number;
}

export default function FavoritesPage() {
  const [favIds, setFavIds] = useState<string[]>([]);
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // ✅ Load from API
  const [loading, setLoading] = useState(true); // ✅ Add loading state
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0); // ✅ Add loading message state
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'carousel'>('masonry');
  const [sortBy, setSortBy] = useState<'name' | 'stars' | 'city' | 'cuisine'>('stars');
  const [filterBy, setFilterBy] = useState<'all' | 'michelin' | 'green' | 'awards'>('all');
  const [showStats, setShowStats] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // ✅ Loading message cycling effect
  useEffect(() => {
    if (!loading) return;
    
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % 7);
    }, 2000); // Change message every 2 seconds
    
    return () => clearInterval(interval);
  }, [loading]);

  // ✅ Load restaurants from API (same as explore page)
  useEffect(() => {
    fetchRestaurants()
      .then((data) => {
        console.log("🍽️ Fetched restaurants for favorites:", data?.length);
        setRestaurants(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load restaurants for favorites", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("fork-star-favs") || "[]");
    setFavIds(storedFavs);
    setTimeout(() => setShowStats(true), 1000);
    
    // DEBUG: Log what we found
    console.log("🐛 DEBUG Favorites:");
    console.log("Stored favIds:", storedFavs);
    console.log("All available restaurants:", restaurants);
    console.log("Restaurants with matching IDs:", restaurants.filter(r => storedFavs.includes(r.id?.toString())));
  }, [restaurants]); // ✅ Re-run when restaurants load

  const handleRemove = (id: string) => {
    setRemovingIds((prev) => [...prev, id]);

    setTimeout(() => {
      let updatedFavs = JSON.parse(localStorage.getItem("fork-star-favs") || "[]");
      updatedFavs = updatedFavs.filter((favId: string) => favId !== id);
      localStorage.setItem("fork-star-favs", JSON.stringify(updatedFavs));
      setFavIds(updatedFavs);
      setRemovingIds((prev) => prev.filter((remId) => remId !== id));
    }, 500);
  };

  const favRestaurants = restaurants.filter(
    (r) => favIds.includes(r.id?.toString()) && !removingIds.includes(r.id?.toString()) // ✅ Convert ID to string
  );

  // Calculate sophisticated stats
  const calculateStats = (): FavoriteStats => {
    const total = favRestaurants.length;
    const michelinStars = favRestaurants.reduce((sum, r) => sum + (r.stars || 0), 0); // ✅ Use 'stars' field
    const greenStars = 0; // ✅ Your API data doesn't have greenStar field yet
    const countries = [...new Set(favRestaurants.map(r => r.country || r.city).filter((v): v is string => typeof v === 'string'))]; // ✅ Use country or city, filter undefined
    const cuisines = [...new Set(favRestaurants.map(r => r.cuisine).filter((v): v is string => typeof v === 'string'))];
    const averageRating = total > 0 ? favRestaurants.reduce((sum, r) => sum + (r.stars || 0), 0) / total : 0;

    return { total, michelinStars, greenStars, countries, cuisines, averageRating };
  };

  const stats = calculateStats();

  // Advanced filtering and sorting
  const getFilteredAndSortedRestaurants = () => {
    let filtered = [...favRestaurants];

    // Apply filters
    switch (filterBy) {
      case 'michelin':
        filtered = filtered.filter(r => r.stars && r.stars > 0);
        break;
      case 'green':
        // No greenStar property in Restaurant, so filter always returns empty
        filtered = []; // Or keep as is if you want to show all
        break;
      case 'awards':
        // No eater38 or nytTop100 property in Restaurant, so filter always returns empty
        filtered = []; // Or keep as is if you want to show all
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name ?? '').localeCompare(b.name ?? '');
        case 'stars':
          return (b.stars || 0) - (a.stars || 0);
        case 'city':
          return (a.city ?? '').localeCompare(b.city ?? '');
        case 'cuisine':
          return (a.cuisine ?? '').localeCompare(b.cuisine ?? '');
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredRestaurants = getFilteredAndSortedRestaurants();

  // Stunning header with parallax
  const HeroHeader = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(headerRef, { margin: "-100px" });

    return (
      <motion.div
        ref={headerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255, 69, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
          `
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const animationDelay = Math.random() * 5;
            const colors = ['#FFD700', '#FF4500', '#8A2BE2', '#FF69B4', '#00CED1'];
            const color = colors[i % colors.length];
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  background: color,
                  filter: 'blur(1px)',
                }}
                animate={{
                  y: [-100, -1000],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: animationDelay,
                  ease: "linear",
                }}
              />
            );
          })}
        </div>

        {/* Main Header Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-white fill-white" />
              </motion.div>
              <motion.h1 
                className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tight"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF4500 25%, #8A2BE2 50%, #FF69B4 75%, #00CED1 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 100px rgba(255,215,0,0.3)',
                }}
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Your Taste Universe
              </motion.h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
              A curated constellation of your most cherished culinary experiences, 
              where every star represents a moment of gastronomic perfection.
            </p>
          </motion.div>

          {/* Dynamic Stats Display */}
          {stats.total > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showStats ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 100 }}
                  className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2"
                >
                  {stats.total}
                </motion.div>
                <div className="text-gray-400 font-medium">Favorites</div>
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.4, type: "spring", stiffness: 100 }}
                  className="text-4xl md:text-5xl font-bold text-orange-400 mb-2 flex items-center justify-center gap-1"
                >
                  {stats.michelinStars}
                  <Star className="w-6 h-6 fill-orange-400" />
                </motion.div>
                <div className="text-gray-400 font-medium">Michelin Stars</div>
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.6, type: "spring", stiffness: 100 }}
                  className="text-4xl md:text-5xl font-bold text-green-400 mb-2"
                >
                  {stats.greenStars}
                </motion.div>
                <div className="text-gray-400 font-medium">Green Stars</div>
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.8, type: "spring", stiffness: 100 }}
                  className="text-4xl md:text-5xl font-bold text-purple-400 mb-2"
                >
                  {stats.countries.length}
                </motion.div>
                <div className="text-gray-400 font-medium">Cities</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Advanced Controls Bar
  const ControlsBar = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="sticky top-20 z-30 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mx-8 mb-12"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* View Mode Toggles */}
          <div className="flex items-center gap-4">
            <span className="text-gray-300 font-medium">View:</span>
            <div className="flex bg-gray-800/50 rounded-lg p-1">
              {(['grid', 'masonry', 'carousel'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    viewMode === mode
                      ? 'bg-yellow-500 text-black font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-4">
            <span className="text-gray-300 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none"
            >
              <option value="stars">Michelin Stars</option>
              <option value="name">Name</option>
              <option value="city">City</option>
              <option value="cuisine">Cuisine</option>
            </select>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-4">
            <span className="text-gray-300 font-medium">Filter:</span>
            <div className="flex gap-2">
              {(['all', 'michelin', 'green', 'awards'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterBy(filter)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    filterBy === filter
                      ? 'bg-yellow-500 text-black font-medium'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {filter === 'all' ? 'All' : 
                   filter === 'michelin' ? '⭐ Michelin' :
                   filter === 'green' ? '🌱 Green' : '🏆 Recognition'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Ultra-Modern Empty State
  const EmptyState = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col items-center justify-center px-8"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center max-w-2xl">
          {/* Lottie Animation - PRESERVED! */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            className="w-80 h-80 mx-auto mb-8"
          >
            <Lottie animationData={emptyAnimation} loop autoplay />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-5xl font-light mb-6"
            style={{
              fontFamily: '"Playfair Display", serif',
              background: 'linear-gradient(135deg, #FFD700 0%, #FF4500 50%, #8A2BE2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Culinary Journey Awaits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl text-gray-400 leading-relaxed mb-12"
          >
            Start building your personal constellation of extraordinary dining experiences. 
            Every great culinary adventure begins with a single favorite.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <button
              onClick={() => window.location.href = '/explore'}
              className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-black font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Discover Amazing Restaurants
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Dynamic Restaurant Grid with multiple layouts
  const RestaurantGrid = () => {
    const getGridClass = () => {
      switch (viewMode) {
        case 'grid':
          return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
        case 'masonry':
          return 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8';
        case 'carousel':
          return 'flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory';
        default:
          return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="px-8 pb-20"
      >
        <motion.div
          className={getGridClass()}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ 
                  opacity: 0, 
                  y: 50, 
                  scale: 0.9,
                  transition: { duration: 0.3 }
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 120, 
                  damping: 15,
                  layout: { duration: 0.4 }
                }}
                className={`${viewMode === 'carousel' ? 'flex-shrink-0 w-80 snap-center' : ''} ${viewMode === 'masonry' ? 'break-inside-avoid' : ''}`}
              >
                {/* Enhanced Restaurant Card with Glassmorphism */}
                <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500">
                  
                  {/* Enhanced Image with Overlay Effects */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={restaurant.image_url || `https://picsum.photos/400/300?sig=${restaurant.id}`}
                      alt={restaurant.name || 'Restaurant'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Awards */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {restaurant.stars && restaurant.stars > 0 && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                          className="flex items-center gap-1 bg-yellow-500/20 backdrop-blur-md rounded-full px-3 py-1"
                        >
                          {[...Array(Math.min(restaurant.stars, 3))].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Heart Button - Enhanced */}
                    <motion.button
                      onClick={() => handleRemove(restaurant.id?.toString() || '')}
                      className="absolute top-4 left-4 w-12 h-12 bg-red-500/20 backdrop-blur-md rounded-full flex items-center justify-center border border-red-500/30 hover:bg-red-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="w-6 h-6 text-red-400 fill-red-400" />
                    </motion.button>
                  </div>

                  {/* Enhanced Content Section */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 
                          className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300"
                          style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                          {restaurant.name || 'Unknown Restaurant'}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{restaurant.city || restaurant.country || 'Unknown Location'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ChefHat className="w-4 h-4" />
                            <span>{restaurant.cuisine || 'Unknown Cuisine'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Awards Section - Only show if restaurant has recognitions */}
                    {(restaurant.stars && restaurant.stars > 0) || restaurant.badges ? (
                      <div className="flex flex-wrap gap-2">
                        {restaurant.stars && restaurant.stars > 0 && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                            ⭐ {restaurant.stars} Star{restaurant.stars > 1 ? 's' : ''}
                          </span>
                        )}
                        {restaurant.badges && (
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                            🏆 {restaurant.badges}
                          </span>
                        )}
                      </div>
                    ) : null}
                  </div>

                  {/* Hover Effect Glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-purple-500/10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.03)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(138,43,226,0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,69,0,0.04)_0%,transparent_50%)]" />
      </motion.div>

      <div className="relative z-10">
        {/* Show loading state while restaurants are being fetched */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(255, 69, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.08) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)
              `
            }}
          >
            {/* Floating Food Emojis Background - Fixed positions */}
            <div className="absolute inset-0">
              {[...Array(25)].map((_, i) => {
                const foodEmojis = ['🍕', '🍔', '🍣', '🍝', '🥗', '🍜', '🌮', '🍱', '🥘', '🍛', '🍤', '🥟', '🧀', '🥐', '🍰'];
                const emoji = foodEmojis[i % foodEmojis.length];
                
                // Deterministic positioning based on index
                const leftPos = (i * 23.7) % 100;
                const topPos = (i * 17.3) % 100;
                const animationDelay = (i % 15) * 0.3;
                const duration = 8 + (i % 6);
                
                return (
                  <motion.div
                    key={i}
                    className="absolute text-3xl opacity-20"
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                    }}
                    animate={{
                      y: [-20, -100, -20],
                      rotate: [0, 360, 0],
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      delay: animationDelay,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.div>
                );
              })}
            </div>

            {/* Main Loading Content */}
            <div className="relative z-10 text-center max-w-2xl">
              
              {/* Animated Fork and Plate */}
              <motion.div 
                className="relative mb-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, type: "spring", stiffness: 200 }}
              >
                <div className="relative w-32 h-32 mx-auto">
                  {/* Plate */}
                  <motion.div
                    className="absolute inset-0 text-8xl flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    🍽️
                  </motion.div>
                  
                  {/* Fork - Dancing around */}
                  <motion.div
                    className="absolute text-4xl"
                    animate={{
                      x: [0, 40, 0, -40, 0],
                      y: [0, -40, 0, 40, 0],
                      rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    🍴
                  </motion.div>
                  
                  {/* Knife - Counter-dancing */}
                  <motion.div
                    className="absolute text-4xl"
                    animate={{
                      x: [0, -40, 0, 40, 0],
                      y: [0, 40, 0, -40, 0],
                      rotate: [0, -90, -180, -270, -360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    🔪
                  </motion.div>
                </div>
              </motion.div>

              {/* Funny Loading Messages - Clean sequential animation */}
              <motion.div className="mb-8 h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {(() => {
                    const messages = [
                      "🔍 Hunting down your favorite dishes...",
                      "👨‍🍳 Chef is plating your memories...",
                      "⭐ Polishing those Michelin stars...",
                      "🧙‍♂️ Casting delicious spells...",
                      "🎭 Your taste buds are having a reunion...",
                      "📸 Instagram-worthy presentation loading...",
                      "🎪 Preparing the culinary circus...",
                    ];
                    
                    return (
                      <motion.h1
                        key={loadingMessageIndex}
                        className="text-4xl md:text-5xl font-light text-center max-w-4xl"
                        style={{
                          fontFamily: '"Playfair Display", serif',
                          background: 'linear-gradient(135deg, #FFD700 0%, #FF4500 25%, #8A2BE2 50%, #FF69B4 75%, #00CED1 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ 
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{ 
                          opacity: 0,
                          y: -20,
                          scale: 1.1,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        {messages[loadingMessageIndex]}
                      </motion.h1>
                    );
                  })()}
                </AnimatePresence>
              </motion.div>

              {/* Dancing Progress Bar - Centered */}
              <motion.div 
                className="relative mb-8 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <div className="w-96 h-4 bg-gray-800/50 rounded-full border border-gray-600/30 overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full relative"
                    animate={{
                      width: ["0%", "100%"],
                      backgroundPosition: ["0% 50%", "100% 50%"],
                    }}
                    transition={{
                      duration: 14,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Sparkles on progress bar */}
                    <motion.div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Progress percentage - Also centered */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-400 font-mono text-sm whitespace-nowrap"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Loading culinary memories... <span className="text-yellow-400">∞%</span>
                </motion.div>
              </motion.div>

              {/* Funny Sub-messages */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="space-y-3"
              >
                <p className="text-gray-400 text-lg">
                  🤖 Our AI sommelier is pairing your favorites with the perfect ambiance...
                </p>
                
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm text-gray-500"
                >
                  (This is taking longer than expected because we're being extra fancy ✨)
                </motion.div>

                {/* Cooking Sound Effects */}
                <motion.div
                  className="flex justify-center gap-4 text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  {['🔥', '💨', '🎵', '💫'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Loading Chef Animation */}
              <motion.div
                className="absolute bottom-10 right-10"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
              >
                <motion.div
                  className="text-6xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  👨‍🍳
                </motion.div>
                
                {/* Chef's speech bubble */}
                <motion.div
                  className="absolute -top-16 -left-20 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 5, type: "spring", stiffness: 200 }}
                >
                  <div className="text-white text-sm whitespace-nowrap">
                    "Bon appétit is coming!"
                  </div>
                  <div className="absolute bottom-0 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/10 transform translate-y-full"></div>
                </motion.div>
              </motion.div>
            </div>

            {/* Scattered Sparkles - Fixed positions to avoid hydration issues */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => {
                // Use deterministic positioning based on index to avoid hydration issues
                const positions = [
                  { left: '10%', top: '15%' }, { left: '85%', top: '25%' }, { left: '25%', top: '80%' },
                  { left: '70%', top: '10%' }, { left: '90%', top: '60%' }, { left: '15%', top: '45%' },
                  { left: '60%', top: '75%' }, { left: '35%', top: '20%' }, { left: '80%', top: '85%' },
                  { left: '5%', top: '65%' }, { left: '95%', top: '40%' }, { left: '45%', top: '30%' },
                  { left: '20%', top: '90%' }, { left: '75%', top: '55%' }, { left: '50%', top: '5%' },
                  { left: '30%', top: '70%' }, { left: '65%', top: '35%' }, { left: '40%', top: '95%' },
                  { left: '85%', top: '50%' }, { left: '12%', top: '75%' }
                ];
                const position = positions[i] || { left: '50%', top: '50%' };
                
                return (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-400 text-lg"
                    style={{
                      left: position.left,
                      top: position.top,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.1, // Deterministic delay based on index
                      repeat: Infinity,
                      repeatDelay: i * 0.15, // Deterministic repeat delay
                    }}
                  >
                    ✨
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : favRestaurants.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <HeroHeader />
            <ControlsBar />
            <RestaurantGrid />
          </>
        )}
      </div>

      {/* Floating Action Button */}
      {favRestaurants.length > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 200 }}
          onClick={() => window.location.href = '/explore'}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-yellow-500/30 z-50 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-3 py-2 bg-black/80 backdrop-blur-md rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Discover More
          </div>
        </motion.button>
      )}

      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Custom Cursor Effect (Desktop) */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-40">
        <div className="absolute w-4 h-4 bg-yellow-400/30 rounded-full blur-sm animate-pulse" id="cursor-glow" />
      </div>

      {/* Particle System */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
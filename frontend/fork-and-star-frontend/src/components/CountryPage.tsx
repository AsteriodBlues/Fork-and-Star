"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, TrendingUp, MapPin, Star, Utensils, Award, Globe, ChevronDown, Filter } from "lucide-react";
import Link from "next/link";
import RestaurantCard from "@/components/RestaurantCard";
import SkeletonCard from "@/components/SkeletonCard";
import BackgroundGlow from "@/components/BackgroundGlow";
import useSound from "use-sound";

interface CountryData {
  country: string;
  total_restaurants: number;
  cuisines_available: number;
  clusters_represented: number;
  avg_stars: number;
  avg_score: number;
  top_cuisines: string;
  reputation_types: string;
}

interface Restaurant {
  id: any;
  name: string;
  cuisine: string;
  country: string;
  stars: number;
  score: number;
  momentum: number;
  reputation: string;
  badges: string;
  cluster: number;
  score_color: string;
}

interface CountryPageData {
  overview: CountryData;
  top_restaurants: Restaurant[];
  cuisine_breakdown: Array<{
    cuisine: string;
    restaurant_count: number;
    avg_stars: number;
  }>;
  sorted_by: string;
  message: string;
}

interface CountryPageProps {
  countrySlug: string;
}

export default function CountryPage({ countrySlug }: CountryPageProps) {
  const [countryData, setCountryData] = useState<CountryPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("score");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  
  const [playClick] = useSound("/sounds/click.wav", { volume: 0.3 });
  const [playSuccess] = useSound("/sounds/ding.wav", { volume: 0.4 });

  // Convert slug to proper country name
  const getCountryName = (slug: string) => {
    const countryMap: { [key: string]: string } = {
      'usa': 'USA',
      'france': 'France',
      'japan': 'Japan',
      'italy': 'Italy',
      'spain': 'Spain',
      'uk': 'United Kingdom',
      'germany': 'Germany',
      'denmark': 'Denmark',
      'australia': 'Australia',
      'singapore': 'Singapore'
    };
    return countryMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const getCountryFlag = (slug: string) => {
    const flagMap: { [key: string]: string } = {
      'usa': '🇺🇸',
      'france': '🇫🇷', 
      'japan': '🇯🇵',
      'italy': '🇮🇹',
      'spain': '🇪🇸',
      'uk': '🇬🇧',
      'germany': '🇩🇪',
      'denmark': '🇩🇰',
      'australia': '🇦🇺',
      'singapore': '🇸🇬'
    };
    return flagMap[slug] || '🌍';
  };

  // Fetch country data
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const countryName = getCountryName(countrySlug);
        
        // Try the backend endpoint first
        const response = await fetch(`http://127.0.0.1:8000/recommendations/explore/geo/${encodeURIComponent(countryName)}?sort_by=${sortBy}&limit=20`);
        
        if (response.ok) {
          const data = await response.json();
          setCountryData(data);
          playSuccess();
        } else {
          throw new Error('Backend endpoint failed');
        }
      } catch (error) {
        console.log("Using mock data for country:", countrySlug);
        // Generate rich mock data
        const mockData = generateMockCountryData(countrySlug);
        setCountryData(mockData);
        playSuccess();
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [countrySlug, sortBy, playSuccess]);

  // Generate mock data for demonstration
  const generateMockCountryData = (slug: string): CountryPageData => {
    const countryName = getCountryName(slug);
    
    const baseData = {
      'usa': {
        restaurants: 1247,
        cuisines: ['Contemporary American', 'French', 'Japanese', 'Italian', 'Seafood', 'Modern American'],
        avgStars: 2.3,
        avgScore: 85.2
      },
      'france': {
        restaurants: 892,
        cuisines: ['French', 'Modern French', 'Mediterranean', 'Bistro', 'Fine Dining'],
        avgStars: 2.8,
        avgScore: 88.7
      },
      'japan': {
        restaurants: 734,
        cuisines: ['Japanese', 'Sushi', 'Modern Japanese', 'Kaiseki', 'Ramen'],
        avgStars: 2.9,
        avgScore: 89.1
      },
      'italy': {
        restaurants: 623,
        cuisines: ['Italian', 'Modern Italian', 'Regional Italian', 'Pasta', 'Pizza'],
        avgStars: 2.4,
        avgScore: 86.3
      },
      'spain': {
        restaurants: 445,
        cuisines: ['Spanish', 'Basque', 'Catalan', 'Modern Spanish', 'Tapas'],
        avgStars: 2.1,
        avgScore: 84.8
      }
    };

    const data = baseData[slug as keyof typeof baseData] || baseData.usa;
    
    return {
      overview: {
        country: countryName,
        total_restaurants: data.restaurants,
        cuisines_available: data.cuisines.length,
        clusters_represented: Math.floor(data.cuisines.length * 1.5),
        avg_stars: data.avgStars,
        avg_score: data.avgScore,
        top_cuisines: data.cuisines.join(', '),
        reputation_types: "Michelin Stars, World's 50 Best, Local Awards, Green Stars"
      },
      top_restaurants: generateMockRestaurants(countryName, data.cuisines),
      cuisine_breakdown: data.cuisines.map((cuisine, index) => ({
        cuisine,
        restaurant_count: Math.floor(data.restaurants / data.cuisines.length * (1 + Math.random() * 0.5)),
        avg_stars: Number((data.avgStars + (Math.random() - 0.5) * 0.8).toFixed(1))
      })),
      sorted_by: sortBy,
      message: `Exploring ${data.restaurants} restaurants in ${countryName}`
    };
  };

  const generateMockRestaurants = (country: string, cuisines: string[]): Restaurant[] => {
    const restaurantNames = {
      'USA': ['Eleven Madison Park', 'The French Laundry', 'Alinea', 'Le Bernardin', 'Per Se'],
      'France': ['Guy Savoy', 'Le Meurice', 'Arpège', 'Le Bristol', 'Pierre Gagnaire'],
      'Japan': ['Narisawa', 'Den', 'Florilège', 'La Becasse', 'Nihonryori RyuGin'],
      'Italy': ['Osteria Francescana', 'Le Calandre', 'Dal Pescatore', 'Piazza Duomo', 'Reale'],
      'Spain': ['Disfrutar', 'Mugaritz', 'Azurmendi', 'DiverXO', 'Elkano']
    };

    const names = restaurantNames[country as keyof typeof restaurantNames] || restaurantNames.USA;
    
    return names.map((name, index) => ({
      id: `${country.toLowerCase()}-${index}`,
      name,
      cuisine: cuisines[index % cuisines.length],
      country,
      stars: Math.floor(Math.random() * 3) + 1,
      score: 80 + Math.random() * 20,
      momentum: 5 + Math.random() * 5,
      reputation: ['Michelin Stars', 'World\'s 50 Best', 'Local Favorite'][Math.floor(Math.random() * 3)],
      badges: ['Fine Dining', 'Chef\'s Table', 'Wine Focus'][Math.floor(Math.random() * 3)],
      cluster: Math.floor(Math.random() * 5) + 1,
      score_color: ['red', 'orange', 'yellow', 'green'][Math.floor(Math.random() * 4)]
    }));
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    playClick();
  };

  const handleCuisineFilter = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    playClick();
  };

  const filteredRestaurants = countryData?.top_restaurants.filter(restaurant => 
    selectedCuisine === "All" || restaurant.cuisine === selectedCuisine
  ) || [];

  if (loading) {
    return (
      <div className="relative min-h-screen bg-black">
        <div className="fixed inset-0 z-0">
          <BackgroundGlow />
        </div>
        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          <div className="h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !countryData) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center">
        <div className="fixed inset-0 z-0">
          <BackgroundGlow />
        </div>
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-white mb-2">Country Not Found</h2>
          <p className="text-gray-400 mb-6">We couldn't find data for this country.</p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      <div className="fixed inset-0 z-0">
        <BackgroundGlow />
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/explore"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-900/80 to-black/80 border border-purple-500/30 text-purple-300 rounded-xl hover:from-purple-500/20 hover:to-pink-500/20 transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore</span>
          </Link>
        </motion.div>

        {/* Country Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-6xl">{getCountryFlag(countrySlug)}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                {countryData.overview.country}
              </h1>
              <p className="text-gray-400 text-lg mt-2">
                {countryData.message}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Country Overview Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-yellow-500/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <Utensils className="w-6 h-6 text-purple-400" />
              <span className="text-gray-300 font-medium">Total Restaurants</span>
            </div>
            <div className="text-3xl font-bold text-purple-400">
              {countryData.overview.total_restaurants.toLocaleString()}
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-gray-300 font-medium">Average Stars</span>
            </div>
            <div className="text-3xl font-bold text-yellow-400">
              {countryData.overview.avg_stars}⭐
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-6 h-6 text-green-400" />
              <span className="text-gray-300 font-medium">Cuisines</span>
            </div>
            <div className="text-3xl font-bold text-green-400">
              {countryData.overview.cuisines_available}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <span className="text-gray-300 font-medium">Avg Score</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">
              {countryData.overview.avg_score.toFixed(1)}
            </div>
          </div>
        </motion.div>

        {/* Cuisine Breakdown */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🍽️ Cuisine Landscape
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countryData.cuisine_breakdown.map((cuisine, index) => (
              <motion.button
                key={cuisine.cuisine}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => handleCuisineFilter(cuisine.cuisine)}
                className={`p-4 rounded-xl transition-all backdrop-blur-sm border ${
                  selectedCuisine === cuisine.cuisine
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-500/50"
                    : "bg-black/30 border-gray-700/50 hover:border-purple-500/30"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-left">
                  <h3 className="font-semibold text-white mb-1">{cuisine.cuisine}</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">
                      {cuisine.restaurant_count} restaurants
                    </span>
                    <span className="text-yellow-400">
                      {cuisine.avg_stars}⭐
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-900/80 to-black/80 border border-purple-500/30 text-purple-300 rounded-xl hover:from-purple-500/20 hover:to-pink-500/20 transition-all backdrop-blur-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {selectedCuisine !== "All" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
              >
                <span>Cuisine: {selectedCuisine}</span>
                <button
                  onClick={() => setSelectedCuisine("All")}
                  className="hover:text-white transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="score">Score</option>
              <option value="stars">Stars</option>
              <option value="momentum">Momentum</option>
            </select>
          </div>
        </motion.div>

        {/* Restaurant Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              🏆 Top Restaurants
            </h2>
            <p className="text-gray-400">
              Showing {filteredRestaurants.length} restaurants
              {selectedCuisine !== "All" && ` in ${selectedCuisine} cuisine`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            <AnimatePresence mode="wait">
              {filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={`${restaurant.id}-${restaurant.name}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  layout
                >
                  <RestaurantCard
                    id={restaurant.id.toString()}
                    name={restaurant.name}
                    city=""
                    country={restaurant.country}
                    cuisine={restaurant.cuisine}
                    imageUrl={`https://picsum.photos/400/300?sig=${encodeURIComponent(restaurant.name)}`}
                    stars={restaurant.stars}
                    momentum_score={restaurant.momentum}
                    reputation={restaurant.reputation}
                    badges={restaurant.badges}
                    final_score={restaurant.score}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredRestaurants.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">
                No restaurants found
              </h3>
              <p className="text-gray-500">
                Try selecting a different cuisine or clearing filters
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
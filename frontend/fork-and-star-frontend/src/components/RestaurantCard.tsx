"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Star, TrendingUp, Leaf, Award, Info, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import ExplainabilityModal from "@/components/ExplainabilityModal";

type RestaurantCardProps = {
  id: string;
  name: string;
  city?: string;
  cuisine: string;
  country?: string;
  imageUrl?: string;
  michelinStars?: number;
  greenStar?: boolean;
  eater38?: boolean;
  nytTop100?: boolean;
  isFav?: boolean;
  onToggleFav?: () => void;
  
  // Backend integration fields
  stars?: number;
  momentum_score?: number;
  score_color?: string;
  badges?: string;
  reputation?: string;
  green_score?: number;
  final_score?: number;
};

export default function RestaurantCard({
  id,
  name,
  city,
  cuisine,
  country,
  imageUrl,
  michelinStars,
  greenStar = false,
  eater38 = false,
  nytTop100 = false,
  onToggleFav,
  
  // Backend fields
  stars,
  momentum_score,
  score_color,
  badges,
  reputation,
  green_score,
  final_score,
}: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const [playDing] = useSound("/sounds/ding.wav", { volume: 0.5 });
  const [playInfo] = useSound("/sounds/click.wav", { volume: 0.3 });

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("fork-star-favs") || "[]");
    setIsFavorite(storedFavs.includes(id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    let storedFavs = JSON.parse(localStorage.getItem("fork-star-favs") || "[]");

    if (isFavorite) {
      storedFavs = storedFavs.filter((favId: string) => favId !== id);
      toast.error(`💔 Removed ${name} from favorites`);
    } else {
      storedFavs.push(id);
      confetti({ particleCount: 70, spread: 60 });
      toast.success(`✨ Added ${name} to favorites`);
      playDing();
    }

    localStorage.setItem("fork-star-favs", JSON.stringify(storedFavs));
    setIsFavorite(!isFavorite);

    if (onToggleFav) {
      onToggleFav();
    }
  };

  const handleExplainClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playInfo();
    setShowExplanation(true);
  };

  // Calculate display values - SAFE DEFAULTS
  const displayStars = stars || michelinStars || 0;
  const displayImageUrl = imageUrl || `https://picsum.photos/400/300?sig=${id}`;
  const badgeList = typeof badges === 'string' && badges ? badges.split(',').map(b => b.trim()).filter(b => b) : [];
  const hasGreenFocus = greenStar || (green_score && green_score > 0.5);
  
  // Get score color for momentum indicator
  const getMomentumColor = () => {
    if (!momentum_score || momentum_score <= 0) return "bg-gray-500";
    if (momentum_score > 8) return "bg-red-500";
    if (momentum_score > 5) return "bg-orange-500";
    if (momentum_score > 2) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Truncate long names for consistent layout
  const truncatedName = name.length > 25 ? `${name.substring(0, 25)}...` : name;

  return (
    <>
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white rounded-xl overflow-hidden shadow-2xl cursor-pointer group border border-yellow-500/20 flex flex-col"
        style={{
          width: '320px',
          height: '400px'
        }}
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Image Section - Fixed Height */}
        <div className="relative overflow-hidden" style={{ height: '200px' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="h-full w-full"
          >
            {!imageError ? (
              <Image
                src={displayImageUrl}
                alt={name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="320px"
                priority={false}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-6xl opacity-50">🍽️</div>
              </div>
            )}
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* BADGES SECTION - Absolute positioned over image */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap justify-between z-30">
          {/* Left side badges */}
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {/* ONLY show stars if > 0 */}
            {displayStars > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-white text-xs px-2 py-1 rounded-full font-medium shadow-md bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
              >
                ⭐ {displayStars}
              </motion.div>
            )}

            {/* Green badge */}
            {hasGreenFocus && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white text-xs px-2 py-1 rounded-full font-medium shadow-md bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500"
              >
                🌿 Green
              </motion.div>
            )}

            {/* Momentum - ONLY if > 0 */}
            {momentum_score && momentum_score > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-white text-xs px-2 py-1 rounded-full font-medium shadow-md ${getMomentumColor()}`}
              >
                <TrendingUp className="w-3 h-3 inline mr-1" />
                {momentum_score.toFixed(1)}
              </motion.div>
            )}

            {/* Legacy badges */}
            {eater38 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white text-xs px-2 py-1 rounded-full font-medium shadow-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
              >
                🏆 Eater 38
              </motion.div>
            )}

            {nytTop100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white text-xs px-2 py-1 rounded-full font-medium shadow-md bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
              >
                📰 NYT 100
              </motion.div>
            )}

            {/* Backend badges - max 1 to avoid overflow */}
            {badgeList.slice(0, 1).map((badge, index) => (
              <motion.div
                key={`badge-${index}-${badge}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-white text-xs px-2 py-1 rounded-full font-medium shadow-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
              >
                {badge.length > 8 ? badge.substring(0, 8) + '...' : badge}
              </motion.div>
            ))}
          </div>

          {/* Right side reputation */}
          {reputation && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-2 py-1 bg-gradient-to-r from-yellow-500/90 to-orange-500/90 text-black text-xs font-bold rounded-full backdrop-blur-sm max-w-[100px]"
            >
              {reputation.length > 10 ? reputation.substring(0, 10) + '...' : reputation}
            </motion.div>
          )}
        </div>

        {/* Content Section - Flex grow to fill remaining space */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors leading-tight">
              {truncatedName}
            </h3>
            
            <p className="text-sm text-gray-300 mb-1 truncate">
              {city || country || "Unknown Location"}
            </p>
            
            <p className="text-sm text-yellow-400 font-medium truncate">
              {cuisine}
            </p>
          </div>

          {/* Score Display - Only show if exists */}
          {final_score && final_score > 0 && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700/50">
              <div className="text-xs text-gray-400">Score:</div>
              <div className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded text-xs font-medium">
                {final_score.toFixed(1)}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons - Fixed Position */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-40">
          {/* Explainability Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleExplainClick}
            className="p-2 rounded-full bg-purple-500/80 text-white backdrop-blur-sm hover:bg-purple-600/80 transition-colors"
          >
            <Info className="w-4 h-4" />
          </motion.button>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full bg-white/80 backdrop-blur text-gray-800 hover:bg-yellow-400 transition-colors"
          >
            <Star
              className={`w-4 h-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`}
            />
          </button>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          animate={isHovered ? { scale: [1, 1.01, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Explainability Modal */}
      <ExplainabilityModal
        isOpen={showExplanation}
        onClose={() => setShowExplanation(false)}
        restaurantName={name}
        restaurantData={{
          name,
          cuisine,
          country: country || city || "",
          momentum_score,
          reputation,
        }}
      />
    </>
  );
}
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Sphere } from "@react-three/drei";
import { useRef, useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import useSound from "use-sound";

interface CountryData {
  id: string;
  name: string;
  flag: string;
  restaurantCount: number;
  averageStars: number;
  momentum: number;
  coordinates: { lat: number; lng: number };
  topCuisines: string[];
  description: string;
}

const premiumCountries: CountryData[] = [
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    restaurantCount: 1247,
    averageStars: 2.3,
    momentum: 8.7,
    coordinates: { lat: 39.8283, lng: -98.5795 },
    topCuisines: ["Contemporary American", "French", "Japanese"],
    description: "Culinary innovation hub with diverse regional cuisines"
  },
  {
    id: "france", 
    name: "France",
    flag: "🇫🇷",
    restaurantCount: 892,
    averageStars: 2.8,
    momentum: 7.2,
    coordinates: { lat: 46.2276, lng: 2.2137 },
    topCuisines: ["French", "Mediterranean", "Modern European"],
    description: "Birthplace of haute cuisine and culinary excellence"
  },
  {
    id: "japan",
    name: "Japan", 
    flag: "🇯🇵",
    restaurantCount: 734,
    averageStars: 2.9,
    momentum: 9.1,
    coordinates: { lat: 36.2048, lng: 138.2529 },
    topCuisines: ["Japanese", "Sushi", "Modern Japanese"],
    description: "Precision, tradition, and culinary artistry"
  },
  {
    id: "italy",
    name: "Italy",
    flag: "🇮🇹", 
    restaurantCount: 623,
    averageStars: 2.4,
    momentum: 6.8,
    coordinates: { lat: 41.8719, lng: 12.5674 },
    topCuisines: ["Italian", "Modern Italian", "Regional Italian"],
    description: "Regional authenticity meets modern innovation"
  },
  {
    id: "spain",
    name: "Spain",
    flag: "🇪🇸",
    restaurantCount: 445,
    averageStars: 2.1,
    momentum: 7.5,
    coordinates: { lat: 40.4637, lng: -3.7492 },
    topCuisines: ["Spanish", "Basque", "Catalan"],
    description: "Creative avant-garde cuisine and bold flavors"
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    restaurantCount: 387,
    averageStars: 2.2,
    momentum: 6.4,
    coordinates: { lat: 55.3781, lng: -3.4360 },
    topCuisines: ["Modern British", "European", "Contemporary"],
    description: "Contemporary cuisine revolution and global influences"
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    restaurantCount: 298,
    averageStars: 2.0,
    momentum: 5.9,
    coordinates: { lat: 51.1657, lng: 10.4515 },
    topCuisines: ["German", "Modern European", "International"],
    description: "Traditional techniques with modern sustainability focus"
  },
  {
    id: "denmark",
    name: "Denmark",
    flag: "🇩🇰",
    restaurantCount: 156,
    averageStars: 3.1,
    momentum: 9.3,
    coordinates: { lat: 56.2639, lng: 9.5018 },
    topCuisines: ["New Nordic", "Danish", "Scandinavian"],
    description: "Nordic cuisine pioneer and sustainability leader"
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    restaurantCount: 234,
    averageStars: 1.8,
    momentum: 6.1,
    coordinates: { lat: -25.2744, lng: 133.7751 },
    topCuisines: ["Modern Australian", "Asian Fusion", "Contemporary"],
    description: "Pacific Rim fusion and fresh local ingredients"
  },
  {
    id: "singapore",
    name: "Singapore", 
    flag: "🇸🇬",
    restaurantCount: 189,
    averageStars: 2.6,
    momentum: 8.2,
    coordinates: { lat: 1.3521, lng: 103.8198 },
    topCuisines: ["Singaporean", "Chinese", "Southeast Asian"],
    description: "Hawker culture meets Michelin-starred excellence"
  }
];

function latLngToVector3(lat: number, lng: number, radius = 5.2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

function CountryMarker({
  position,
  country,
  onSelectCountry,
  onHoverCountry,
  isHovered,
  isSelected
}: {
  position: THREE.Vector3;
  country: CountryData;
  onSelectCountry: (country: CountryData) => void;
  onHoverCountry: (country: CountryData | null) => void;
  isHovered: boolean;
  isSelected: boolean;
}) {
  const markerRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // Get momentum color
  const getMomentumColor = () => {
    if (country.momentum >= 9) return "#ef4444"; // red
    if (country.momentum >= 7) return "#f97316"; // orange  
    if (country.momentum >= 5) return "#eab308"; // yellow
    return "#22c55e"; // green
  };

  // Get size based on restaurant count
  const getMarkerSize = () => {
    if (country.restaurantCount >= 1000) return 0.15;
    if (country.restaurantCount >= 500) return 0.12;
    if (country.restaurantCount >= 200) return 0.10;
    return 0.08;
  };

  useFrame(({ clock }) => {
    if (markerRef.current) {
      // Gentle floating animation
      const floatY = Math.sin(clock.getElapsedTime() * 2 + country.restaurantCount * 0.01) * 0.02;
      markerRef.current.position.copy(position);
      markerRef.current.position.add(new THREE.Vector3(0, floatY, 0));
      
      // Hover scale effect
      const targetScale = isHovered || isSelected ? 1.3 : 1;
      markerRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    if (pulseRef.current) {
      // Pulsing ring animation
      const pulseScale = 1 + Math.sin(clock.getElapsedTime() * 3 + country.momentum) * 0.3;
      pulseRef.current.scale.set(pulseScale, pulseScale, pulseScale);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <group>
      {/* Pulsing Ring */}
      <mesh
        ref={pulseRef}
        position={position}
        onClick={() => onSelectCountry(country)}
        onPointerEnter={() => onHoverCountry(country)}
        onPointerLeave={() => onHoverCountry(null)}
      >
        <ringGeometry args={[getMarkerSize() * 1.5, getMarkerSize() * 1.8, 32]} />
        <meshBasicMaterial 
          color={getMomentumColor()} 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Country Marker */}
      <mesh
        ref={markerRef}
        position={position}
        onClick={() => onSelectCountry(country)}
        onPointerEnter={() => onHoverCountry(country)}
        onPointerLeave={() => onHoverCountry(null)}
      >
        <sphereGeometry args={[getMarkerSize(), 16, 16]} />
        <meshStandardMaterial 
          color={getMomentumColor()}
          emissive={getMomentumColor()}
          emissiveIntensity={isHovered || isSelected ? 0.3 : 0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Country Flag Label */}
      <Html
        position={[position.x, position.y + 0.3, position.z]}
        style={{
          background: isHovered || isSelected ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)",
          padding: isHovered || isSelected ? "8px 12px" : "4px 8px",
          borderRadius: "8px",
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: isHovered || isSelected ? "16px" : "14px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          border: isHovered || isSelected ? `2px solid ${getMomentumColor()}` : "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
          transform: isHovered || isSelected ? "scale(1.1)" : "scale(1)"
        }}
        center
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "18px" }}>{country.flag}</span>
          <span>{country.name}</span>
        </div>
      </Html>
    </group>
  );
}

function Earth({ texture }: { texture: THREE.Texture | null }) {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      // Slow rotation
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <>
      {/* Main Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[5, 128, 128]} />
        <meshStandardMaterial 
          map={texture || undefined} 
          roughness={0.8} 
          metalness={0.1}
          bumpScale={0.05}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[5.05, 64, 64]} />
        <meshBasicMaterial 
          color="#4fc3f7" 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer Glow */}
      <mesh>
        <sphereGeometry args={[5.15, 32, 32]} />
        <meshBasicMaterial 
          color="#81c784" 
          transparent 
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

export default function WorldGlobe({ 
  onSelectCountry 
}: { 
  onSelectCountry: (countryId: string) => void 
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [playHover] = useSound("/sounds/click.wav", { volume: 0.2 });
  const [playSelect] = useSound("/sounds/ding.wav", { volume: 0.4 });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
      (tex) => {
        setTexture(tex);
        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Texture load error:", err);
        setIsLoaded(true); // Continue without texture
      }
    );
  }, []);

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    onSelectCountry(country.id);
    playSelect();
  };

  const handleCountryHover = (country: CountryData | null) => {
    setHoveredCountry(country);
    if (country) playHover();
  };

  return (
    <div className="relative">
      {/* Globe Container */}
      <div className="w-full h-[70vh] rounded-3xl overflow-hidden relative border-2 border-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 shadow-2xl bg-black">
        
        {/* Loading Overlay */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 flex items-center justify-center z-20"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
                />
                <p className="text-white font-medium">Loading Earth...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
          <Suspense fallback={null}>
            <Earth texture={texture} />
            {premiumCountries.map((country) => (
              <CountryMarker
                key={country.id}
                country={country}
                position={latLngToVector3(country.coordinates.lat, country.coordinates.lng)}
                onSelectCountry={handleCountrySelect}
                onHoverCountry={handleCountryHover}
                isHovered={hoveredCountry?.id === country.id}
                isSelected={selectedCountry?.id === country.id}
              />
            ))}
          </Suspense>
          
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4fc3f7" />
          
          {/* Stars */}
          <Stars 
            radius={100} 
            depth={50} 
            count={8000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={0.5} 
          />
          
          {/* Enhanced Controls */}
          <OrbitControls 
            enableZoom 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            minDistance={8}
            maxDistance={20}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>

        {/* Enhanced Glow Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-500/10 to-pink-500/20 rounded-3xl" />
        </div>
      </div>

      {/* Country Info Panel */}
      <AnimatePresence>
        {hoveredCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{hoveredCountry.flag}</div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {hoveredCountry.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {hoveredCountry.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400">
                  {hoveredCountry.restaurantCount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400">
                  {hoveredCountry.averageStars}⭐
                </div>
                <div className="text-xs text-gray-400">Avg Stars</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-400">
                  {hoveredCountry.momentum}/10
                </div>
                <div className="text-xs text-gray-400">Momentum</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Popular Cuisines:</div>
              <div className="flex flex-wrap gap-1">
                {hoveredCountry.topCuisines.map((cuisine) => (
                  <span
                    key={cuisine}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => handleCountrySelect(hoveredCountry)}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore {hoveredCountry.name} →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Globe Stats */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10"
      >
        <div className="text-white text-sm space-y-1">
          <div className="font-bold text-yellow-400 mb-2">🌍 Global Cuisine</div>
          <div>🏆 {premiumCountries.reduce((acc, c) => acc + c.restaurantCount, 0).toLocaleString()} Restaurants</div>
          <div>⭐ {(premiumCountries.reduce((acc, c) => acc + c.averageStars, 0) / premiumCountries.length).toFixed(1)} Avg Stars</div>
          <div>🔥 {premiumCountries.length} Countries</div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10"
      >
        <div className="text-white text-sm">
          <div className="font-bold text-blue-400 mb-2">🎮 Controls</div>
          <div>🖱️ Drag to rotate</div>
          <div>🔍 Scroll to zoom</div>
          <div>🎯 Click countries to explore</div>
        </div>
      </motion.div>
    </div>
  );
}
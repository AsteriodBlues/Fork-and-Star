"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Globe, Star, Award } from 'lucide-react';
import AmbientSoundscape from "@/components/AmbientSoundscape";

const CulinaryJourneyHub = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const cuisines = [
    {
      country: "Italian",
      flag: "🇮🇹",
      subtitle: "From Nonna's Kitchen to Global Glory",
      description: "Ancient traditions meet modern mastery in the birthplace of pasta perfection",
      image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=800&h=600&fit=crop",
      color: "from-amber-600 to-orange-700",
      href: "/culinary-journey/italian"
    },
    {
      country: "Japanese", 
      flag: "🇯🇵",
      subtitle: "The Art of Seasonal Perfection",
      description: "Zen philosophy expressed through knife skills and seasonal harmony",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
      color: "from-red-600 to-pink-700",
      href: "/culinary-journey/japanese"
    },
    {
      country: "French",
      flag: "🇫🇷", 
      subtitle: "The Birth of Culinary Arts",
      description: "Royal courts to revolutionary techniques that defined fine dining",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
      color: "from-blue-600 to-indigo-700",
      href: "/culinary-journey/french"
    },
    {
      country: "Indian",
      flag: "🇮🇳",
      subtitle: "5000 Years of Spice Mastery", 
      description: "Ancient Ayurveda meets royal kitchens in a symphony of spices",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
      color: "from-orange-600 to-red-700",
      href: "/culinary-journey/indian"
    },
    {
      country: "Mexican",
      flag: "🇲🇽",
      subtitle: "Ancient Wisdom, Modern Soul",
      description: "From Aztec markets to UNESCO recognition of culinary heritage",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop", 
      color: "from-green-600 to-emerald-700",
      href: "/culinary-journey/mexican"
    },
    {
      country: "Thai",
      flag: "🇹🇭",
      subtitle: "The Balance of Life",
      description: "Sweet, sour, salty, bitter, spicy - harmony in every bite",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&h=600&fit=crop",
      color: "from-yellow-600 to-orange-700", 
      href: "/culinary-journey/thai"
    },
    {
      country: "Spanish",
      flag: "🇪🇸",
      subtitle: "Innovation from Tradition",
      description: "Moorish influences to molecular gastronomy revolution",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop",
      color: "from-red-600 to-yellow-700",
      href: "/culinary-journey/spanish" 
    },
    {
      country: "American",
      flag: "🇺🇸",
      subtitle: "The Great Melting Pot",
      description: "Immigration waves creating the world's most diverse food culture",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop",
      color: "from-blue-600 to-red-700",
      href: "/culinary-journey/usa"
    },
    {
      country: "British",
      flag: "🇬🇧", 
      subtitle: "From Empire to Renaissance",
      description: "The surprising transformation of British cuisine in the 21st century",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop",
      color: "from-slate-600 to-blue-700",
      href: "/culinary-journey/uk"
    },
    {
      country: "German",
      flag: "🇩🇪",
      subtitle: "Precision Meets Heart", 
      description: "Engineering perfectionism applied to Europe's most comforting cuisine",
      image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800&h=600&fit=crop",
      color: "from-yellow-600 to-red-700",
      href: "/culinary-journey/german"
    },
  ];

  // Type definitions
  interface Cuisine {
    country: string;
    flag: string;
    subtitle: string;
    description: string;
    image: string;
    color: string;
    href: string;
  }

  interface CuisineCardProps {
    cuisine: Cuisine;
    index: number;
  }

  const CuisineCard = ({ cuisine, index }: CuisineCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { margin: "-100px", once: true });

    return (
      <motion.div
        ref={cardRef}
        className="group cursor-pointer relative"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1,
          ease: "easeOut"
        }}
        whileHover={{ y: -10 }}
      >
        <Link href={cuisine.href}>
          <div className="relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 transition-all duration-700 group-hover:border-white/30 group-hover:shadow-2xl">
            
            {/* Background Image */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={cuisine.image}
                alt={`${cuisine.country} cuisine`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cuisine.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
              
              {/* Flag */}
              <div className="absolute top-6 left-6">
                <span className="text-5xl drop-shadow-lg">
                  {cuisine.flag}
                </span>
              </div>

              {/* Available Badge */}
              <div className="absolute top-6 right-6">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <span className="text-white text-sm font-medium">Available Now</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <h3 
                className="text-3xl font-light text-white mb-2 group-hover:text-amber-300 transition-colors duration-300"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {cuisine.country}
              </h3>
              
              <p className="text-amber-300 font-medium mb-4 text-lg tracking-wide">
                {cuisine.subtitle}
              </p>
              
              <p className="text-gray-200 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                {cuisine.description}
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm uppercase tracking-widest">
                  Begin Journey
                </span>
                <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cuisine.color} opacity-10 blur-xl`} />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1)_0%,transparent_50%)]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-20 w-40 h-40 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <motion.section 
          className="min-h-screen flex items-center justify-center px-8 py-20"
          style={{ y: textY }}
        >
          <div className="text-center max-w-5xl mx-auto">
            
            {/* Bourdain Quote */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <p 
                className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-6 max-w-4xl mx-auto"
                style={{ 
                  fontFamily: '"Playfair Display", serif',
                  textShadow: '0 0 30px rgba(255,255,255,0.3)'
                }}
              >
                "If I do have any advice for anybody, any final thought, If I'm an advocate for anything, it's to move. As far as you can, as much as you can. 
                Across the ocean, or simply across the river. The extent to which you can walk in someone else's shoes or at least eat their food 
                is a plus for everybody. Open your mind, get up off the couch, move."
              </p>
              <span className="text-amber-400 text-lg tracking-widest">— Anthony Bourdain</span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <h1 
                className="text-6xl md:text-7xl lg:text-8xl font-light text-white leading-none mb-6"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #ffffff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 50px rgba(255,215,0,0.3)'
                }}
              >
                10 Culinary Worlds
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
                Embark on an immersive journey through the world's greatest culinary traditions. 
                Each cuisine tells a story of culture, history, and human connection through food.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">10</div>
                <div className="text-gray-400 text-sm uppercase tracking-widest">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">500+</div>
                <div className="text-gray-400 text-sm uppercase tracking-widest">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">∞</div>
                <div className="text-gray-400 text-sm uppercase tracking-widest">Stories</div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <span className="text-gray-400 text-sm uppercase tracking-widest mb-4">
                Begin Your Journey Below
              </span>
              <div className="w-px h-16 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
              <Globe className="w-6 h-6 text-amber-400 mt-2 animate-bounce" />
            </motion.div>
          </div>
        </motion.section>

        {/* Cuisines Grid */}
        <section className="px-8 py-20">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 
                className="text-5xl md:text-6xl text-white font-light mb-6"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Choose Your Culinary Adventure
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Each cuisine is a gateway to understanding a culture's soul through its most intimate expression: food.
              </p>
            </motion.div>

            {/* Cuisines Grid */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {cuisines.map((cuisine, index) => (
                <CuisineCard key={cuisine.country} cuisine={cuisine} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <motion.section 
          className="px-8 py-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 
              className="text-4xl md:text-5xl text-white font-light mb-6"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Ready to Taste the World?
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Your culinary journey awaits. Choose a cuisine above and dive deep into its story, 
              traditions, and the restaurants that define its legacy.
            </p>
            
            <Link 
              href="/culinary-journey/italian"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:from-amber-500 hover:to-orange-500 hover:scale-105 hover:shadow-2xl"
            >
              Start with Italian Mastery
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.section>
      </div>

      {/* Progress Scroll */}
      <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 z-30"
        style={{
          background: `conic-gradient(#f59e0b ${scrollYProgress.get() * 100}%, rgba(255,255,255,0.1) 0)`,
          borderRadius: '50%',
          padding: '2px'
        }}
      >
        <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-white/10">
          <Globe className="w-6 h-6 text-amber-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default CulinaryJourneyHub;
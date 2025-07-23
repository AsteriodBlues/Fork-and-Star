"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, MapPin, Clock, Flame, Leaf, Sparkles } from 'lucide-react';

const ThaiCuisinePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeSound, setActiveSound] = useState(null);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const fiveFlavors = [
    { name: "Sweet", thai: "หวาน (Waan)", color: "from-pink-500 to-rose-600", icon: "🍯", dishes: ["Mango Sticky Rice", "Thai Iced Tea"] },
    { name: "Sour", thai: "เปรี้ยว (Priao)", color: "from-lime-500 to-green-600", icon: "🍋", dishes: ["Som Tam", "Tom Yum"] },
    { name: "Salty", thai: "เค็ม (Kem)", color: "from-blue-500 to-indigo-600", icon: "🧂", dishes: ["Fish Sauce", "Pad Thai"] },
    { name: "Bitter", thai: "ขม (Kom)", color: "from-emerald-600 to-teal-700", icon: "🌿", dishes: ["Thai Basil", "Bitter Melon"] },
    { name: "Spicy", thai: "เผ็ด (Phed)", color: "from-red-500 to-orange-600", icon: "🌶️", dishes: ["Green Curry", "Larb"] }
  ];

  const michelinRestaurants = [
    {
      name: "Sorn",
      stars: 3,
      chef: "Supaksorn Jongsiri",
      specialty: "Southern Thai Authenticity",
      description: "A temple to Southern Thai cuisine, where Chef Supaksorn sources ingredients directly from small producers across Thailand's southern provinces.",
      philosophy: "Every ingredient tells a story of its origin, its journey, and its purpose in Thai cuisine.",
      signature: "Wild-caught sea bass with turmeric curry",
      location: "Bangkok"
    },
    {
      name: "Gaggan Anand",
      stars: 2,
      chef: "Gaggan Anand", 
      specialty: "Progressive Indian-Thai",
      description: "Molecular gastronomy meets Bangkok street food in an explosive 25-course journey that redefines what Thai fusion can be.",
      philosophy: "Food should be fun, surprising, and push every boundary you thought existed.",
      signature: "Emoji curry tasting menu",
      location: "Bangkok"
    },
    {
      name: "Baan Tepa",
      stars: 2,
      chef: "Tammasak Chootong",
      specialty: "Farm-to-Table Thai",
      description: "Culinary botany meets traditional Thai cooking, with ingredients grown in their own organic farm and fermentation laboratory.",
      philosophy: "The soil, the seed, and the season dictate our menu - we are merely translators of nature's intention.",
      signature: "Fermented local vegetables with ancient grains",
      location: "Bangkok"
    },
    {
      name: "Potong",
      stars: 1,
      chef: "Pam Soontornyanakij",
      specialty: "Modern Thai Comfort",
      description: "Elevated Thai home cooking that transforms nostalgic flavors into sophisticated presentations without losing their soul.",
      philosophy: "Dreams are just a dream without a goal. You need to act.",
      signature: "Deconstructed som tam with molecular techniques",
      location: "Bangkok"
    },
    {
      name: "Sühring",
      stars: 2,
      chef: "Mathias & Thomas Sühring",
      specialty: "German-Thai Precision",
      description: "Twin German chefs applying European precision to Thai ingredients, creating unexpected harmony between two culinary worlds.",
      philosophy: "Technique without soul is empty, but soul without technique cannot reach its full potential.",
      signature: "Thai curry with German bread fermentation",
      location: "Bangkok"
    }
  ];

  const localLegends = [
    {
      name: "Jay Fai",
      specialty: "Michelin Street Food",
      famous: "Crab Omelet & Drunken Noodles",
      story: "The 76-year-old legend who cooks over charcoal flames wearing a wool hat, earning a Michelin star for her street-side restaurant.",
      wisdom: "The fire must be fierce, the wok must sing, and your heart must be in every dish.",
      location: "Bangkok Old Town"
    },
    {
      name: "Thip Samai",
      specialty: "Pad Thai Master",
      famous: "Original Pad Thai since 1966",
      story: "Three generations perfecting the national dish, with orange flames dancing over traditional woks every single day.",
      wisdom: "Pad Thai is not fast food - it's a meditation between chef, wok, and fire.",
      location: "Bangkok"
    },
    {
      name: "Jok Prince", 
      specialty: "Rice Porridge Royalty",
      famous: "Silky rice congee with perfect toppings",
      story: "A tiny stall that serves the most refined rice porridge in Thailand, proving that simplicity is the ultimate sophistication.",
      wisdom: "In every grain of rice lies the potential for perfection.",
      location: "Bangkok"
    },
    {
      name: "Krua Apsorn",
      specialty: "Royal Thai Cuisine",
      famous: "Traditional palace recipes",
      story: "Former royal palace cooks bringing centuries-old recipes to the people, maintaining techniques passed down through generations.",
      wisdom: "Royal cuisine is not about luxury - it's about respect for ingredients and tradition.",
      location: "Bangkok"
    }
  ];

  const ingredients = [
    { name: "Galangal", thai: "ข่า", description: "The soul of Thai curry paste", effect: "citrusy-sharp" },
    { name: "Lemongrass", thai: "ตะไคร้", description: "Fragrant stalks of lemony heaven", effect: "bright-aromatic" },
    { name: "Kaffir Lime Leaves", thai: "ใบมะกรูด", description: "Double leaves of intense citrus", effect: "zesty-floral" },
    { name: "Fish Sauce", thai: "น้ำปลา", description: "Liquid gold of umami depth", effect: "salty-complex" },
    { name: "Palm Sugar", thai: "น้ำตาลปึก", description: "Caramelized sweetness from coconut palms", effect: "deep-sweet" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Transition Quote */}
      <motion.section 
        className="h-screen relative flex items-center justify-center"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255,140,0,0.3) 0%, rgba(255,69,0,0.2) 30%, rgba(0,0,0,0.9) 70%)',
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Transition Quote */}
        <motion.div
          className="text-center z-10 px-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.p
            className="text-2xl md:text-3xl text-orange-300 font-light italic mb-8 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: '"Noto Sans Thai", "Inter", sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            "Dreams are just a dream without a goal. You need to act."
          </motion.p>
          <motion.span
            className="text-orange-400 text-xl tracking-widest"
            style={{ fontFamily: '"Noto Sans Thai", "Inter", sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            — Pichaya 'Pam' Soontornyanakij
          </motion.span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-orange-400 to-transparent animate-pulse" />
          <Flame className="w-6 h-6 text-orange-400 mt-2 mx-auto animate-bounce" />
        </motion.div>
      </motion.section>

      {/* Main Hero */}
      <motion.section 
        className="h-screen relative flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,140,0,0.1) 0%, rgba(255,69,0,0.2) 50%, rgba(0,0,0,0.9) 100%)',
          backgroundImage: 'url("https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        <motion.div
          className="relative z-10 text-center px-8"
          style={{ y: textY }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none mb-8"
            style={{
              fontFamily: '"Noto Sans Thai", "Playfair Display", serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #ff8c00 30%, #ff4500 70%, #ffffff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(255,140,0,0.5)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            Thai Cuisine
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl text-orange-300 font-light mb-6"
            style={{ fontFamily: '"Noto Sans Thai", "Inter", sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            The Balance of Life • สมดุลแห่งชีวิต
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
            style={{ fontFamily: '"Noto Sans Thai", "Inter", sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            Sweet, sour, salty, bitter, spicy — harmony in every bite. From ancient temple kitchens to Michelin-starred innovation, 
            Thai cuisine represents the perfect balance of flavors, philosophy, and pure joy.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Five Flavors Interactive Section */}
      <section className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl md:text-6xl font-light text-center mb-20"
            style={{ fontFamily: '"Noto Sans Thai", "Playfair Display", serif' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Five Sacred Flavors
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {fiveFlavors.map((flavor, index) => (
              <motion.div
                key={flavor.name}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${flavor.color} cursor-pointer transform hover:scale-105 transition-all duration-500`}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{flavor.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{flavor.name}</h3>
                  <p className="text-white/80 text-sm mb-4" style={{ fontFamily: '"Noto Sans Thai", sans-serif' }}>
                    {flavor.thai}
                  </p>
                  <div className="space-y-2">
                    {flavor.dishes.map((dish, i) => (
                      <div key={i} className="text-white/90 text-sm bg-black/20 rounded-full px-3 py-1">
                        {dish}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Michelin Stars Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: '"Noto Sans Thai", "Playfair Display", serif' }}
            >
              Michelin Masters
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Where tradition meets innovation under the spotlight of culinary excellence
            </p>
          </motion.div>

          <div className="space-y-16">
            {michelinRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center mb-6">
                    <h3 
                      className="text-4xl font-bold text-white mr-4"
                      style={{ fontFamily: '"Noto Sans Thai", "Inter", sans-serif' }}
                    >
                      {restaurant.name}
                    </h3>
                    <div className="flex">
                      {[...Array(restaurant.stars)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-orange-400 font-semibold">Chef: </span>
                    <span className="text-gray-300">{restaurant.chef}</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-orange-400 font-semibold">Specialty: </span>
                    <span className="text-gray-300">{restaurant.specialty}</span>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    {restaurant.description}
                  </p>

                  <div className="bg-gradient-to-r from-orange-900/30 to-transparent rounded-2xl p-6 border-l-4 border-orange-500">
                    <p className="text-orange-200 italic text-lg leading-relaxed">
                      "{restaurant.philosophy}"
                    </p>
                  </div>

                  <div className="mt-4">
                    <span className="text-orange-400 font-semibold">Signature: </span>
                    <span className="text-gray-300">{restaurant.signature}</span>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">{restaurant.stars}★</span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">{restaurant.name}</h4>
                        <p className="text-orange-400 mb-4">{restaurant.location}</p>
                        <div className="flex justify-center">
                          {[...Array(restaurant.stars)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mx-1" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Legends Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: '"Noto Sans Thai", "Playfair Display", serif' }}
            >
              Local Legends
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The street food masters and neighborhood heroes who keep Thai culinary soul alive
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {localLegends.map((legend, index) => (
              <motion.div
                key={legend.name}
                className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-3xl p-8 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <h3 
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: '"Noto Sans Thai", "Inter", sans-serif' }}
                  >
                    {legend.name}
                  </h3>
                  <MapPin className="w-5 h-5 text-orange-400 ml-4" />
                  <span className="text-orange-400 text-sm">{legend.location}</span>
                </div>

                <div className="mb-4">
                  <span className="text-orange-400 font-semibold">Famous For: </span>
                  <span className="text-gray-300">{legend.famous}</span>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {legend.story}
                </p>

                <div className="bg-gradient-to-r from-black/30 to-transparent rounded-xl p-4 border-l-4 border-orange-500">
                  <p className="text-orange-200 italic">
                    "{legend.wisdom}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient Spotlight */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-orange-900/10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: '"Noto Sans Thai", "Playfair Display", serif' }}
            >
              Sacred Ingredients
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The holy trinity and beyond — ingredients that define Thai cuisine's soul
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <div className="bg-gradient-to-br from-green-800/30 to-orange-800/30 rounded-3xl p-6 border border-green-500/20 hover:border-orange-500/60 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                      <Leaf className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{ingredient.name}</h3>
                    <p className="text-orange-400 text-sm mb-3" style={{ fontFamily: '"Noto Sans Thai", sans-serif' }}>
                      {ingredient.thai}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {ingredient.description}
                    </p>
                    
                    <div className="mt-4 px-3 py-1 bg-gradient-to-r from-green-600/20 to-orange-600/20 rounded-full">
                      <span className="text-xs text-orange-300 font-medium">{ingredient.effect}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-black to-orange-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: '"Noto Sans Thai", "Playfair Display", serif' }}
            >
              Thai Food Philosophy
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: '"Noto Sans Thai", sans-serif' }}>
                Sanuk (สนุก)
              </h3>
              <h4 className="text-xl text-orange-400 mb-6">Fun & Joy</h4>
              <p className="text-gray-300 leading-relaxed">
                Thai food culture emphasizes joy and sharing. Every meal should bring happiness, 
                laughter, and connection between people. Food is celebration, not just sustenance.
              </p>
            </motion.div>

            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Star className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: '"Noto Sans Thai", sans-serif' }}>
                Kreng Jai (เกรงใจ)
              </h3>
              <h4 className="text-xl text-orange-400 mb-6">Considerate Sharing</h4>
              <p className="text-gray-300 leading-relaxed">
                The communal dining etiquette of sharing dishes, considering others' preferences, 
                and ensuring everyone at the table is well-fed and happy.
              </p>
            </motion.div>

            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Leaf className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: '"Noto Sans Thai", sans-serif' }}>
                Mai Pen Rai (ไม่เป็นไร)
              </h3>
              <h4 className="text-xl text-orange-400 mb-6">No Worries</h4>
              <p className="text-gray-300 leading-relaxed">
                The relaxed approach to cooking and eating. Flexibility over rigid rules, 
                adaptation over perfection, and the understanding that good food comes from heart, not stress.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Market Experience */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-teal-900/20" />
          {/* Animated water ripples */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-blue-400/20"
              animate={{
                scale: [1, 3, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                width: '20px',
                height: '20px',
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: '"Noto Sans Thai", "Playfair Display", serif' }}
            >
              Floating Market Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From dawn's first light to sunset's glow — experience the rhythm of Thailand's water markets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-blue-900/30 to-teal-900/30 rounded-3xl p-8 border border-blue-500/30"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Clock className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Dawn Market (5-7 AM)</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Boats arrive laden with fresh produce from floating gardens. Vendors arrange 
                their colorful displays as the morning mist rises from the water.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                  Fresh herbs and vegetables
                </div>
                <div className="flex items-center text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                  Live fish and seafood
                </div>
                <div className="flex items-center text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                  Traditional boat setup
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 rounded-3xl p-8 border border-orange-500/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Flame className="w-12 h-12 text-orange-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Peak Hours (8-11 AM)</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                The market comes alive with cooking boats serving hot pad thai, boat noodles, 
                and fresh coconut ice cream. Steam rises, woks sizzle.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-orange-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3" />
                  Hot noodle soups
                </div>
                <div className="flex items-center text-sm text-orange-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3" />
                  Fresh fruit vendors
                </div>
                <div className="flex items-center text-sm text-orange-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3" />
                  Tourist boat tours
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-3xl p-8 border border-purple-500/30"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Star className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Evening Wind Down</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                As boats return home, vendors share stories over leftover som tam. 
                The market transforms into a floating community center.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  Community gathering
                </div>
                <div className="flex items-center text-sm text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  Traditional music
                </div>
                <div className="flex items-center text-sm text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  Sunset reflection
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Som Tam Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-black to-green-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: '"Noto Sans Thai", "Playfair Display", serif' }}
            >
              Som Tam Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Feel the rhythm of the mortar and pestle — Thailand's most meditative cooking method
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-900/40 to-lime-900/40 rounded-3xl p-12 border border-green-500/30 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="w-40 h-40 bg-gradient-to-br from-lime-600 to-green-700 rounded-full mx-auto mb-8 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34, 197, 94, 0.5)",
                  "0 0 40px rgba(34, 197, 94, 0.8)",
                  "0 0 20px rgba(34, 197, 94, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-6xl">🥄</span>
            </motion.div>

            <h3 className="text-3xl font-bold text-white mb-6">Interactive Mortar & Pestle</h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              Click the mortar to experience the rhythmic pounding that creates perfect som tam. 
              Each ingredient added in sequence, each pound building flavor complexity.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { name: "Green Papaya", emoji: "🥒", order: 1 },
                { name: "Thai Chili", emoji: "🌶️", order: 2 },
                { name: "Garlic", emoji: "🧄", order: 3 },
                { name: "Lime Juice", emoji: "🍋", order: 4 }
              ].map((ingredient, index) => (
                <motion.div
                  key={ingredient.name}
                  className="bg-green-800/30 rounded-2xl p-4 border border-green-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                >
                  <div className="text-3xl mb-2">{ingredient.emoji}</div>
                  <div className="text-white text-sm font-medium">{ingredient.name}</div>
                  <div className="text-green-400 text-xs">Step {ingredient.order}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Regional Diversity Map */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 to-purple-900/10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: '"Noto Sans Thai", "Playfair Display", serif' }}
            >
              Four Culinary Kingdoms
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each region of Thailand tells its own flavor story through unique ingredients and techniques
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-3xl p-8 border border-yellow-500/30"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">Northern Thailand</h3>
              <p className="text-gray-300 mb-6">Influenced by Myanmar and Yunnan, featuring mild curries and unique herbs</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🍜</span>
                  <div>
                    <div className="text-white font-semibold">Khao Soi</div>
                    <div className="text-gray-400 text-sm">Coconut curry noodle soup with crispy noodles</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🥩</span>
                  <div>
                    <div className="text-white font-semibold">Sai Ua</div>
                    <div className="text-gray-400 text-sm">Herbal northern Thai sausage</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-3xl p-8 border border-green-500/30"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-green-400 mb-4">Isaan (Northeast)</h3>
              <p className="text-gray-300 mb-6">Spicy, sour flavors with fermented fish sauce and sticky rice staples</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🥗</span>
                  <div>
                    <div className="text-white font-semibold">Som Tam</div>
                    <div className="text-gray-400 text-sm">Spicy green papaya salad</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🍖</span>
                  <div>
                    <div className="text-white font-semibold">Larb</div>
                    <div className="text-gray-400 text-sm">Spicy meat salad with herbs</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-3xl p-8 border border-blue-500/30"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-blue-400 mb-4">Central Thailand</h3>
              <p className="text-gray-300 mb-6">Royal cuisine heritage with balanced flavors and refined techniques</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🍝</span>
                  <div>
                    <div className="text-white font-semibold">Pad Thai</div>
                    <div className="text-gray-400 text-sm">Thailand's national stir-fried noodle dish</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🍛</span>
                  <div>
                    <div className="text-white font-semibold">Green Curry</div>
                    <div className="text-gray-400 text-sm">Aromatic coconut curry with Thai basil</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-3xl p-8 border border-red-500/30"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-red-400 mb-4">Southern Thailand</h3>
              <p className="text-gray-300 mb-6">Seafood-rich cuisine with Malay influences and intense spice levels</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🐟</span>
                  <div>
                    <div className="text-white font-semibold">Gaeng Som</div>
                    <div className="text-gray-400 text-sm">Sour orange curry with fish</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🦐</span>
                  <div>
                    <div className="text-white font-semibold">Gaeng Tai Pla</div>
                    <div className="text-gray-400 text-sm">Intensely spicy fermented fish curry</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-black to-orange-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl md:text-6xl font-light mb-8"
            style={{ 
              fontFamily: '"Noto Sans Thai", "Playfair Display", serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #ff8c00 50%, #ffffff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Begin Your Thai Journey
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            From street food stalls to Michelin stars, from ancient temple recipes to modern innovation — 
            Thai cuisine offers infinite discoveries for those willing to explore.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/culinary-journey"
              className="group bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 flex items-center justify-center"
            >
              Explore More Cuisines
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group bg-transparent border-2 border-orange-500 text-orange-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
              Find Thai Restaurants
              <MapPin className="w-5 h-5 ml-2 inline group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ThaiCuisinePage;
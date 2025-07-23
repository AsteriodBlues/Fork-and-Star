"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { ChefHat, Sparkles, Crown, Star, Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Dynamic header effects based on scroll
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const navItems = [
    { 
      name: "Explore", 
      href: "/explore", 
      icon: <Sparkles className="w-4 h-4" />,
      description: "Discover restaurants"
    },
    { 
      name: "AI Recommendations", 
      href: "/recommendations", 
      icon: <Crown className="w-4 h-4" />,
      description: "Personalized picks"
    },
    { 
      name: "Analytics Dashboard", 
      href: "/analytics", 
      icon: <Star className="w-4 h-4" />,
      description: "Insights & trends"
    },
    { 
      name: "Favorites", 
      href: "/favorites", 
      icon: <ChefHat className="w-4 h-4" />,
      description: "Your collection"
    }
  ];

  return (
    <>
      {/* Main Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
        style={{
          backdropFilter: `blur(${headerBlur}px)`,
          background: `linear-gradient(135deg, 
            rgba(0, 0, 0, ${isScrolled ? 0.9 : 0.7}) 0%,
            rgba(15, 15, 15, ${isScrolled ? 0.85 : 0.65}) 50%,
            rgba(0, 0, 0, ${isScrolled ? 0.9 : 0.7}) 100%
          )`,
        }}
        animate={{
          borderBottom: isScrolled 
            ? "1px solid rgba(255, 215, 0, 0.2)" 
            : "1px solid transparent"
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo Section - Enhanced */}
          <motion.div 
            className="flex items-center space-x-3"
            style={{ scale: logoScale }}
          >
            <Link href="/" className="group flex items-center space-x-3">
              {/* Animated Logo Icon */}
              <motion.div
                className="relative"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
                  <span className="text-2xl">🍽️</span>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </motion.div>
              
              {/* Logo Text */}
              <div className="flex flex-col">
                <motion.h1 
                  className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    letterSpacing: '0.02em'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Fork & Star
                </motion.h1>
                <span className="text-xs text-yellow-400/80 font-medium tracking-wider uppercase">
                  Culinary Excellence
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 shadow-lg shadow-yellow-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-white/5'
                    }`}
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    {/* Text */}
                    <span className="font-medium text-sm">{item.name}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border border-yellow-500/30"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                  
                  {/* Hover tooltip */}
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/90 backdrop-blur-md rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none border border-white/10">
                    {item.description}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90" />
                  </div>
                </motion.div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Ambient glow line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"
          animate={{
            opacity: isScrolled ? 1 : 0,
            scaleX: isScrolled ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        className={`lg:hidden fixed inset-0 z-40 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <motion.div
          className="absolute top-20 left-4 right-4 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -50,
            scale: isMobileMenuOpen ? 1 : 0.95
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-6">
            <div className="grid gap-3">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : -20 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-yellow-500/20' : 'bg-white/10'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-400">{item.description}</div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Mobile menu footer */}
          <div className="px-6 py-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-t border-white/10">
            <p className="text-center text-sm text-gray-400">
              Discover culinary excellence
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Spacer to prevent content overlap */}
      <div className={`${isScrolled ? 'h-20' : 'h-24'} transition-all duration-500`} />
    </>
  );
}
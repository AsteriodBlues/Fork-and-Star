"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import MusicPlayer from "@/components/MusicPlayer";
import { Toaster } from "sonner";
import CustomCursor from "@/components/CustomCursor";
import useSound from "use-sound";
import { ChefHat, Sparkles, Crown, Star, Menu, X, BarChart3 } from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [playClick] = useSound("/sounds/click.wav", { volume: 0.3 });
  const { scrollY } = useScroll();
  
  // Dynamic header effects based on scroll
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const handleNavClick = () => {
    playClick();
    setLoading(true);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { 
      name: "Explore", 
      href: "/explore", 
      icon: <Sparkles className="w-4 h-4" />,
      description: "Discover restaurants",
      color: "text-yellow-500"
    },
    { 
      name: "AI Recommendations", 
      href: "/recommendations", 
      icon: <Crown className="w-4 h-4" />,
      description: "Personalized picks",
      color: "text-purple-400"
    },
    { 
      name: "Analytics Dashboard", 
      href: "/analytics", 
      icon: <BarChart3 className="w-4 h-4" />,
      description: "Insights & trends",
      color: "text-blue-400"
    },
    { 
      name: "Favorites", 
      href: "/favorites", 
      icon: <ChefHat className="w-4 h-4" />,
      description: "Your collection",
      color: "text-yellow-500"
    }
  ];

  return (
    <>
      <CustomCursor />
      {loading && <Loader />}

      {/* Luxury Modern Header */}
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
          
          {/* Enhanced Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            style={{ scale: logoScale }}
          >
            <Link href="/" onClick={handleNavClick} className="group flex items-center space-x-3">
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
                    onClick={handleNavClick}
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
                      className={isActive ? item.color : ''}
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
                      onClick={handleNavClick}
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

      {/* Main Content with Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-1 min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Luxury Modern Footer */}
      <footer className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/95 to-gray-800/90" />
          
          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => {
              const positions = [
                { left: '10%', top: '20%' }, { left: '85%', top: '15%' }, { left: '25%', top: '80%' },
                { left: '70%', top: '10%' }, { left: '90%', top: '60%' }, { left: '15%', top: '45%' },
                { left: '60%', top: '75%' }, { left: '35%', top: '25%' }, { left: '80%', top: '85%' },
                { left: '5%', top: '65%' }, { left: '95%', top: '40%' }, { left: '45%', top: '30%' },
                { left: '20%', top: '90%' }, { left: '75%', top: '55%' }, { left: '50%', top: '5%' }
              ];
              const position = positions[i] || { left: '50%', top: '50%' };
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
                  style={{
                    left: position.left,
                    top: position.top,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 2, 1],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>

          {/* Top Border Glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            
            {/* Brand Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="text-2xl">🍽️</span>
                </motion.div>
                
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                      style={{ fontFamily: '"Playfair Display", serif' }}>
                    Fork & Star
                  </h3>
                  <p className="text-xs text-yellow-400/80 font-medium tracking-wider uppercase">
                    Culinary Excellence
                  </p>
                </div>
              </div>

              {/* Mission Statement */}
              <p className="text-gray-400 leading-relaxed text-sm">
                Discover star-worthy dining experiences, one fork at a time. 
                We curate the world's finest restaurants and hidden culinary gems 
                for the discerning food enthusiast.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: "🌟", label: "Reviews", color: "hover:text-yellow-400" },
                  { icon: "📱", label: "Mobile", color: "hover:text-blue-400" },
                  { icon: "🍷", label: "Wine", color: "hover:text-purple-400" },
                  { icon: "👨‍🍳", label: "Chefs", color: "hover:text-green-400" }
                ].map((social, index) => (
                  <motion.button
                    key={social.label}
                    className={`w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:bg-white/10 hover:border-white/20 hover:scale-110`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Discover
              </h4>
              
              <div className="space-y-3">
                {[
                  { name: "🌟 Top Restaurants", href: "/explore" },
                  { name: "🤖 AI Recommendations", href: "/recommendations" },
                  { name: "📊 Food Analytics", href: "/analytics" },
                  { name: "❤️ Your Favorites", href: "/favorites" },
                  { name: "🏆 Michelin Guide", href: "/michelin" },
                  { name: "🌱 Sustainable Dining", href: "/sustainable" }
                ].map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Stay Connected
              </h4>

              {/* Newsletter Signup */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  Get curated restaurant recommendations delivered to your inbox.
                </p>
                
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all duration-300 text-sm"
                  />
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join
                  </motion.button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <p className="text-gray-400 text-xs">
                  🍜 Crafted with love & ramen noodles
                </p>
                <p className="text-gray-500 text-xs">
                  ☕ Late night coding sessions
                </p>
                <p className="text-gray-500 text-xs">
                  🌍 Serving food lovers worldwide
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Fork & Star. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Made with ❤️ for food enthusiasts everywhere
                </p>
              </div>

              {/* Achievement Badges */}
              <div className="flex items-center space-x-4">
                <motion.div
                  className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full border border-yellow-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-yellow-400 text-xs">⭐</span>
                  <span className="text-yellow-400 text-xs font-medium">Premium Certified</span>
                </motion.div>
                
                <motion.div
                  className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full border border-green-500/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-green-400 text-xs">🌱</span>
                  <span className="text-green-400 text-xs font-medium">Eco Friendly</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      </footer>

      {/* Background Components */}
      <MusicPlayer />
      <Toaster richColors position="top-center" />
    </>
  );
}
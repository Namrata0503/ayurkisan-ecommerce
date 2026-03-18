import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "../styles/components/hero.css";

const heroSlides = [
  {
    id: 1,
    title: "Aloe Vera",
    bgText: "ALOE",
    subtitle: "The Miracle Plant",
    desc: "Infused with cooling properties, our organic Aloe Vera extracts rejuvenate your skin and digestion from within.",
    img: "https://images.unsplash.com/photo-1632380211596-b96123618ca8?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumb: "https://images.unsplash.com/photo-1632380211596-b96123618ca8?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gradient: "linear-gradient(135deg, #a7f3d0, #34d399)",
    bgTheme: "#f0fdf4"
  },
  {
    id: 2,
    title: "Pure Neem",
    bgText: "NEEM",
    subtitle: "The Sacred Purifier",
    desc: "Experience the ancient detoxifying power of pure Neem. A natural immunity booster for a holistically balanced body.",
    img: "https://images.unsplash.com/photo-1687945906634-25c66199d941?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumb: "https://images.unsplash.com/photo-1687945906634-25c66199d941?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gradient: "linear-gradient(135deg, #6ee7b7, #10b981)",
    bgTheme: "#ecfdf5"
  },
  {
    id: 3,
    title: "Holy Tulsi",
    bgText: "TULSI",
    subtitle: "The Queen of Herbs",
    desc: "Relieve stress and bring tranquility to your chaotic modern life with our ethically-sourced, divine Tulsi blends.",
    img: "https://images.unsplash.com/photo-1665479754958-1a8bdc47cc0d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumb: "https://images.unsplash.com/photo-1665479754958-1a8bdc47cc0d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gradient: "linear-gradient(135deg, #86efac, #059669)",
    bgTheme: "#f0fdfa"
  },
  {
    id: 4,
    title: "Super Moringa",
    bgText: "MORINGA",
    subtitle: "The Miracle Tree",
    desc: "Fuel your daily energy with Nature’s ultimate organic multivitamin. Packed with essential antioxidants.",
    img: "https://images.unsplash.com/photo-1771643033515-0028fd03b708?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    thumb: "https://images.unsplash.com/photo-1771643033515-0028fd03b708?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gradient: "linear-gradient(135deg, #6fd399, #047857)",
    bgTheme: "#f2fbf5"
  }
];

function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.section 
      className="hero"
      animate={{ backgroundColor: heroSlides[current].bgTheme }}
      transition={{ duration: 1 }}
    >
      {/* GIANT BACKGROUND TEXT OVERLAY */}
      <div className="hero-bg-text">
        <AnimatePresence mode="wait">
          <motion.h1
            key={current}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 0.04, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {heroSlides[current].bgText}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="hero-container">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="hero-text">
          <motion.div 
            className="hero-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span>🌿 Pure Ayurvedic Elegance</span>
          </motion.div>

          <div className="slider-text-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <motion.h4 className="slide-subtitle" layoutId="subtitle">
                  {heroSlides[current].subtitle}
                </motion.h4>
                <motion.h1 className="slide-title" layoutId="title">
                  <span className="text-gradient" style={{ background: heroSlides[current].gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {heroSlides[current].title}
                  </span>
                </motion.h1>
                <motion.p layoutId="desc">{heroSlides[current].desc}</motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hero-actions">
            <button 
              className="hero-btn-primary"
              onClick={() => scrollToSection("herbal-blog")}
            >
              Discover {heroSlides[current].title}
              <FiArrowRight className="hero-btn-icon" />
            </button>
          </div>
          
          {/* THUMBNAIL NAVIGATION */}
          <div className="hero-thumbnails">
            {heroSlides.map((slide, idx) => (
              <motion.div 
                key={slide.id}
                className={`thumb-item ${current === idx ? "active" : ""}`}
                onClick={() => setCurrent(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={slide.thumb} alt={slide.title} />
                {current === idx && (
                  <motion.div layoutId="thumb-outline" className="thumb-outline" />
                )}
              </motion.div>
            ))}
          </div>

        </div>

        {/* RIGHT: CREATIVE IMAGE MASK SLIDER */}
        <div className="hero-slider-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="slider-creative-mask"
              initial={{ opacity: 0, rotate: -15, scale: 0.8, borderRadius: "50%" }}
              animate={{ opacity: 1, rotate: 0, scale: 1, borderRadius: "20% 50% 30% 60% / 60% 30% 50% 20%" }}
              exit={{ opacity: 0, rotate: 15, scale: 0.8, borderRadius: "50%" }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <img src={heroSlides[current].img} alt={heroSlides[current].title} />
              
              {/* Dynamic Overlay Gradient */}
              <div 
                className="slider-creative-overlay"
                style={{ background: `linear-gradient(45deg, ${heroSlides[current].bgTheme}40, transparent)` }}
              ></div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Aesthetic Elements */}
          <motion.div 
            className="floating-orb orb-1"
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: heroSlides[current].gradient }}
          />
          <motion.div 
            className="floating-orb orb-2"
            animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ background: heroSlides[current].gradient }}
          />

          <motion.div 
            className="floating-card glass-card creative-pulse"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          >
            <div className="fc-icon">✨</div>
            <div className="fc-text">
              <strong>Check Out</strong>
              <span>For your healthy Lifestyle</span>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}

export default Hero;
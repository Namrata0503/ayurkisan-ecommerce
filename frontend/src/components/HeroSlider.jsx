import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { FiTag, FiClock, FiArrowRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "../styles/components/heroSlider.css";

function HeroSlider() {

  const promoSlides = [
    {
      id: 1,
      badge: "LIMITED COLLECTION",
      title: "Ancient Wellness, Modern Grace",
      discount: "REVEL IN 30% OFF",
      subtitle: "Curated Ayurvedic supplements for the discerning seeker. Pure, potent, and pristine.",
      code: "AYUR30",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1600&q=90",
      accent: "#d4af37"
    },
    {
      id: 2,
      badge: "ELIXIR SERIES",
      title: "The Golden Glow Ritual",
      discount: "BUY 2, GIFT 1",
      subtitle: "Unveil your inner radiance with our master-blended Neem & Aloe skin elixirs.",
      code: "GLOWUP",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1600&q=90",
      accent: "#5eead4"
    },
    {
      id: 3,
      badge: "24-HOUR FLASH",
      title: "Immunity Sovereignty",
      discount: "EXTRA 15% REWARD",
      subtitle: "Fortify your life-force with Tulsi & Moringa extracts. Hand-harvested excellence.",
      code: "HEALTH15",
      image: "https://images.unsplash.com/photo-1611095973763-414019e72400?auto=format&fit=crop&w=1600&q=90",
      accent: "#fcd34d"
    }
  ];

  return (
    <section className="premium-promo-slider-section">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        className="premium-promo-swiper"
      >
        {promoSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="premium-promo-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="premium-slide-overlay">
                <div className="premium-slide-content">
                  
                  <motion.div 
                    className="luxury-badge-alt"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{ borderColor: slide.accent, color: slide.accent }}
                  >
                    <FiClock /> {slide.badge}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.div 
                    className="luxury-promo-discount"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{ color: slide.accent }}
                  >
                    {slide.discount}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div 
                    className="luxury-promo-actions"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <div className="luxury-code-box">
                      <span>SECURE CODE:</span>
                      <strong style={{ color: slide.accent }}>{slide.code}</strong>
                    </div>
                    
                    <button 
                      className="luxury-promo-btn"
                      style={{ background: slide.accent }}
                    >
                      Shop Collection <FiArrowRight />
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroSlider;
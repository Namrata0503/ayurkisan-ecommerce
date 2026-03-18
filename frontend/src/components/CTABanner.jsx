import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CTABanner() {
  const navigate = useNavigate();

  return (
    <section className="luxury-cta-banner">
      <div className="banner-glow-orb"></div>
      
      <div className="banner-inner-v2">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Begin Your <span>Ayurvedic</span> Legacy
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Experience handcrafted herbal excellence. Direct from organic fields 
          to your modern lifestyle.
        </motion.p>

        <motion.button 
          onClick={() => navigate("/shop")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="banner-primary-btn"
        >
          Explore the Collection
        </motion.button>
      </div>
    </section>
  );
}

export default CTABanner;
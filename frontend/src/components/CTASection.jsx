import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="luxury-cta-section">
      <div className="cta-cinematic-bg"></div>
      <div className="cta-pattern-overlay"></div>
      
      <div className="cta-content-v2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Elevate Your Daily <span>Ritual</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join a community dedicated to mindful living and the transformative power of 
          authentic Ayurvedic wellness.
        </motion.p>

        <motion.button
          className="cta-btn-v2"
          onClick={() => navigate("/shop")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Journey
          <FiArrowRight />
        </motion.button>
      </div>
    </section>
  );
}

export default CTASection;
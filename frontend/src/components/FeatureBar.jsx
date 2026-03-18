import { motion } from "framer-motion";
import { FiHeart, FiShield, FiTruck } from "react-icons/fi";

function FeatureBar() {
  const barVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } 
    }
  };

  const features = [
    { icon: <FiHeart />, text: "100% Pure Organic" },
    { icon: <FiShield />, text: "FSSAI & ISO Certified" },
    { icon: <FiTruck />, text: "Global Express Shipping" }
  ];

  return (
    <section className="premium-feature-bar-wrapper">
      <motion.div 
        className="glass-feature-bar"
        variants={barVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="feature-glow-line"></div>
        <div className="feature-bar-inner">
          {features.map((f, idx) => (
            <div className="feature-pill" key={idx}>
              <div className="feature-icon-circle">{f.icon}</div>
              <span className="feature-pill-text">{f.text}</span>
              {idx < features.length - 1 && <div className="feature-dot-sep"></div>}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default FeatureBar;
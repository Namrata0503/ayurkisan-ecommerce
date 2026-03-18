import { motion } from "framer-motion";
import { FiWind, FiShield, FiZap, FiHeart } from "react-icons/fi";

function FeatureCards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const features = [
    {
      icon: <FiWind />,
      title: "Pristine Extraction",
      desc: "Cold-press technology that preserves 99% of bioavailability.",
      color: "#1b4332"
    },
    {
      icon: <FiShield />,
      title: "ISO-7 Certified",
      desc: "Rigorous laboratory testing for heavy metals and purity.",
      color: "#2d6a4f"
    },
    {
      icon: <FiZap />,
      title: "Instant Vitality",
      desc: "Formulas optimized for rapid absorption and lasting energy.",
      color: "#409167"
    },
    {
      icon: <FiHeart />,
      title: "Ethical Sourcing",
      desc: "Direct-from-farmer trade that supports organic rural life.",
      color: "#52b788"
    }
  ];

  return (
    <section className="creative-features-section">
      <div className="section-bg-accent"></div>
      
      <div className="feature-header-alt">
        <motion.span 
          className="mini-badge"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          WHY AYURKISAN
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Precision Wellness, <span>Rooted in Earth</span>
        </motion.h2>
      </div>

      <motion.div 
        className="creative-cards-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((f, idx) => (
          <motion.div 
            className="creative-feature-card glass-panel" 
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -10, rotate: idx % 2 === 0 ? 1 : -1 }}
          >
            <div className="feature-icon-wrapper" style={{ color: f.color }}>
              {f.icon}
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <div className="card-arrow">→</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default FeatureCards;
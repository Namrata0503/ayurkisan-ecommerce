import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({ target, label, suffix = "+" }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [target, count]);

  useEffect(() => {
    return rounded.onChange((latest) => setDisplayValue(latest));
  }, [rounded]);

  return (
    <motion.div 
      className="glass-stat-card"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="stat-glow"></div>
      <h3>{displayValue}{suffix}</h3>
      <p>{label}</p>
    </motion.div>
  );
}

function StatsSection() {
  return (
    <section className="luxury-stats-section">
      <div className="stats-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Impact in <span>Numbers</span>
        </motion.h2>
      </div>
      
      <div className="stats-glass-grid">
        <Counter target={12500} label="Active Wellness Seekers" />
        <Counter target={85} label="Certified Organic Farms" />
        <Counter target={120} label="Ayurvedic Master Blends" />
        <Counter target={45} label="State Awards Won" />
      </div>
    </section>
  );
}

export default StatsSection;
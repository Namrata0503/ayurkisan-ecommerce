import { motion } from "framer-motion";
import { FiUsers, FiAward, FiCheckCircle, FiShield } from "react-icons/fi";

function TrustSection() {
  const trustItems = [
    { icon: <FiUsers />, title: "15k+", label: "Wellness Seekers" },
    { icon: <FiCheckCircle />, title: "100%", label: "Pure Organic" },
    { icon: <FiAward />, title: "FSSAI", label: "Quality Assured" },
    { icon: <FiShield />, title: "Secure", label: "Safe Checkout" },
  ];

  return (
    <section className="luxury-trust-section">
      <div className="trust-pattern"></div>
      <div className="trust-inner-glow"></div>
      <div className="trust-grid-creative">
        {trustItems.map((item, idx) => (
          <motion.div 
            className="trust-card-pill" 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="trust-icon-pill">{item.icon}</div>
            <div className="trust-text-pill">
              <h4>{item.title}</h4>
              <p>{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TrustSection;
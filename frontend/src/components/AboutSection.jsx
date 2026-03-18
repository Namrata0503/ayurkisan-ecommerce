import { motion } from "framer-motion";
import heroImage from "../assets/images/heroimage.jpg";

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-luxury-container">
        
        {/* ASYMMETRICAL LEFT: CONTENT GLASS CARD */}
        <motion.div 
          className="about-content-card glass-panel"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="luxury-badge">OUR HERITAGE</div>
          <h2>Preserving the Soul of <span>Ayurveda</span></h2>
          <p>
            Ayurkisan isn't just a brand; it's a bridge between 5,000 years of Vedic wisdom and 
            the fast-paced rhythm of modern life. We believe wellness should be as natural 
            as the breath you take.
          </p>
          <p className="secondary-text">
            Every herb is hand-harvested at its peak potency, ensuring that the life force of 
            nature remains uncompromised from the farm to your doorstep.
          </p>
          <button className="luxury-outline-btn">
            Explore Our Story
          </button>
        </motion.div>

        {/* ASYMMETRICAL RIGHT: IMAGE COMPOSITION */}
        <motion.div 
          className="about-image-composition"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="main-image-wrapper">
            <img src={heroImage} alt="Ayurkisan Heritage" className="main-heritage-img" />
            <div className="image-accent-glow"></div>
          </div>
          
          <motion.div 
            className="floating-experience-card"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="exp-icon">🌱</div>
            <div>
              <strong>15+ Years</strong>
              <span>of Pure Extraction</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default AboutSection;
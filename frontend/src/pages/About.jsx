import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaSeedling, FaHandsHelping, FaFlask } from "react-icons/fa";
import "../styles/pages/about.css";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="about-page">
      
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="hero-overlay">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="hero-content container"
          >
            <span className="about-tag">Our Journey</span>
            <h1>Rooted in Nature, <br/><span className="text-gradient">Crafted for You 🌿</span></h1>
            <p>
              Blending ancient Ayurvedic wisdom with modern wellness solutions
              to cultivate a healthier, more balanced lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="about-story container">
        <div className="story-grid">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="story-image-wrapper"
          >
            <div className="image-blob-bg"></div>
            <img
              src="https://images.unsplash.com/photo-1615486511246-12a63d74b31c?auto=format&fit=crop&q=80"
              alt="Fresh Ayurvedic Herbs"
              className="story-img"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="story-content"
          >
            <h2 className="section-title">Our Story</h2>
            <div className="title-underline"></div>
            <p className="lead-text">
              AyurKisan was founded with a singular mission: to connect people 
              with the pure, healing power of nature.
            </p>
            <p>
              We believe that true wellness starts from the ground up. By sourcing 
              authentic Ayurvedic herbs directly from passionate local farmers, we 
              ensure that every product we create is brimming with vitality and 
              traditional integrity. From farm to bottle, our process is guided by 
              respect for the earth and a commitment to your health.
            </p>
            <div className="stats-row">
              <div className="stat">
                <h4>50+</h4>
                <span>Partner Farms</span>
              </div>
              <div className="stat">
                <h4>100%</h4>
                <span>Organic</span>
              </div>
              <div className="stat">
                <h4>10k+</h4>
                <span>Happy Customers</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CORE VALUES (FEATURES) */}
      <section className="about-features-section bg-mint">
        <div className="container">
          <motion.div 
            className="features-header text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do at AyurKisan.</p>
          </motion.div>

          <motion.div 
            className="features-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="feature-card-premium glass-panel">
              <div className="icon-wrapper"><FaLeaf /></div>
              <h3>Pure Ingredients</h3>
              <p>100% natural, ethically sourced herbs with zero artificial additives.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="feature-card-premium glass-panel">
              <div className="icon-wrapper"><FaFlask /></div>
              <h3>Rigorous Testing</h3>
              <p>Every small batch undergoes strict quality control and lab testing.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="feature-card-premium glass-panel">
              <div className="icon-wrapper"><FaSeedling /></div>
              <h3>Eco-Friendly</h3>
              <p>Committed to sustainable farming practices and green packaging.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="feature-card-premium glass-panel">
              <div className="icon-wrapper"><FaHandsHelping /></div>
              <h3>Community First</h3>
              <p>We actively empower and invest in our local farming communities.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default About;
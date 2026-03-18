import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";
import "../styles/pages/contact.css";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="contact-page">
      
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="container contact-hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="contact-tag">Get in Touch</span>
            <h1>Contact <span className="text-gradient">AyurKisan</span></h1>
            <p>We are here to help you on your natural wellness journey.</p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT LAYOUT */}
      <section className="contact-section container">
        <div className="contact-grid-premium">

          {/* CONTACT INFO PANEL */}
          <motion.div 
            className="contact-info-panel glass-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
          >
            <h2>Contact Information</h2>
            <p className="info-lead">Reach out to us! We'd love to hear from you.</p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon"><FaEnvelope /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>support@ayurkisan.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><FaPhoneAlt /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><FaMapMarkerAlt /></div>
                <div>
                  <h4>Visit Us</h4>
                  <p>Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h4>Follow Our Journey</h4>
              <div className="social-icons-premium">
                <a href="#" className="social-circ"><FaInstagram /></a>
                <a href="#" className="social-circ"><FaWhatsapp /></a>
                <a href="#" className="social-circ"><FaFacebook /></a>
                <a href="#" className="social-circ"><FaLinkedin /></a>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="contact-shape"></div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="form-header">
              <h3>Send us a Message</h3>
              <p>Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form className="premium-form" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
              
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. Aditi Sharma" required />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="aditi@example.com" required />
              </div>

              <div className="input-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>

            </form>
          </motion.div>

        </div>
      </section>

    </div>
  );
}

export default Contact;
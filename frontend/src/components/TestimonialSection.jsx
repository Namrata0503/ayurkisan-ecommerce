import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

function TestimonialSection() {
  const testimonials = [
    {
      name: "Prisha Kapoor",
      location: "New Delhi",
      text: "The Aloe Vera gel is a revelation. I've used premium brands for years, but Ayurkisan's purity is unmatched. My skin has never felt more alive.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      role: "Wellness Blogger"
    },
    {
      name: "Dr. Vikram Mehta",
      location: "Mumbai",
      text: "As a practitioner, I'm picky about sourcing. Ayurkisan's transparency and ISO certification give me full confidence in recommending them to patients.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      role: "Ayurvedic Specialist"
    },
    {
      name: "Sanya Iyer",
      location: "Chennai",
      text: "The Holy Tulsi blend has become my nightly ritual. It doesn't just taste divine; it truly brings a sense of calm after a chaotic day at work.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      role: "Tech Professional"
    }
  ];

  return (
    <section className="cinematic-testimonials">
      <div className="testimonial-overlay-text">RELIEVED</div>
      
      <div className="testimonial-header-v2">
        <motion.span 
          className="luxury-mini-tag"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          KIND WORDS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Voices of <span>Transformation</span>
        </motion.h2>
      </div>

      <div className="testimonial-curated-grid">
        {testimonials.map((t, idx) => (
          <motion.div 
            className="curated-testimonial-card" 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
          >
            <div className="quote-mark">“</div>
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => <FiStar key={i} className="star-filled" />)}
            </div>
            <p className="testimonial-body">{t.text}</p>
            
            <div className="testimonial-footer-v2">
              <img src={t.img} alt={t.name} className="testimonial-avatar-v2" />
              <div className="testimonial-meta-v2">
                <h4>{t.name}</h4>
                <div className="meta-sub">
                  <span>{t.role}</span>
                  <span className="dot">•</span>
                  <span>{t.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialSection;
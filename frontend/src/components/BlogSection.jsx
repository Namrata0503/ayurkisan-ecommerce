import { motion } from "framer-motion";
import aloeImg from "../assets/aloe-blog.png";
import neemImg from "../assets/neem-blog.png";
import tulsiImg from "../assets/tulsi-blog.png";
import moringaImg from "../assets/moringa-blog.png";

const blogPosts = [
  {
    id: "aloe",
    title: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    benefits: "Known as 'Kumari' in Ayurveda, it's a natural healer for skin and digestion. Highly rich in antioxidants and vitamins.",
    usage: "Direct application for skin burns or diluted juice for digestive health.",
    img: aloeImg,
    accent: "#10b981"
  },
  {
    id: "neem",
    title: "Pure Neem",
    scientificName: "Azadirachta indica",
    benefits: "The 'Village Pharmacy'. Powerful antimicrobial and purifying properties. Cleanses blood and supports immunity.",
    usage: "Extracted oil for skin health or leaf paste for detoxification.",
    img: neemImg,
    accent: "#059669"
  },
  {
    id: "tulsi",
    title: "Holy Tulsi",
    scientificName: "Ocimum tenuiflorum",
    benefits: "The 'Queen of Herbs'. Adaptogenic properties help the body cope with stress. Boosts respiratory health.",
    usage: "Brewed as tea (Kadha) or consumed raw for peak immunity.",
    img: tulsiImg,
    accent: "#047857"
  },
  {
    id: "moringa",
    title: "Moringa",
    scientificName: "Moringa oleifera",
    benefits: "World's most nutritious superfood. Contains 7x more Vitamin C than oranges and 15x more Potassium than bananas.",
    usage: "Powdered leaves in smoothies or capsules for daily energy.",
    img: moringaImg,
    accent: "#065f46"
  }
];

function BlogSection() {
  return (
    <section className="blog-section" id="herbal-blog">
      <div className="container">
        <div className="blog-header">
          <motion.span 
            className="blog-tag"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            🌿 Nature's Wisdom
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover the Power of <span>Ayurvedic Plants</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Deep dive into the remedial secrets of ancient herbs sourced directly from organic farms.
          </motion.p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post, idx) => (
            <motion.div 
              key={post.id}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="blog-image">
                <img src={post.img} alt={post.title} />
                <div className="blog-overlay" style={{ background: `linear-gradient(to top, ${post.accent}dd, transparent)` }}></div>
              </div>
              <div className="blog-info">
                <h3>{post.title}</h3>
                <span className="scientific-name">{post.scientificName}</span>
                <p className="blog-desc">{post.benefits}</p>
                <div className="blog-usage">
                  <strong>Best Usage:</strong> {post.usage}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;

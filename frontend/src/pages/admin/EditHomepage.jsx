import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/dashboard/admin.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

function EditHomepage() {
  const [heroForm, setHeroForm] = useState({
    headline: "Luxury Wellness, Delivered to You",
    subheadline: "Handcrafted ayurvedic solutions for the modern seeker.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Discover More",
    ctaLink: "/shop"
  });

  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Monsoon Revival: 40% Off",
      imageUrl: "https://images.unsplash.com/photo-1615486171448-4fd1fb15ea1c?auto=format&fit=crop&w=600&q=80",
      link: "/shop?sale=true",
      status: "ACTIVE"
    },
    {
      id: 2,
      title: "New Ancient Hair Elixirs",
      imageUrl: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=600&q=80",
      link: "/shop?category=hair",
      status: "ACTIVE"
    }
  ]);

  const [saving, setSaving] = useState(false);

  const handleHeroChange = (e) => {
    setHeroForm({ ...heroForm, [e.target.name]: e.target.value });
  };

  const saveHeroSection = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate complex API persistence
    setTimeout(() => {
        setSaving(false);
        alert("Homepage hero configuration synchronized!");
    }, 1500);
  };

  const deleteAd = (id) => {
    setAds(ads.filter(ad => ad.id !== id));
  };

  return (
    <motion.div 
      className="admin-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="admin-header" style={{ marginBottom: "30px" }}>
        <div>
          <h2>Storefront Architect</h2>
          <p style={{ color: "#6b7280", marginTop: "5px" }}>Curate the aesthetics and messaging of your main landing environment.</p>
        </div>
        <div className="header-actions">
            <button className="secondary-btn">
                <i className="fas fa-eye"></i> View Live Site
            </button>
        </div>
      </div>

      <div className="admin-container-narrow">
        
        {/* HERO SECTION EDITOR */}
        <motion.div className="admin-card" variants={itemVariants}>
          <div className="card-header-luxury">
            <h3><i className="fas fa-magic"></i> Hero Masterpiece Settings</h3>
            <span className="badge-premium">PREMIUM CONTENT</span>
          </div>
          
          <form className="admin-form-grid" onSubmit={saveHeroSection}>
            <div className="form-column">
                <div className="input-group">
                <label>Main Headline</label>
                <input 
                    type="text" 
                    name="headline" 
                    className="search-input"
                    value={heroForm.headline} 
                    onChange={handleHeroChange} 
                    required 
                />
                </div>

                <div className="input-group">
                <label>Supporting Sub-Headline</label>
                <input 
                    type="text" 
                    name="subheadline" 
                    className="search-input"
                    value={heroForm.subheadline} 
                    onChange={handleHeroChange} 
                />
                </div>

                <div className="input-group-row">
                    <div className="input-group" style={{ flex: 1 }}>
                        <label>Action Label</label>
                        <input type="text" name="ctaText" className="search-input" value={heroForm.ctaText} onChange={handleHeroChange} required />
                    </div>
                    <div className="input-group" style={{ flex: 1 }}>
                        <label>Action Destination</label>
                        <input type="text" name="ctaLink" className="search-input" value={heroForm.ctaLink} onChange={handleHeroChange} required />
                    </div>
                </div>
            </div>

            <div className="form-column">
                <div className="input-group">
                <label>Cinematic Background (URL)</label>
                <input 
                    type="url" 
                    name="imageUrl" 
                    className="search-input"
                    value={heroForm.imageUrl} 
                    onChange={handleHeroChange} 
                    required 
                />
                </div>

                <div className="hero-preview-luxury">
                    <div className="preview-overlay">
                        <h4>{heroForm.headline || "Headline"}</h4>
                        <p>{heroForm.subheadline || "Sub-headline description..."}</p>
                        <button className="preview-cta">{heroForm.ctaText || "CTA"}</button>
                    </div>
                    <img src={heroForm.imageUrl} alt="Hero Background" />
                </div>
            </div>

            <div className="form-footer-luxury" style={{ marginTop: '20px' }}>
              <button type="submit" className="primary-btn" disabled={saving}>
                {saving ? "Synchronizing..." : "Publish Hero Changes"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* PROMOTIONAL ADS EDITOR */}
        <motion.div className="admin-card" variants={itemVariants}>
          <div className="card-header-luxury">
            <h3 style={{ margin: 0 }}><i className="fas fa-ad"></i> Promotional Mosaic</h3>
            <button className="premium-add-btn">
                <i className="fas fa-plus-circle"></i> New Promotion
            </button>
          </div>

          <div className="table-wrapper">
            <table className="admin-table gradient-table">
              <thead>
                <tr>
                  <th>Visual & Title</th>
                  <th>Destination</th>
                  <th>State</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                    {ads.map((ad, idx) => (
                    <motion.tr 
                        key={ad.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <td>
                            <div className="admin-profile">
                                <img src={ad.imageUrl} alt={ad.title} className="ad-thumb-luxury" />
                                <span className="admin-name">{ad.title}</span>
                            </div>
                        </td>
                        <td><span className="id-badge" style={{ color: '#6366f1' }}>{ad.link}</span></td>
                        <td>
                            <span className="status-badge status-active">{ad.status}</span>
                        </td>
                        <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="edit-btn" title="Edit Content"><i className="fas fa-pen-nib"></i></button>
                                <button className="delete-btn" title="Discard" onClick={() => deleteAd(ad.id)}><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </td>
                    </motion.tr>
                    ))}
                </AnimatePresence>
                {ads.length === 0 && (
                  <tr>
                    <td colSpan="4" className="empty-text">The promotion mosaic is currently vacant.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

export default EditHomepage;

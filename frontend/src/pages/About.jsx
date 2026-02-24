import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/about.css";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-container">
        <h1>About Ayurkisan 🌿</h1>

        <p>
          Ayurkisan is a herbal wellness platform dedicated to
          providing natural and Ayurvedic products that promote
          healthy living.
        </p>

        <h3>Our Mission</h3>
        <p>
          To deliver pure, authentic, and affordable herbal
          products directly from farmers to customers.
        </p>

        <h3>Why Choose Us?</h3>
        <ul>
          <li>100% Natural Products</li>
          <li>Farm Fresh Ingredients</li>
          <li>Quality Tested</li>
          <li>Bulk Buying Options for Retailers</li>
        </ul>
      </div>

      <Footer />
    </>
  );
}

export default About;
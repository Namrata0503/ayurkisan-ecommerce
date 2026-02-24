import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="contact-container">
        <h1>Contact Us 📞</h1>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
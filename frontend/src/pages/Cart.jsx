import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {
  return (
    <>
      <Navbar />

      <div style={{ maxWidth: "900px", margin: "60px auto" }}>
        <h1>Your Cart 🛒</h1>
        <p>Your cart is currently empty.</p>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
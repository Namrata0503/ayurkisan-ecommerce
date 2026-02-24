import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import "../styles/shop.css";

function Shop() {

  const products = [
    {
      id: 1,
      name: "Aloe Vera Juice",
      price: 299,
      image: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f"
    },
    {
      id: 2,
      name: "Moringa Powder",
      price: 249,
      image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659"
    },
    {
      id: 3,
      name: "Herbal Tea",
      price: 199,
      image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6"
    },
    {
      id: 4,
      name: "Tulsi Drops",
      price: 179,
      image: "https://images.unsplash.com/photo-1602526219044-3c0c3c7f6c92"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="shop-container">
        <h1>Shop Our Products 🌿</h1>

        {/* Category Filter */}
        <div className="category-filter">
          <button>All</button>
          <button>Juices</button>
          <button>Powders</button>
          <button>Teas</button>
          <button>Kits</button>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shop;
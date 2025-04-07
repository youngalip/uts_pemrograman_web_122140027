import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => (
  <div className="home-container">
    <div className="hero-section">
      <img
        src="hero-products.png"
        alt="Produk Hero"
        className="hero-image"
      />
      <div className="hero-text">
        <h1 className="home-title">Selamat Datang di youngKiddo Store 🛍️</h1>
        <p className="home-subtitle">
          Temukan produk terbaik untuk kebutuhan si kecil!
        </p>
        <Link to="/products" className="home-button">
          Jelajahi Produk
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;

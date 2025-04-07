import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/ProductDetailPage.css';
import { useCart } from "../context/CartContext"; // sudah benar

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Ambil fungsi dari context

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} className="detail-image" />
      <div className="detail-info">
        <h1 className="detail-title">{product.title}</h1>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <p className="detail-description">{product.description}</p>
        <button onClick={() => addToCart(product)} className="detail-add-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

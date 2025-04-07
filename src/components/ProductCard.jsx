import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onRemove, showRemoveButton = false }) => {
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } = useCart();
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantityInCart = cartItem?.quantity || 0;

  // quantity lokal jika belum ditambahkan ke cart
  const [localQuantity, setLocalQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, localQuantity); // localQuantity bisa 1, 2, 5, dll
  };  

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img src={product.image} alt={product.title} className="product-image" />
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </Link>

      <div className="quantity-controls">
        {showRemoveButton ? (
          <>
            <button onClick={() => decreaseQuantity(product.id)} disabled={quantityInCart <= 1}>-</button>
            <span>{quantityInCart}</span>
            <button onClick={() => increaseQuantity(product.id)}>+</button>
          </>
        ) : (
          <>
            <button onClick={() => setLocalQuantity((q) => Math.max(1, q - 1))} disabled={localQuantity <= 1}>-</button>
            <span>{localQuantity}</span>
            <button onClick={() => setLocalQuantity((q) => q + 1)}>+</button>
          </>
        )}
      </div>

      {showRemoveButton ? (
        <>
          <p className="product-subtotal">
            Subtotal: ${(product.price * quantityInCart).toFixed(2)}
          </p>
          <button className="remove-button" onClick={() => onRemove(product.id)}>
            Hapus
          </button>
        </>
      ) : (
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
  showRemoveButton: PropTypes.bool,
};

export default ProductCard;

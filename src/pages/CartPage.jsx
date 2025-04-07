import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Checkout berhasil! Terima kasih telah berbelanja 😊");
    clearCart();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="cart-page-title">Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">Cart is Empty.</p>
      ) : (
        <>
          <div className="product-list-container cart-container">
            {cartItems.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onRemove={removeFromCart}
                showRemoveButton
              />
            ))}
          </div>

          <div className="cart-summary">
            <div className="checkout-card">
              <p className="cart-total">Total: ${total.toFixed(2)}</p>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>

            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default CartPage;

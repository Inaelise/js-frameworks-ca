import { useCart } from "../hooks/useCart";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "../css/CheckoutPage.module.css";
import { Plus, Minus, Trash, X } from "lucide-react";
import ProductPrice from "./ProductPrice";

export default function Cart() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  function handleCheckout() {
    dispatch({ type: "clearCart" });

    navigate("/checkout-success");
  }

  return (
    <main className={styles.cartMain}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <div>
          <p className={styles.emptyCart}>Your cart is empty.</p>
          <NavLink className={styles.emptyLink} to="/">
            <p title="Go to products">Go to products</p>
          </NavLink>
        </div>
      ) : (
        <div>
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.image.url} alt={item.image.alt} />
                <p className={styles.itemTitle}>{item.title}</p>
                <div className={styles.btnsContainer}>
                  <button
                    className={styles.quantityBtn}
                    title="Decrease quantity"
                    onClick={() =>
                      dispatch({
                        type: "decreaseQuantity",
                        payload: { id: item.id },
                      })
                    }
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className={styles.quantityBtn}
                    title="Increase quantity"
                    onClick={() =>
                      dispatch({
                        type: "increaseQuantity",
                        payload: { id: item.id },
                      })
                    }
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
                <button
                  className={styles.removeBtn}
                  title="Remove from cart"
                  onClick={() =>
                    dispatch({
                      type: "removeFromCart",
                      payload: { id: item.id },
                    })
                  }
                >
                  <X size={16} strokeWidth={2.5} /> Remove
                </button>
                <div className={styles.itemPrice}>
                  <ProductPrice
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                  />
                </div>
              </li>
            ))}
          </ul>
          {cart.length > 0 && (
            <button
              className={styles.clearCartBtn}
              title="Clear cart"
              onClick={() => dispatch({ type: "clearCart" })}
            >
              <Trash size={16} strokeWidth={2.5} /> Clear cart
            </button>
          )}
          <h2>Total: {totalPrice.toFixed(2)} kr</h2>
          <div className={styles.bottomBtns}>
            <NavLink to="/">
              <button className={styles.continueBtn} title="Go to home">
                Continue shopping
              </button>
            </NavLink>
            <button
              className={styles.checkoutBtn}
              onClick={handleCheckout}
              title="Checkout cart"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

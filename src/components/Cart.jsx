import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

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
    <main>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.image.url} alt={item.image.alt} />
                <p>{item.title}</p>
                <p>{item.discountedPrice}</p>
                <button
                  onClick={() =>
                    dispatch({
                      type: "decreaseQuantity",
                      payload: { id: item.id },
                    })
                  }
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  onClick={() =>
                    dispatch({
                      type: "increaseQuantity",
                      payload: { id: item.id },
                    })
                  }
                >
                  +
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "removeFromCart",
                      payload: { id: item.id },
                    })
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {cart.length > 0 && (
            <button onClick={() => dispatch({ type: "clearCart" })}>
              Clear cart
            </button>
          )}
          <h2>Total: {totalPrice.toFixed(2)}</h2>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </main>
  );
}

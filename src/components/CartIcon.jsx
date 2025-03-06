import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import styles from "../css/Header.module.css";

export default function CartIcon() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <NavLink
      to="/checkout"
      title="Go to checkout page"
      className={({ isActive }) =>
        isActive ? `${styles.cartIcon} ${styles.active}` : styles.cartIcon
      }
    >
      <ShoppingCart size={24} />
      {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
    </NavLink>
  );
}

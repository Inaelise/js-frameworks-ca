import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function CartIcon() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/checkout">
      <ShoppingCart />
      {cartCount > 0 && <span>{cartCount}</span>}
    </Link>
  );
}

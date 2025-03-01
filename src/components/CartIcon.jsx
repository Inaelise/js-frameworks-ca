import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartIcon() {
  return (
    <Link to="/checkout">
      <ShoppingCart />
    </Link>
  );
}

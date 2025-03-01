import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function CartIcon() {
  return (
    <NavLink to="/checkout">
      <ShoppingCart />
    </NavLink>
  );
}

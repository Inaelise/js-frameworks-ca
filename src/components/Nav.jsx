import { NavLink } from "react-router-dom";
import styles from "../css/Header.module.css";
import CartIcon from "./CartIcon";

export default function Nav() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li title="Go to home page">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.listItem} ${styles.active}` : styles.listItem
            }
          >
            Home
          </NavLink>
        </li>
        <li title="Go to contact page">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${styles.listItem} ${styles.active}` : styles.listItem
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          <CartIcon />
        </li>
      </ul>
    </nav>
  );
}

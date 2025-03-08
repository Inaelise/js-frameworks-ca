import Nav from "./Nav";
import styles from "../css/Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img
          className={styles.logo}
          src="/images/variety-logo.png"
          alt="Variety logo"
          title="Go to home page"
        />
      </NavLink>
      <Nav />
    </header>
  );
}

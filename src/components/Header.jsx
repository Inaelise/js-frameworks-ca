import Nav from "./Nav";
import CartIcon from "./CartIcon";
import styles from "../css/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <img className="logo" src="/images/variety-logo.png" alt="Variety logo" />
      <Nav />
      <CartIcon />
    </header>
  );
}

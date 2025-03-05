import Nav from "./Nav";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <header>
      <img className="logo" src="/images/variety-logo.png" alt="Variety logo" />
      <Nav />
      <CartIcon />
    </header>
  );
}

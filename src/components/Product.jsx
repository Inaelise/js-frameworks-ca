import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice";

export default function Product(props) {
  return (
    <Link to={`/product/${props.id}`}>
      <img src={props.img.url} alt={props.img.alt} />
      <h2>{props.title}</h2>
      <ProductPrice
        price={props.price}
        discountedPrice={props.discountedPrice}
      />
    </Link>
  );
}

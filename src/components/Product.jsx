import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import StarRating from "./StarRating";
import { Star } from "lucide-react";

export default function Product(props) {
  return (
    <Link to={`/product/${props.id}`}>
      <img src={props.img.url} alt={props.img.alt} />
      <h2>{props.title}</h2>
      <ProductPrice
        price={props.price}
        discountedPrice={props.discountedPrice}
      />
      <StarRating rating={props.rating} />
    </Link>
  );
}

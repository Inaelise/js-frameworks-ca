import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import StarRating from "./StarRating";
import styles from "../css/Home.module.css";

export default function Product(props) {
  return (
    <Link
      to={`/product/${props.id}`}
      className={styles.product}
      title="View Product"
    >
      <img
        className={styles.productImg}
        src={props.img.url}
        alt={props.img.alt}
      />
      <div className={styles.productInfo}>
        <h2>{props.title}</h2>
        {!props.rating ? null : <StarRating rating={props.rating} />}
        <ProductPrice
          price={props.price}
          discountedPrice={props.discountedPrice}
        />
      </div>
    </Link>
  );
}

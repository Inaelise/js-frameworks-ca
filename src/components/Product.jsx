import { Link } from "react-router-dom";

export default function Product(props) {
  return (
    <div>
      <img src={props.img.url} alt={props.img.alt} />
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      <p>{props.price}</p>
      <Link to={`/product/${props.id}`}>
        <button>View</button>
      </Link>
    </div>
  );
}

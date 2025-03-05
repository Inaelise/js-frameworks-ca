import ProductPrice from "./ProductPrice";
import { useCart } from "../hooks/useCart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const apiUrl = `https://v2.api.noroff.dev/online-shop/${id}`;
    async function getProduct() {
      setIsLoading(true);
      setIsError(false);
      try {
        /* throw new Error("Simulated network error"); */
        const response = await fetch(apiUrl);
        const json = await response.json();
        setProduct(json.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (isError) {
    return (
      <div>
        <p>Something went wrong. Could not load data.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return <h2>Product not found.</h2>;
  }

  function showReviews(reviews) {
    if (!reviews || reviews.length === 0) {
      return <p>No reviews yet.</p>;
    }
    return (
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.username}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.description}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main>
      <section>
        <h1>{product.title}</h1>
        <img src={product.image.url} alt={product.image.alt} />
        <p>{product.description}</p>
        <ProductPrice
          price={product.price}
          discountedPrice={product.discountedPrice}
        />
        <button
          onClick={() =>
            dispatch({
              type: "addToCart",
              payload: {
                id: product.id,
                title: product.title,
                price: product.price,
                discountedPrice: product.discountedPrice,
                image: product.image,
              },
            })
          }
        >
          Add to cart
        </button>
      </section>
      <section>
        <h2>Reviews</h2>
        {showReviews(product.reviews)}
      </section>
    </main>
  );
}

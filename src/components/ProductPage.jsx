import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const apiUrl = `https://v2.api.noroff.dev/online-shop/${id}`;
    async function getProduct() {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setProduct(json.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
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
    <>
      <section>
        <h1>{product.title}</h1>
        <img src={product.image.url} alt={product.image.alt} />
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button>Add to cart</button>
      </section>
      <section>
        <h2>Reviews</h2>
        {showReviews(product.reviews)}
      </section>
    </>
  );
}

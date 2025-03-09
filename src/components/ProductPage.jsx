import ProductPrice from "./ProductPrice";
import StarRating from "./StarRating";
import { useCart } from "../hooks/useCart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../css/ProductPage.module.css";
import style from "../css/Spinner.module.css";
import { ShoppingCart, CircleAlert } from "lucide-react";

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
      <div className={styles.errorContainer}>
        <CircleAlert size={38} />
        <p>Something went wrong. Could not load data.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={style.spinnerContainer}>
        <div className={style.spinner}></div>
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
      <ul className={styles.reviewList}>
        {reviews.map((review) => (
          <li className={styles.review} key={review.id}>
            <hr className={styles.reviewLine} />
            <div className={styles.reviewHeader}>
              <p>{review.username}</p>
              <StarRating rating={review.rating} />
            </div>
            <p className={styles.reviewDescription}>{review.description}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <head>
        <meta
          name="description"
          content={`This is the ${product.title} product page. ${product.description}`}
        ></meta>
        <title>{product.title}</title>
      </head>
      <main>
        <section className={styles.productPage}>
          <h1>{product.title}</h1>
          <img
            className={styles.productPageImg}
            src={product.image.url}
            alt={product.image.alt}
          />
          <div className={styles.itemContainer}>
            <p className={styles.itemDescription}>{product.description}</p>
            <ProductPrice
              price={product.price}
              discountedPrice={product.discountedPrice}
            />
            <button
              className={styles.addToCartButton}
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
              <ShoppingCart
                size={20}
                strokeWidth={2.5}
                className={styles.buttonIcon}
              />
              Add to cart
            </button>
          </div>
        </section>
        <section className={styles.reviewContainer}>
          <h2>Reviews</h2>
          {showReviews(product.reviews)}
        </section>
      </main>
    </>
  );
}

import styles from "../css/Home.module.css";

export default function ProductPrice({ price, discountedPrice }) {
  const hadDiscount = price > discountedPrice;
  const amount = hadDiscount ? price - discountedPrice : 0;
  const percentage = hadDiscount ? ((amount / price) * 100).toFixed(0) : 0;

  return (
    <div className={styles.priceContainer}>
      {hadDiscount ? (
        <div>
          <p className={styles.price}>{discountedPrice} kr</p>
          <p className={styles.discount}>
            Original: {price} kr
            <span className={styles.percentage}>-{percentage}%</span>
          </p>
        </div>
      ) : (
        <p className={styles.price}>{price} kr</p>
      )}
    </div>
  );
}

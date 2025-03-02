export default function ProductPrice({ price, discountedPrice }) {
  const hadDiscount = price > discountedPrice;
  const amount = hadDiscount ? price - discountedPrice : 0;
  const percentage = hadDiscount ? ((amount / price) * 100).toFixed(0) : 0;

  return (
    <div>
      {hadDiscount ? (
        <div>
          <p>{discountedPrice} kr</p>
          <p>
            Original: {price} kr <span>-{percentage}%</span>
          </p>
        </div>
      ) : (
        <p>{price} kr</p>
      )}
    </div>
  );
}

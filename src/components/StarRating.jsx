export default function StarRating({ rating }) {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  const unfilledStars = totalStars - filledStars;

  return (
    <div>
      {Array(filledStars)
        .fill()
        .map((item, index) => (
          <img
            key={`filled-${index}`}
            className="star-icon"
            src="/images/star-filled.png"
            alt="Star icon"
          />
        ))}
      {Array(unfilledStars)
        .fill()
        .map((item, index) => (
          <img
            key={`unfilled-${index}`}
            className="star-icon"
            src="/images/star-unfilled.png"
            alt="Star icon"
          />
        ))}
    </div>
  );
}

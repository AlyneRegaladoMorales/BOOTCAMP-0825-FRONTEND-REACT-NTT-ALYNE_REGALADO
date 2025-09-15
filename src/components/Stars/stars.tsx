import { StarsContent } from "./stars.styled";

interface StarsProps {
  rating: number;
}

const Stars = ({ rating }: StarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <StarsContent>
      {"★".repeat(fullStars)}
      {hasHalfStar && "☆"}
      {"☆".repeat(emptyStars)} ({rating})
    </StarsContent>
  );
};

export default Stars


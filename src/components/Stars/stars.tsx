import { StarsContent } from "./stars.styled";

interface StarsProps {
  rating: number;
}

const Stars = ({ rating }: StarsProps) => {

  const MAX_STARS = 5;
  const NO_HALF_STAR = 0;
  const DECIMAL_BASE = 1;   
  const HALF_STAR_VALUE = 1;
  const HALF_STAR_THRESHOLD = 0.5; 

  const FULL_STAR = "★";
  const HALF_STAR = "☆"; 

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating %  DECIMAL_BASE >= HALF_STAR_THRESHOLD;
  const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? HALF_STAR_VALUE : NO_HALF_STAR);

  return (
    <StarsContent>
      {FULL_STAR.repeat(fullStars)}
      {hasHalfStar && HALF_STAR}
      {HALF_STAR.repeat(emptyStars)} ({rating})
    </StarsContent>
  );
};

export default Stars


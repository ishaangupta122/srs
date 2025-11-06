import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRatingProps } from "@/types/types";

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = 24,
}) => {
  const getColor = (index: number) => {
    if (index < rating) {
      if (rating >= 4) return "text-green-500";
      if (rating === 3) return "text-yellow-500";
      return "text-red-500";
    }
    return "text-muted-foreground";
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          size={size}
          className={cn(getColor(index))}
          fill={index < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

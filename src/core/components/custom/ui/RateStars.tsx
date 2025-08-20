import { cn } from '@/core/utils';
import { Star, StarHalf } from 'lucide-react';

/**
 * A star rating component that displays full, half, or empty stars based on the rating.
 *
 * @param props - The component props.
 * @param props.rateNumber - The rating value (0 to 5, can be decimal).
 * @param props.className - Additional CSS classes for styling stars (optional).
 * @returns A star rating component with 5 stars.
 *
 * @example
 * ```tsx
 * <RateStar rateNumber={3.5} className="text-lg" />
 * ```
 */
const RateStar = ({ rateNumber, className }: { rateNumber: number; className?: string }) => {
  // Determine the star type (full, half, or empty) based on the rating
  const getStarIcon = (index: number) => {
    const starValue = index + 1;

    if (rateNumber >= starValue) {
      return <Star color="#FBBF24" className={cn('size-7 fill-yellow-500', className)} />;
    }

    if (rateNumber >= starValue - 0.5 && rateNumber < starValue) {
      return <StarHalf color="#FBBF24" className={cn('size-7 fill-yellow-500', className)} />;
    }

    return <Star color="#FBBF24" className={cn('size-7 fill-gray-300', className)} />;
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>{getStarIcon(index)}</span>
      ))}
    </div>
  );
};

export default RateStar;

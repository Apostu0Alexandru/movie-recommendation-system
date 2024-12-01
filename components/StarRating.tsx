import { useState } from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
  initialRating?: number
  onRate: (rating: number) => void
}

export function StarRating({ initialRating = 0, onRate }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className="p-1"
          onClick={() => {
            setRating(star)
            onRate(star)
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className={`h-6 w-6 ${
              star <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}


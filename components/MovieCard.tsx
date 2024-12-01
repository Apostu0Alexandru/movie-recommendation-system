import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { StarRating } from './StarRating'
import type { MovieCardProps } from '@/lib/types'

export function MovieCard({ movie, onRate, userRating, onWatchLater, isInWatchLater }: MovieCardProps) {
  const handleRate = (rating: number) => {
    onRate(movie.id, rating);
  };

  return (
    <Card className="h-full flex flex-col">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-t-lg"
          />
        </div>
      </Link>
      <CardContent className="flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{movie.year} | {movie.genre.join(', ')}</p>
        <p className="text-sm mb-2">Director: {movie.director}</p>
        <p className="text-sm line-clamp-3">{movie.plot}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <StarRating 
          initialRating={userRating || 0} 
          onRate={handleRate}
        />
        <span className="text-sm font-semibold">Rating: {movie.rating.toFixed(1)}</span>
      </CardFooter>
    </Card>
  )
}


'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { getMovie, Movie } from '@/lib/api'
import { StarRating } from '@/components/StarRating'
import { Button } from '@/components/ui/button'

export default function MoviePage() {
  const params = useParams()
  const movieId = Number(params.id)

  const { data: movie, isLoading } = useQuery<Movie | undefined>({
    queryKey: ['movie', movieId],
    queryFn: () => getMovie(movieId),
  })

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!movie) {
    return <div className="container mx-auto px-4 py-8">Movie not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            width={300}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-xl mb-4">{movie.year} | {movie.genre.join(', ')}</p>
          <p className="mb-4"><span className="font-semibold">Director:</span> {movie.director}</p>
          <p className="mb-4"><span className="font-semibold">Rating:</span> {movie.rating.toFixed(1)}</p>
          <p className="mb-6">{movie.plot}</p>
          <div className="flex items-center gap-4">
            <StarRating initialRating={0} onRate={(rating) => console.log(`Rated ${rating}`)} />
            <Button>Add to Watchlist</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


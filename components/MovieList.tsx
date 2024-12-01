import { MovieCard } from './MovieCard';
import type { Movie, MovieListProps } from '@/lib/types';

export function MovieList({ movies, onRate, userRatings }: MovieListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard 
              key={movie.id}
              movie={movie}
              onRate={onRate}
              userRating={userRatings[movie.id]} onWatchLater={function (id: number): void {
                  throw new Error('Function not implemented.');
              } } isInWatchLater={false}        />
      ))}
    </div>
  );
}


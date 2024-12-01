import { MovieCard } from './MovieCard';
import type {  MovieListProps } from '@/lib/types';

export function MovieList({ movies, onRate, userRatings, onWatchLater, watchLaterList }: MovieListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onRate={onRate} 
          onWatchLater={onWatchLater}
          userRating={userRatings[movie.id]}
          isInWatchLater={watchLaterList.includes(movie.id)}
        />
      ))}
    </div>
  );
}


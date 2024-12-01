export interface Movie {
    id: number;
    title: string;
    year: number;
    genre: string[];
    rating: number;
    director: string;
    plot: string;
    posterUrl: string;
  }
  
  export interface MovieCardProps {
    movie: Movie;
    onRate: (id: number, rating: number) => void;
    onWatchLater: (id: number) => void;
    userRating?: number;
    isInWatchLater: boolean;
  }
  
  export interface MovieListProps {
    movies: Movie[];
    onRate: (id: number, rating: number) => void;
    onWatchLater: (id: number) => void;
    userRatings: { [key: number]: number };
    watchLaterList: number[];
  }
  
  export interface SearchResults {
    movies: Movie[];
    totalPages: number;
  }
  
  export type SortOption = 'title' | 'year' | 'rating';
  
  
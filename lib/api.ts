import { Movie, SearchResults, SortOption } from "./types";


// Mock movie data
const movies: Movie[] = [
 { 
   id: 1, 
   title: "Inception", 
   year: 2010, 
   genre: ["Sci-Fi", "Action"], 
   rating: 8.8,
   director: "Christopher Nolan",
   plot: "A thief who enters the dreams of others to steal secrets from their subconscious.",
   posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
 },
 { 
   id: 2, 
   title: "The Shawshank Redemption", 
   year: 1994, 
   genre: ["Drama"], 
   rating: 9.3,
   director: "Frank Darabont",
   plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
   posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
 },
 { 
   id: 3, 
   title: "The Dark Knight", 
   year: 2008, 
   genre: ["Action", "Crime", "Drama"], 
   rating: 9.0,
   director: "Christopher Nolan",
   plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
   posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
 },
 { 
   id: 4, 
   title: "Pulp Fiction", 
   year: 1994, 
   genre: ["Crime", "Drama"], 
   rating: 8.9,
   director: "Quentin Tarantino",
   plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
   posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
 },
 { 
   id: 5, 
   title: "Forrest Gump", 
   year: 1994, 
   genre: ["Drama", "Romance"], 
   rating: 8.8,
   director: "Robert Zemeckis",
   plot: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
   posterUrl: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg"
 },
 { 
   id: 6, 
   title: "The Matrix", 
   year: 1999, 
   genre: ["Sci-Fi", "Action"], 
   rating: 8.7, 
   director: "Lana Wachowski",
   plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against intelligent machines.",
   posterUrl: "https://image.tmdb.org/t/p/w500/f89U4AdwrVIjBbC3GXV6movJj21.jpg"
 },
 { 
   id: 7, 
   title: "Goodfellas", 
   year: 1990, 
   genre: ["Crime", "Drama"], 
   rating: 8.7, 
   director: "Martin Scorsese",
   plot: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
   posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg"
 },
 { 
   id: 8, 
   title: "The Silence of the Lambs", 
   year: 1991, 
   genre: ["Crime", "Drama", "Thriller"], 
   rating: 8.6, 
   director: "Jonathan Demme",
   plot: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
   posterUrl: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg"
 },
 { 
   id: 9, 
   title: "Interstellar", 
   year: 2014, 
   genre: ["Sci-Fi", "Drama", "Adventure"], 
   rating: 8.6, 
   director: "Christopher Nolan",
   plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
   posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
 },
 { 
   id: 10, 
   title: "The Lord of the Rings: The Fellowship of the Ring", 
   year: 2001, 
   genre: ["Adventure", "Drama", "Fantasy"], 
   rating: 8.8, 
   director: "Peter Jackson",
   plot: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
   posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"
 },
 {
   id: 11,
   title: "The Godfather",
   year: 1972,
   genre: ["Crime", "Drama"],
   rating: 9.2,
   director: "Francis Ford Coppola",
   plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
   posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
 },
 {
   id: 12,
   title: "Schindler's List",
   year: 1993,
   genre: ["Biography", "Drama", "History"],
   rating: 8.9,
   director: "Steven Spielberg",
   plot: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
   posterUrl: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"
 },
 {
   id: 13,
   title: "Fight Club",
   year: 1999,
   genre: ["Drama"],
   rating: 8.8,
   director: "David Fincher",
   plot: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
   posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
 },
 {
   id: 14,
   title: "Spirited Away",
   year: 2001,
   genre: ["Animation", "Adventure", "Family"],
   rating: 8.6,
   director: "Hayao Miyazaki",
   plot: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
   posterUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"
 },
 {
   id: 15,
   title: "The Departed",
   year: 2006,
   genre: ["Crime", "Drama", "Thriller"],
   rating: 8.5,
   director: "Martin Scorsese",
   plot: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
   posterUrl: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg"
 }
];

// Mock user ratings
// Define the type for user ratings
type UserRatings = {
  [userId: string]: {
    [movieId: number]: number;
  };
};

// Initialize with proper typing
const userRatings: UserRatings = {};



export const getAllGenres = (): string[] => {
 const genreSet = new Set<string>();
 movies.forEach(movie => movie.genre.forEach(genre => genreSet.add(genre)));
 return Array.from(genreSet).sort();
};

export const searchMovies = (
  query: string,
  page: number = 1,
  pageSize: number = 5,
  genres: string[] = [],
  sortOption: SortOption = 'rating'
): SearchResults => {
  const filteredMovies = movies.filter(movie => 
    (movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))) &&
    (genres.length === 0 || genres.some(g => movie.genre.includes(g)))
  );
  
  // Sort movies based on the sortOption
  filteredMovies.sort((a, b) => {
    switch (sortOption) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'year':
        return b.year - a.year;
      case 'rating':
      default:
        return b.rating - a.rating;
    }
  });

  const totalPages = Math.ceil(filteredMovies.length / pageSize);
  const paginatedMovies = filteredMovies.slice((page - 1) * pageSize, page * pageSize);
  
  return { movies: paginatedMovies, totalPages };
};

export const getMovie = (id: number): Movie | undefined => {
 return movies.find(movie => movie.id === id);
};

export const rateMovie = (id: number, rating: number, userId: string): void => {
  if (!userRatings[userId]) {
    userRatings[userId] = {};
  }
  userRatings[userId][id] = rating;
  
  // Update the userMovieRatings for the ML model
  if (!userMovieRatings[userId]) {
    userMovieRatings[userId] = {};
  }
  userMovieRatings[userId][id] = rating;
};

// Initialize watchLater with proper typing
const watchLater: { [userId: string]: Set<number> } = {};

// Simulated user-movie rating matrix
const userMovieRatings: { [userId: string]: { [movieId: number]: number } } = {
    "1": { 1: 4, 3: 5, 6: 3, 8: 4 },
    "2": { 2: 5, 4: 4, 7: 3, 9: 5 },
    "3": { 1: 3, 5: 4, 10: 5, 12: 4 },
    "4": { 3: 4, 6: 5, 8: 3, 11: 4 },
    "5": { 2: 4, 7: 5, 9: 3, 13: 4 },
  };
  
  // Matrix factorization for collaborative filtering
  function matrixFactorization(
    R: number[][], 
    K: number, 
    steps: number = 5000, 
    alpha: number = 0.0002, 
    beta: number = 0.02
  ): [number[][], number[][]] {
    const N = R.length;
    const M = R[0].length;
    
    let P: number[][] = Array.from({ length: N }, () => Array(K).fill(0).map(() => Math.random()));
    let Q: number[][] = Array.from({ length: M }, () => Array(K).fill(0).map(() => Math.random()));
    Q = transpose(Q);
  
    for (let step = 0; step < steps; step++) {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (R[i][j] > 0) {
            let eij = R[i][j] - dotProduct(P[i], Q[j]);
            for (let k = 0; k < K; k++) {
              P[i][k] += alpha * (2 * eij * Q[j][k] - beta * P[i][k]);
              Q[j][k] += alpha * (2 * eij * P[i][k] - beta * Q[j][k]);
            }
          }
        }
      }
      
      let e = 0;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (R[i][j] > 0) {
            e += Math.pow(R[i][j] - dotProduct(P[i], Q[j]), 2);
            for (let k = 0; k < K; k++) {
              e += (beta/2) * (Math.pow(P[i][k], 2) + Math.pow(Q[j][k], 2));
            }
          }
        }
      }
      if (e < 0.001) break;
    }
  
    return [P, transpose(Q)];
  }
  
  function transpose(matrix: number[][]): number[][] {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  }
  
  function dotProduct(a: number[], b: number[]): number {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
  }
  
  // Function to get movie recommendations using the ML model
  function getMLRecommendations(userId: string): SearchResults {
    const userIndex = Object.keys(userMovieRatings).indexOf(userId);
    if (userIndex === -1) {
      return { movies: [], totalPages: 0 };
    }
  
    const R: number[][] = Object.keys(userMovieRatings).map(uid => 
      movies.map(movie => userMovieRatings[uid][movie.id] || 0)
    );
  
    const K = 2; // Number of latent features
    const [P, Q] = matrixFactorization(R, K);
  
    const userVector = P[userIndex];
    const recommendedMovies = movies.map((movie, i) => ({
      ...movie,
      score: dotProduct(userVector, Q[i])
    }))
    .sort((a, b) => b.score - a.score)
    .filter(movie => !userMovieRatings[userId][movie.id]); // Exclude already rated movies
  
    return { movies: recommendedMovies, totalPages: 1 };
  }
  
  // Update the existing getRecommendations function to use the ML model
  export const getRecommendations = (
    page: number = 1, 
    pageSize: number = 5, 
    selectedGenres: string[] = [], 
    userId: string | null = null, 
    sortOption: SortOption = 'rating'
  ): SearchResults => {
    let recommendedMovies: Movie[] = [];
  
    if (!userId || !userRatings[userId] || Object.keys(userRatings[userId]).length === 0) {
      // For non-authenticated users or users without ratings, return top-rated movies
      recommendedMovies = [...movies];
    } else {
      // Use ML recommendations if the user has ratings
      const mlRecommendations = getMLRecommendations(userId);
      recommendedMovies = mlRecommendations.movies;
    }
    
    if (selectedGenres.length > 0) {
      recommendedMovies = recommendedMovies.filter(movie => 
        movie.genre.some(g => selectedGenres.includes(g))
      );
    }
  
    // Sort movies based on the sortOption
    recommendedMovies.sort((a, b) => {
      switch (sortOption) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return b.year - a.year;
        case 'rating':
        default:
          return b.rating - a.rating;
      }
    });
  
    const totalPages = Math.ceil(recommendedMovies.length / pageSize);
    const paginatedMovies = recommendedMovies.slice((page - 1) * pageSize, page * pageSize);
    return { movies: paginatedMovies, totalPages };
  };
  
export const getUserRatings = (userId: string): { [key: number]: number } => {
  return userRatings[userId] || {};
};

export const addToWatchLater = (movieId: number, userId: string): void => {
  if (!watchLater[userId]) {
    watchLater[userId] = new Set<number>();
  }
  watchLater[userId].add(movieId);
};

export const removeFromWatchLater = (movieId: number, userId: string): void => {
  if (watchLater[userId]) {
    watchLater[userId].delete(movieId);
  }
};

export const getWatchLaterList = (userId: string): number[] => {
  return Array.from(watchLater[userId] || []);
};

export const isInWatchLater = (movieId: number, userId: string): boolean => {
  return watchLater[userId]?.has(movieId) || false;
};

export const getRelatedMovies = (movieId: number, limit: number = 5): Movie[] => {
  const movie = getMovie(movieId);
  if (!movie) return [];

  return movies
    .filter(m => m.id !== movieId && m.genre.some(g => movie.genre.includes(g)))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export type {Movie}
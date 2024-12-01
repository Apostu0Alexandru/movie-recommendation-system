'use client'

import { useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useUser } from '@clerk/nextjs';
import { SearchBar } from '../components/SearchBar';
import { MovieList } from '../components/MovieList';
import { GenreFilter } from '../components/GenreFilter';
import { Pagination } from '../components/Pagination';
import { SortSelect } from '../components/SortSelect';
import { searchMovies, rateMovie, getRecommendations, getUserRatings, Movie, addToWatchLater, removeFromWatchLater, getWatchLaterList } from '@/lib/api';
import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { SortOption } from '@/lib/types';

interface SearchResults {
  movies: Movie[];
  totalPages: number;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendationsPage, setRecommendationsPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const { isSignedIn, user } = useUser();

  const userId = isSignedIn ? user.id : null;

  const { 
    data: searchResults, 
    isLoading: isSearchLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['searchMovies', searchQuery, selectedGenres, sortOption],
    queryFn: async ({ pageParam = 1 }) => {
      return searchMovies(searchQuery, pageParam, 10, selectedGenres, sortOption);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => 
      lastPage.totalPages > allPages.length ? allPages.length + 1 : undefined,
    enabled: !!searchQuery
  });

  const { data: userRatings } = useQuery({
    queryKey: ['userRatings', userId],
    queryFn: () => getUserRatings(userId || ''),
    enabled: isSignedIn
  });

  const { 
    data: recommendations, 
    isLoading: isRecommendationsLoading,
    refetch: refetchRecommendations 
  } = useQuery({
    queryKey: ['getRecommendations', selectedGenres, recommendationsPage, sortOption, userId],
    queryFn: () => getRecommendations(recommendationsPage, 10, selectedGenres, userId, sortOption),
    enabled: true // Always enabled for both logged-in and non-logged-in users
  });

  const { data: watchLaterList } = useQuery({
    queryKey: ['watchLaterList', userId],
    queryFn: () => getWatchLaterList(userId || ''),
    enabled: isSignedIn
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleGenreFilter = useCallback((genres: string[]) => {
    setSelectedGenres(genres);
    setRecommendationsPage(1);
    queryClient.invalidateQueries({ queryKey: ['getRecommendations'] });
  }, [queryClient]);

  const handleSort = useCallback((option: SortOption) => {
    setSortOption(option);
    queryClient.invalidateQueries({ queryKey: ['searchMovies'] });
    queryClient.invalidateQueries({ queryKey: ['getRecommendations'] });
  }, [queryClient]);

  const handleRate = useCallback((id: number, rating: number) => {
    if (isSignedIn && userId) {
      rateMovie(id, rating, userId);
      queryClient.invalidateQueries({ queryKey: ['userRatings'] });
      queryClient.invalidateQueries({ queryKey: ['getRecommendations'] });
      refetchRecommendations();
    }
  }, [queryClient, refetchRecommendations, isSignedIn, userId]);

  const handleWatchLater = useCallback((id: number) => {
    if (isSignedIn && userId) {
      if (watchLaterList?.includes(id)) {
        removeFromWatchLater(id, userId);
      } else {
        addToWatchLater(id, userId);
      }
      queryClient.invalidateQueries({ queryKey: ['watchLaterList'] });
    }
  }, [queryClient, watchLaterList, isSignedIn, userId]);

  const allMovies = searchResults?.pages.flatMap(page => page.movies) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Movie Recommendation System</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <GenreFilter onFilterChange={handleGenreFilter} />
        </div>
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <SearchBar onSearch={handleSearch} />
            <SortSelect onSort={handleSort} />
          </div>
          {isSearchLoading ? (
            <div className="mt-8">Loading search results...</div>
          ) : allMovies && allMovies.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
              <MovieList 
                movies={allMovies} 
                onRate={handleRate} 
                onWatchLater={handleWatchLater}
                userRatings={userRatings || {}} 
                watchLaterList={watchLaterList || []}
              />
              {isFetchingNextPage && <div className="mt-4">Loading more...</div>}
              <div ref={ref} className="h-10" />
            </div>
          ) : searchQuery ? (
            <div className="mt-8">No results found</div>
          ) : null}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isSignedIn
                ? (selectedGenres.length > 0 ? `Recommended ${selectedGenres.join(', ')} Movies` : 'Personalized Recommendations')
                : (selectedGenres.length > 0 ? `Top ${selectedGenres.join(', ')} Movies` : 'Top Rated Movies')}
            </h2>
            {isRecommendationsLoading ? (
              <div>Loading recommendations...</div>
            ) : recommendations?.movies.length ? (
              <>
                <MovieList 
                  movies={recommendations.movies} 
                  onRate={handleRate} 
                  onWatchLater={handleWatchLater}
                  userRatings={userRatings || {}} 
                  watchLaterList={watchLaterList || []}
                />
                <Pagination
                  currentPage={recommendationsPage}
                  totalPages={recommendations.totalPages}
                  onPageChange={setRecommendationsPage}
                />
              </>
            ) : (
              <div>No recommendations available. Try selecting different genres or rating some movies!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


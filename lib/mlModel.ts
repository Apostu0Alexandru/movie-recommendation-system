import { HfInference } from '@huggingface/inference';
import { Movie } from './types';

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY);

async function getEmbedding(text: string): Promise<number[]> {
  try {
    const result = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: text,
    });
    
    // Handle different possible return types from the API
    if (Array.isArray(result)) {
      if (result.every(item => typeof item === 'number')) {
        return result as number[];
      }
      if (Array.isArray(result[0]) && result[0].every(item => typeof item === 'number')) {
        return result[0] as number[];
      }
    }
    throw new Error('Unexpected embedding format');
  } catch (error) {
    console.error('Error getting embedding:', error);
    return new Array(384).fill(0); // Return zero vector as fallback
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  try {
    const dotProduct = a.reduce((sum, val, i) => sum + (val * (b[i] || 0)), 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + (val * val), 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + (val * val), 0));
    return dotProduct / (magnitudeA * magnitudeB || 1);
  } catch (error) {
    console.error('Error calculating similarity:', error);
    return 0;
  }
}

export async function getMovieEmbedding(movie: Movie): Promise<number[]> {
  const text = `${movie.title} ${movie.plot} ${movie.genre.join(' ')}`;
  return getEmbedding(text);
}

export async function getRecommendations(
  userId: string,
  userRatings: { [movieId: number]: number },
  movies: Movie[]
): Promise<Array<{ movie: Movie; score: number }>> {
  try {
    const ratedMovies = movies.filter(movie => userRatings[movie.id]);
    
    if (ratedMovies.length === 0) {
      return movies.map(movie => ({ movie, score: movie.rating }));
    }

    const ratedMovieEmbeddings = await Promise.all(
      ratedMovies.map(async movie => ({
        embedding: await getMovieEmbedding(movie),
        rating: userRatings[movie.id]
      }))
    );

    const recommendations = await Promise.all(
      movies
        .filter(movie => !userRatings[movie.id])
        .map(async movie => {
          const movieEmbedding = await getMovieEmbedding(movie);
          const weightedSimilarities = ratedMovieEmbeddings.map(({ embedding, rating }) => 
            cosineSimilarity(movieEmbedding, embedding) * rating
          );
          const score = weightedSimilarities.reduce((a, b) => a + b, 0) / 
            ratedMovieEmbeddings.reduce((sum, { rating }) => sum + rating, 0);

          return { movie, score };
        })
    );

    return recommendations.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return movies.map(movie => ({ movie, score: movie.rating }));
  }
}

export async function generateMovieDescription(movie: Movie): Promise<string> {
  try {
    const prompt = `Generate a short, engaging description for the movie "${movie.title}". 
    Genre: ${movie.genre.join(', ')}
    Original plot: ${movie.plot}
    
    New description:`;

    const result = await hf.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        top_p: 0.9,
      },
    });

    return result.generated_text.trim();
  } catch (error) {
    console.error('Error generating description:', error);
    return movie.plot;
  }
}


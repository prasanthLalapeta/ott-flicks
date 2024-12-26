export interface MovieDetails {
  Title: string;
  Year: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  Poster: string;
}

export const fetchMovieDetails = async (title: string): Promise<MovieDetails | null> => {
  // Ensure the API key is defined
  console.log('VITE_OMDB_API_KEY:', import.meta.env.VITE_OMDB_API_KEY);
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  if (!apiKey) {
    console.error('Error: VITE_OMDB_API_KEY is not defined.');
    return null;
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'True') {
      return data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
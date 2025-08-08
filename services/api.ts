export const TmdbConfig = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || "https://api.themoviedb.org/3",
  apiKey: process.env.EXPO_PUBLIC_API_KEY || "",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY || ""}`,
  }
};


export async function fetchMovies({ query }: { query?: string } = {}) {
  const url = 
    query && query.length > 0
      ? `${TmdbConfig.baseUrl}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
      : `${TmdbConfig.baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      
  const response = await fetch(url, {
    method: 'GET',
    headers: TmdbConfig.headers,
  });
  if (!response.ok) {
    throw new Error(`Error fetching movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results as Movie[] || [];
}


export async function fetchMovieDetails(movieId: string) : Promise<MovieDetails> {
  try {
    const response = await fetch(`${TmdbConfig.baseUrl}/movie/${movieId}?api_key=${TmdbConfig.apiKey}`, {
      method: 'GET',
      headers: TmdbConfig.headers,
    });

    if (!response.ok) {
      console.log(`Error fetching movie details: ${response.statusText}`);
      throw new Error(`Error fetching movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data as MovieDetails;
  }
  catch (error) {
    console.log(error);
    throw new Error(`Error fetching movie details: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
} 
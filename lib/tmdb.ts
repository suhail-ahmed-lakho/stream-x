// TMDB API configuration
const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c" // This is a public TMDB API key for demo purposes
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export interface MovieResult {
  id: number
  title: string
  backdrop_path: string | null
  poster_path: string | null
  overview: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  original_language: string
  popularity: number
  video: boolean
  adult: boolean
  vote_count: number
}

export interface TMDBResponse {
  page: number
  results: MovieResult[]
  total_pages: number
  total_results: number
}

export interface MovieDetails extends MovieResult {
  status: string
  budget: number
  revenue: number
  runtime: number
  genres: Array<{ id: number; name: string }>
  production_companies: Array<{ id: number; name: string; logo_path: string | null }>
  videos?: {
    results: Array<{
      id: string
      key: string
      name: string
      site: string
      type: string
    }>
  }
  credits?: {
    cast: Array<{
      id: number
      name: string
      character: string
      profile_path: string | null
    }>
    crew: Array<{
      id: number
      name: string
      job: string
      profile_path: string | null
    }>
  }
}

// Helper function to get image URL
export const getImageUrl = (path: string | null, size = "original") => {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

// Helper function to fetch from TMDB
async function fetchFromTMDB(endpoint: string, params = {}) {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...params
  })

  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`)

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  return response.json()
}

// Get trending movies
export const fetchTrending = async (timeWindow = "day"): Promise<TMDBResponse> => {
  return fetchFromTMDB(`/trending/movie/${timeWindow}`)
}

// Get popular movies
export const fetchPopularMovies = async (): Promise<TMDBResponse> => {
  return fetchFromTMDB("/movie/popular")
}

// Get top rated movies
export const fetchTopRatedMovies = async (): Promise<TMDBResponse> => {
  return fetchFromTMDB("/movie/top_rated")
}

// Get movies by category/genre
export const fetchMoviesByCategory = async (category: string): Promise<TMDBResponse> => {
  const genreMap: Record<string, number> = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    scifi: 878,
    thriller: 53,
    war: 10752,
    western: 37,
  }

  const genreId = genreMap[category.toLowerCase()] || 28 // Default to action if not found
  return fetchFromTMDB("/discover/movie", { with_genres: genreId })
}

// Get movie details
export const fetchMovieDetails = async (movieId: string | number): Promise<MovieDetails> => {
  return fetchFromTMDB(`/movie/${movieId}`, { append_to_response: "videos,credits" })
}

// Search movies
export const searchMovies = async (query: string): Promise<TMDBResponse> => {
  return fetchFromTMDB("/search/movie", { query: encodeURIComponent(query) })
}

// Get similar movies
export const fetchSimilarMovies = async (movieId: string | number): Promise<TMDBResponse> => {
  return fetchFromTMDB(`/movie/${movieId}/similar`)
}

// Get movie videos
export const fetchMovieVideos = async (movieId: number) => {
  return fetchFromTMDB(`/movie/${movieId}/videos`)
}


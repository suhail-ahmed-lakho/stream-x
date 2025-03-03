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

// Helper function to get image URL
export const getImageUrl = (path: string | null, size = "original") => {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

// Get trending movies
export const fetchTrending = async (): Promise<TMDBResponse> => {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`)

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies")
  }

  return response.json()
}

// Get movies by category/genre
export const fetchMoviesByCategory = async (category: string): Promise<TMDBResponse> => {
  // Map category names to genre IDs
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

  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} movies`)
  }

  return response.json()
}

// Get movie details
export const fetchMovieDetails = async (movieId: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch movie details")
  }

  return response.json()
}

// Search movies
export const searchMovies = async (query: string): Promise<TMDBResponse> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`,
  )

  if (!response.ok) {
    throw new Error("Failed to search movies")
  }

  return response.json()
}

// Get movie videos (trailers, teasers, etc.)
export const fetchMovieVideos = async (movieId: number) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)

  if (!response.ok) {
    throw new Error("Failed to fetch movie videos")
  }

  return response.json()
}


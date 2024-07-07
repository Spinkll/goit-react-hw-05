import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGRhOWUxODM2Zjk2YWE4MGVkMDIxOWUyN2RiNmUyNCIsIm5iZiI6MTcyMDM0MTc0MS40ODkyNTcsInN1YiI6IjY2OGE1MWRlYzIxYjM0NDg0YTNmZDIyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iN4gpWibhAa7TsZ65jRlP-FAhmkD-dbjDLmZD3GtVJM";

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get("trending/movie/day?language=en-US");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchMoviesByName = async (name) => {
  try {
    const response = await axios.get("search/movie", {
      params: {
        query: name,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by name:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movie_id) => {
  try {
    const response = await axios.get(`movie/${movie_id}`, {
      params: {
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieCredits = async (movie_id) => {
  try {
    const response = await axios.get(`movie/${movie_id}/credits`, {
      params: {
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const fetchMovieReviews = async (movie_id) => {
  try {
    const response = await axios.get(`movie/${movie_id}/reviews`, {
      params: {
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

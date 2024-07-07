import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchMoviesByName } from "../../movies-api";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      searchMovies(searchQuery);
    }
  }, [location.search]);

  const searchMovies = async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchMoviesByName(searchQuery);
      setMovies(data.results);
    } catch (error) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/movies?query=${query}`);
      searchMovies(query);
    }
  };

  return (
    <div className={styles.moviesPage}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: `/movies?query=${query}` }}
            >
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;

import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fetchMovieDetails } from "../../movies-api";
import styles from "./MoviedetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.movieDetails}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go back
      </button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <nav className={styles.subNav}>
            <ul>
              <li>
                <Link to={`cast`} state={{ from: location.state?.from }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to={`reviews`} state={{ from: location.state?.from }}>
                  Reviews
                </Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;

import React from "react";
import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

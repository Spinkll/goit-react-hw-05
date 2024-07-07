import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../movies-api";
import styles from "./Moviereviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieReviews = async () => {
      try {
        const { results: reviewsData } = await fetchMovieReviews(movieId);
        if (Array.isArray(reviewsData)) {
          setReviews(reviewsData);
        } else {
          throw new Error("Failed to load reviews data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovieReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.reviewsContainer}>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
};

export default MovieReviews;

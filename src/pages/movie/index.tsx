import React from "react";
import { useMovie } from "./useMovie";
import { Rating } from "../../api/types";
import { Loader } from "../../components/loader";
import { NavBar } from "../../components/navbar";
import { LinkWithQuery } from "../../components/linkWithQuery";
import { ErrorMessage } from "../../components/errorMessage";

interface Caption {
  title: string;
  value?: string;
}

const MovieRating: React.FC<Rating> = ({ Value, Source }) => (
  <div className="rating-item">
    <span>{Source}</span>
    <span>{Value}</span>
  </div>
);

const Caption: React.FC<Caption> = ({ title, value }) => (
  <div className="caption">
    <span className="title">{title}</span>
    <span className="value">{value}</span>
  </div>
);

const Movie: React.FC = () => {
  const { movie, error, loading } = useMovie();

  return (
    <>
      <NavBar hasBackButton />
      {loading ? (
        <Loader />
      ) : error ? (
        <div style={{ margin: "0 16px" }}>
          <ErrorMessage message={error} />
        </div>
      ) : (
        <div className="app-container">
          <img src={movie?.Poster} alt={movie?.Title} className="poster" />
          <h2 className="movie-title">{movie?.Title}</h2>
          <div className="plot">{movie?.Plot}</div>
          <Caption title="Genre" value={movie?.Genre} />
          <Caption title="Director" value={movie?.Director} />

          <div className="rating">
            <h4 className="rating-title">Ratings</h4>
            {movie?.Ratings?.map((rating: Rating) => (
              <MovieRating key={rating.Source} {...rating} />
            ))}
          </div>

          <LinkWithQuery
            style={{ width: "unset" }}
            className="button"
            to="/movies"
          >
            Back to Homepage
          </LinkWithQuery>
        </div>
      )}
    </>
  );
};

export default Movie;

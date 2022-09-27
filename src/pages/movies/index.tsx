import React from "react";
import Pagination from "rc-pagination";

import "./styles.scss";
import { useMovies } from "./useMovies";
import { NavBar } from "../../components/navbar";
import { Loader } from "../../components/loader";
import { MoviesPosterResponse } from "../../api/types";
import { ErrorMessage } from "../../components/errorMessage";
import { LinkWithQuery } from "../../components/linkWithQuery";

interface MoviesListProps {
  error: string;
  loading: boolean;
  movies?: MoviesPosterResponse["Search"];
}

const MoviesList: React.FC<MoviesListProps> = ({ error, loading, movies }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="movie-list">
      {movies?.map(({ imdbID, Title, Year, Poster }) => (
        <LinkWithQuery
          className="list-item"
          to={`/movies/${imdbID}`}
          key={imdbID}
        >
          <img src={Poster} className="image" />
          <div>
            <div className="title">{Title}</div>
            <div className="year">{Year}</div>
          </div>
        </LinkWithQuery>
      ))}
    </div>
  );
};

const Movies: React.FC = () => {
  const {
    movies,
    title,
    onChange,
    error,
    loading,
    fetchMovies,
    setPageNumber,
    pageNumber,
    totalResult,
  } = useMovies();
  return (
    <>
      <NavBar />
      <div className="movies-container">
        <form onSubmit={fetchMovies}>
          <input
            onChange={onChange}
            defaultValue={title}
            className="search-input"
          />
          <button type="submit" className="button">
            Search movies
          </button>
        </form>
        <span className="search-result-title">Search result for: {title}</span>
        <MoviesList loading={loading} error={error} movies={movies} />
      </div>

      <div className="pagination">
        <Pagination
          onChange={(page) => setPageNumber(page)}
          defaultPageSize={10}
          current={pageNumber}
          total={totalResult}
        />
      </div>
    </>
  );
};

export default Movies;

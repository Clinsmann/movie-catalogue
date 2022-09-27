import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { getMoviesPoster } from "../../api";
import { MoviesPosterResponse } from "../../api/types";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAUL_TOTAL_RESULT = 0;

export const useMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState(searchQuery || "");
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [totalResult, setTotalResult] = useState(DEFAUL_TOTAL_RESULT);
  const [movies, setMovies] = useState<MoviesPosterResponse["Search"]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const fetchMovies = useCallback(
    async (e?: React.SyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!title) {
        return;
      }

      try {
        setError("");
        setLoading(true);
        setSearchParams({ searchQuery: title, pageNumber: String(pageNumber) });
        const { data } = await getMoviesPoster(title, pageNumber);

        if (data.Error) {
          setPageNumber(DEFAULT_PAGE_NUMBER);
          setTotalResult(DEFAUL_TOTAL_RESULT);
          return setError(data.Error);
        }

        setMovies(data?.Search);
        setTotalResult(Number(data?.totalResults!));
      } catch (error: any) {
        setError("An error occured.");
      } finally {
        setLoading(false);
      }
    },
    [title, pageNumber]
  );

  useEffect(() => {
    fetchMovies();
  }, [pageNumber]);

  return {
    movies,
    title,
    onChange,
    error,
    loading,
    fetchMovies,
    setPageNumber,
    pageNumber,
    totalResult,
  };
};

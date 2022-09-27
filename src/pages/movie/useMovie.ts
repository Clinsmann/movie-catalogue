import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { getMovieDetails } from "../../api";
import { MovieDetailsResponse } from "../../api/types";

export const ERROR_MESSAGE = "An error occured.";

export const useMovie = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [movie, setMovie] = useState<MovieDetailsResponse>();

  const fetchMovie = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      let { data } = await getMovieDetails(params.id!);

      if (!data?.Title) {
        throw Error();
      }

      setMovie(data);
    } catch (error: any) {
      setError(ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    params?.id && fetchMovie();
  }, [params?.id]);

  return { movie, error, loading };
};

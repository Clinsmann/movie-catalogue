import axios, { AxiosResponse } from "axios";
import { MoviesPosterResponse, MovieDetailsResponse } from "./types";

// These will go into the .env file But totally fine for the purpose of this test
const OMDB_API = "https://www.omdbapi.com";
const API_KEY = "42dd2f07";

export const getMoviesPoster = (
  title: string,
  page: number
): Promise<AxiosResponse<MoviesPosterResponse>> => {
  return axios.get(OMDB_API, {
    params: { apikey: API_KEY, page, s: title },
  });
};

export const getMovieDetails = (
  imdbID: string
): Promise<AxiosResponse<MovieDetailsResponse>> => {
  return axios.get(OMDB_API, {
    params: { apikey: API_KEY, i: imdbID },
  });
};

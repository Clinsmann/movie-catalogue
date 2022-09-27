import axios, { AxiosResponse } from "axios";

interface MoviePoster {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface Rating {
  Source: string;
  Value: string;
}

interface MovieDetailsResponse {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Rating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
  Error?: string;
}

interface MoviesPosterResponse {
  Search?: MoviePoster[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

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

import { act, renderHook } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../../api";
import { ERROR_MESSAGE, useMovie } from "../useMovie";

const MOVIE_ID = "tt4154756";

export const mockMovie = {
  Poster: "Movie Poster",
  Title: "Movie Title",
  Plot: "Movie Plot",
  Genre: "Movie Genre",
  Director: "Movie Director",
  Ratings: [
    {
      Source: "Rating 1 Souce",
      Value: "Rating 1 Value",
    },
    {
      Source: "Rating 2 Souce",
      Value: "Rating 2 Value",
    },
  ],
};

jest.mock("react-router-dom");
jest.mock("../../../api");

describe("useMovie", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: MOVIE_ID });
  });

  test("make the correct api call with the movie id", async () => {
    (getMovieDetails as jest.Mock).mockResolvedValue({ data: mockMovie });

    let useMovieHook: any;
    await act(() => {
      useMovieHook = renderHook(() => useMovie());
    });

    expect(useMovieHook.result.current.error).toEqual("");
    expect(useMovieHook.result.current.movie).toStrictEqual(mockMovie);
    expect(getMovieDetails).toHaveBeenCalledWith(MOVIE_ID);
  });

  test("returns error if there is an error response", async () => {
    (getMovieDetails as jest.Mock).mockResolvedValue({
      data: JSON.stringify({ Response: "False", Error: ERROR_MESSAGE }),
    });

    let useMovieHook: any;
    await act(() => {
      useMovieHook = renderHook(() => useMovie());
    });

    expect(useMovieHook.result.current.error).toEqual(ERROR_MESSAGE);
    expect(useMovieHook.result.current.movie).toEqual(undefined);
    expect(getMovieDetails).toHaveBeenCalledWith(MOVIE_ID);
  });
});

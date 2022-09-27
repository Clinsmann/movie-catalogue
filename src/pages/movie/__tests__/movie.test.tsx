import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { useMovie } from "../useMovie";
import Movie from "..";

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

jest.mock("../useMovie");
describe("Movies", () => {
  test("Render movie page properly", async () => {
    (useMovie as jest.Mock).mockReturnValue({
      movie: mockMovie,
      loading: false,
      error: "",
    });

    const { getByText } = render(
      <BrowserRouter>
        <Movie />
      </BrowserRouter>
    );

    expect(getByText("Ratings")).toBeInTheDocument();
    expect(getByText("All movies")).toBeInTheDocument();
    expect(getByText("Rating 1 Value")).toBeInTheDocument();
    expect(getByText("Rating 2 Souce")).toBeInTheDocument();
    expect(getByText("Back to Homepage")).toBeInTheDocument();
  });
});

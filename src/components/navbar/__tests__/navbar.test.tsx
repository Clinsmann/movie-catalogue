import { render } from "@testing-library/react";
import { NavBar, PAGE_TITLE } from "..";

test("Render navbar properly", () => {
  const { getByText } = render(<NavBar />);
  expect(getByText(PAGE_TITLE)).toBeInTheDocument();
});

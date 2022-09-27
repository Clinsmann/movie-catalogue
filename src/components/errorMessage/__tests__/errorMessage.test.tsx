import { render } from "@testing-library/react";
import { ErrorMessage } from "../index";

const ERROR_MESSAGE = "This is the error message";

test("Render error message properly", () => {
  const { getByText } = render(<ErrorMessage message={ERROR_MESSAGE} />);
  expect(getByText(ERROR_MESSAGE)).toBeInTheDocument();
});

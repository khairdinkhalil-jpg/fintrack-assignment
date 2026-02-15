import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders text", () => {
  render(<App />);
  expect(screen.getByText("Technical Assignment")).toBeInTheDocument();
});
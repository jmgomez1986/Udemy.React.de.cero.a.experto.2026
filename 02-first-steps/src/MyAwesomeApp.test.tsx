import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyAwesomeApp } from "./MyAwesomeApp";

describe("MyAwesomeApp", () => {
  test("should render the first name and last name", () => {
    const { container } = render(<MyAwesomeApp />);

    const h1 = container.querySelector("h1"); // Devuelve el primer elemento h1 encontrado en el contenedor
    expect(h1?.innerHTML).toContain("Matías");
    const h3 = container.querySelector("h3");
    expect(h3?.innerHTML).toContain("Gómez");
  });

  test("should render the first name and last name - Screen", () => {
    render(<MyAwesomeApp />);
    screen.debug();

    // const h1 = screen.getAllByRole("heading", { level: 1 })[0];
    // expect(h1?.innerHTML).toContain("Matías");
    const h1 = screen.getByTestId("first-name-title");
    expect(h1.innerHTML).toContain("Matías");
  });

  test("should match snapshot", () => {
    const { container } = render(<MyAwesomeApp />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot", () => {
    render(<MyAwesomeApp />);
    expect(screen.getByTestId("div-app")).toMatchSnapshot();
  });
});

import { render, screen } from "@testing-library/react";
import Stars from "../stars";   

describe("Componente: Stars", () => {
  it("renderiza 5 estrellas completas con rating 5", () => {
    render(<Stars rating={5} />);
    expect(screen.getByText(/★★★★★ \(5\)/)).toBeInTheDocument();
  });

  it("renderiza 3 estrellas completas y 2 vacías con rating 3", () => {
    render(<Stars rating={3} />);
    expect(screen.getByText(/★★★☆☆ \(3\)/)).toBeInTheDocument();
  });

  it("renderiza media estrella cuando rating tiene .5", () => {
    render(<Stars rating={2.5} />);
    expect(screen.getByText(/★★☆☆☆ \(2.5\)/)).toBeInTheDocument();
  });

  it("renderiza sin media estrella cuando el decimal es menor a 0.5", () => {
    render(<Stars rating={2.3} />);
    expect(screen.getByText(/★★☆☆☆ \(2.3\)/)).toBeInTheDocument();
  });
});

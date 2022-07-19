import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Home from '../components/Home';

describe("Home component", () => {
  const validProps = {
    user: {
      firstName: 'test first name'
    }
  };

  it("matches snapshot", () => {
    const generated = renderer
    .create(<Router><Home user={validProps.user} /></Router>)
    .toJSON();

  expect(generated).toMatchSnapshot();
  });
  
  it("renders welcome message if user logged in", () => {
    render(<Router><Home user={validProps.user}/></Router>);
    const message = screen.getByRole("heading", /Welcome to you, test first name/);

    expect(message).toBeInTheDocument;
  });

  it("renders redirect message if user not logged in", () => {
    const validProps = {
      user: {
        firstName: ""
      }
    }
    render(<Router><Home user={validProps.user} /></Router>);
    const message = screen.getByRole("heading", /You are not logged in, log in or signup/);

    expect(message).toBeInTheDocument;
  });
});
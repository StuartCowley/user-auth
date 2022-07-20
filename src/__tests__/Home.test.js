import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Home from '../components/Home';

describe("Home component", () => {
  const validProps = {
    currentUser: {
      firstName: "testFirstName",
      lastName: "testLastName",
      email: "test@email.com",
      password: "testpass"
    },
    setCurrentUser: jest.fn()
  };

  it("matches snapshot", () => {
    const generated = renderer
      .create(
        <Router>
          <Home
            currentUser={validProps.currentUser}
            setCurrentUser={validProps.setCurrentUser}
          />
        </Router>
      ).toJSON();

    expect(generated).toMatchSnapshot();
  });

  describe("User is logged in", () => {
    it("renders welcome message if user logged in", () => {
      render(
        <Router>
          <Home
            currentUser={validProps.currentUser}
            setCurrentUser={validProps.setCurrentUser}
          />
        </Router>);
      const message = screen.getByRole("heading", { name: "Welcome to you, testFirstName" });

      expect(message).toBeInTheDocument;
    });

    it("log out button is rendered", () => {
      render(
        <Router>
          <Home
            currentUser={validProps.currentUser}
            setCurrentUser={validProps.setCurrentUser}
          />
        </Router>);
      const button = screen.getByRole("button", { name: "Sign out" });

      expect(button).toBeInTheDocument;
    })

  it("current user setter function is called when button is clicked", () => {
    render(
      <Router>
        <Home
          currentUser={validProps.currentUser}
          setCurrentUser={validProps.setCurrentUser}
        />
      </Router>);
    const button = screen.getByRole("button", { name: "Sign out" });
    fireEvent.click(button);

    expect(validProps.setCurrentUser).toHaveBeenCalledTimes(1);
  })
});

  describe("User is not logged in", () => {
    it("renders redirect message if user not logged in", () => {
      const validProps = {
        currentUser: null
      }
      render(
        <Router>
          <Home
            currentUser={validProps.currentUser}
            setCurrentUser={validProps.setCurrentUser}
          />
        </Router>
      );
      const message = screen.getByRole("heading", { name: "You are not logged in, log in or signup" });

      expect(message).toBeInTheDocument;
    });
  });
});
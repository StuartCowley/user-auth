import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from "react-test-renderer";
import LoginForm from '../components/LoginForm';

describe("Login form component", () => {
  describe("User is logged in", () => {
    const validProps = {
      allUsers: [
        {
          firstName: "testFirst",
          lastName: "testSecond",
          email: "test@email.com",
          password: "asdfgh"
        }
      ],
      setCurrentUser: jest.fn(),
      currentUser: {
        firstName: "testFirst",
        lastName: "testSecond",
        email: "test@email.com",
        password: "asdfgh"
      }
    };

    it("renders already logged in message", () => {
      render(
        <Router>
          <LoginForm
            allUsers={validProps.allUsers}
            setCurrentUser={validProps.setCurrentUser}
            currentUser={validProps.currentUser}
          />
        </Router>
      );

      const title = screen.getByText("You are already logged in, testFirst!");

      expect(title).toBeInTheDocument;
    })
  })

  describe("User is not logged in", () => {
    const validProps = {
      allUsers: [],
      setCurrentUser: jest.fn(),
      currentUser: null
    };

    it("matches snapshot", () => {
      const generated = renderer
        .create(
          <Router>
            <LoginForm
              allUsers={validProps.allUsers}
              setCurrentUser={validProps.setCurrentUser}
              currentUser={validProps.currentUser}
            />
          </Router>
        ).toJSON();

      expect(generated).toMatchSnapshot();
    })

    it("renders title", () => {
      render(
        <Router>
          <LoginForm
            allUsers={validProps.allUsers}
            setCurrentUser={validProps.setCurrentUser}
            currentUser={validProps.currentUser}
          />
        </Router>
      );
      const title = screen.getByText(/Login here:/);

      expect(title).toBeInTheDocument;
    })

    it("renders all form elements", () => {
      render(
        <Router>
          <LoginForm
            allUsers={validProps.allUsers}
            setCurrentUser={validProps.setCurrentUser}
            currentUser={validProps.currentUser}
          />
        </Router>
      )
      const emailField = screen.getByText("Email");
      const passwordField = screen.getByText("Password");
      const loginButton = screen.getByText("Submit");

      expect(emailField).toBeInTheDocument;
      expect(passwordField).toBeInTheDocument;
      expect(loginButton).toBeInTheDocument;
    })

    it("shows login failure message with non existent user", async () => {
      render(
        <Router>
          <LoginForm
            allUsers={validProps.allUsers}
            setCurrentUser={validProps.setCurrentUser}
            currentUser={validProps.currentUser}
          />
        </Router>
      )
      const emailField = screen.getByLabelText("Email");
      const passwordField = screen.getByLabelText("Password");
      const loginButton = screen.getByText("Submit");

      fireEvent.change(emailField, { target: { value: "test@email.com" } });
      fireEvent.change(passwordField, { target: { value: "testPassword" } });
      fireEvent.click(loginButton);

      const errorMessage = await screen.findByText("Login failed");
      expect(errorMessage).toBeInTheDocument;
    })

    it("shows login failure message when logging in with invalid credentials", async () => {
      const updatedProps = {
        allUsers: [
          {
            firstName: "testFirst",
            lastName: "testLast",
            email: "test@email.com",
            password: "qwerty"
          }
        ],
        setCurrentUser: jest.fn()
      }
      render(
        <Router>
          <LoginForm
            allUsers={updatedProps.allUsers}
            setCurrentUser={updatedProps.setCurrentUser}
            currentUser={validProps.currentUser}
          />
        </Router>
      )
      const emailField = screen.getByLabelText("Email");
      const passwordField = screen.getByLabelText("Password");
      const loginButton = screen.getByText("Submit");

      fireEvent.change(emailField, { target: { value: "test@email.com" } });
      fireEvent.change(passwordField, { target: { value: "badPassword" } });
      fireEvent.click(loginButton);

      const errorMessage = await screen.findByText("Login failed");

      expect(errorMessage).toBeInTheDocument;
    })
  })

});
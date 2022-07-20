import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from "react-test-renderer";
import LoginForm from '../components/LoginForm';

describe("Login form component", () => {
  const validProps = {
    allUsers: [],
    setCurrentUser: jest.fn()
  };

  it("matches snapshot", () => {
    const generated = renderer
      .create(
        <Router>
          <LoginForm
            allUsers={validProps.allUsers}
            setCurrentUser={validProps.setCurrentUser}
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
        />
      </Router>
    )
    const emailField = screen.getByText("Email");
    const passwordField = screen.getByText("Password");
    const loginButton = screen.getByText("Submit");

    fireEvent.change(emailField, "testUser");
    fireEvent.change(passwordField, "testPass");
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText("Login failed");
    expect(errorMessage).toBeInTheDocument;
  })

  it("shows login failure message when logging in with invalid credentials", async () => {
    render(
      <Router>
        <LoginForm
          allUsers={validProps.allUsers}
          setCurrentUser={validProps.setCurrentUser}
        />
      </Router>
    )
    const emailField = screen.getByText("Email");
    const passwordField = screen.getByText("Password");
    const loginButton = screen.getByText("Submit");

    fireEvent.change(emailField, "testUser");
    fireEvent.change(passwordField, "testPass");
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText("Login failed");
    expect(errorMessage).toBeInTheDocument;
  })
});
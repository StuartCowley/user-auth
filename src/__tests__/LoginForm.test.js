import { render, screen } from '@testing-library/react';
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

    expect(emailField).toBeInTheDocument;
    expect(passwordField).toBeInTheDocument;
  })

  // TODO add error checking tests
});
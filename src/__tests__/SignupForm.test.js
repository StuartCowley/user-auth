import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from "react-test-renderer";
import SignupForm from '../components/SignupForm';

describe("Signup form component", () => {
  const validProps = {
    allUsers: [],
    setAllUsers: jest.fn(),
    setCurrentUser: jest.fn()
  };
  it("matches snapshot", () => {
    const generated = renderer
      .create(
        <Router>
          <SignupForm
            allUsers={validProps.allUsers}
            setAllUsers={validProps.setAllUsers}
            setCurrentUser={validProps.setCurrentUser}
          />
        </Router>
      ).toJSON();

    expect(generated).toMatchSnapshot();
  })

  it("renders title", () => {
    render(
      <Router>
          <SignupForm
            allUsers={validProps.allUsers}
            setAllUsers={validProps.setAllUsers}
            setCurrentUser={validProps.setCurrentUser}
          />
        </Router>
    )
    const title = screen.getByText(/Signup here:/);

    expect(title).toBeInTheDocument;
  })

  it("renders all form elements", () => {
    render(
      <Router>
          <SignupForm
            allUsers={validProps.allUsers}
            setAllUsers={validProps.setAllUsers}
            setCurrentUser={validProps.setCurrentUser}
          />
        </Router>
    )
    const firstNameField = screen.getByText("First Name");
    const lastNameField = screen.getByText("Last Name");
    const emailField = screen.getByText("Email");
    const passwordField = screen.getByText("Password");

    expect(firstNameField).toBeInTheDocument;
    expect(lastNameField).toBeInTheDocument;
    expect(emailField).toBeInTheDocument;
    expect(passwordField).toBeInTheDocument;
  })
  // TODO add error checking tests
});
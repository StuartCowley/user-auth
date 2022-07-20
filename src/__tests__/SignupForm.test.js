import { fireEvent, render, screen } from '@testing-library/react';
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
    const signupButton = screen.getByText("Submit");

    expect(firstNameField).toBeInTheDocument;
    expect(lastNameField).toBeInTheDocument;
    expect(emailField).toBeInTheDocument;
    expect(passwordField).toBeInTheDocument;
    expect(signupButton).toBeInTheDocument;
  })

  it("shows signup failure message when registering existing user", async () => {
    const updatedProps = {
      allUsers: [
        {
          firstName: "testFirst",
          lastName: "testLast",
          email: "test@email.com",
          password: "qwerty"
        }
      ],
      setAllUsers: jest.fn(),
      setCurrentUser: jest.fn()
    };

    render(
      <Router>
        <SignupForm
          allUsers={updatedProps.allUsers}
          setAllUsers={updatedProps.setAllUsers}
          setCurrentUser={updatedProps.setCurrentUser}
        />
      </Router>
    )
    const firstNameField = screen.getByLabelText("First Name");
    const lastNameField = screen.getByLabelText("Last Name");
    const emailField = screen.getByLabelText("Email");
    const passwordField = screen.getByLabelText("Password");
    const signupButton = screen.getByText("Submit");

    fireEvent.change(firstNameField, {target: {value: updatedProps.allUsers[0].firstName}});
    fireEvent.change(lastNameField, {target: {value: updatedProps.allUsers[0].lastName}});
    fireEvent.change(emailField, {target: {value: updatedProps.allUsers[0].email}});
    fireEvent.change(passwordField, {target: {value: updatedProps.allUsers[0].password}});
    fireEvent.click(signupButton);

    const errorMessage = await screen.findByText("User already exists");

    expect(errorMessage).toBeInTheDocument;
  })

  it("shows login failure message when all fields not filled out on submit", async () => {
    render(
      <Router>
        <SignupForm
          allUsers={validProps.allUsers}
          setAllUsers={validProps.setAllUsers}
          setCurrentUser={validProps.setCurrentUser}
        />
      </Router>
    )
    const firstNameField = screen.getByLabelText("First Name");
    const lastNameField = screen.getByLabelText("Last Name");
    const passwordField = screen.getByLabelText("Password");
    const signupButton = screen.getByText("Submit");

    fireEvent.change(firstNameField, "testFirst");
    fireEvent.change(lastNameField, "testLast");
    fireEvent.change(passwordField, "testPassword");
    fireEvent.click(signupButton);

    const errorMessage = await screen.findByText("All fields not filled out");

    expect(errorMessage).toBeInTheDocument;
  })
});
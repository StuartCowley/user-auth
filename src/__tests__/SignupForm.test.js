import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import SignupForm from '../components/SignupForm';

describe("Signup form component", () => {
  it("matches snapshot", () => {
    const generated = renderer
    .create(<SignupForm />)
    .toJSON();

  expect(generated).toMatchSnapshot();
  })
  
  it("renders title", () => {
    render(<SignupForm />);
    const title = screen.getByText(/Signup here:/);

    expect(title).toBeInTheDocument;
  })
});
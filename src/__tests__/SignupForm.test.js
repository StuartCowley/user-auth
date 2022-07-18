import { render } from '@testing-library/react';
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
    const {getByText} = render(<SignupForm />);
    const title = getByText(/Signup here:/);

    expect(title).toBeInTheDocument;
  })
});
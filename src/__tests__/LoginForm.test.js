import { render } from '@testing-library/react';
import renderer from "react-test-renderer";
import LoginForm from '../components/LoginForm';

describe("Login form component", () => {
  it("matches snapshot", () => {
    const generated = renderer
    .create(<LoginForm />)
    .toJSON();

  expect(generated).toMatchSnapshot();
  })
  
  it("renders title", () => {
    const {getByText} = render(<LoginForm />);
    const title = getByText(/Login here:/);

    expect(title).toBeInTheDocument;
  })
});
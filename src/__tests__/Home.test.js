import { render } from '@testing-library/react';
import renderer from "react-test-renderer";
import Home from '../components/Home';

describe("Home component", () => {
  const validProps = {
    user: {
      firstName: 'test first name',
      lastNameName: 'test last name'
    },
    setUser: jest.fn
  };

  it("matches snapshot", () => {
    const generated = renderer
    .create(<Home user={validProps.user} setUser={validProps.setUser} />)
    .toJSON();

  expect(generated).toMatchSnapshot();
  });
  
  it("renders welcome message if user logged in", () => {
    const {getByText} = render(<Home user={validProps.user} setUser={validProps.setUser} />);
    const message = getByText(/Welcome to you, test first name/);

    expect(message).toBeInTheDocument;
  });

  it("renders form if user not logged in", () => {
    const validProps = {
      user: {
        firstName: ""
      }
    }
    const {getByText} = render(<Home user={validProps.user} setUser={validProps.setUser} />);
    const message = getByText(/Signup here:/);

    expect(message).toBeInTheDocument;
  });
});
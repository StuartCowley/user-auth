import { render } from '@testing-library/react';
import renderer from "react-test-renderer";
import App from '../components/App';

describe("App component", () => {
  it("matches snapshot", () => {
    const generated = renderer
    .create(<App/>)
    .toJSON();
  expect(generated).toMatchSnapshot();
  })
  
  it("renders app component", () => {
    const {getByText} = render(<App />);
    const title = getByText(/Bootstrap project/i);
    expect(title).toBeInTheDocument;
  })
});
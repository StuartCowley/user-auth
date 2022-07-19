import renderer from "react-test-renderer";
import App from '../components/App';

describe("App component", () => {
  it("matches snapshot", () => {
    const generated = renderer
      .create(<App />)
      .toJSON();

    expect(generated).toMatchSnapshot();
  })
});
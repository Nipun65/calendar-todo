import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dropdown from '../components/Common/Dropdown/Dropdown';

afterEach(() => {
  cleanup();
});

it('should match the snapshot', () => {
  const tree = renderer.create(<Dropdown />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render dropdown Component', () => {
  const DROPDOWNLIST = ['Month', 'Year'];
  render(<Dropdown option={DROPDOWNLIST} />);
  const mainDiv = screen.getByTestId('dropdown');
  expect(mainDiv).toBeInTheDocument();
  expect(mainDiv).toHaveTextContent(DROPDOWNLIST[0]);
});

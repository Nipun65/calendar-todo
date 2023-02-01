import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from '../components/Common/Card/Card';
import { MONTHS } from '../utils/Constants.utils';

afterEach(() => {
  cleanup();
});

it('should match the snapshot', () => {
  const tree = renderer.create(<Card data={MONTHS} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render Card Component', () => {
  render(<Card data={MONTHS} />);
  const mainDiv = screen.getByTestId('card');
  expect(mainDiv).toBeInTheDocument();
  const childCount = mainDiv.children.length;
  expect(childCount).toBe(12);
});

import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import Daydate from '../components/Common/Daydate/Daydate';
import '@testing-library/jest-dom/extend-expect';
import { DATE } from '../utils/Constants.utils';

afterEach(() => {
  cleanup();
});

it('should match the snapshot', () => {
  const tree = renderer.create(<Daydate date={DATE} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render Card Component', () => {
  render(<Daydate date={DATE} />);
  const mainDiv = screen.getByTestId('daydate');
  expect(mainDiv).toBeInTheDocument();

  const suntxt = screen.queryByText('Sun');
  expect(suntxt).toBeInTheDocument();
  const Montxt = screen.queryByText('Mon');
  expect(Montxt).toBeInTheDocument();
  const Tuetxt = screen.queryByText('Tue');
  expect(Tuetxt).toBeInTheDocument();
  const Wedtxt = screen.queryByText('Wed');
  expect(Wedtxt).toBeInTheDocument();
  const Thutxt = screen.queryByText('Thu');
  expect(Thutxt).toBeInTheDocument();
  const Fritxt = screen.queryByText('Fri');
  expect(Fritxt).toBeInTheDocument();
  const Sattxt = screen.queryByText('Sat');
  expect(Sattxt).toBeInTheDocument();

  const secondChild = mainDiv.children[1];
  const childCount = secondChild.children.length;
  expect(childCount).toBe(6);
});

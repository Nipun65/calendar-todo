import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import Daydate from '../components/Common/Daydate/Daydate';
import '@testing-library/jest-dom/extend-expect';

const date = {
  year: 2023,
  month: 0,
  date: 31,
  currentMonth: 0,
  currentYear: 2023,
  selectedDate: { userYear: 2023, userMonth: 0, userDate: 31 },
};

afterEach(() => {
  cleanup();
});

it('should match the snapshot', () => {
  const tree = renderer.create(<Daydate date={date} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render Card Component', () => {
  render(<Daydate date={date} />);
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

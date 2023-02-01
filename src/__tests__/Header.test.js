import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Common/Header/Header';

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
  const tree = renderer.create(<Header date={date} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render dropdown Component', () => {
  render(<Header date={date} />);
  const mainDiv = screen.getByTestId('header');
  expect(mainDiv).toBeInTheDocument();

  const todaybtn = screen.queryByText('Today');
  expect(todaybtn).toBeInTheDocument();
  const singleforwardbtn = screen.queryByText('>');
  expect(singleforwardbtn).toBeInTheDocument();
  const doubleforwardsbtn = screen.queryByText('>>');
  expect(doubleforwardsbtn).toBeInTheDocument();
  const singlebackwardbtn = screen.queryByText('<');
  expect(singlebackwardbtn).toBeInTheDocument();
  const doublebackwardsbtn = screen.queryByText('<<');
  expect(doublebackwardsbtn).toBeInTheDocument();
  const dropdownbtn = screen.getByTestId('dropdown');
  expect(dropdownbtn).toBeInTheDocument();
});

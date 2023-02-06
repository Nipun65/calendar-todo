import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Todo from '../components/Common/Todo/Todo';
import { MONTHS } from '../utils/Constants.utils';

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
  const tree = renderer.create(<Todo date={date} Month={MONTHS} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render button Component', () => {
  render(<Todo date={date} Month={MONTHS} />);
  const mainDiv = screen.getByTestId('todo');
  expect(mainDiv).toBeInTheDocument();
  expect(mainDiv).toHaveTextContent('To-do List');
  const notodotxt = screen.queryByText('No Todos Yet');
  expect(notodotxt).toBeInTheDocument();
});

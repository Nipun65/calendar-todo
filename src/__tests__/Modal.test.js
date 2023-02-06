import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from '../components/UI/Modal/Modal';

afterEach(() => {
  cleanup();
});

it('should match the snapshot', () => {
  const tree = renderer.create(<Modal />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render button Component', () => {
  render(<Modal open="true" title="Update Todo" />);
  const mainDiv = screen.getByTestId('modal');
  expect(mainDiv).toBeInTheDocument();
  expect(mainDiv).toHaveTextContent('Update Todo');
  const Updatebtn = screen.queryByText('Update');
  expect(Updatebtn).toBeInTheDocument();
});

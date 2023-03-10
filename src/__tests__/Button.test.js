import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '../components/UI/Button/Button';

afterEach(() => {
  cleanup();
});

it('should match the snapshot', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render button Component', () => {
  const textContent = 'Add';
  render(<Button textContent={textContent} />);
  const mainDiv = screen.getByTestId('button');
  expect(mainDiv).toBeInTheDocument();
  expect(mainDiv).toHaveTextContent(textContent);
});

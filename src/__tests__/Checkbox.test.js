import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Checkbox from '../components/UI/Checkbox/Chekbox';

afterEach(() => {
  cleanup();
});

it('should match the snapshot', () => {
  const tree = renderer.create(<Checkbox classes="is-inline" />).toJSON();
  expect(tree).toMatchSnapshot();
});

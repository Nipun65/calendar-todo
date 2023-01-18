import renderer from 'react-test-renderer';
import Calendar from '../components/Layout/Calendar/Calendar';

it('should match the snapshot', () => {
  const tree = renderer.create(<Calendar />).toJSON();
  expect(tree).toMatchSnapshot();
});

import renderer from 'react-test-renderer';
import Dropdown from '../components/Common/Dropdown/Dropdown';

it('should match the snapshot', () => {
  const tree = renderer.create(<Dropdown />).toJSON();
  expect(tree).toMatchSnapshot();
});

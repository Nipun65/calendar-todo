import renderer from 'react-test-renderer';
import Card from '../components/Common/Card/Card';

it('should match the snapshot', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});

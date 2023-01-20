import renderer from 'react-test-renderer';
import Button from '../components/UI/Button/Button';

it('should match the snapshot', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

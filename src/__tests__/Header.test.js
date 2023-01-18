import renderer from 'react-test-renderer';
import Header from '../components/Common/Header/Header';

it('should match the snapshot', () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});

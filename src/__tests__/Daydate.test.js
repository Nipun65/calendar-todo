import renderer from 'react-test-renderer';
import Daydate from '../components/Common/Daydate/Daydate';

it('should match the snapshot', () => {
  const tree = renderer.create(<Daydate />).toJSON();
  expect(tree).toMatchSnapshot();
});

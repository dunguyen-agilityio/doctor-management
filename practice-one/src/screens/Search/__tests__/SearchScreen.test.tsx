import { useRoute } from '@react-navigation/native';

import SearchScreen from '@/screens/Search';

import { render } from '@/utils/test-utils';

describe('SearchScreen', () => {
  it('match snapshot', () => {
    (useRoute as jest.Mock).mockReturnValue({});
    const tree = render(<SearchScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('match snapshot', () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { autoFocus: true } });
    const tree = render(<SearchScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

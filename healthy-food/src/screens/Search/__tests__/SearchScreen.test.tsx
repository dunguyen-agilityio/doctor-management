import { useRoute } from '@react-navigation/native';

import SearchScreen, { SearchScreenProps } from '@/screens/Search';

import { ROUTES } from '@/constants';

import { render } from '@/utils/test-utils';

const mockScreenProps = {
  route: { name: ROUTES.HOME, params: {}, key: 'home' },
  navigation: { navigate: jest.fn(), setParams: jest.fn() },
} as unknown as SearchScreenProps;

describe('SearchScreen', () => {
  it('match snapshot', () => {
    (useRoute as jest.Mock).mockReturnValue({});
    const tree = render(<SearchScreen {...mockScreenProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

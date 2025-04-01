import { useRoute } from '@react-navigation/native';

import SearchScreen from '@/screens/Search';

import { BottomTabProps } from '@/types';

import { render } from '@/utils/test-utils';

import { ROUTES } from '@/routes';

const mockScreenProps = {
  route: { name: ROUTES.HOME, params: {}, key: 'home' },
  navigation: { navigate: jest.fn(), setParams: jest.fn() },
} as unknown as BottomTabProps<ROUTES.SEARCH>;

describe('SearchScreen', () => {
  it('match snapshot', () => {
    (useRoute as jest.Mock).mockReturnValue({});
    const tree = render(<SearchScreen {...mockScreenProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

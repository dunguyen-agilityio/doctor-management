import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamsList } from '@/navigation';

import SearchScreen from '@/screens/Search';

import { ROUTES } from '@/constants';

import { render } from '@/utils/test-utils';

// Mock navigation object
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  // Add other navigation functions as needed
};

// Mock route object
const mockRoute = {
  key: 'search-screen',
  name: ROUTES.SEARCH,
  params: {
    // Add any expected route params here (if your search screen has params)
  },
  path: 'search',
};

// Create the mock props object
const mockProps = {
  navigation: mockNavigation as any, // Type assertion is needed because jest.fn() does not perfectly match the NavigationProp type.
  route: mockRoute,
} as NativeStackScreenProps<RootStackParamsList, ROUTES.SEARCH>;

describe('SearchScreen', () => {
  it('match snapshot', () => {
    (useRoute as jest.Mock).mockReturnValue({});
    const tree = render(<SearchScreen {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('match snapshot', () => {
    (useRoute as jest.Mock).mockReturnValue({ params: { autoFocus: true } });
    const tree = render(
      <SearchScreen
        {...mockProps}
        route={{ ...mockProps.route, params: { autoFocus: true } }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

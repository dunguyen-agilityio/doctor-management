import SearchContainer from '@/screens/Home';

import { ROUTES } from '@/constants';

import { fireEvent, render } from '@/utils/test-utils';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('SearchContainer', () => {
  const renderWithProviders = () => render(<SearchContainer />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('match snapshot', () => {
    const tree = renderWithProviders().toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('navigates to the Search screen when SearchInput is focused', () => {
    const { getByTestId } = renderWithProviders();

    fireEvent(getByTestId('search-input'), 'focus');

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.SEARCH);
  });
});

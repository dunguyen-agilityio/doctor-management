import HomeScreen from '@/screens/Home';

import type { BottomTabProps } from '@/types';

import { render } from '@/utils/test-utils';

import { useFoodList } from '@/hooks/useFoodList';

import { MOCK_FOOD_LIST } from '@/mocks/food';

import { ROUTES } from '@/routes';

jest.mock('@/hooks/useFoodList');

const mockScreenProps = {
  route: { name: ROUTES.HOME, params: {}, key: 'home' },
  navigation: { navigate: jest.fn(), setParams: jest.fn() },
} as unknown as BottomTabProps<ROUTES.HOME>;

describe('HomeScreen', () => {
  it('renders all main components', async () => {
    (useFoodList as jest.Mock).mockReturnValue({ isLoading: true });
    const { getByText, getByTestId } = render(
      <HomeScreen {...mockScreenProps} />,
    );
    expect(getByText('All Food')).toBeTruthy();
    expect(getByTestId('food-list-skeleton')).toBeTruthy();
  });

  it('renders all main components', async () => {
    (useFoodList as jest.Mock).mockReturnValue({
      isLoading: false,
      data: MOCK_FOOD_LIST,
    });
    const { getByTestId } = render(<HomeScreen {...mockScreenProps} />);
    expect(getByTestId('food-list')).toBeTruthy();
  });
});

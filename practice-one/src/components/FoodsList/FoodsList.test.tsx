import { Text } from 'react-native';

import { COLOR } from '@/constants';

import { render } from '@/utils/test-utils';

import { MOCK_FOODS } from '@/mocks';

import FoodsList from './index';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('FoodsList Component', () => {
  const [{ name: name1 }, { name: name2 }] = MOCK_FOODS;

  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(<FoodsList foods={MOCK_FOODS} />);

    // Check if the FlatList is rendered
    const flatList = getByTestId('foods-list');
    expect(flatList).toBeTruthy();

    // Check if the Food components are rendered
    expect(getByText(name1)).toBeTruthy();
    expect(getByText(name2)).toBeTruthy();
  });

  it('renders correctly with horizontal layout', () => {
    const { getByTestId } = render(<FoodsList foods={MOCK_FOODS} horizontal />);

    // Check if the FlatList has horizontal layout
    const flatList = getByTestId('foods-list');
    expect(flatList.props.horizontal).toBe(true);
  });

  it('applies correct styles', () => {
    const { getByTestId } = render(<FoodsList foods={MOCK_FOODS} />);

    // Check container styles
    const container = getByTestId('foods-list-container');
    expect(container.props.style).toEqual({
      flex: 1,
      backgroundColor: COLOR.WHITE,
      paddingHorizontal: 20,
      paddingBottom: 20,
      gap: 18,
    });

    // Check FlatList content container styles
    const flatList = getByTestId('foods-list');
    expect(flatList.props.contentContainerStyle).toContainEqual({
      gap: 18,
    });
  });

  it('renders title if provided', () => {
    const mockTitle = <Text>Fruits List</Text>;
    const { getByText } = render(
      <FoodsList foods={MOCK_FOODS} title={mockTitle} />,
    );

    // Check if the title is rendered
    expect(getByText('Fruits List')).toBeTruthy();
  });
});

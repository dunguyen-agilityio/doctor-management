import { useFocusEffect } from '@react-navigation/native';

import FavoriteScreen from '@/screens/Favorite';

import { render } from '@/utils/test-utils';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn(),
}));

describe('FavoriteScreen', () => {
  const renderComponent = () => render(<FavoriteScreen />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('match snapshot', () => {
    const tree = renderComponent().toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls useFocusEffect when screen is focused', () => {
    renderComponent();

    expect(useFocusEffect).toHaveBeenCalled();
  });
});

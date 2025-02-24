import { render } from '@testing-library/react-native';

import Text, { TextColor } from '@/components/Text';

import { COLOR } from '@/constants';

describe('Text Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Text>Default Text</Text>);
    expect(getByText('Default Text')).toBeTruthy();
  });

  it('applies correct style for a given variant', () => {
    const { getByText } = render(<Text variant="title1">Title Text</Text>);
    const textElement = getByText('Title Text');

    expect(textElement.props.style).toEqual(
      expect.objectContaining({ fontSize: 22, fontWeight: '700' }), // title1 style
    );
  });

  it('applies correct color from TextColor enum', () => {
    const { getByText } = render(
      <Text color={TextColor.SECONDARY}>Colored Text</Text>,
    );
    const textElement = getByText('Colored Text');

    expect(textElement.props.style).toEqual(
      expect.objectContaining({ color: COLOR.SECONDARY }),
    );
  });

  it('applies a custom color', () => {
    const customColor = '#FF5733';
    const { getByText } = render(<Text color={customColor}>Custom Color</Text>);
    const textElement = getByText('Custom Color');

    expect(textElement.props.style).toEqual(
      expect.objectContaining({ color: customColor }),
    );
  });

  it('applies textTransform correctly', () => {
    const { getByText } = render(
      <Text textTransform="uppercase">Uppercase</Text>,
    );
    const textElement = getByText('Uppercase');

    expect(textElement.props.style).toEqual(
      expect.objectContaining({ textTransform: 'uppercase' }),
    );
  });
});

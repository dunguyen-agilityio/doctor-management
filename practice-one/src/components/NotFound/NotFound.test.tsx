import React from 'react';
import { Image, Text } from 'react-native';

import { render } from '@testing-library/react-native';

import { COLORS } from '@/constants';

import NotFound from './index';

describe('NotFound Component', () => {
  const defaultTitle = 'No Foods Found';
  const defaultDescription = `You don't save any food. Go ahead, search\nand save your favorite food`;

  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(<NotFound />);

    // Check if the default title is rendered
    expect(getByText(defaultTitle)).toBeTruthy();

    // Check if the default description is rendered
    expect(getByText(defaultDescription)).toBeTruthy();

    // Check if the container and header styles are applied
    const container = getByTestId('not-found-container');
    expect(container.props.style).toEqual({
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: '100%',
    });

    const header = getByTestId('not-found-header');
    expect(header.props.style).toEqual({
      gap: 24,
      alignItems: 'center',
    });

    // Check if the title and description styles are applied
    const title = getByText(defaultTitle);
    expect(title.props.style).toEqual({
      marginTop: 24,
      color: '#696969',
      fontSize: 22,
      fontWeight: '500',
      lineHeight: 31,
    });

    const description = getByText(defaultDescription);
    expect(description.props.style).toEqual({
      fontSize: 13,
      color: COLORS.GRAY,
      textAlign: 'center',
    });
  });

  it('renders correctly with custom props', () => {
    const customTitle = 'Custom Title';
    const customDescription = 'Custom Description';
    const CustomImage = () => <Image testID="not-found-image" />;

    const { getByText, getByTestId } = render(
      <NotFound
        title={customTitle}
        description={customDescription}
        image={<CustomImage />}
      />,
    );

    // Check if the custom title, description, and image are rendered
    expect(getByText(customTitle)).toBeTruthy();
    expect(getByText(customDescription)).toBeTruthy();
    expect(getByTestId('not-found-image')).toBeTruthy();
  });

  it('renders the default image when no custom image is provided', () => {
    const { getByTestId } = render(<NotFound />);

    // Check if the default image is rendered
    const defaultImage = getByTestId('not-found-image');
    expect(defaultImage).toBeTruthy();
  });
});

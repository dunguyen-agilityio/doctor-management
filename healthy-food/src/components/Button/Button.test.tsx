import { fireEvent, render } from '@testing-library/react-native';

import React from 'react';

import { COLOR } from '@/constants';

import Button from './index';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    expect(getByRole('button')).toBeTruthy();
  });

  it('displays the loading indicator when isLoading is true', () => {
    const { getByTestId, queryByText } = render(
      <Button isLoading>Click Me</Button>,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(queryByText('Click Me')).toBeNull(); // Text should not appear when loading
  });

  it('calls onPress when clicked', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Button onPress={onPressMock}>Click Me</Button>,
    );

    fireEvent.press(getByRole('button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles for "icon" variant', () => {
    const { getByRole } = render(<Button variant="icon" width={50} />);
    expect(getByRole('button').props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: 50,
          backgroundColor: COLOR.LIGHT_GREEN,
        }),
      ]),
    );
  });

  it('applies default background color if none is provided', () => {
    const { getByRole } = render(<Button />);
    expect(getByRole('button').props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: COLOR.LIGHT_GREEN,
        }),
      ]),
    );
  });
});

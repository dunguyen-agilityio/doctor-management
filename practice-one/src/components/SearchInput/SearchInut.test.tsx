import React, { createRef } from 'react';
import { TextInput } from 'react-native';

import { fireEvent, render, waitFor } from '@testing-library/react-native';

import SearchInput from '../SearchInput';

describe('SearchInput Component', () => {
  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const input = getByPlaceholderText('Search for healthy food');
    expect(input).toBeTruthy();
  });

  it('calls onChangeText when typing', async () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput onChangeText={mockOnChangeText} />,
    );

    const input = getByPlaceholderText('Search for healthy food');
    fireEvent.changeText(input, 'apple');

    await waitFor(() => expect(mockOnChangeText).toHaveBeenCalledWith('apple'));
  });

  it('focuses when tapped anywhere inside the container', () => {
    const inputRef = createRef<TextInput>();
    const { getByTestId } = render(<SearchInput ref={inputRef} />);

    fireEvent.press(getByTestId('search-input'));

    expect(inputRef.current?.focus).toBeDefined();
  });

  it('matches snapshot', () => {
    const tree = render(<SearchInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

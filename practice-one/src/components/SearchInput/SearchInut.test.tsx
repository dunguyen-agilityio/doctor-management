import { createRef } from 'react';
import { TextInput } from 'react-native';

import SearchInput from '@/components/SearchInput';

import { fireEvent, render } from '@/utils/test-utils';

describe('SearchInput', () => {
  it('renders correctly', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SearchInput placeholder="Search for healthy food" />,
    );

    expect(getByTestId('search-input')).toBeTruthy();
    expect(getByPlaceholderText('Search for healthy food')).toBeTruthy();
  });

  it('calls onChangeText with debounced input', async () => {
    jest.useFakeTimers();
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput onSearch={onChangeTextMock} />,
    );

    const input = getByPlaceholderText('Search for healthy food');
    fireEvent.changeText(input, 'apple');

    jest.advanceTimersByTime(500);

    expect(onChangeTextMock).toHaveBeenCalledWith('apple');
  });

  it('calls onPress when tapped', () => {
    const onSearchMock = jest.fn();
    const { getByTestId } = render(
      <SearchInput onSearch={onSearchMock} query="abc" />,
    );

    fireEvent.press(getByTestId('clear-button'));

    expect(onSearchMock).toHaveBeenCalledWith('');
  });

  it('exposes focus and clear methods via ref', () => {
    const ref = createRef<{ focus: () => void; clear: () => void }>();
    render(<SearchInput ref={ref} />);

    // Ensure ref is assigned
    expect(ref.current).toBeTruthy();
    expect(typeof ref.current?.focus).toBe('function');
    expect(typeof ref.current?.clear).toBe('function');
  });

  it('calls focus and clear methods on TextInput ref', () => {
    const ref = createRef<{ focus: () => void; clear: () => void }>();
    render(<SearchInput ref={ref} />);

    // Spy on TextInput methods
    const focusSpy = jest.spyOn(TextInput.prototype, 'focus');
    const clearSpy = jest.spyOn(TextInput.prototype, 'clear');

    ref.current?.focus();

    expect(focusSpy).toHaveBeenCalled();

    ref.current?.clear();

    expect(clearSpy).toHaveBeenCalled();

    // Cleanup spies
    focusSpy.mockRestore();
    clearSpy.mockRestore();
  });
});

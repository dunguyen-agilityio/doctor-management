import React from 'react';
import { Button, Text, View } from 'react-native';

import { fireEvent, render } from '@testing-library/react-native';

import Toggle from './index';

describe('Toggle Component', () => {
  it('renders children with initial state (isToggle: false)', () => {
    const mockChildren = jest.fn(({ isToggle }) => (
      <Text>{isToggle ? 'On' : 'Off'}</Text>
    ));

    render(<Toggle>{mockChildren}</Toggle>);

    // Check if children are called with the correct initial state
    expect(mockChildren).toHaveBeenCalledWith(
      expect.objectContaining({
        isToggle: false,
      }),
    );

    // Check if the rendered output matches the initial state
    const { getByText } = render(<Toggle>{mockChildren}</Toggle>);
    expect(getByText('Off')).toBeTruthy();
  });

  it('toggles state when the toggle function is called', () => {
    const mockChildren = jest.fn(({ isToggle, toggle }) => (
      <Button onPress={toggle} title={isToggle ? 'On' : 'Off'} />
    ));

    const { getByText } = render(<Toggle>{mockChildren}</Toggle>);

    // Initial state should be "Off"
    expect(getByText('Off')).toBeTruthy();

    // Simulate a click to toggle the state
    fireEvent.press(getByText('Off'));

    // State should now be "On"
    expect(getByText('On')).toBeTruthy();

    // Simulate another click to toggle the state back
    fireEvent.press(getByText('On'));

    // State should now be "Off"
    expect(getByText('Off')).toBeTruthy();
  });

  it('updates state when setIsToggle is called', () => {
    const mockChildren = jest.fn(({ isToggle, setIsToggle }) => (
      <View>
        <Button onPress={() => setIsToggle(true)} title="Turn On" />
        <Text>{isToggle ? 'On' : 'Off'}</Text>
      </View>
    ));

    const { getByText } = render(<Toggle>{mockChildren}</Toggle>);

    // Initial state should be "Off"
    expect(getByText('Off')).toBeTruthy();

    // Simulate a click to set the state to true
    fireEvent.press(getByText('Turn On'));

    // State should now be "On"
    expect(getByText('On')).toBeTruthy();
  });
});

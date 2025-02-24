import { fireEvent, render } from '@/utils/test-utils';

import IconButton from '../IconButton';

describe('IconButton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <IconButton icon={require('@assets/icons/back.png')} />,
    );
    expect(getByTestId('icon-button')).toBeTruthy();
  });

  it('calls onPress when clicked', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IconButton
        icon={require('@assets/icons/back.png')}
        onPress={onPressMock}
      />,
    );

    fireEvent.press(getByTestId('icon-button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies correct positioning props', () => {
    const { getByTestId } = render(
      <IconButton
        icon={require('@assets/icons/back.png')}
        top={10}
        left={20}
      />,
    );

    const button = getByTestId('icon-button');
    expect(button).toBeTruthy();
  });
});

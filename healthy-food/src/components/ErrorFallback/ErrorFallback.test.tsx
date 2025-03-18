import ErrorFallback from '@/components/ErrorFallback';

import { fireEvent, render } from '@/utils/test-utils';

describe('ErrorFallback', () => {
  it('renders correctly with an error message', () => {
    const error = new Error('Test error message');
    const { getByText, getByTestId } = render(<ErrorFallback error={error} />);

    expect(getByTestId('error-fallback')).toBeTruthy();
    expect(getByText('Something went wrong:')).toBeTruthy();
    expect(getByText('Test error message')).toBeTruthy();
  });

  it('displays the retry button when onRetry is provided', () => {
    const error = new Error('Retry error');
    const { getByText } = render(
      <ErrorFallback error={error} onRetry={() => {}} />,
    );

    expect(getByText('Try Again')).toBeTruthy();
  });

  it('calls onRetry when the button is pressed', () => {
    const error = new Error('Retry test error');
    const onRetryMock = jest.fn();
    const { getByText } = render(
      <ErrorFallback error={error} onRetry={onRetryMock} />,
    );

    fireEvent.press(getByText('Try Again'));

    expect(onRetryMock).toHaveBeenCalled();
  });
});

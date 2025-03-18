// Adjust path
import { debounce } from '../debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock timers
    jest.clearAllMocks(); // Reset mocks
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers
  });

  it('delays function execution by the specified delay', () => {
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc('test');
    expect(mockFunc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500); // Halfway through delay
    expect(mockFunc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500); // Full delay
    expect(mockFunc).toHaveBeenCalledWith('test');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('resets timer on multiple calls within delay', () => {
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc('first');
    jest.advanceTimersByTime(500); // Halfway
    debouncedFunc('second'); // Reset timer
    jest.advanceTimersByTime(500); // Still not enough time
    expect(mockFunc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500); // Full delay from last call
    expect(mockFunc).toHaveBeenCalledWith('second');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('passes multiple arguments correctly', () => {
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc('arg1', 42, { key: 'value' });
    jest.advanceTimersByTime(1000);

    expect(mockFunc).toHaveBeenCalledWith('arg1', 42, { key: 'value' });
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('clears previous timer before setting new one', () => {
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc('first');
    jest.advanceTimersByTime(500);
    debouncedFunc('second');
    jest.advanceTimersByTime(500); // 1000ms from first, 500ms from second
    expect(mockFunc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500); // 1000ms from second
    expect(mockFunc).toHaveBeenCalledWith('second');
  });

  it('works with zero delay (immediate execution after event loop)', () => {
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 0);

    debouncedFunc('test');
    expect(mockFunc).not.toHaveBeenCalled(); // Not immediate

    jest.advanceTimersByTime(0); // Move to next tick
    expect(mockFunc).toHaveBeenCalledWith('test');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('handles no arguments correctly', () => {
    const mockFunc = jest.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc();
    jest.advanceTimersByTime(1000);

    expect(mockFunc).toHaveBeenCalledWith(); // No args
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});

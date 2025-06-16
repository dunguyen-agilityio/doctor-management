import { fireEvent, render, screen } from '@utils-test'

import { useLocalSearchParams } from 'expo-router'

import SearchInput from '..'

jest.mock('expo-router', () => ({
  router: {
    setParams: jest.fn(),
  },
  useLocalSearchParams: jest.fn(),
}))

describe('SearchInput', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({ existing: 'param' })
  })

  let mockChangeText: jest.Mock

  beforeEach(() => {
    mockChangeText = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders Input with correct props and Search icon', () => {
    const { toJSON } = render(<SearchInput placeholder="Search..." onChangeText={mockChangeText} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('calls handleSearch with debounced onChangeText', () => {
    render(<SearchInput onChangeText={mockChangeText} />)

    const input = screen.getByTestId('input')
    fireEvent.changeText(input, 'test query')
    jest.advanceTimersByTime(500)

    expect(mockChangeText).toHaveBeenCalledWith('test query')
  })

  it('handles empty query', () => {
    render(<SearchInput onChangeText={mockChangeText} />)

    const input = screen.getByTestId('input')
    fireEvent.changeText(input, '')
    jest.advanceTimersByTime(500)

    expect(mockChangeText).toHaveBeenCalledWith('')
  })
})

import { fireEvent, render, screen } from '@utils-test'

import { router, useLocalSearchParams } from 'expo-router'

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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders Input with correct props and Search icon', () => {
    const { toJSON } = render(<SearchInput placeholder="Search..." />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('calls handleSearch with debounced onChangeText', () => {
    render(<SearchInput />)

    const input = screen.getByTestId('input')
    fireEvent.changeText(input, 'test query')
    jest.advanceTimersByTime(500)

    expect(router.setParams).toHaveBeenCalledWith({
      existing: 'param',
      query: 'test query',
      page: '1',
    })
  })

  it('passes existing params to router.setParams', () => {
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({ filter: 'active' })
    render(<SearchInput />)

    const input = screen.getByTestId('input')
    fireEvent.changeText(input, 'new query')
    jest.advanceTimersByTime(500)
    expect(router.setParams).toHaveBeenCalledWith({
      filter: 'active',
      query: 'new query',
      page: '1',
    })
  })

  it('handles empty query', () => {
    render(<SearchInput />)

    const input = screen.getByTestId('input')
    fireEvent.changeText(input, '')
    jest.advanceTimersByTime(500)

    expect(router.setParams).toHaveBeenCalledWith({
      existing: 'param',
      query: '',
      page: '1',
    })
  })
})

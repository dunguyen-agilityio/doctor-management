import { X } from '@/icons'
import { fireEvent, render, screen } from '@utils-test'

import { Input } from '..'

const MockIcon = () => <X testID="mock-icon" />

describe('Input', () => {
  const mockProps = {
    value: 'test',
    onChangeText: jest.fn(),
    placeholder: 'Enter text',
  }
  const mockErrorMessage = 'Invalid input'
  const mockOnFocus = jest.fn()
  const mockOnEndEdit = jest.fn()
  const mockOnEndEditing = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without icon', () => {
    render(<Input {...mockProps} />)

    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
    expect(screen.queryByTestId('left-icon')).toBeNull()
    expect(screen.queryByText(mockErrorMessage)).toBeNull()
    expect(screen.getByPlaceholderText('Enter text')).toHaveStyle({ paddingLeft: 16 })
  })

  it('matches snapshot without icon', () => {
    const { toJSON } = render(<Input {...mockProps} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('renders with icon', () => {
    render(<Input {...mockProps} leftIcon={MockIcon} />)

    expect(screen.getByTestId('mock-icon')).toBeTruthy()
  })

  it('matches snapshot with icon', () => {
    const { toJSON } = render(<Input {...mockProps} leftIcon={MockIcon} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('renders error message with red border', () => {
    render(<Input {...mockProps} errorMessage={mockErrorMessage} />)

    expect(screen.getByText(mockErrorMessage)).toHaveStyle({ color: 'red' })
  })

  it('calls onFocus and tracks value', () => {
    render(<Input {...mockProps} onFocus={mockOnFocus} />)

    fireEvent(screen.getByPlaceholderText('Enter text'), 'focus')
    expect(mockOnFocus).toHaveBeenCalled()
  })

  it('forwards onEndEditing prop', () => {
    render(<Input {...mockProps} onEndEditing={mockOnEndEditing} />)

    fireEvent(screen.getByPlaceholderText('Enter text'), 'endEditing', {
      nativeEvent: { text: 'test' },
    })
    expect(mockOnEndEditing).toHaveBeenCalled()
  })
})

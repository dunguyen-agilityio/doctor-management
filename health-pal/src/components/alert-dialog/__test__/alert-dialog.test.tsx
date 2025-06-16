import { fireEvent, render, screen } from '@utils-test'

import CustomAlertDialog from '..'

describe('CustomAlertDialog', () => {
  const mockTitle = 'Confirm Action'
  const mockDescription = 'Are you sure you want to proceed?'
  const mockOnConfirm = jest.fn()
  const mockActionTitle = 'Proceed'

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    ;(console.warn as jest.Mock).mockRestore()
  })

  it('renders with title and confirm button', () => {
    render(<CustomAlertDialog open title={mockTitle} onConfirm={mockOnConfirm} />)
    expect(screen.getByText(mockTitle)).toBeTruthy()
    expect(screen.getByTestId('confirm-button')).toHaveTextContent('OK')
    expect(screen.queryByTestId('cancel-button')).toBeNull()
  })

  it('renders description when provided', () => {
    render(
      <CustomAlertDialog
        open
        title={mockTitle}
        description={mockDescription}
        onConfirm={mockOnConfirm}
      />,
    )

    expect(screen.getByText(mockDescription)).toBeTruthy()
  })

  it('renders cancel button when cancelable is true', () => {
    render(<CustomAlertDialog title={mockTitle} open onConfirm={mockOnConfirm} cancelable />)

    expect(screen.getByTestId('cancel-button')).toHaveTextContent('Cancel')
  })

  it('triggers onConfirm when confirm button is pressed', () => {
    render(<CustomAlertDialog open title={mockTitle} onConfirm={mockOnConfirm} />)

    fireEvent.press(screen.getByTestId('confirm-button'))

    expect(mockOnConfirm).toHaveBeenCalled()
  })

  it('uses custom actionTitle for confirm button', () => {
    render(
      <CustomAlertDialog
        open
        title={mockTitle}
        onConfirm={mockOnConfirm}
        actionTitle={mockActionTitle}
      />,
    )

    expect(screen.getByTestId('confirm-button')).toHaveTextContent(mockActionTitle)
  })
})

import { render, screen } from '@utils-test'

import { useToastState } from '@tamagui/toast'

import Toast from '..'

jest.mock('@tamagui/toast', () => ({
  ...jest.requireActual('@tamagui/toast'),
  useToastState: jest.fn(),
}))

describe('Toast', () => {
  const mockTitle = 'Success'
  const mockMessage = 'Operation completed successfully'
  const mockId = 'toast-1'
  const mockDuration = 3000
  const mockViewportName = 'viewport'
  const mockClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useToastState as jest.Mock).mockReturnValue({
      id: mockId,
      title: mockTitle,
      message: mockMessage,
      duration: mockDuration,
      viewportName: mockViewportName,
      type: 'success',
      isHandledNatively: false,
      close: mockClose,
    })
  })

  it('renders null when no toast is present', () => {
    ;(useToastState as jest.Mock).mockReturnValue(null)

    render(<Toast />)

    expect(screen.queryByText(mockTitle)).toBeNull()
  })

  it('renders null when toast is handled natively', () => {
    ;(useToastState as jest.Mock).mockReturnValue({
      id: mockId,
      title: mockTitle,
      isHandledNatively: true,
    })

    render(<Toast />)

    expect(screen.queryByText(mockTitle)).toBeNull()
  })

  it('does not render message when not provided', async () => {
    ;(useToastState as jest.Mock).mockReturnValue({
      id: mockId,
      title: mockTitle,
      message: '',
      type: 'success',
      isHandledNatively: false,
    })

    render(<Toast />)

    expect(screen.getByText(mockTitle)).toBeTruthy()
    expect(screen.queryByText(mockMessage)).toBeNull()
  })
})

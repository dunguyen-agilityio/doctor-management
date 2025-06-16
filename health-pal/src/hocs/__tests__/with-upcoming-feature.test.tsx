import { act, fireEvent, render, screen } from '@utils-test'

import { ButtonProps } from 'tamagui'

import { Button } from '@/components'

import { withUpcomingFeature } from '../with-upcoming-feature'

const TestComponent = ({ onPress, children }: ButtonProps) => (
  <Button testID="test-button" onPress={onPress}>
    {children}
  </Button>
)

const TestComponentWithUpcoming = withUpcomingFeature(TestComponent)

describe('withUpcomingFeature', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const setup = () => render(<TestComponentWithUpcoming>Test Button</TestComponentWithUpcoming>)

  it('renders wrapped component with passed props', () => {
    setup()
    const button = screen.getByTestId('test-button')
    expect(button).toBeTruthy()
    expect(button).toHaveTextContent('Test Button')
  })

  it('renders AlertDialog when onPress is triggered', () => {
    setup()
    const button = screen.getByTestId('test-button')
    act(() => {
      fireEvent.press(button)
    })
    expect(screen.getByTestId('alert-dialog-upcoming')).toBeTruthy()
  })

  it('matches snapshot', () => {
    const { toJSON } = setup()
    expect(toJSON()).toMatchSnapshot()
  })
})

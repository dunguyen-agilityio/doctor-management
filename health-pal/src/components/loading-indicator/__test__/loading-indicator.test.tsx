import { render, screen } from '@utils-test'

// Adjust path

import LoadingIndicator from '../'

describe('LoadingIndicator', () => {
  it('renders spinner without modal when fullScreen is false', () => {
    render(<LoadingIndicator />)

    expect(screen.getByTestId('loader-icon')).toBeTruthy()
  })

  it('matches snapshot without modal', () => {
    const { toJSON } = render(<LoadingIndicator />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('renders spinner inside modal when fullScreen is true', () => {
    render(<LoadingIndicator fullScreen />)

    expect(screen.getByTestId('loader-icon')).toBeTruthy()
  })

  it('matches snapshot with modal', () => {
    const { toJSON } = render(<LoadingIndicator fullScreen />)
    expect(toJSON()).toMatchSnapshot()
  })
})

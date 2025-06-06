import { render } from '@utils-test'

// Adjust path

import ErrorState from '..'

describe('ErrorState', () => {
  it('matches snapshot with default props', () => {
    const { toJSON } = render(<ErrorState />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot with custom title and message', () => {
    const { toJSON } = render(
      <ErrorState title="Network Error" message="Failed to connect to the server." />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot with onRetry button', () => {
    const onRetry = jest.fn()
    const { toJSON } = render(<ErrorState onRetry={onRetry} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot without onRetry button', () => {
    const { toJSON } = render(<ErrorState title="Custom Error" message="Please try again later." />)
    expect(toJSON()).toMatchSnapshot()
  })
})

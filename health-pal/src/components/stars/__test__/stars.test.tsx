import { render, screen } from '@utils-test'

import Stars from '..'

describe('Stars', () => {
  it('renders stars value and icons with default props', () => {
    render(<Stars stars={4.5} />)

    const text = screen.getByTestId('stars-text')
    expect(text).toHaveTextContent('4.5')
    expect(text).toHaveStyle({
      fontFamily: 'Inter_600SemiBold',
      color: '#1c2a3a',
      fontSize: 12,
      lineHeight: 18,
    })
  })

  it('renders correct number of stars with custom max', () => {
    render(<Stars stars={4.5} max={5} />)
    expect(screen.getByTestId('stars-text')).toHaveTextContent('4.5')
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`star-${i}`)).toBeTruthy()
    }
    expect(screen.queryByTestId('star-5')).toBeNull()
  })
})

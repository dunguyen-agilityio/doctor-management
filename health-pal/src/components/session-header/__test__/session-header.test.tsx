import { render, screen } from '@utils-test'

import { Stack } from 'tamagui'

import SessionHeader from '..'

describe('SessionHeader', () => {
  it('renders title and default See all text', () => {
    render(<SessionHeader title="Upcoming Sessions" />)

    const heading = screen.getByTestId('heading')
    expect(heading).toHaveTextContent('Upcoming Sessions')
    expect(heading).toHaveStyle({
      fontFamily: 'Inter_700Bold',
      fontSize: 16,
      lineHeight: 24,
      color: '#1c2a3a',
    })

    const seeAllText = screen.getByText('See all')
    expect(seeAllText).toHaveStyle({
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      lineHeight: 24,
      color: '#1c2a3a',
    })
  })

  it('renders with custom seeAllWrapper', () => {
    const CustomWrapper = ({ children }: React.PropsWithChildren) => (
      <Stack testID="custom-wrapper">{children}</Stack>
    )
    render(<SessionHeader title="Past Sessions" seeAllWrapper={CustomWrapper} />)

    expect(screen.getByTestId('heading')).toHaveTextContent('Past Sessions')
    const wrapper = screen.getByTestId('custom-wrapper')
    expect(wrapper).toBeTruthy()
    const seeAllText = screen.getByText('See all')
    expect(seeAllText).toBeTruthy()
    expect(wrapper).toContainElement(seeAllText)
  })

  it('renders empty title correctly', () => {
    render(<SessionHeader title="" />)

    expect(screen.getByTestId('heading')).toHaveTextContent('')
    expect(screen.getByText('See all')).toBeTruthy()
  })
})

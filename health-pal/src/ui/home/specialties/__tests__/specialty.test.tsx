import Heart from '@/icons/heart'
import { render, screen } from '@utils-test'

import { SvgProps } from 'react-native-svg'

import Specialty from '../specialty'

const DummyIcon = (props: SvgProps) => <Heart {...props} testID="dummy-icon" />

describe('Specialty', () => {
  const defaultProps = {
    icon: DummyIcon,
    name: 'Cardiology',
    value: 'cardiology',
    color: '#E0F7FA',
  }

  it('renders icon and name', () => {
    render(<Specialty {...defaultProps} />)

    expect(screen.getByTestId('dummy-icon')).toBeTruthy()
    expect(screen.getByText('Cardiology')).toBeTruthy()
  })

  it('renders link with correct params and accessibility attributes', () => {
    render(<Specialty {...defaultProps} />)

    const link = screen.getByRole('link')

    expect(link).toHaveProp('href', '/doctors/cardiology')
    expect(link).toHaveProp('aria-label', 'View doctors specializing in Cardiology')
    expect(link).toHaveProp(
      'accessibilityHint',
      'Navigates to a list of doctors for this specialty',
    )
    expect(link).toHaveProp('tabIndex', 0)
  })
})

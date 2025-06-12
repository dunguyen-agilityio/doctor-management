import { MOCK_HOSPITALS } from '@/mocks/hospital'
import { render, screen } from '@utils-test'

import HospitalCard from '..'

describe('HospitalCard', () => {
  const mockProps = {
    ...MOCK_HOSPITALS[0],
    name: 'City Hospital',
    address: '123 Main St',
    rating: 4,
    reivewCouter: 100,
  }

  it('renders with default props', () => {
    render(<HospitalCard {...mockProps} />)

    expect(screen.getByText('City Hospital')).toBeTruthy()
    expect(screen.getByText('123 Main St')).toBeTruthy()
    expect(screen.getByText('(100 Reviews)')).toBeTruthy()
    expect(screen.getByText('2.5 km/40min')).toBeTruthy()
    expect(screen.getByTestId('favorite-button')).toBeTruthy()
    expect(screen.getByTestId('location-icon')).toBeTruthy()
    expect(screen.getByTestId('routing-icon')).toBeTruthy()
    expect(screen.getByTestId('hospital-icon')).toBeTruthy()
    expect(screen.getByTestId('stars')).toBeTruthy()
  })

  it('matches snapshot with default props', () => {
    const { toJSON } = render(<HospitalCard {...mockProps} />)
    expect(toJSON()).toMatchSnapshot()
  })
})

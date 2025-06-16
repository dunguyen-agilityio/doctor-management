import { render, screen } from '@utils-test'

import { SPECIALTY_LIST } from '@/constants'

import Specialties from '..'

describe('Specialties', () => {
  it('renders 8 specialties from SPECIALTY_LIST', () => {
    render(<Specialties />)

    const items = screen.getAllByTestId('specialty')
    expect(items).toHaveLength(8)

    SPECIALTY_LIST.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeTruthy()
    })
  })

  it('matches snapshot', () => {
    const { toJSON } = render(<Specialties />)
    expect(toJSON()).toMatchSnapshot()
  })
})

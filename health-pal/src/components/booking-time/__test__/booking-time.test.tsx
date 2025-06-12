import { render } from '@utils-test'

import BookingTime from '..'

jest.mock('dayjs')

describe('Booking Time Component', () => {
  it('should render correctly', () => {
    const { toJSON } = render(<BookingTime onChange={jest.fn()} />)
    expect(toJSON()).toMatchSnapshot()
  })

  //   it('should have a specific text', () => {
  //     const { getByText } = render(<BookingTime />)
  //     expect(getByText('Booking Time Component')).toBeTruthy()
  //   })
})

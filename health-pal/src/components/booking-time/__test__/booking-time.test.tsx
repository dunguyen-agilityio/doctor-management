import { render } from '@utils-test'

import dayjs from 'dayjs'

import { TIME_SLOTS } from '@app/constants/booking'

import BookingTime from '..'

jest.mock('dayjs')

const available = TIME_SLOTS.reduce((prev, time) => ({ ...prev, [time]: true }), {})

describe('Booking Time Component', () => {
  it('should render correctly', () => {
    const { toJSON } = render(
      <BookingTime available={available} date={dayjs()} onChange={jest.fn()} />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  //   it('should have a specific text', () => {
  //     const { getByText } = render(<BookingTime />)
  //     expect(getByText('Booking Time Component')).toBeTruthy()
  //   })
})

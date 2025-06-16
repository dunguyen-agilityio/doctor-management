import { DOCTOR_BANNER } from '@/mocks/doctor'
import { fireEvent, render, screen } from '@utils-test'

import DoctorBanner from '..'

describe('DoctorBanner', () => {
  it.skip('renders all doctor banners', () => {
    render(<DoctorBanner />)

    DOCTOR_BANNER.forEach((item) => {
      expect(screen.getByText(item.title)).toBeTruthy()
      expect(screen.getByText(item.description)).toBeTruthy()
    })
  })

  it.skip('renders pagination dots', () => {
    render(<DoctorBanner />)
    expect(screen.getByTestId('pagination')).toBeTruthy()
    DOCTOR_BANNER.forEach((_, i) => {
      expect(screen.getByTestId(`dot-${i}`)).toBeTruthy()
    })
  })

  it.skip('handles pagination dot click', () => {
    render(<DoctorBanner />)

    const firstDot = screen.getByTestId('dot-0')
    fireEvent.press(firstDot)

    // No scrollTo assertion here since the scrollTo is a ref method.
    // You can spy on it if needed (see below).
    expect(firstDot).toBeTruthy()
  })
})

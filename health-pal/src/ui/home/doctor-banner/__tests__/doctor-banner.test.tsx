import { DOCTOR_BANNER } from '@/mocks/doctor'
import { fireEvent, render, screen } from '@utils-test'

import DoctorBanner from '..'

describe('DoctorBanner', () => {
  it('renders all doctor banners', () => {
    render(<DoctorBanner />)

    DOCTOR_BANNER.forEach((item) => {
      expect(screen.getByText(item.title)).toBeTruthy()
      expect(screen.getByText(item.description)).toBeTruthy()
    })
  })

  it('renders pagination dots', () => {
    render(<DoctorBanner />)
    expect(screen.getByTestId('pagination')).toBeTruthy()
    DOCTOR_BANNER.forEach((_, i) => {
      expect(screen.getByTestId(`dot-${i}`)).toBeTruthy()
    })
  })

  it('handles pagination dot click', () => {
    render(<DoctorBanner />)

    const firstDot = screen.getByTestId('dot-0')
    fireEvent.press(firstDot)
    expect(firstDot).toBeTruthy()
  })
})

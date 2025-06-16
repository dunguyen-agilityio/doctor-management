import { render, screen } from '@utils-test'

import DoctorBannerCard from '../doctor-banner-card'

describe('DoctorBannerCard', () => {
  const defaultProps = {
    title: 'Top Doctors',
    description: 'Find the best doctors near you',
  }

  it('renders default image and text content', () => {
    render(<DoctorBannerCard {...defaultProps} />)

    expect(screen.getByText('Top Doctors')).toBeTruthy()
    expect(screen.getByText('Find the best doctors near you')).toBeTruthy()
    expect(screen.getByTestId('banner-image')).toBeTruthy()
  })

  it('uses custom image when provided', () => {
    const customImage = 'https://example.com/banner.png'

    render(<DoctorBannerCard {...defaultProps} image={customImage} />)

    const image = screen.getByTestId('banner-image')
    expect(image).toHaveProp(
      'source',
      expect.arrayContaining([{ uri: 'https://example.com/banner.png' }]),
    )
  })

  it('matches snapshot', () => {
    const { toJSON } = render(<DoctorBannerCard {...defaultProps} />)
    expect(toJSON()).toMatchSnapshot()
  })
})

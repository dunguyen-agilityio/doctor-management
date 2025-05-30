import { render } from '@utils-test'

// Adjust path

import { TDoctorCard } from '@app/models/doctor'

import DoctorCard from '../'

describe('DoctorCard', () => {
  const mockDoctorCard: TDoctorCard = {
    id: 1,
    documentId: 'doc-1',
    name: 'Dr. John Smith',
    avatar: 'https://example.com/avatar.jpg',
    specialty: 'Cardiology',
    address: '123 Heart St, Health City',
    rating: 4.8,
    reviewCounter: 5,
  }

  // Snapshot Tests
  it('matches snapshot with default props', () => {
    const { toJSON } = render(<DoctorCard {...mockDoctorCard} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot with actionable=false', () => {
    const { toJSON } = render(<DoctorCard {...mockDoctorCard} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot with missing optional fields', () => {
    const minimalProps: TDoctorCard = {
      id: 2,
      documentId: 'doc-2',
      name: 'Dr. Jane Doe',
      avatar: '',
      specialty: '',
      address: '',
      rating: 0,
      reviewCounter: 0,
    }
    const { toJSON } = render(<DoctorCard {...minimalProps} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot with full data and actionable=true', () => {
    const { toJSON } = render(<DoctorCard {...mockDoctorCard} />)
    expect(toJSON()).toMatchSnapshot()
  })
})

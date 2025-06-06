import { render } from '@utils-test'

import { MOCK_PATIENT } from '@app/mocks/patient'

import ReviewCard from '..'

// Adjust path

describe('ReviewCard', () => {
  const reviewData = {
    name: 'John Doe',
    rating: 4.5,
    comment: 'Great experience!',
    image: 'https://example.com/avatar.jpg',
    patient: MOCK_PATIENT,
    id: 1,
    documentId: 'doc-1',
  }

  it('matches snapshot', () => {
    const { toJSON } = render(<ReviewCard {...reviewData} />)
    expect(toJSON()).toMatchSnapshot()
  })
})

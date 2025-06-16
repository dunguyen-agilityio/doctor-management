import { MOCK_REVIEWS } from '@/mocks/review'
import { Review } from '@/models/review'

import { formatReview } from '../review'

describe('formatReview', () => {
  it('should return review merged with MOCK_REVIEWS[0]', () => {
    const input = new Review({
      id: 999,
      name: 'Test User',
      rating: 3,
      comment: 'Test comment',
      documentId: 'doc-x',
    } as Review)

    const result = formatReview(input)

    expect(result).toEqual(expect.objectContaining(MOCK_REVIEWS[0]))
  })
})

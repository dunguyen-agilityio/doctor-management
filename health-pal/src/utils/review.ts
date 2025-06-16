import { MOCK_REVIEWS } from '@/mocks/review'
import { Review, ReviewData } from '@/models/review'

export const formatReview = (data: Review): ReviewData => ({
  ...data,
  ...MOCK_REVIEWS[0],
})

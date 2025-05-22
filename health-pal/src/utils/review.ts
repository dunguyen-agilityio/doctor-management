import { Review, ReviewData } from '@app/models/review'

export const formatReview = (data: Review): ReviewData => ({
  ...data,
  name: 'Emily Anderson',
  rating: 5,
  comment:
    'Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to',
  image: require('@/assets/images/user01.png'),
})

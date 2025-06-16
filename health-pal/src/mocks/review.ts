import { Review } from '@/models/review'

export const MOCK_REVIEWS = [
  {
    name: 'Emily Anderson',
    rating: 5,
    comment:
      'Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to',
    documentId: 'doc-1',
    id: 1,
  },
  {
    name: 'Emily Anderson',
    rating: 5,
    comment:
      'Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to',
    image: require('@assets/images/user01.png'),
    documentId: 'doc-2',
    id: 2,
  },
  {
    name: 'Emily Anderson',
    rating: 5,
    comment:
      'Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to',
    image: require('@assets/images/user01.png'),
    documentId: 'doc-3',
    id: 3,
  },
  {
    name: 'Emily Anderson',
    rating: 5,
    comment:
      'Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to',
    image: require('@assets/images/user01.png'),
    documentId: 'doc-4',
    id: 4,
  },
] as Review[]

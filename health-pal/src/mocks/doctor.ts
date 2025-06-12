import { TDoctorData } from '@/models/doctor'

import { TDoctorBanner } from '@/types/doctor'

import { MOCK_HOSPITALS } from './hospital'
import { MOCK_REVIEWS } from './review'
import { MOCK_SPECIALTY } from './specialty'
import { MOCK_USER } from './user'

export const MOCK_DOCTORS: TDoctorData[] = [
  {
    ...MOCK_USER,
    documentId: 'doc_001',
    id: 1,
    name: 'Dr. John Smith',
    reviewCounter: 5,
    rating: 4.8,
    clinic: MOCK_HOSPITALS[0],
    dateOfBirth: new Date('1980-01-01'),
    email: 'john.smith@example.com',
    specialty: MOCK_SPECIALTY,
    avatar: {
      id: 1,
      url: 'https://picsum.photos/id/91/3504/2336',
    },
    reviews: MOCK_REVIEWS,
    favoriteId: 'fav_001',
    users_permissions_user: MOCK_USER,
  },
]

export const DOCTOR_BANNER: TDoctorBanner[] = [...new Array(6).keys()].map(() => ({
  title: `Looking for\nSpecialist Doctors?`,
  description: `Schedule an appointment with\nour top doctors.`,
}))

import { TDoctorCard } from '@app/models/doctor'
import { TDoctorBanner } from '@app/types/doctor'

export const MOCK_DOCTORS: TDoctorCard[] = [
  {
    documentId: 'doc_001',
    id: 1,
    name: 'Dr. John Smith',
    avatar: 'https://picsum.photos/id/91/3504/2336',
    specialty: 'Dentistry',
    address: '123 Smile St, Dental City, DC 12345',
    reviewCounter: 5,
    rating: 4.8,
  },
  {
    documentId: 'doc_002',
    id: 2,
    name: 'Dr. Emily Carter',
    avatar: 'https://picsum.photos/id/91/3504/2336',
    specialty: 'Cardiology',
    address: '456 Heart Ave, Cardio Town, CT 67890',
    reviewCounter: 3,
    rating: 4.3,
  },
  {
    documentId: 'doc_003',
    id: 3,
    name: 'Dr. Michael Brown',
    avatar: 'https://picsum.photos/id/91/3504/2336',
    specialty: 'Pulmonology',
    address: '789 Lung Rd, Breath City, BC 23456',
    reviewCounter: 2,
    rating: 4.0,
  },
  {
    documentId: 'doc_004',
    id: 4,
    name: 'Dr. Sarah Davis',
    avatar: 'https://picsum.photos/id/91/3504/2336',
    specialty: 'General',
    address: '101 Health St, Wellness City, WC 34567',
    reviewCounter: 4,
    rating: 4.5,
  },
]

export const DOCTOR_BANNER: TDoctorBanner[] = [...new Array(6).keys()].map(() => ({
  title: `Looking for\nSpecialist Doctors?`,
  description: `Schedule an appointment with\nour top doctors.`,
}))

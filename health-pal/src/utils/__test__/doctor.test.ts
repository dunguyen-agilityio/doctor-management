import { MOCK_DOCTORS } from '@/mocks/doctor'
import { TDoctorData } from '@/models/doctor'

import { formatDoctor } from '../doctor'

const doctor = MOCK_DOCTORS[0]

describe('formatDoctor', () => {
  it('should format doctor data correctly', () => {
    const mockDoctor: TDoctorData = {
      ...doctor,
      clinic: { ...doctor.clinic, address: '123 Clinic St' },
      specialty: { ...doctor.specialty, name: 'Cardiology' },
      users_permissions_user: {
        ...doctor.users_permissions_user,
        name: 'Dr. Smith',
        avatar: { ...doctor.users_permissions_user.avatar, id: 1, url: '/avatar.jpg' },
      },
      rating: 4.5,
      documentId: 'doc123',
      id: 1,
      bio: 'Experienced cardiologist.',
    }

    const result = formatDoctor(mockDoctor)

    expect(result).toEqual({
      name: 'Dr. Smith',
      address: '123 Clinic St',
      avatar: '/avatar.jpg',
      specialty: 'Cardiology',
      documentId: 'doc123',
      id: 1,
      reviewCounter: 100,
      rating: 4.5,
      bio: 'Experienced cardiologist.',
    })
  })

  it('should handle missing avatar and default rating', () => {
    const mockDoctor: TDoctorData = {
      clinic: { ...doctor.clinic, address: '456 Clinic Ave' },
      specialty: { ...doctor.specialty, name: 'Neurology' },
      users_permissions_user: {
        name: 'Dr. Jane',
        avatar: null,
      },
      // rating is omitted
      documentId: 'doc456',
      id: 2,
      bio: 'Neurology specialist.',
    }

    const result = formatDoctor(mockDoctor)

    expect(result).toEqual({
      name: 'Dr. Jane',
      address: '456 Clinic Ave',
      avatar: '',
      specialty: 'Neurology',
      documentId: 'doc456',
      id: 2,
      reviewCounter: 100,
      rating: 2.4,
      bio: 'Neurology specialist.',
    })
  })
})

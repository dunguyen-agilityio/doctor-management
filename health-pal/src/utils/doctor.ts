import { TDoctorCard, TDoctorData } from '@/models/doctor'

export const formatDoctor = ({
  clinic,
  specialty,
  users_permissions_user,
  rating = 2.4,
  documentId,
  id,
  bio,
}: TDoctorData): TDoctorCard => {
  const { avatar, name } = users_permissions_user

  return {
    name,
    address: clinic.address,
    avatar: avatar?.url ?? '',
    specialty: specialty.name,
    documentId,
    id,
    reviewCounter: 100,
    rating,
    bio,
  }
}

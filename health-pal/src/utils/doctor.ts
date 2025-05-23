import { TDoctorCard, TDoctorData } from '@app/models/doctor'

export const formatDoctor = ({
  clinic,
  specialty,
  users_permissions_user,
  rating,
  documentId,
  id,
}: TDoctorData): TDoctorCard => {
  const { avatar, name } = users_permissions_user

  return {
    name,
    address: clinic.address,
    avatar: avatar?.url ?? '',
    specialty: specialty.name,
    documentId,
    id,
    reviewCounter: 0,
    rating,
  }
}

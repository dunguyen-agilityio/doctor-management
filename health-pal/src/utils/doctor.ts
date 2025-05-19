import { DoctorData, TDoctorCard } from '@app/models/doctor'

export const formatDoctor = ({
  clinic,
  specialty,
  users_permissions_user,
  ...rest
}: DoctorData): TDoctorCard => {
  const { avatar, ...user } = users_permissions_user

  return {
    ...user,
    ...rest,
    address: clinic.address,
    avatar: avatar?.url ?? '',
    specialty: specialty.name,
  }
}

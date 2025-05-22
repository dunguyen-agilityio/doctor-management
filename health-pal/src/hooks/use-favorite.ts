import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@app/react-query.config'
import { getClinicFavorite, getDoctorFavorite, getFavorite } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

const useFavorite = <T>(jwt: string, type: FAVORITE_TYPES) => {
  const queryResponse = useQuery({
    queryKey: [`favorite-${type}`],
    queryFn: () => getFavorite<T>(type, jwt),
    placeholderData: (prevData) => prevData,
  })

  return queryResponse
}

export const useDoctorFavorite = (jwt: string) => {
  const queryResponse = useQuery({
    queryKey: QUERY_KEY.DOCTOR_FAVORITE,
    queryFn: () => getDoctorFavorite(jwt),
  })

  return queryResponse
}

export const useHospitalFavorite = (jwt: string) => {
  const queryResponse = useQuery({
    queryKey: QUERY_KEY.CLINIC_FAVORITE,
    queryFn: () => getClinicFavorite(jwt),
  })

  return queryResponse
}

export default useFavorite

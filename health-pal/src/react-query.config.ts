import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const QUERY_KEY = {
  DOCTOR_FAVORITE: ['favorite-doctor'],
  CLINIC_FAVORITE: ['favorite-clinic'],
  DOCTORS: ['doctors'],
}

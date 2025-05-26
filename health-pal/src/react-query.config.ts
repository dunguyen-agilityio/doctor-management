import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const QUERY_KEY = {
  DOCTOR_FAVORITE: ['favorite-doctor'],
  HOSPITAL_FAVORITE: ['favorite-hospital'],
  DOCTORS: ['doctors'],
  DOCTOR: ['doctor'],
}

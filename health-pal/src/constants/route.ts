import { APP_ROUTES } from '@/types/route'

export const APP_TITLES: Record<APP_ROUTES, string> = {
  [APP_ROUTES.DOCTOR_DETAILS]: 'Doctors Details',
  [APP_ROUTES.DOCTOR_LIST]: 'All Doctors',
  [APP_ROUTES.FAVORITE]: 'Favorites',
  [APP_ROUTES.NOTIFICATION]: 'Notification',
  [APP_ROUTES.TAB]: '',
  [APP_ROUTES.BOOKING]: 'Booking Appointment',
  [APP_ROUTES.HOSPITALS]: 'All Hospitals',
  [APP_ROUTES.HOSPITAL_DETAILS]: 'Hospital Details',
  [APP_ROUTES.EDIT_PROFILE]: 'Update Profile Info',
}

export const ROUTES = {
  HOME: '/(app)/(tabs)',
  LOGIN: '/login',
  HOSPITAL: '/hospitals',
  SIGN_UP: '/sign-up',
  FAVORITE: '/(app)/(tabs)/favorite',
  PROFILE_INFO: '/(auth)/profile-info',
  BOOKING: '/booking',
  BOOKINGS: '/(app)/(tabs)/bookings',
  DOCTORS: '/(app)/doctors/[specialty]',
  DOCTOR: '/doctors/details/[id]',
  PROFILE: '/(app)/(tabs)/profile',
  EDIT_PROFILE: '/(app)/edit-profile',
  NOT_FOUND: '/+not-found',
} as const

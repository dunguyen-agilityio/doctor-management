import { APP_ROUTES } from '@app/types/route'

export const APP_TITLES: Record<APP_ROUTES, string> = {
  [APP_ROUTES.DOCTOR_DETAILS]: 'Doctors Details',
  [APP_ROUTES.DOCTOR_LIST]: 'All Doctors',
  [APP_ROUTES.FAVORITE]: 'Favorites',
  [APP_ROUTES.NOTIFICATION]: 'Notification',
  [APP_ROUTES.TAB]: '',
  [APP_ROUTES.BOOKING]: 'Booking Appointment',
  [APP_ROUTES.CLINICS]: 'All Clinics',
  [APP_ROUTES.CLINIC_DETAILS]: 'Clinic Details',
}

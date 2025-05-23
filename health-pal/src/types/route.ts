export enum APP_ROUTES {
  TAB = '(tabs)',
  FAVORITE = 'favorite',
  NOTIFICATION = 'notification',
  DOCTOR_DETAILS = 'details/[id]',
  DOCTOR_LIST = '[specialty]',
  BOOKING = 'booking',
  CLINICS = 'clinics/index',
  CLINIC_DETAILS = 'clinics/[id]',
}

export type AppParamList = {
  [APP_ROUTES.DOCTOR_DETAILS]: { id: string }
}

export enum TAB_ROUTES {
  HOME = 'index',
  FAVORITE = 'favorite',
  BOOKINGS = 'bookings',
  PROFILE = 'profile',
}

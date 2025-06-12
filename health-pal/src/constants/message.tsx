import { Ban, CalendarX } from '@/icons'

import { BOOKING_TABS } from '@/types/booking'
import { FAVORITE_TYPES } from '@/types/favorite'

export const VALIDATIONS_MESSAGE = {
  INVALID_EMAIL: 'Invalid email format',
  REQUIRED_EMAIL: 'Email is required',
  REQUIRED_PASSWORD: 'Password is required',
  REQUIRED_NAME: 'Name is required',
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  MIN: (field: string, length = 6) => `${field} must be at least ${length} characters`,
  DAY_OF_BIRTH: (old = 16) => `You must be at least ${old} years old`,
}

export const FAVORITE_EMPTY = {
  [FAVORITE_TYPES.DOCTOR]: {
    title: 'No Favorite Doctors',
    description: 'Add your favorite doctors to find them easily later.',
    icon: <Ban color="$gray10" />,
    action: 'Browse Doctors',
  },
  [FAVORITE_TYPES.HOSPITAL]: {
    title: 'No Favorite Hospitals',
    description: 'Mark hospitals as favorite for quick access.',
    icon: <Ban color="$gray10" />,
    action: 'Browse Hospitals',
  },
}

export const BOOKING_EMPTY = {
  [BOOKING_TABS.UPCOMING]: {
    title: 'No Upcoming Appointments',
    description: 'Book an appointment to see it here.',
    icon: <CalendarX color="$gray10" />,
    action: 'Book Now',
  },
  [BOOKING_TABS.COMPLETED]: {
    title: 'No Past Appointments',
    description: 'Your completed appointments will show up here.',
    icon: <CalendarX color="$gray10" />,
    action: '',
  },
  [BOOKING_TABS.CANCELED]: {
    title: 'No Canceled Appointments',
    description: 'Your canceled bookings will appear here for reference.',
    icon: <Ban color="$gray10" />,
    action: '',
  },
}

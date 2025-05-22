import { DateType } from 'react-native-ui-datepicker'

export enum BOOKING_TABS {
  UPCOMING = 'upcoming',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export type BookingForm = { date: DateType; time: string; doctor: number }

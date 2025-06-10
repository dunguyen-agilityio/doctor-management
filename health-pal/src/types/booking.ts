import { Dayjs } from 'dayjs'

export enum BOOKING_TABS {
  UPCOMING = 'upcoming',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export type BookingForm = {
  date: Dayjs
  type?: BOOKING_TABS
  time?: string
  doctor?: number
  documentId?: string
}

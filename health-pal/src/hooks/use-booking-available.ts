import { useQuery } from '@tanstack/react-query'

import { getBookingAvailable } from '@/services/booking'

export const useBookingAvailable = (doctorId: string, date: string) => {
  const query = useQuery({
    queryKey: ['booking-available', doctorId, date],
    queryFn: () => getBookingAvailable(doctorId, date),
  })

  return query
}

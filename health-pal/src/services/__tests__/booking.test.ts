import { BOOKING_TABS } from '@/types/booking'

import { getJwt } from '../auth'
import { addBooking, getBookingAvailable, getBookings, updateBooking } from '../booking'
import { apiClient } from '../http-client'

jest.mock('@/services/http-client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('../auth')

describe('booking service', () => {
  const jwt = 'test-token'
  const formData = {
    date: '2025-06-01',
    time: '09:00',
    type: BOOKING_TABS.UPCOMING,
    doctor: 1,
    patient: 2,
  }

  beforeEach(() => {
    ;(getJwt as jest.Mock).mockResolvedValue(jwt)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('addBooking', () => {
    it('should return success response', async () => {
      const mockResponse = { data: { id: 1 } }
      ;(apiClient.post as jest.Mock).mockResolvedValueOnce(mockResponse)

      const result = await addBooking(formData)
      expect(apiClient.post).toHaveBeenCalledWith('bookings', {
        body: { data: formData },
        jwt,
      })
      expect(result).toEqual(mockResponse)
    })

    it('should return error response on failure', async () => {
      ;(apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Failed'))
      const result = await addBooking(formData)
      expect(result).toEqual({ error: { message: 'Failed', code: 500 } })
    })
  })

  describe('updateBooking', () => {
    it('should return success response', async () => {
      const mockResponse = { data: { id: 1 } }
      ;(apiClient.put as jest.Mock).mockResolvedValueOnce(mockResponse)

      const result = await updateBooking({ documentId: '123', ...formData })
      expect(apiClient.put).toHaveBeenCalledWith('bookings/123', {
        body: { data: formData },
        jwt,
      })
      expect(result).toEqual(mockResponse)
    })

    it('should return error response on failure', async () => {
      ;(apiClient.put as jest.Mock).mockRejectedValueOnce(new Error('Update Failed'))
      const result = await updateBooking({ documentId: '123', ...formData })
      expect(result).toEqual({ error: { message: 'Update Failed' } })
    })
  })

  describe('getBookings', () => {
    it('should call get with built query params and return response', async () => {
      const mockResponse = { data: [] }
      ;(apiClient.get as jest.Mock).mockResolvedValueOnce(mockResponse)

      const result = await getBookings({ filters: [], userId: 1 })
      expect(apiClient.get).toHaveBeenCalled()
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getBookingAvailable', () => {
    it('should return available time slots', async () => {
      const docId = 'doc123'
      const date = '2025-06-01'
      const mockResponse = { available: { '09:00': true }, doctorId: 1 }
      ;(apiClient.get as jest.Mock).mockResolvedValueOnce(mockResponse)

      const result = await getBookingAvailable(docId, date)
      expect(apiClient.get).toHaveBeenCalled()
      expect(result).toEqual(mockResponse)
    })
  })
})

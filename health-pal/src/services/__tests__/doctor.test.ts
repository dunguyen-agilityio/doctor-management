// __tests__/doctor.test.ts
import { getDoctor, getDoctors } from '@app/services/doctor'
import { apiClient } from '@app/services/http-client'

import { MOCK_REVIEWS } from '@app/mocks/reivew'

jest.mock('@app/services/http-client', () => ({
  apiClient: {
    get: jest.fn(),
  },
}))

describe('Doctor Service', () => {
  const mockDoctorsResponse = {
    data: [
      {
        id: 1,
        name: 'Dr. Patel',
        documentId: 'doc-1',
        rating: 4.5,
        users_permissions_user: { email: 'dr@example.com' },
      },
    ],
    meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 1 } },
  }

  const mockDoctorResponse = {
    data: {
      id: 1,
      name: 'Dr. Patel',
      documentId: 'doc-1',
      rating: 4.5,
      users_permissions_user: { email: 'dr@example.com' },
    },
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch list of doctors with default filters', async () => {
    ;(apiClient.get as jest.Mock).mockResolvedValueOnce(mockDoctorsResponse)

    const result = await getDoctors({})

    expect(apiClient.get).toHaveBeenCalledWith(
      expect.stringContaining('doctors?'),
      expect.objectContaining({ jwt: expect.any(String) }),
    )
    expect(result).toEqual(mockDoctorsResponse)
  })

  it('should fetch single doctor with default filters and include mock summary/reviews', async () => {
    ;(apiClient.get as jest.Mock).mockResolvedValueOnce(mockDoctorResponse)

    const result = await getDoctor('1')

    expect(apiClient.get).toHaveBeenCalledWith(
      expect.stringContaining('doctors/1?'),
      expect.objectContaining({ jwt: expect.any(String) }),
    )
    expect(result).toMatchObject({
      ...mockDoctorResponse.data,
      summary: { experience: 2, patients: 20000, rating: 4.3, reviews: 1200 },
      reviews: MOCK_REVIEWS,
    })
  })
})

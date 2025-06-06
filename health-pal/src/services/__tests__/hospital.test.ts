import { getHospitals } from '../hospital'
import { apiClient } from '../http-client'

// Mock the API client
jest.mock('../http-client', () => ({
  apiClient: {
    get: jest.fn(),
  },
}))

describe('getHospitals', () => {
  const mockResponse = {
    data: [
      {
        id: 1,
        name: 'Mock Hospital',
        address: '123 Mock St',
        image: { url: '/images/mock.png' },
      },
    ],
    meta: {
      pagination: { page: 1, pageSize: 10, total: 1, pageCount: 1 },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls apiClient.get with built query and returns hospitals', async () => {
    ;(apiClient.get as jest.Mock).mockResolvedValueOnce(mockResponse)

    const result = await getHospitals()

    expect(apiClient.get).toHaveBeenCalledWith(expect.stringContaining('hospitals?'), {
      jwt: 'mock_token',
    })
    expect(result).toEqual(mockResponse)
  })

  it('adds extra filters if provided', async () => {
    ;(apiClient.get as jest.Mock).mockResolvedValueOnce(mockResponse)

    await getHospitals({
      filters: [{ key: 'filters[type][$eq]', query: 'Clinic' }],
    })

    const calledWithUrl = (apiClient.get as jest.Mock).mock.calls[0][0]
    expect(calledWithUrl).toContain('filters[type][$eq]=Clinic')
    expect(calledWithUrl).toContain('populate[image][fields][1]=url')
  })
})

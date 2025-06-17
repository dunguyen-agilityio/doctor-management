import { apiClient } from '../http-client'

const mockFetch = (response: any, ok = true, status = 200) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(response),
    } as Response),
  ) as jest.Mock
}

describe('APIClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('performs GET successfully', async () => {
    mockFetch({ message: 'Hello World' })

    const res = await apiClient.get<{ message: string }>('test-endpoint')

    expect(res.message).toBe('Hello World')
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('test-endpoint'), expect.any(Object))
  })

  it('performs POST with body', async () => {
    mockFetch({ success: true })

    const res = await apiClient.post<{ success: boolean }>('submit', {
      body: { name: 'test' },
    })

    expect(res.success).toBe(true)
    const fetchArgs = (fetch as jest.Mock).mock.calls[0][1]
    expect(fetchArgs?.method).toBe('POST')
    expect(fetchArgs?.body).toContain('test')
  })

  it('handles failed response', async () => {
    mockFetch(
      {
        error: {
          message: 'Something went wrong',
          name: 'BadRequest',
          status: 400,
          details: { errors: ['Bad input'] },
        },
      },
      false,
      400,
    )

    await expect(apiClient.get('fail')).rejects.toThrow('Something went wrong')
  })

  it('should call fetch with PUT method and return JSON response', async () => {
    const mockResponse = { id: 1, name: 'Updated User' }

    mockFetch(mockResponse, true)

    const result = await apiClient.put<typeof mockResponse>('users/1', {
      body: { name: 'Updated User' },
      jwt: 'token123',
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/1'),
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          Authorization: 'Bearer token123',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ name: 'Updated User' }),
      }),
    )

    expect(result).toEqual(mockResponse)
  })

  it('should call fetch with PUT method and return JSON response', async () => {
    const mockResponse = { id: 1, name: 'Updated User' }

    mockFetch(mockResponse, true)

    const result = await apiClient.put<typeof mockResponse>('users/1', {
      body: { name: 'Updated User' },
      jwt: 'token123',
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/1'),
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          Authorization: 'Bearer token123',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ name: 'Updated User' }),
      }),
    )

    expect(result).toEqual(mockResponse)
  })

  it('should call fetch with DELETE method', async () => {
    mockFetch({ success: true }, true)

    await apiClient.delete('users/1', {
      jwt: 'token456',
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/1'),
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          Authorization: 'Bearer token456',
        }),
      }),
    )
  })
})

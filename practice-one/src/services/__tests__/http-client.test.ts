import { apiClient } from '../http-client';

global.fetch = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('APIClient', () => {
  it('GET request should return success response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      headers: {
        get: (type: string) => {
          if (type === 'content-type') {
            return ['application/json'];
          }

          return null;
        },
      },
      ok: true,
      json: jest.fn().mockResolvedValue('success'),
    });
    const response = await apiClient.get<{ data: string }>('test');
    expect(response).toEqual({ data: 'success', meta: null });
  });

  it('GET request should return success response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      headers: { get: () => ['html/text'] },
      ok: true,
    });

    expect(apiClient.get('test')).rejects.toThrow(
      'Unexpected response type from test',
    );
  });

  it('POST request should return created response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      headers: { get: () => ['application/json'] },
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 'created' }),
    });
    const response = await apiClient.post<{ data: string }>('test', {
      body: { name: 'New Item' },
    });
    expect(response).toEqual({ data: 'created' });
  });

  it('PUT request should return updated response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      headers: { get: () => ['application/json'] },
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 'updated' }),
    });
    const response = await apiClient.put<{ data: string }>('test', {
      body: { name: 'Updated Item' },
    });
    expect(response).toEqual({ data: 'updated' });
  });

  it('DELETE request should return no content', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      headers: { get: () => ['application/json'] },
      ok: true,
      json: jest.fn().mockResolvedValue(undefined),
    });
    await expect(apiClient.delete('test')).resolves.toBeUndefined();
  });

  it('DELETE request should return no content', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      headers: { get: () => ['application/json'] },
      status: 404,
      ok: false,
      text: jest.fn().mockResolvedValue('error'),
    });
    await expect(apiClient.delete('test')).rejects.toThrow(
      `Failed to fetch test: 404 - error`,
    );
  });
});

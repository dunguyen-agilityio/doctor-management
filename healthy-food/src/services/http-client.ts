import { API_ENDPOINT } from '@/constants';

type RequestOption = Omit<RequestInit, 'body'> & {
  body?: object;
};

export type SuccessResponse<T> = { data: T; error?: null };
export type FailedResponse = { data?: null; error: { message: string } };

class APIClient {
  private static _apiClient: APIClient;

  private constructor() {}

  static get apiClient() {
    if (!this._apiClient) {
      this._apiClient = new APIClient();
    }

    return this._apiClient;
  }

  private apiRequest = async (url: string, init?: RequestOption) => {
    const { method = 'GET', body, headers } = init || {};

    const hasBody = ['POST', 'PUT'].includes(method);

    const customHeader = {
      ...headers,
      ...(hasBody && {
        'Content-Type': 'application/json',
      }),
    };

    const options = {
      method,
      headers: customHeader,
      ...(hasBody && {
        body: JSON.stringify(body),
      }),
    };

    const res = await fetch(`${API_ENDPOINT}/${url}`, options);

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(
        `Failed to fetch ${url}: ${res.status} - ${errorMessage}`,
      );
    }

    return res;
  };

  async get<T>(
    url: string,
    init?: Omit<RequestOption, 'method'>,
  ): Promise<{
    data: T;
    meta: { total: number } | null;
  }> {
    const res = await this.apiRequest(url, init);
    const contentType = res.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = (await res.json()) as T;
      const total = res.headers.get('X-Total-Count');
      return { data, meta: total ? { total: Number(total) } : null };
    }

    throw new Error(`Unexpected response type from ${url}`);
  }

  async post<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    const res = await this.apiRequest(url, { ...init, method: 'POST' });
    return res.json() as T;
  }

  async put<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    const res = await this.apiRequest(url, { ...init, method: 'PUT' });
    return res.json() as T;
  }

  async delete<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    const res = await this.apiRequest(url, { ...init, method: 'DELETE' });
    return res.json() as T;
  }
}

export const apiClient = APIClient.apiClient;

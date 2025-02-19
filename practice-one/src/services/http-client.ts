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

  private apiRequest = async <T>(
    url: string,
    init?: RequestOption,
  ): Promise<T> => {
    const { method = 'GET', body, headers } = init || {};

    const hasBody = method === 'POST' || method === 'PUT';

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

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return (await res.json()) as T;
    }
    throw new Error(`Unexpected response type from ${url}`);
  };

  async get<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, init);
  }

  async post<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, { ...init, method: 'POST' });
  }

  async put<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, { ...init, method: 'PUT' });
  }

  async delete(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest(url, { ...init, method: 'DELETE' });
  }
}

export const apiClient = APIClient.apiClient;

import { API_ENDPOINT } from '@/constants/environment'

type RequestOption = Omit<RequestInit, 'body'> & {
  body?: object
  next?: {
    revalidate?: number
    tags?: string[]
    cache?: 'no-store'
  }
  jwt?: string
}

type StrapiError = {
  details: { errors: string[] }
  message: string
  name: string
  status: number
}

class APIClient {
  private static _apiClient: APIClient
  private constructor() {}

  static get apiClient() {
    if (!this._apiClient) {
      this._apiClient = new APIClient()
    }

    return this._apiClient
  }

  private readonly apiRequest = async <T>(url: string, init?: RequestOption): Promise<T> => {
    const { method = 'GET', body, headers, next, jwt, ...rest } = init ?? {}

    const hasBody = method === 'POST' || method === 'PUT'

    const customHeader = {
      ...headers,
      ...(hasBody && {
        'Content-Type': 'application/json',
      }),
      ...(jwt && { Authorization: `Bearer ${jwt}` }),
    }

    const options = {
      method,
      headers: customHeader,
      ...(hasBody && {
        body: JSON.stringify(body),
      }),
      ...rest,
      ...(next && { next }),
    }

    const res = await fetch(`${API_ENDPOINT}/${url}`, options)

    let json = null

    if (method !== 'DELETE') {
      json = await res.json()
    }

    if (!res.ok) {
      const error = json?.error as StrapiError
      const message = error.message ?? 'Error'

      throw new Error(message, { cause: error })
    }

    return json as T
  }

  async get<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, init)
  }

  async post<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    const { ...rest } = init || {}

    return this.apiRequest<T>(url, { ...rest, method: 'POST' })
  }

  async put<T>(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest<T>(url, { ...init, method: 'PUT' })
  }

  async delete(url: string, init?: Omit<RequestOption, 'method'>) {
    return this.apiRequest(url, { ...init, method: 'DELETE' })
  }
}

export const apiClient = APIClient.apiClient

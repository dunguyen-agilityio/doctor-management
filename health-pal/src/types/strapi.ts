export type StrapiParams = {
  pagination?: {
    page: number
    pageSize?: number
  }
  filters?: {
    key: string
    query: string
  }[]
}

export type StrapiPagination<T> = {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

type SuccessResponse<T> = { data: T; error?: null }
type FailedResponse = { data?: null; error: { message: string; code?: number } }

export type APIResponse<T> = SuccessResponse<T> | FailedResponse

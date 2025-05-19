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

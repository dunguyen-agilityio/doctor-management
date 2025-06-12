import { StrapiParams } from '@/types/strapi'

export const buildStrapiQuery = ({ filters, pagination }: StrapiParams) => {
  const params = new URLSearchParams()

  if (pagination) {
    const { page, pageSize = 10 } = pagination

    params.set('pagination[page]', String(page))
    params.set('pagination[pageSize]', String(pageSize))
  }

  if (filters) {
    filters.forEach(({ key, query }) => params.append(key, query))
  }

  return decodeURIComponent(params.toString())
}

import { StrapiParams } from '@app/types'

import { buildStrapiQuery } from '../strapi'

describe('buildStrapiQuery', () => {
  it('builds query with pagination only', () => {
    const params: StrapiParams = {
      pagination: { page: 1, pageSize: 10 },
    }
    const result = buildStrapiQuery(params)
    expect(result).toBe('pagination[page]=1&pagination[pageSize]=10')
  })

  it('builds query with custom pageSize', () => {
    const params: StrapiParams = {
      pagination: { page: 2, pageSize: 25 },
    }
    const result = buildStrapiQuery(params)
    expect(result).toBe('pagination[page]=2&pagination[pageSize]=25')
  })

  it('builds query with filters only', () => {
    const params: StrapiParams = {
      filters: [
        { key: 'filters[type][$eq]', query: 'UPCOMING' },
        { key: 'filters[status][$eq]', query: 'active' },
      ],
    }
    const result = buildStrapiQuery(params)
    expect(result).toBe('filters[type][$eq]=UPCOMING&filters[status][$eq]=active')
  })

  it('builds query with both pagination and filters', () => {
    const params: StrapiParams = {
      pagination: { page: 1, pageSize: 15 },
      filters: [
        { key: 'filters[type][$eq]', query: 'COMPLETED' },
        { key: 'filters[doctor][$eq]', query: 'doctor-1' },
      ],
    }
    const result = buildStrapiQuery(params)
    expect(result).toBe(
      'pagination[page]=1&pagination[pageSize]=15&filters[type][$eq]=COMPLETED&filters[doctor][$eq]=doctor-1',
    )
  })

  it('returns empty string when no params provided', () => {
    const params: StrapiParams = {}
    const result = buildStrapiQuery(params)
    expect(result).toBe('')
  })

  it('handles empty filters array', () => {
    const params: StrapiParams = {
      pagination: { page: 1 },
      filters: [],
    }
    const result = buildStrapiQuery(params)
    expect(result).toBe('pagination[page]=1&pagination[pageSize]=10')
  })

  it('handles special characters in query', () => {
    const params: StrapiParams = {
      filters: [{ key: 'filters[name][$eq]', query: 'Doe' }],
    }
    const result = buildStrapiQuery(params)
    expect(result).toBe('filters[name][$eq]=Doe')
  })

  it('handles pagination without pageSize', () => {
    const params: StrapiParams = {
      pagination: { page: 3 },
    }
    const result = buildStrapiQuery(params)
    expect(result).toBe('pagination[page]=3&pagination[pageSize]=10')
  })
})

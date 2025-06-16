import { getOptimizedUrl } from '../image'

describe('getOptimizedUrl', () => {
  const domain = 'https://res.cloudinary.com/demo'
  const baseUrl = `${domain}/image/upload/v1234/sample.jpg`

  beforeAll(() => {
    process.env.EXPO_PUBLIC_CLOUDINARY_DOMAIN = domain
  })

  it('returns undefined if uri is undefined', () => {
    expect(getOptimizedUrl({})).toBeUndefined()
  })

  it('returns original uri if not Cloudinary', () => {
    const url = 'https://otherdomain.com/image.jpg'
    expect(getOptimizedUrl({ uri: url })).toBe(url)
  })

  it('returns optimized webp url with default transformation', () => {
    const result = getOptimizedUrl({ uri: baseUrl })
    expect(result).toContain('/upload/f_webp/')
    expect(result).toContain('.webp')
  })

  it('adds width and quality if valid', () => {
    const result = getOptimizedUrl({ uri: baseUrl, width: 300, quality: 80 })
    expect(result).toContain('/upload/f_webp/w_300/q_80/')
  })

  it('ignores quality if invalid', () => {
    const result = getOptimizedUrl({ uri: baseUrl, width: 300, quality: 999 })
    expect(result).toContain('/upload/f_webp/w_300/')
    expect(result).not.toContain('q_999')
  })

  it('does not break if URL has no /upload/', () => {
    const badUrl = `${domain}/image/v1234/sample.jpg`
    expect(getOptimizedUrl({ uri: badUrl })).toBe(badUrl)
  })
})

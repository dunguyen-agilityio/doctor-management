export const getOptimizedUrl = ({
  quality,
  uri,
  width,
}: {
  uri?: string
  width?: number
  quality?: number
}): string | undefined => {
  if (!uri || typeof uri !== 'string') return uri

  // Check for Cloudinary domains
  const isCloudinary = uri.startsWith(process.env.EXPO_PUBLIC_CLOUDINARY_DOMAIN ?? '')
  if (!isCloudinary) return uri

  const parts = uri.split('/upload/')
  if (parts.length <= 1) return uri

  let transformations = 'f_webp'
  if (width) transformations += `/w_${Math.round(width)}`
  if (quality && quality >= 1 && quality <= 100) transformations += `/q_${quality}`

  // Replace .png, .jpg, or similar extensions with .webp
  let optimizedUrl = `${parts[0]}/upload/${transformations}/${parts[1]}`
  optimizedUrl = optimizedUrl.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  return optimizedUrl
}

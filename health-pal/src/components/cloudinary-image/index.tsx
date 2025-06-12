import { useState } from 'react'

import { Image as ExpoImage, ImageProps } from 'expo-image'

import { Spinner, View } from 'tamagui'

import { PLACEHOLDER_IMAGE } from '@app/constants/image'

import { getOptimizedUrl } from '@app/utils/image'

interface CloudinaryImageProps extends Omit<ImageProps, 'source' | 'style'> {
  source: { uri?: string } | number
  style: React.ComponentProps<typeof View>['style']
  placeholder?: { uri?: string } | number
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  width?: number
  quality?: number
  loadingIndicator?: boolean
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  source,
  style,
  placeholder = { blurhash: PLACEHOLDER_IMAGE },
  contentFit = 'cover',
  width,
  quality = 80,
  loadingIndicator = true,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const optimizedSource =
    typeof source === 'object' && source?.uri
      ? { uri: getOptimizedUrl({ quality, uri: source.uri, width }) }
      : source

  return (
    <View overflow="hidden" style={style}>
      <ExpoImage
        testID="cloudinary-image"
        style={{ width: '100%', height: '100%' }}
        source={error ? placeholder : optimizedSource}
        placeholder={placeholder}
        contentFit={contentFit}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
        cachePolicy="disk"
        {...props}
      />
      {isLoading && loadingIndicator && (
        <Spinner
          position="absolute"
          top="50%"
          left="50%"
          transform={[{ translateX: -12 }, { translateY: -12 }]}
          size="small"
          color="$blue"
        />
      )}
    </View>
  )
}

export default CloudinaryImage

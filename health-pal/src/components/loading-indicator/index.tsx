import { Animated, Easing } from 'react-native'

import { Stack, StackProps } from 'tamagui'

import { LoaderIcon } from '@icons'

interface LoadingIndicatorProps extends StackProps {
  fullScreen?: boolean
}

const LoadingIndicator = ({ fullScreen, ...props }: LoadingIndicatorProps) => {
  const rotation = new Animated.Value(0)

  Animated.loop(
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ).start()

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Stack
      {...(fullScreen && { height: '100%', justifyContent: 'center', position: 'absolute' })}
      alignItems="center"
      width="100%"
      testID="loading-indicator"
      {...props}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <LoaderIcon />
      </Animated.View>
    </Stack>
  )
}

export default LoadingIndicator

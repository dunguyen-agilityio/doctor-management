import { LoaderIcon } from '@/icons'

import { Animated, Easing } from 'react-native'

import { Stack, StackProps } from 'tamagui'

import Modal from '../common/modal'

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

  const spinner = (
    <Stack
      alignItems="center"
      justifyContent="center"
      width="100%"
      testID="loading-indicator"
      flex={1}
      role="status"
      {...props}>
      <Stack height={60} alignItems="center" justifyContent="center">
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <LoaderIcon testID="loader-icon" />
        </Animated.View>
      </Stack>
    </Stack>
  )

  if (!fullScreen) return spinner

  return (
    <Modal
      open
      elevation={0}
      backgroundColor="transparent"
      alignContent="center"
      justifyContent="center">
      {spinner}
    </Modal>
  )
}

export default LoadingIndicator

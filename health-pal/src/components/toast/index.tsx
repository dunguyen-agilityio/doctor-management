import { Toast as TamaguiToast, useToastState } from '@tamagui/toast'

import { YStack } from '@theme'

const Toast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null

  return (
    <TamaguiToast
      animation="200ms"
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
      exitStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
      transform={[{ translateY: 0 }]}
      opacity={1}
      scale={1}
      viewportName={currentToast.viewportName}>
      <YStack>
        <TamaguiToast.Title>{currentToast.title}</TamaguiToast.Title>
        {!!currentToast.message && (
          <TamaguiToast.Description>{currentToast.message}</TamaguiToast.Description>
        )}
      </YStack>
    </TamaguiToast>
  )
}

export default Toast

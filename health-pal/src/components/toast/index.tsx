import { Toast as TamaguiToast, useToastState } from '@tamagui/toast'
import { ButtonIcon, TextProps, XStack } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import { Text, YStack } from '@app/components/common'

import { X } from '@icons'

type ToastVariant = 'error' | 'success' | 'info'

const VARIANTS: Record<ToastVariant, Pick<TextProps, 'backgroundColor' | 'color'>> = {
  success: { backgroundColor: '$green3', color: '$green10' },
  error: { backgroundColor: '$red3', color: '$red10' },
  info: { backgroundColor: '$yellow3', color: '$yellow10' },
}

const Toast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null

  const { duration, id, message, title, viewportName, type = 'info' } = currentToast

  const { backgroundColor, color } = VARIANTS[type as ToastVariant]

  return (
    <TamaguiToast
      animation="200ms"
      testID="toast"
      key={id}
      duration={duration}
      enterStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
      exitStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
      transform={[{ translateY: 0 }]}
      opacity={1}
      scale={1}
      paddingRight={12}
      backgroundColor="transparent"
      width={WINDOW_SIZE.width}
      open
      viewportName={viewportName}>
      <YStack
        backgroundColor={backgroundColor}
        marginLeft="auto"
        padding={12}
        gap={8}
        width={390}
        borderRadius={12}>
        <XStack justifyContent="space-between">
          <TamaguiToast.Title>
            <Text color={color} size="small" fontWeight="700">
              {title}
            </Text>
          </TamaguiToast.Title>
          <TamaguiToast.Close>
            <ButtonIcon>
              <X size="$1" />
            </ButtonIcon>
          </TamaguiToast.Close>
        </XStack>
        {!!message && (
          <TamaguiToast.Description>
            <Text color={color} size="extraSmall">
              {message}
            </Text>
          </TamaguiToast.Description>
        )}
      </YStack>
    </TamaguiToast>
  )
}

export default Toast

import { AlertDialog, AlertDialogProps } from 'tamagui'

import { Button, XStack, YStack } from '@theme'

interface CustomAlertDialogProps extends AlertDialogProps {
  title: string
  description?: string
  cancelable?: boolean
  onConfirm: () => void
  actionTitle?: string
}

const CustomAlertDialog = ({
  title,
  description,
  onConfirm,
  cancelable,
  actionTitle = 'OK',
  ...props
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog native {...props}>
      <AlertDialog.Trigger asChild />
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}>
          <YStack gap="$4">
            <AlertDialog.Title>{title}</AlertDialog.Title>
            {description && <AlertDialog.Description>{description}</AlertDialog.Description>}

            <XStack gap="$3" justifyContent="flex-end">
              {cancelable && (
                <AlertDialog.Cancel asChild>
                  <Button variant="secondary">Cancel</Button>
                </AlertDialog.Cancel>
              )}
              <AlertDialog.Action asChild>
                <Button onPress={onConfirm}>{actionTitle}</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}

export const AlertDialogDescription = AlertDialog.Description

export default CustomAlertDialog

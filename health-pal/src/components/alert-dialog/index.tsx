import { AlertDialog, AlertDialogContentProps, AlertDialogProps, TamaguiElement } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import { useModal } from '@app/hooks/use-modal'

import { Button, Heading, Text, XStack } from '@app/components/common'

import { ModalRef } from '@app/types/modal'

interface CustomAlertDialogProps extends AlertDialogProps {
  title?: string
  description?: string
  cancelable?: boolean
  onConfirm?: () => void
  actionTitle?: string
  ref?: React.Ref<ModalRef | null>
  trigger?: React.ReactNode
  container?: ({ children }: React.PropsWithChildren) => React.ReactNode
  contentProps?: AlertDialogContentProps & React.RefAttributes<TamaguiElement>
}

const CustomAlertDialog = ({
  title,
  description,
  onConfirm,
  cancelable,
  actionTitle = 'OK',
  children,
  ref,
  container: Container = ({ children }) => <>{children}</>,
  trigger = <AlertDialog.Trigger asChild />,
  contentProps,
  ...props
}: React.PropsWithChildren<CustomAlertDialogProps>) => {
  const [open, setOpen] = useModal(ref)

  return (
    <AlertDialog open={open} onOpenChange={setOpen} {...props}>
      {trigger}
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          aria-hidden
        />

        <AlertDialog.Content
          role="alertdialog"
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
          width={WINDOW_SIZE.width - 48}
          borderRadius={8}
          paddingHorizontal={20}
          paddingVertical={12}
          aria-labelledby="alert-dialog-title"
          accessibilityHint={description ? 'alert-dialog-description' : undefined}
          gap={12}
          {...contentProps}>
          {title && (
            <AlertDialog.Title>
              <Heading size="large">{title}</Heading>
            </AlertDialog.Title>
          )}
          {description && (
            <AlertDialog.Description>
              <Text size="small">{description}</Text>
            </AlertDialog.Description>
          )}
          {children}
          <XStack gap={12} justifyContent="flex-end">
            {cancelable && (
              <AlertDialog.Cancel asChild>
                <Button variant="secondary" aria-label="Cancel dialog" testID="cancel-button">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
            )}
            {onConfirm && (
              <AlertDialog.Action asChild>
                <Button
                  onPress={onConfirm}
                  aria-label={`${actionTitle} action`}
                  testID="confirm-button">
                  {actionTitle}
                </Button>
              </AlertDialog.Action>
            )}
          </XStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}

export const AlertDialogDescription = AlertDialog.Description

export const AlertDialogTrigger = AlertDialog.Trigger

export const AlertDialogTitle = AlertDialog.Title

export const AlertDialogAction = AlertDialog.Action

export const AlertDialogCancel = AlertDialog.Cancel
export const AlertDialogOverlay = AlertDialog.Overlay
export const AlertDialogContent = AlertDialog.Content
export const AlertDialogPortal = AlertDialog.Portal
export const AlertDialogClose = AlertDialog.Cancel

export default CustomAlertDialog

import { useEffect } from 'react'

import { Button, Dialog, DialogContentProps, DialogProps, Unspaced } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import { useModal } from '@app/hooks/use-modal'

import { X } from '@icons'

import { ModalRef } from '@app/types/modal'

export interface ModalProps extends DialogContentProps, Omit<DialogProps, 'children'> {
  closeButtonShown?: boolean
  ref?: React.Ref<ModalRef>
}

const Modal = ({
  children,
  closeButtonShown,
  ref,
  open: defaultOpen,
  ...props
}: React.PropsWithChildren<ModalProps>) => {
  const [open, setOpen] = useModal(ref)

  useEffect(() => {
    if (defaultOpen) {
      setOpen(true)
    }
  }, [defaultOpen, setOpen])

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          testID="overlay"
          backgroundColor="$shadow3"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ opacity: 0, scale: 0.95 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          role="dialog"
          testID="content"
          padding={0}
          width={WINDOW_SIZE.width - 48}
          minHeight={WINDOW_SIZE.height / 2}
          borderRadius="$2"
          overflow="hidden"
          shadowColor="#fff"
          shadowOffset={{ height: 0, width: 0 }}
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          {...props}>
          {children}
          {closeButtonShown && (
            <Unspaced>
              <Dialog.Close asChild>
                <Button
                  position="absolute"
                  top="$md"
                  right="$md"
                  size="$5"
                  circular
                  icon={X}
                  aria-label="Close the dialog"
                  accessibilityHint="Closes the cancellation dialog without making changes"
                  role="button"
                />
              </Dialog.Close>
            </Unspaced>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export default Modal

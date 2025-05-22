import { useImperativeHandle, useState } from 'react'

import { X } from '@tamagui/lucide-icons'
import { Button, Dialog, DialogContentProps, DialogProps, Unspaced } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import { ModalRef } from '@app/types/modal'

interface ModalProps extends DialogProps {
  closeButtonShown?: boolean
  contentProps?: DialogContentProps
  ref?: React.Ref<ModalRef>
}

const Modal = ({
  children,
  closeButtonShown,
  contentProps,
  ref,
  ...props
}: React.PropsWithChildren<ModalProps>) => {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }))

  return (
    <Dialog modal open={open} onOpenChange={setOpen} {...props}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
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
          {...contentProps}>
          {children}
          {closeButtonShown && (
            <Unspaced>
              <Dialog.Close asChild>
                <Button position="absolute" top="$md" right="$md" size="$5" circular icon={X} />
              </Dialog.Close>
            </Unspaced>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export default Modal

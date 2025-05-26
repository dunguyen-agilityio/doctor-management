import { useImperativeHandle, useState } from 'react'

import { Sheet } from '@tamagui/sheet'

import { ModalRef } from '@app/types/modal'

interface SheetModalProps {
  ref?: React.RefObject<ModalRef | null>
}

export const SheetModal = ({ ref, children }: React.PropsWithChildren<SheetModalProps>) => {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({ close: () => setOpen(false), open: () => setOpen(true) }))

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      snapPointsMode="mixed"
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="medium">
      <Sheet.Overlay
        testID="sheet-overlay"
        animation="lazy"
        backgroundColor="$shadow6"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Frame
        padding={24}
        alignItems="center"
        gap="$md"
        borderTopLeftRadius={34}
        borderTopRightRadius={34}>
        {children}
      </Sheet.Frame>
    </Sheet>
  )
}

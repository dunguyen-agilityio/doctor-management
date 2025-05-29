import { Sheet, SheetProps } from '@tamagui/sheet'

import { useModal } from '@app/hooks/use-modal'
import { ModalRef } from '@app/types/modal'

interface SheetModalProps extends SheetProps {
  ref?: React.RefObject<ModalRef | null>
  height?: number
}

export const SheetModal = ({
  ref,
  height = 200,
  children,
}: React.PropsWithChildren<SheetModalProps>) => {
  const [open, setOpen] = useModal(ref)

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
        height={height}
        padding={24}
        // alignItems="center"
        gap="$md"
        borderTopLeftRadius={34}
        borderTopRightRadius={34}>
        <Sheet.ScrollView>{children}</Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}

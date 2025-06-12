import { Sheet } from '@tamagui/sheet'
import { StackProps } from 'tamagui'

import { useModal } from '@/hooks/use-modal'

import { ModalRef } from '@/types/modal'

interface SheetModalProps extends StackProps {
  ref?: React.RefObject<ModalRef | null>
}

const SheetModal = ({ ref, children, ...props }: React.PropsWithChildren<SheetModalProps>) => {
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
        padding={24}
        height={200}
        gap="$md"
        role="dialog"
        borderTopLeftRadius={34}
        borderTopRightRadius={34}
        {...props}>
        <Sheet.ScrollView>{children}</Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}

export default SheetModal

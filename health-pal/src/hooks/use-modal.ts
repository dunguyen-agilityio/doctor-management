import { useImperativeHandle, useState } from 'react'

import { ModalRef } from '@/types/modal'

export const useModal = (ref?: React.Ref<ModalRef | null>) => {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }))

  return [open, setOpen] as const
}

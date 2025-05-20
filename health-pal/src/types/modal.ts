export type ModalRef<T = null> = { open: (params?: T) => void; close: () => void }

import { createContext, useState } from 'react'

import { Spinner } from 'tamagui'

import Modal from '@app/components/modal'

export const AppLoadingDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => null)

export const AppLoadingProvider = ({ children }: React.PropsWithChildren) => {
  const [loading, setLoading] = useState(false)

  return (
    <AppLoadingDispatchContext value={setLoading}>
      {loading && (
        <Modal open contentProps={{ elevation: 0, backgroundColor: 'transparent' }}>
          <Spinner
            size="large"
            position="absolute"
            zIndex={10000}
            top="50%"
            left="50%"
            transform={[{ translateX: '-50%' }]}
          />
        </Modal>
      )}
      {children}
    </AppLoadingDispatchContext>
  )
}

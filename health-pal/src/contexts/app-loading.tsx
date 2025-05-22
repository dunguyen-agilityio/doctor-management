import { createContext, useState } from 'react'

import LoadingIndicator from '@app/components/loading-indicator'

export const AppLoadingDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => null)

export const AppLoadingProvider = ({ children }: React.PropsWithChildren) => {
  const [loading, setLoading] = useState(false)

  return (
    <AppLoadingDispatchContext value={setLoading}>
      {loading && <LoadingIndicator />}
      {children}
    </AppLoadingDispatchContext>
  )
}

import { createContext, useState } from 'react'

export const FavoriteDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<Record<number, string>>>
>(() => null)

export const FavoriteStateContext = createContext<Record<number, string>>({})

export const FavoriteProvider = ({ children }: React.PropsWithChildren) => {
  const [byId, setById] = useState<Record<number, string>>({})

  return (
    <FavoriteStateContext value={byId}>
      <FavoriteDispatchContext value={setById}>{children}</FavoriteDispatchContext>
    </FavoriteStateContext>
  )
}

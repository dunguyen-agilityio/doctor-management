import { createContext } from 'react'

export const AppLoadingDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => null)

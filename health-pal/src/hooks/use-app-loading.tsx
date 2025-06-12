import { AppLoadingDispatchContext } from '@/contexts/app-loading'

import { useContext } from 'react'

export const useAppLoading = () => {
  return useContext(AppLoadingDispatchContext)
}

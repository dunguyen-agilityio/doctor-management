import { useContext } from 'react'

import { AppLoadingDispatchContext } from '@app/contexts/app-loading'

export const useAppLoading = () => {
  return useContext(AppLoadingDispatchContext)
}

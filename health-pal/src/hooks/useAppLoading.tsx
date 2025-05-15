import { AppLoadingDispatchContext } from '@app/contexts/app-loading'

import { useContext } from 'react'

const useAppLoading = () => {
  return useContext(AppLoadingDispatchContext)
}

export default useAppLoading

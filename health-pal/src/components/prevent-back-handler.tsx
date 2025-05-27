import { useEffect, useRef } from 'react'
import { BackHandler } from 'react-native'

import { usePathname } from 'expo-router'

import { ModalRef } from '@app/types/modal'

import QuitAppConfirmModal from './confirm-quit-modal'

const PreventBackHandler = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()

  const modalRef = useRef<ModalRef>(null)

  useEffect(() => {
    // Prevent User quit the app when the pathname is root
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (['/', '/login'].includes(pathname)) {
        modalRef.current?.open()
        // Prevent user from quitting the app
        return true
      }
      return false
    })

    return () => {
      backHandler.remove()
    }
  }, [pathname])

  return (
    <>
      <QuitAppConfirmModal ref={modalRef} />
      {children}
    </>
  )
}

export default PreventBackHandler

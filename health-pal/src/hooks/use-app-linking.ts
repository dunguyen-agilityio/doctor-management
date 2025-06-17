import { useEffect } from 'react'

import * as Linking from 'expo-linking'
import { router } from 'expo-router'

import { ROUTES } from '@/constants'

export const useAppLinking = () => {
  useEffect(() => {
    const handleInitialURL = async () => {
      const initialUrl = Linking.getLinkingURL()
      if (initialUrl) {
        handleDeepLink(initialUrl)
      }
    }

    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url)
    })

    handleInitialURL()

    return () => subscription.remove()
  }, [])

  const handleDeepLink = (url: string) => {
    const { path, hostname, queryParams } = Linking.parse(url)

    const isDoctorDetails = hostname === 'doctors' && path?.includes('details')
    const isBooking = hostname === 'booking'
    const param = path?.split('/')[1] ?? ''

    console.log(
      'first',
      queryParams,
      ['doctorId', 'doctorDocId'].every((key) => (queryParams ?? {})[key]),
    )

    switch (true) {
      case isDoctorDetails:
        router.push({ pathname: ROUTES.DOCTOR, params: { id: param } })
        break

      case isBooking && ['doctorId', 'doctorDocId'].some((key) => !(queryParams ?? {})[key]):
        router.replace(ROUTES.NOT_FOUND)
        break

      default:
        break
    }
  }
}

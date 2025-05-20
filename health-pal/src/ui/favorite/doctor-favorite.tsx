import React from 'react'

import { LoadingIndicator } from '@app/components'
import { useSession } from '@app/contexts'
import { DoctorContext } from '@app/contexts/doctor'
import useFavorite from '@app/hooks/use-favorite'
import { DoctorData } from '@app/models/doctor'
import { FAVORITE_TYPES } from '@app/types/favorite'

const DoctorFavorite = ({ children }: React.PropsWithChildren) => {
  const { session } = useSession()
  const { data, isLoading, error } = useFavorite<DoctorData>(session?.jwt!, FAVORITE_TYPES.DOCTOR)

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <DoctorContext value={data?.data ?? []}>{children}</DoctorContext>
    </>
  )
}

export default DoctorFavorite

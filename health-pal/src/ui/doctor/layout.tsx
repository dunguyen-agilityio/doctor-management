import React from 'react'

import { LoadingIndicator } from '@app/components'
import { DoctorContext } from '@app/contexts/doctor'
import useDoctors from '@app/hooks/use-doctors'

const DoctorLayout = ({ children }: React.PropsWithChildren) => {
  const { data, error, isLoading } = useDoctors()

  return (
    <>
      <DoctorContext value={data?.data ?? []}>{children}</DoctorContext>
      {isLoading && <LoadingIndicator />}
    </>
  )
}

export default DoctorLayout

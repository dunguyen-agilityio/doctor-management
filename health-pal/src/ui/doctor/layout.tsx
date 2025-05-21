import React from 'react'

import { DoctorContext } from '@app/contexts/doctor'
import useDoctors from '@app/hooks/use-doctors'

const DoctorLayout = ({ children }: React.PropsWithChildren) => {
  const { data } = useDoctors()

  return <DoctorContext value={data?.data ?? []}>{children}</DoctorContext>
}

export default DoctorLayout

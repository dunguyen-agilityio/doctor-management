import { createContext } from 'react'

import { DoctorData } from '@app/models/doctor'

export const DoctorContext = createContext<DoctorData[]>([])

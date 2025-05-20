import { createContext } from 'react'

import { Clinic } from '@app/models/clinic'

export const ClinicsContext = createContext<Clinic[]>([])

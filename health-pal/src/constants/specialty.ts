import {
  Cardiologist,
  Dentistry,
  Gastroenterology,
  GeneralMedicine,
  Laboratory,
  Neurology,
  Pulmonology,
  Vaccination,
} from '@/icons'

import { TSpecialty } from '@/types/specialty'

export const SPECIALTY_LIST: TSpecialty[] = [
  { name: 'Dentistry', value: 'dentistry', icon: Dentistry, color: '#DC9497' },
  { name: 'Cardiology', value: 'cardiology', icon: Cardiologist, color: '#93C19E' },
  { name: 'Pulmonology', value: 'pulmonology', icon: Pulmonology, color: '#F5AD7E' },
  { name: 'General', value: 'general', icon: GeneralMedicine, color: '#ACA1CD' },
  { name: 'Neurology', value: 'neurology', icon: Neurology, color: '#4D9B91' },
  { name: 'Gastroenterology', value: 'gastroenterology', icon: Gastroenterology, color: '#352261' },
  { name: 'Laboratory', value: 'laboratory', icon: Laboratory, color: '#DEB6B5' },
  { name: 'Vaccination', value: 'vaccination', icon: Vaccination, color: '#89CCDB' },
]

import { Clinic } from './clinic'
import { Patient } from './patient'
import { Strapi } from './strapi'

type FavoriteClinic = Strapi & {
  type: 'Clinic'
  clinic: Clinic
}

type FavoriteDoctor = Strapi & {
  type: 'Doctor'
  doctor: Clinic
}

export type Favorite = (FavoriteClinic | FavoriteDoctor) & {
  parient: Patient
}

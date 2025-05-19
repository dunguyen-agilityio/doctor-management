import { Doctor } from './doctor'
import { Strapi } from './strapi'

export class Specialty extends Strapi {
  description!: string
  name!: string
  doctors!: Doctor[]

  constructor(specialty: Specialty) {
    super(specialty)
    Object.assign(this, specialty)
  }
}

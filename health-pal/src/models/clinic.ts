import { TImage } from '@app/types/image'

import { Doctor } from './doctor'
import { Review } from './review'
import { Strapi } from './strapi'

export class Clinic extends Strapi {
  description!: string
  name!: string
  address!: string
  image?: TImage
  doctors!: Doctor[]
  rating!: number
  reviews!: Review[]
  reivewCouter!: number
  type!: 'Hospital' | 'Clinic'

  constructor({ doctors, reviews, rating, reivewCouter, ...clinic }: Clinic) {
    super(clinic)
    Object.assign(this, clinic)
    this.doctors = doctors ?? []
    this.reviews = reviews ?? []
    this.rating = rating ?? 0
    this.reivewCouter = reivewCouter ?? 0
  }
}

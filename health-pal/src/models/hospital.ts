import { TImage } from '@/types/image'

import { Doctor } from './doctor'
import { Review } from './review'
import { Strapi } from './strapi'

export class Hospital extends Strapi {
  description!: string
  name!: string
  address!: string
  image?: TImage
  doctors!: Doctor[]
  rating!: number
  reviews!: Review[]
  reviewCounter!: number
  type!: 'Hospital' | 'Clinic'

  constructor({ doctors, reviews, rating, reviewCounter, ...clinic }: Hospital) {
    super(clinic)
    Object.assign(this, clinic)
    this.doctors = doctors ?? []
    this.reviews = reviews ?? []
    this.rating = rating ?? 0
    this.reviewCounter = reviewCounter ?? 0
  }
}

export type THospitalFavorite = Hospital & { favoriteId?: string }

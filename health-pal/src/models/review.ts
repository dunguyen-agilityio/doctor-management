import { Patient } from './patient'
import { Strapi } from './strapi'

export class Review extends Strapi {
  patient!: Patient
  rating!: number
  comment!: string

  constructor(review: Review) {
    super(review)
    Object.assign(this, review)
  }
}

export type ReviewData = Review & { name: string; image: string; patient?: Patient }

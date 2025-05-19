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

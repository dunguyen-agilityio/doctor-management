import { Clinic } from './clinic'
import { Review } from './review'
import { Specialty } from './specialty'
import { User } from './user'

export class Doctor extends User {
  specialty: Specialty
  clinic!: Clinic
  reviews?: Review[]
  rating: number
  reviewCounter: number

  constructor({ specialty, reviews, rating, reviewCounter, ...doctor }: Doctor) {
    super(doctor)
    this.specialty = specialty ?? []
    this.reviews = reviews ?? []
    this.rating = rating ?? 0
    this.reviewCounter = reviewCounter ?? 0
    Object.assign(this, doctor)
  }
}

export type TDoctorCard = Pick<Doctor, 'name' | 'documentId' | 'id' | 'rating'> & {
  avatar: string
  specialty: string
  address: string
  reviewCounter: number
  favoriteId?: string
}

export type DoctorData = Doctor & { users_permissions_user: User; favoriteId?: string }

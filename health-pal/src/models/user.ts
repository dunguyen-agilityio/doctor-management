import { TImage } from '@/types/image'

import { Strapi } from './strapi'

export class User extends Strapi {
  name!: string
  username!: string
  email!: string
  nickname!: string
  dateOfBirth!: Date
  gender!: boolean
  bio?: string
  avatar?: TImage

  constructor(user: User) {
    super(user)
    Object.assign(this, user)
    this.bio = user.bio ?? ''
  }
}

export type Session = { jwt: string; user: User & { password?: string } }

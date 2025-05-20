import { TImage } from '@app/types/image'

import { Strapi } from './strapi'

export class User extends Strapi {
  name!: string
  email!: string
  nickname!: string
  dayOfBirth!: Date
  gender!: boolean
  bio?: string
  avatar?: TImage

  constructor(user: User) {
    super(user)
    Object.assign(this, user)
    this.bio = user.bio ?? ''
  }
}

export type AuthUser = { jwt: string; user: User }

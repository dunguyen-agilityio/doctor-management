export class User {
  name!: string
  email!: string
  nickname!: string
  dayOfBirth!: Date
  gender!: boolean

  constructor(user: User) {
    Object.assign(this, user)
  }
}

export type AuthUser = User & { jwt: string }

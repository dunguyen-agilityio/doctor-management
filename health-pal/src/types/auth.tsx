export type AuthCredentials = {
  email: string
  password: string
}

export type SignupData = AuthCredentials & {
  name: string
}

export type UserProfileData = SignupData & {
  nickname: string
  dateOfBirth: Date | null
  gender: 'Male' | 'Female' | null
  avatar: number
  id: number
  avatarUrl?: string
}

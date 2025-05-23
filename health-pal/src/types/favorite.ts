export enum FAVORITE_TYPES {
  DOCTOR = 'doctor',
  HOSPITAL = 'hospital',
}

export type TFavorite<T, K> = {
  id: number
  documentId: string
  doctor: T
  type: K
}

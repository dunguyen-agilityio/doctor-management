export enum FAVORITE_TYPES {
  DOCTOR = 'doctor',
  HOSPITAL = 'hospital',
}

export type TFavorite<T> = {
  id: number
  documentId: string
  doctor: T
}

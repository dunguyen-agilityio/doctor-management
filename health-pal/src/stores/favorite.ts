import { create } from 'zustand'

import { FAVORITE_TYPES } from '@app/types/favorite'

export type FavoriteItem = {
  itemId: number // ID of the doctor or hospital
  type: FAVORITE_TYPES // Type of favorite (doctor or hospital)
  documentId: string
}

interface FavoritesState {
  favoriteDoctors: Record<number, string> // Maps doctorId to documentId
  favoriteHospitals: Record<number, string> // Maps hospitalId to documentId
  // Methods
  setFavoriteDoctors: (doctors: Record<number, string>) => void
  setFavoriteHospitals: (hospitals: Record<number, string>) => void
  toggleFavorite: (item: FavoriteItem) => void
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteDoctors: {},
  favoriteHospitals: {},
  setFavoriteDoctors: (doctors) => set({ favoriteDoctors: doctors }),
  setFavoriteHospitals: (hospitals) => set({ favoriteHospitals: hospitals }),
  toggleFavorite: (item) => {
    const { favoriteDoctors, favoriteHospitals } = get()
    const { itemId, type, documentId } = item

    const updated = { ...(type === FAVORITE_TYPES.DOCTOR ? favoriteDoctors : favoriteHospitals) }

    if (itemId in updated) {
      delete updated[itemId]
    } else {
      updated[itemId] = documentId
    }

    set({ [type === FAVORITE_TYPES.DOCTOR ? 'favoriteDoctors' : 'favoriteHospitals']: updated })
  },
}))

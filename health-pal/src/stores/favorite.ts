import { create } from 'zustand'

type FavoriteType = 'doctor' | 'hospital'

export type FavoriteItem = {
  itemId: number // ID of the doctor or hospital
  type: FavoriteType // Type of favorite (doctor or hospital)
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

    if (type === 'doctor') {
      set({
        favoriteDoctors: {
          ...favoriteDoctors,
          [itemId]: documentId,
        },
      })
    } else if (type === 'hospital') {
      set({
        favoriteHospitals: {
          ...favoriteHospitals,
          [itemId]: documentId,
        },
      })
    }
  },
}))

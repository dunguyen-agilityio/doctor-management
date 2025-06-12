import { act } from '@utils-test'

import { FAVORITE_TYPES } from '@/types/favorite'

import { FavoriteItem, useFavoritesStore } from '../favorite'

describe('useFavoritesStore', () => {
  beforeEach(() => {
    // reset store before each test
    act(() => {
      useFavoritesStore.setState({
        favoriteDoctors: {},
        favoriteHospitals: {},
      })
    })
  })

  it('sets favorite doctors', () => {
    act(() => {
      useFavoritesStore.getState().setFavoriteDoctors({ 1: 'doc-1' })
    })
    const { favoriteDoctors } = useFavoritesStore.getState()
    expect(favoriteDoctors).toEqual({ 1: 'doc-1' })
  })

  it('sets favorite hospitals', () => {
    act(() => {
      useFavoritesStore.getState().setFavoriteHospitals({ 10: 'hos-10' })
    })
    const { favoriteHospitals } = useFavoritesStore.getState()
    expect(favoriteHospitals).toEqual({ 10: 'hos-10' })
  })

  it('toggles doctor favorite (add)', () => {
    const item: FavoriteItem = {
      itemId: 1,
      type: FAVORITE_TYPES.DOCTOR,
      documentId: 'doc-1',
    }

    act(() => {
      useFavoritesStore.getState().toggleFavorite(item)
    })

    expect(useFavoritesStore.getState().favoriteDoctors).toEqual({ 1: 'doc-1' })
  })

  it('toggles hospital favorite (add)', () => {
    const item: FavoriteItem = {
      itemId: 10,
      type: FAVORITE_TYPES.HOSPITAL,
      documentId: 'hos-10',
    }

    act(() => {
      useFavoritesStore.getState().toggleFavorite(item)
    })

    expect(useFavoritesStore.getState().favoriteHospitals).toEqual({ 10: 'hos-10' })
  })

  // If you implement toggle remove behavior, add tests for toggle off
})

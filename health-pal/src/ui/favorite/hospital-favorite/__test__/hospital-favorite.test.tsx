import { MOCK_HOSPITALS } from '@/mocks/hospital'
import { MOCK_USER } from '@/mocks/user'
import { fireEvent, render, screen } from '@utils-test'

import React from 'react'

import { FAVORITE_EMPTY } from '@/constants'

import { useFavoriteHospitals } from '@/hooks/use-favorite'

import HospitalFavorite from '..'

jest.mock('@/hooks/use-favorite')

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('HospitalFavorite', () => {
  const mockedUseFavoriteHospitals = useFavoriteHospitals as jest.Mock

  it('renders loading skeleton', () => {
    mockedUseFavoriteHospitals.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    })

    const { getByTestId } = render(<HospitalFavorite />)

    expect(getByTestId('hospital-skeleton')).toBeTruthy()
  })

  it('renders error state when fetch fails', () => {
    const refetch = jest.fn()

    mockedUseFavoriteHospitals.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
      refetch,
    })

    render(<HospitalFavorite />)

    expect(screen.getByText('Error Loading Favorites')).toBeTruthy()

    fireEvent.press(screen.getByTestId('retry-button'))
    expect(refetch).toHaveBeenCalled()
  })

  it('renders empty state when data is empty', () => {
    mockedUseFavoriteHospitals.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    })

    render(<HospitalFavorite />)

    expect(screen.getByText(FAVORITE_EMPTY.hospital.title)).toBeTruthy()
  })

  it('renders hospital list when data is available', () => {
    mockedUseFavoriteHospitals.mockReturnValue({
      data: [{ ...MOCK_HOSPITALS[0], id: '1', name: 'Hospital A' }],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    })

    render(<HospitalFavorite />)

    expect(screen.getByText('Hospital A')).toBeTruthy()
  })
})

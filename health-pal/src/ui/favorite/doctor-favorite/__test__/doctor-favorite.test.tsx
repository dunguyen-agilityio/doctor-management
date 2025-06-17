import { MOCK_DOCTORS } from '@/mocks/doctor'
import { MOCK_USER } from '@/mocks/user'
import { fireEvent, render } from '@utils-test'

import React from 'react'

import { FAVORITE_EMPTY } from '@/constants'

import { useFavoriteDoctors } from '@/hooks/use-favorite'

import DoctorFavorite from '..'

jest.mock('@/hooks/use-favorite', () => ({
  useFavoriteDoctors: jest.fn(),
}))

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

const mockUseFavoriteDoctors = useFavoriteDoctors as jest.Mock

describe('DoctorFavorite', () => {
  it('renders loading state', () => {
    mockUseFavoriteDoctors.mockReturnValue({ isLoading: true })

    const { getByTestId } = render(<DoctorFavorite />)

    expect(getByTestId('doctor-list-skeleton')).toBeTruthy()
  })

  it('renders error state when error is present', () => {
    const refetchMock = jest.fn()
    mockUseFavoriteDoctors.mockReturnValue({
      isLoading: false,
      error: new Error('Failed'),
      data: null,
      refetch: refetchMock,
    })

    const { getByLabelText, getByTestId } = render(<DoctorFavorite />)

    expect(getByLabelText('Error Loading Favorites')).toBeTruthy()

    fireEvent.press(getByTestId('retry-button'))
    expect(refetchMock).toHaveBeenCalled()
  })

  it('renders error state when data is null', () => {
    mockUseFavoriteDoctors.mockReturnValue({
      isLoading: false,
      error: null,
      data: null,
      refetch: jest.fn(),
    })

    const { getByLabelText } = render(<DoctorFavorite />)

    expect(getByLabelText('Error Loading Favorites')).toBeTruthy()
  })

  it('renders empty state if doctors array is empty', () => {
    mockUseFavoriteDoctors.mockReturnValue({
      isLoading: false,
      error: null,
      data: [],
      refetch: jest.fn(),
    })

    const { getByText } = render(<DoctorFavorite />)

    expect(getByText(FAVORITE_EMPTY.doctor.title)).toBeTruthy()
  })

  it('renders doctor list if doctors exist', () => {
    mockUseFavoriteDoctors.mockReturnValue({
      isLoading: false,
      error: null,
      data: MOCK_DOCTORS,
      refetch: jest.fn(),
    })

    const { getAllByTestId } = render(<DoctorFavorite />)

    expect(getAllByTestId('doctor-card')).toHaveLength(MOCK_DOCTORS.length)
  })
})

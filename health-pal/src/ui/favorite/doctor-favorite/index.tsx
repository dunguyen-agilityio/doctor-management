import { FAVORITE_EMPTY } from '@/constants'

import { useFavoriteDoctors } from '@/hooks/use-favorite'

import { Empty, ErrorState } from '@/components'
import DoctorListSkeleton from '@/components/skeleton/doctor-list-skeleton'

import DoctorList from '@/ui/doctor/doctor-list'

import { FAVORITE_TYPES } from '@/types/favorite'

const DoctorFavorite = () => {
  const {
    data: doctors,
    error: favoriteError,
    isLoading: favoriteLoading,
    refetch,
  } = useFavoriteDoctors()

  if (favoriteLoading) {
    return <DoctorListSkeleton />
  }

  if (!doctors || favoriteError) {
    return (
      <ErrorState
        title="Error Loading Favorites"
        message={`We couldn't load your favorite Doctor. Please try again.`}
        onRetry={refetch}
        aria-label="Error Loading Favorites"
      />
    )
  }

  const ListEmptyComponent = <Empty {...FAVORITE_EMPTY[FAVORITE_TYPES.DOCTOR]} />

  return <DoctorList data={doctors} ListEmptyComponent={ListEmptyComponent} />
}

export default DoctorFavorite

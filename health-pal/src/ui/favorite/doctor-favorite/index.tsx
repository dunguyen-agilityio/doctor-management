import { FAVORITE_EMPTY } from '@app/constants'

import { useFavoriteDoctors } from '@app/hooks/use-favorite'

import { Empty, ErrorState } from '@app/components'
import DoctorListSkeleton from '@app/components/skeleton/doctor-list-skeleton'

import DoctorList from '@app/ui/doctor/doctor-list'

import { FAVORITE_TYPES } from '@app/types/favorite'

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
      />
    )
  }

  const ListEmptyComponent = <Empty {...FAVORITE_EMPTY[FAVORITE_TYPES.DOCTOR]} />

  return <DoctorList data={doctors} ListEmptyComponent={ListEmptyComponent} />
}

export default DoctorFavorite

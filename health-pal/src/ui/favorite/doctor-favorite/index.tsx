import { FAVORITE_EMPTY } from '@app/constants'

import Empty from '@app/components/empty'
import ErrorState from '@app/components/error'
import DoctorListSkeleton from '@app/components/skeleton/doctor-list-skeleton'
import { useFavoriteDoctors } from '@app/hooks/use-favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'
import DoctorList from '@app/ui/doctor/doctor-list'

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

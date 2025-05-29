import { FAVORITE_EMPTY } from '@app/constants'

import DoctorList from '@app/components/doctor-list'
import Empty from '@app/components/empty'
import ErrorState from '@app/components/error'
import LoadingIndicator from '@app/components/loading-indicator'
import { useSession } from '@app/contexts'
import { useFavoriteDoctors } from '@app/hooks/use-favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

const DoctorFavorite = () => {
  const { session } = useSession()

  const { jwt, user } = session ?? {}
  const {
    data: doctors,
    error: favoriteError,
    isLoading: favoriteLoading,
    refetch,
  } = useFavoriteDoctors(user!.id, jwt!)

  if (favoriteLoading) {
    return <LoadingIndicator />
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

import { Stack } from 'tamagui'

import { FAVORITE_EMPTY } from '@app/constants'

import { ClinicCard, LoadingIndicator } from '@app/components'
import Empty from '@app/components/empty'
import ErrorState from '@app/components/error'
import { useSession } from '@app/contexts'
import { useFavoriteHospitals } from '@app/hooks/use-favorite'
import { TClinicFavorite } from '@app/models/clinic'
import { FAVORITE_TYPES } from '@app/types/favorite'
import FavoriteContainer from '@app/ui/favorite/favorite-container'

import HospitalList from '../hospital/hospital-list'

const ItemSeparatorComponent = () => <Stack height={12} />

const ClinicFavorite = () => {
  const { session } = useSession()
  const { jwt, user } = session ?? {}
  const { data: hospitals, isLoading, error, refetch } = useFavoriteHospitals(user!.id, jwt!)

  if (isLoading) return <LoadingIndicator />

  if (!hospitals || error)
    return (
      <ErrorState
        title="Error Loading Favorites"
        message="We couldn't load your favorite Hospital. Please try again."
        onRetry={refetch}
      />
    )

  const renderItem = ({ item }: { item: TClinicFavorite }) => {
    const { documentId, name, favoriteId, id } = item

    return (
      <FavoriteContainer
        itemId={id}
        itemDocId={documentId}
        itemName={name}
        type={FAVORITE_TYPES.HOSPITAL}
        favoriteId={favoriteId}>
        <ClinicCard px={24} h={256} full {...item} />
      </FavoriteContainer>
    )
  }

  const ListEmptyComponent = <Empty {...FAVORITE_EMPTY[FAVORITE_TYPES.HOSPITAL]} />

  return (
    <HospitalList
      data={hospitals}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
    />
  )
}

export default ClinicFavorite

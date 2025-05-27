import { Stack } from 'tamagui'

import { FAVORITE_EMPTY } from '@app/constants'

import { HospitalCard, LoadingIndicator } from '@app/components'
import Empty from '@app/components/empty'
import ErrorState from '@app/components/error'
import { useSession } from '@app/contexts'
import { useFavoriteHospitals } from '@app/hooks/use-favorite'
import { Hospital, THospitalFavorite } from '@app/models/hospital'
import { FAVORITE_TYPES } from '@app/types/favorite'
import HospitalList from '@app/ui/hospital/hospital-list'

const ItemSeparatorComponent = () => <Stack height={12} />

const keyExtractor = (item: Hospital) => item.documentId

const HospitalFavorite = () => {
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

  const renderItem = ({ item }: { item: THospitalFavorite }) => {
    return <HospitalCard px={24} h={256} full {...item} />
  }

  const ListEmptyComponent = <Empty {...FAVORITE_EMPTY[FAVORITE_TYPES.HOSPITAL]} />

  return (
    <HospitalList
      data={hospitals}
      ItemSeparatorComponent={ItemSeparatorComponent}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
    />
  )
}

export default HospitalFavorite

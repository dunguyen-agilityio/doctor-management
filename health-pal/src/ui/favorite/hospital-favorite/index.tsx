import { StyleSheet } from 'react-native'

import { Stack } from 'tamagui'

import { FAVORITE_EMPTY } from '@app/constants'

import Empty from '@app/components/empty'
import ErrorState from '@app/components/error'
import HospitalListSkeleton from '@app/components/skeleton/hospital-list-skeleton'
import { useFavoriteHospitals } from '@app/hooks/use-favorite'
import useMediaQuery from '@app/hooks/use-media-query'
import { FAVORITE_TYPES } from '@app/types/favorite'
import HospitalList from '@app/ui/hospital/hospital-list'
import { keyExtractor } from '@app/utils/list'

const ItemSeparatorComponent = () => <Stack height={12} />

const HospitalFavorite = () => {
  const { height } = useMediaQuery({ px: 24, height: 256, full: true })
  const { data: hospitals, isLoading, error, refetch } = useFavoriteHospitals()

  if ((!isLoading && !hospitals) || error) {
    return (
      <ErrorState
        title="Error Loading Favorites"
        message="We couldn't load your favorite Hospital. Please try again."
        onRetry={refetch}
      />
    )
  }

  const ListEmptyComponent = <Empty {...FAVORITE_EMPTY[FAVORITE_TYPES.HOSPITAL]} />

  return (
    <>
      {isLoading && <HospitalListSkeleton paddingHorizontal={24} count={3} />}
      <HospitalList
        data={hospitals}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={keyExtractor}
        estimatedItemSize={height}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </>
  )
}

export default HospitalFavorite

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
})

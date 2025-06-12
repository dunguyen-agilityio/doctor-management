import { keyExtractor } from '@/utils/list'
import { getMediaQuery } from '@/utils/media-query'

import { StyleSheet } from 'react-native'

import { Stack } from 'tamagui'

import { FAVORITE_EMPTY } from '@/constants'

import { useFavoriteHospitals } from '@/hooks/use-favorite'

import { Empty, ErrorState } from '@/components'
import HospitalListSkeleton from '@/components/skeleton/hospital-list-skeleton'

import HospitalList from '@/ui/hospital/hospital-list'

import { FAVORITE_TYPES } from '@/types/favorite'

const ItemSeparatorComponent = () => <Stack height={12} />

const HospitalFavorite = () => {
  const { height } = getMediaQuery({ px: 24, height: 256, full: true })
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

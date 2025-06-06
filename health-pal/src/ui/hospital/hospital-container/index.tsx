import { StyleSheet } from 'react-native'

import { Spinner, Stack, View } from 'tamagui'

import { FAVORITE_EMPTY } from '@app/constants'

import useHospitals from '@app/hooks/use-hospitals'

import { Empty, ErrorState, LoadingIndicator, YStack } from '@app/components'
import HospitalListSkeleton from '@app/components/skeleton/hospital-list-skeleton'

import { FAVORITE_TYPES } from '@app/types/favorite'

import { getMediaQuery } from '@app/utils/media-query'

import HospitalList from '../hospital-list'

const ItemSeparatorComponent = () => <Stack height={10} />

const HospitalContainer = ({ query }: { query: string }) => {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useHospitals(query)

  const { height } = getMediaQuery({ px: 24, height: 256, full: true })

  if (isLoading) {
    return <HospitalListSkeleton />
  }

  if ((!data && !isFetching) || error)
    return (
      <ErrorState
        title="Error Loading Favorites"
        message="We couldn't load your favorite Hospital. Please try again."
        onRetry={refetch}
      />
    )

  const ListEmptyComponent = <Empty {...FAVORITE_EMPTY[FAVORITE_TYPES.HOSPITAL]} />

  const ListFooterComponent = hasNextPage ? (
    <YStack paddingVertical={8}>
      <Spinner />
    </YStack>
  ) : null

  return (
    <View flex={1} position="relative">
      {isFetching && !isFetchingNextPage && <LoadingIndicator fullScreen />}
      <HospitalList
        data={data?.data ?? []}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.contentContainerStyle}
        estimatedItemSize={height}
        onEndReached={() => fetchNextPage()}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  )
}

export default HospitalContainer

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
})

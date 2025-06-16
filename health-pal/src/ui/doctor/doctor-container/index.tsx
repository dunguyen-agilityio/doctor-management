import { Spinner, YStack } from 'tamagui'

import { useDoctors } from '@/hooks/use-doctors'
import { useFavoriteDoctors } from '@/hooks/use-favorite'

import { Empty, ErrorState, LoadingIndicator, Text, XStack } from '@/components'
import DoctorListSkeleton from '@/components/skeleton/doctor-list-skeleton'

import DoctorList from '../doctor-list'

interface DoctorContainerProps {
  query: string
  specialty: string[]
}

const DoctorContainer = ({ query, specialty }: DoctorContainerProps) => {
  const {
    data,
    isFetching,
    isLoading: docLoading,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  } = useDoctors(query, specialty)

  const { isLoading: favLoading } = useFavoriteDoctors()

  const hasError = error || !data

  const isLoading = favLoading || docLoading

  if (isLoading) {
    return <DoctorListSkeleton />
  }

  if (!data && hasError) {
    return (
      <ErrorState
        title="Failed to Load"
        message="Please check your internet connection."
        onRetry={refetch}
      />
    )
  }

  const { data: doctors } = data

  const ListFooterComponent = hasNextPage ? (
    <YStack paddingVertical={8}>
      <Spinner testID="spinner" />
    </YStack>
  ) : null

  const ListEmptyComponent = (
    <Empty
      title="No Doctors Found"
      description="Try adjusting your filters or check back later."
      actionLabel="Refresh"
      onAction={refetch}
    />
  )

  const onEndReached = () => fetchNextPage()

  return (
    <YStack flex={1} gap={8} position="relative">
      {isFetching && !isFetchingNextPage && <LoadingIndicator fullScreen />}
      <XStack justifyContent="space-between" paddingHorizontal={24}>
        <Text size="medium" fontWeight="700">{`${data?.meta.pagination.total ?? 0} founds`}</Text>
      </XStack>
      <DoctorList
        data={doctors}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </YStack>
  )
}

export default DoctorContainer

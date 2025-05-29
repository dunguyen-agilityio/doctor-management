import { Spinner, YStack } from 'tamagui'

import { Text, XStack } from '@theme'

import DoctorList, { FlatListRef } from '@app/components/doctor-list'
import Empty from '@app/components/empty'
import ErrorState from '@app/components/error'
import { useSession } from '@app/contexts'
import useDoctors from '@app/hooks/use-doctors'
import { useFavoriteDoctors } from '@app/hooks/use-favorite'

interface DoctorContainerProps {
  query: string
  specialty: string[]
  page?: number
  ref?: React.Ref<FlatListRef>
}

const DoctorContainer = ({ ref, query, specialty, page = 1 }: DoctorContainerProps) => {
  const {
    data,
    isLoading: doctorLoading,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = useDoctors(query, specialty, page)

  const { session } = useSession()

  const { jwt, user } = session ?? {}
  const { isLoading: favLoading } = useFavoriteDoctors(user!.id, jwt!)

  const isLoading = doctorLoading || favLoading

  const hasError = error || !data

  if (!isLoading && hasError) {
    return (
      <ErrorState
        title="Failed to Load"
        message="Please check your internet connection."
        onRetry={refetch}
      />
    )
  }

  if (!data) return null

  const { data: doctors, meta } = data

  const ListFooterComponent = hasNextPage ? (
    <YStack paddingVertical={8}>
      <Spinner />
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
    <YStack flex={1} gap={8}>
      <XStack justifyContent="space-between" paddingHorizontal={24}>
        <Text size="medium" fontWeight="700">{`${meta.pagination.total} founds`}</Text>
      </XStack>
      <DoctorList
        ref={ref}
        data={doctors}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </YStack>
  )
}

export default DoctorContainer

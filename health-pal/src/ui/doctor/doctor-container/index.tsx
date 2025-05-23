import { Spinner, YStack } from 'tamagui'

import { Text, XStack } from '@theme'

import DoctorCard from '@app/components/doctor-card'
import DoctorList from '@app/components/doctor-list'
import Empty from '@app/components/empty'
import ErrorState from '@app/components/error'
import { useSession } from '@app/contexts'
import useDoctors from '@app/hooks/use-doctors'
import { useFavoriteDoctors } from '@app/hooks/use-favorite'
import { TDoctorData } from '@app/models/doctor'
import { formatDoctor } from '@app/utils/doctor'

const DoctorContainer = () => {
  const {
    data,
    isLoading: doctorLoading,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = useDoctors()
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

  const renderItem = ({ item }: { item: TDoctorData }) => {
    return <DoctorCard {...formatDoctor(item)} />
  }

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
        data={doctors}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </YStack>
  )
}

export default DoctorContainer

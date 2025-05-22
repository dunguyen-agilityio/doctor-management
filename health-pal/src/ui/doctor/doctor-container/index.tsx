import { Spinner } from 'tamagui'

import { Text, XStack, YStack } from '@theme'

import { SortIcon } from '@icons'

import { ButtonWithUpcoming, LoadingIndicator } from '@app/components'
import DoctorCard from '@app/components/doctor-card'
import DoctorList from '@app/components/doctor-list'
import useDoctors from '@app/hooks/use-doctors'
import { DoctorData } from '@app/models/doctor'
import { formatDoctor } from '@app/utils/doctor'

const DoctorContainer = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useDoctors()

  const renderItem = ({ item }: { item: DoctorData }) => <DoctorCard {...formatDoctor(item)} />

  if (isLoading) return <LoadingIndicator fullScreen />

  if (error || !data) {
    return <Text>Error</Text>
  }

  const { data: doctors, meta } = data

  const ListFooterComponent = hasNextPage ? (
    <YStack paddingVertical={8}>
      <Spinner />
    </YStack>
  ) : null

  const onEndReached = () => fetchNextPage()

  return (
    <YStack flex={1} gap={8}>
      <XStack justifyContent="space-between" paddingHorizontal={24}>
        <Text size="medium" fontWeight="700">{`${meta.pagination.total} founds`}</Text>
        <ButtonWithUpcoming variant="text" alignItems="center">
          <Text size="small" fontWeight="600">
            Default
          </Text>
          <SortIcon />
        </ButtonWithUpcoming>
      </XStack>
      <DoctorList
        data={doctors}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
      />
    </YStack>
  )
}

export default DoctorContainer

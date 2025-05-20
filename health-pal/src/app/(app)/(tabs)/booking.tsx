import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { FlatList } from 'react-native-gesture-handler'

import { Separator, Tabs, TabsContentProps, TabsTabProps } from 'tamagui'

import { Heading, Text, YStack } from '@theme'

import { LoadingIndicator } from '@app/components'
import BookingCard from '@app/components/booking-card'
import { BookingData } from '@app/models/booking'
import { getBookings } from '@app/services/booking'

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content padding="$md" flex={1} {...props}>
      {props.children}
    </Tabs.Content>
  )
}

const tabDefaultProps = {
  h: 40,
  flex: 1,
  maxWidth: 86,
  paddingHorizontal: 0,
} as TabsTabProps

enum BOOKING_TABS {
  UPCOMING = 'Upcoming',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

const Booking = () => {
  const [tab, setTab] = useState<string>(BOOKING_TABS.UPCOMING)

  console.log('[booking + tab]', ['booking' + tab])

  const { isLoading, data, error } = useQuery({
    queryKey: ['booking' + tab],
    queryFn: () =>
      getBookings({ filters: [{ key: 'filters[type][$eq]', query: tab.toLowerCase() }] }),
  })

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error || !data) {
    return <Text>{error?.message ?? 'Error'}</Text>
  }

  const formatBooking = ({ doctor, date, documentId, id, time, type }: BookingData) => {
    const { users_permissions_user, clinic } = doctor

    return {
      date,
      documentId,
      id,
      time,
      type,
      doctorName: users_permissions_user.name,
      doctorAvatar: users_permissions_user.avatar?.url,
      address: clinic.address,
      specialty: doctor.specialty.name,
    }
  }

  return (
    <Tabs
      orientation="horizontal"
      flexDirection="column"
      flex={1}
      overflow="hidden"
      borderColor="$borderColor"
      backgroundColor="$white"
      value={tab}
      onValueChange={setTab}>
      <Tabs.List
        disablePassBorderRadius="bottom"
        aria-label="Manage your account"
        borderBottomColor="$grey200"
        justifyContent="space-between"
        paddingHorizontal={28}
        borderBottomWidth={1}>
        {Object.values(BOOKING_TABS).map((value) => (
          <Tabs.Tab {...tabDefaultProps} key={value} value={value}>
            <TabsTab title={value} active={tab === value} />
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Separator />

      {Object.values(BOOKING_TABS).map((value) => (
        <TabsContent value={value} key={value}>
          <Heading>{value}</Heading>
          <FlatList
            renderItem={() => <BookingCard {...formatBooking(data.data[0])} />}
            data={data.data}
            style={{ flex: 1 }}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default Booking

const TabsTab = ({ title, active }: { title: string; active: boolean }) => {
  return (
    <YStack height={40} justifyContent="space-between">
      <Heading size="medium" height={24} fontWeight="600" textAlign="center">
        {title}
      </Heading>
      {active && (
        <Separator
          borderTopWidth={3}
          borderTopColor="$primary"
          borderTopLeftRadius={50}
          borderTopRightRadius={50}
          padding={0}
        />
      )}
    </YStack>
  )
}

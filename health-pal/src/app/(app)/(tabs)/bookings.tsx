import { router, useLocalSearchParams } from 'expo-router'

import { Separator, Tabs } from 'tamagui'

import { TAB_DEFAULT_PROPS, TabsContent, TabsTab } from '@app/components'
import { BOOKING_TABS } from '@app/types/booking'
import BookingList from '@app/ui/booking/booking-list'

const Booking = () => {
  const { type = BOOKING_TABS.UPCOMING } = useLocalSearchParams<{ type?: BOOKING_TABS }>()

  const handleChangeTab = (type: string) => {
    router.setParams({ type })
  }

  return (
    <Tabs
      orientation="horizontal"
      flexDirection="column"
      flex={1}
      overflow="hidden"
      borderColor="$borderColor"
      backgroundColor="$white"
      value={type}
      onValueChange={handleChangeTab}>
      <Tabs.List
        disablePassBorderRadius="bottom"
        aria-label="Manage your account"
        borderBottomColor="$grey200"
        justifyContent="space-between"
        paddingHorizontal={28}
        borderBottomWidth={0.5}>
        {Object.values(BOOKING_TABS).map((value) => (
          <Tabs.Tab
            {...TAB_DEFAULT_PROPS}
            pressStyle={{ backgroundColor: '$white' }}
            key={value}
            value={value}>
            <TabsTab title={value} active={type === value} />
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Separator />

      {Object.values(BOOKING_TABS).map((value) => (
        <TabsContent value={value} key={value}>
          <BookingList type={value} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default Booking

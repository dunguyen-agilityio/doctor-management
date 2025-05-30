import { router, useLocalSearchParams } from 'expo-router'

import { Separator, Tabs } from 'tamagui'

import { TAB_DEFAULT_PROPS, TabsContent, TabsTab } from '@app/components'
import { FAVORITE_TYPES } from '@app/types/favorite'
import { DoctorFavorite, HospitalFavorite } from '@app/ui/favorite'

const Favorite = () => {
  const { type = FAVORITE_TYPES.DOCTOR } = useLocalSearchParams<{ type: FAVORITE_TYPES }>()

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
        borderBottomWidth={1}>
        {Object.values(FAVORITE_TYPES).map((value) => (
          <Tabs.Tab
            pressStyle={{ backgroundColor: 'transparent' }}
            {...TAB_DEFAULT_PROPS}
            maxWidth={150}
            key={value}
            value={value}>
            <TabsTab title={`${value}s`} active={type === value} />
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Separator />

      <TabsContent value={FAVORITE_TYPES.DOCTOR}>
        <DoctorFavorite />
      </TabsContent>
      <TabsContent value={FAVORITE_TYPES.HOSPITAL}>
        <HospitalFavorite />
      </TabsContent>
    </Tabs>
  )
}

export default Favorite

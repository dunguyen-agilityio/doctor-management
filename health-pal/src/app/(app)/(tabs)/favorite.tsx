import { router, useLocalSearchParams } from 'expo-router'

import { Separator, Tabs } from 'tamagui'

import { TAB_DEFAULT_PROPS, TabsContent, TabsTab } from '@app/components'

import { DoctorFavorite, HospitalFavorite } from '@app/ui/favorite'

import { FAVORITE_TYPES } from '@app/types/favorite'

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
      onValueChange={handleChangeTab}
      role="tablist">
      <Tabs.List
        disablePassBorderRadius="bottom"
        borderBottomColor="$grey200"
        justifyContent="space-between"
        paddingHorizontal={28}
        borderBottomWidth={1}
        role="tablist"
        tabIndex={0}
        aria-label="Favorite tabs"
        accessibilityHint="Select between favorite doctors and hospitals">
        {Object.values(FAVORITE_TYPES).map((value) => (
          <Tabs.Tab
            pressStyle={{ backgroundColor: 'transparent' }}
            {...TAB_DEFAULT_PROPS}
            maxWidth={150}
            key={value}
            value={value}
            tabIndex={0}
            aria-label={`${value}s tab`}
            accessibilityHint={`Shows your favorite ${value.toLowerCase()}s`}>
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

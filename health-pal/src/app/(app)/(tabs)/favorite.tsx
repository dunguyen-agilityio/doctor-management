import { router, useLocalSearchParams } from 'expo-router'

import { Separator, Stack, Tabs } from 'tamagui'

import { ClinicCard, TAB_DEFAULT_PROPS, TabsContent, TabsTab } from '@app/components'
import DoctorList from '@app/components/doctor-list'
import { Clinic } from '@app/models/clinic'
import { FAVORITE_TYPES, TFavorite } from '@app/types/favorite'
import { ClinicFavorite, DoctorFavorite } from '@app/ui/favorite'
import HospitalList from '@app/ui/hospital/hospital-list'

const ItemSeparatorComponent = () => <Stack height={12} />

const renderItem = ({ item }: { item: Clinic & TFavorite }) => (
  <ClinicCard px={24} h={256} full {...item} />
)

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
          <Tabs.Tab {...TAB_DEFAULT_PROPS} maxWidth={150} key={value} value={value}>
            <TabsTab title={value} active={type === value} />
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Separator />

      <TabsContent value={FAVORITE_TYPES.DOCTOR}>
        <DoctorFavorite>
          <DoctorList />
        </DoctorFavorite>
      </TabsContent>
      <TabsContent paddingHorizontal="$md" value={FAVORITE_TYPES.HOSPITAL}>
        <ClinicFavorite>
          <HospitalList ItemSeparatorComponent={ItemSeparatorComponent} renderItem={renderItem} />
        </ClinicFavorite>
      </TabsContent>
    </Tabs>
  )
}

export default Favorite

import { YStack } from '@theme'

import { SearchInput } from '@app/components'
import DoctorList from '@app/components/doctor-list'
import DoctorLayout from '@app/ui/doctor/layout'
import MultipleSelectSpecialty from '@app/ui/doctor/multiple-select-specialty'

const DoctorListScreen = () => {
  return (
    <YStack gap="$md" flex={1}>
      <YStack paddingHorizontal={24} maxHeight={40}>
        <SearchInput placeholder="Search doctor..." />
      </YStack>
      <MultipleSelectSpecialty />
      <DoctorLayout>
        <DoctorList />
      </DoctorLayout>
    </YStack>
  )
}

export default DoctorListScreen

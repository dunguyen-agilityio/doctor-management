import { YStack } from '@theme'

import { SearchInput } from '@app/components'
import { DoctorContainer, MultipleSelectSpecialty } from '@app/ui/doctor'

const DoctorListScreen = () => {
  return (
    <YStack gap="$md" flex={1}>
      <YStack paddingHorizontal={24} maxHeight={40}>
        <SearchInput placeholder="Search doctor..." />
      </YStack>
      <YStack>
        <MultipleSelectSpecialty />
      </YStack>

      <DoctorContainer />
    </YStack>
  )
}

export default DoctorListScreen

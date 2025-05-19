import { FlatList } from 'react-native-gesture-handler'

import { Stack } from 'tamagui'

import { YStack } from '@theme'

import ClinicCard from '@app/components/clinic-card'
import SessionHeader from '@app/components/session-header'
import { Clinic } from '@app/models/clinic'

const ItemSeparatorComponent = () => <Stack width={16} />

const keyExtractor = (item: Clinic) => item.documentId

const ClinicList = ({ data }: { data: Clinic[] }) => {
  const renderItem = ({ item }: { item: Clinic }) => <ClinicCard w={232} px={0} {...item} />

  return (
    <YStack gap={10} paddingBottom={16}>
      <SessionHeader title="Nearby Medical Centers" />
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  )
}

export default ClinicList

import { FlatListProps } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'

import { XStack } from '@theme'

const ItemSeparatorComponent = () => <XStack height={8} />

const DoctorList = <T extends { documentId: string }>(props: FlatListProps<T>) => {
  const keyExtractor = (item: T) => item.documentId

  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      {...props}
    />
  )
}

export default DoctorList

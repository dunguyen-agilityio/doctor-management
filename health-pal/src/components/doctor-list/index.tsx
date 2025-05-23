import { FlatListProps, StyleSheet } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'

import { XStack } from 'tamagui'

import { TDoctorData } from '@app/models/doctor'

const ItemSeparatorComponent = () => <XStack height={8} />

const DoctorList = (props: FlatListProps<TDoctorData>) => {
  const keyExtractor = (item: TDoctorData) => item.documentId

  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
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

const styles = StyleSheet.create({
  contentContainerStyle: { paddingHorizontal: 24, paddingBottom: 8 },
})

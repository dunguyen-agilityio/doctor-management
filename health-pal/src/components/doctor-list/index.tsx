import { useImperativeHandle, useRef } from 'react'
import { FlatListProps, StyleSheet } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'

import { XStack } from 'tamagui'

import { TDoctorData } from '@app/models/doctor'
import { formatDoctor } from '@app/utils/doctor'
import { keyExtractor } from '@app/utils/list'

import DoctorCard from '../doctor-card'

const ItemSeparatorComponent = () => <XStack height={8} />

export type FlatListRef = { scrollTop: () => void }

interface DoctorListProps extends Omit<FlatListProps<TDoctorData>, 'renderItem'> {
  ref?: React.Ref<FlatListRef>
}

const DoctorList = ({ ref, ...props }: DoctorListProps) => {
  const flatListRef = useRef<FlatList>(null)

  useImperativeHandle(ref, () => ({
    scrollTop: () => {
      if (ref) {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
      }
    },
  }))

  const renderItem = ({ item }: { item: TDoctorData }) => {
    return <DoctorCard {...formatDoctor(item)} />
  }

  return (
    <FlatList
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      ref={flatListRef}
      {...props}
    />
  )
}

export default DoctorList

const styles = StyleSheet.create({
  contentContainerStyle: { paddingHorizontal: 24, paddingBottom: 8 },
})

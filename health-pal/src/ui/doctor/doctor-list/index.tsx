import { TDoctorData } from '@/models/doctor'
import { formatDoctor } from '@/utils/doctor'
import { keyExtractor } from '@/utils/list'
import { getMediaQuery } from '@/utils/media-query'
import { FlashList, FlashListProps } from '@shopify/flash-list'

import { StyleSheet } from 'react-native'

import { Stack, View } from 'tamagui'

import { WINDOW_SIZE } from '@/constants'

import DoctorCard from '../doctor-card'

interface DoctorListProps extends Omit<FlashListProps<TDoctorData>, 'renderItem'> {
  renderItem?: FlashListProps<TDoctorData>['renderItem']
}

const DoctorList = ({ ...props }: DoctorListProps) => {
  const { height } = getMediaQuery({ height: 133, full: true })

  const renderItem = ({ item }: { item: TDoctorData }) => <DoctorCard {...formatDoctor(item)} />

  const ItemSeparatorComponent = () => <Stack height={8} />

  return (
    <View minWidth={WINDOW_SIZE.width - 24 * 2} flex={1}>
      <FlashList
        testID="doctor-list"
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        estimatedItemSize={height}
        {...props}
      />
    </View>
  )
}

export default DoctorList

const styles = StyleSheet.create({
  contentContainerStyle: { paddingHorizontal: 24, paddingVertical: 8 },
})

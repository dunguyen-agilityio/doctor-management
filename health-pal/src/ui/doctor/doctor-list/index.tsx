import { FlashList, FlashListProps } from '@shopify/flash-list'

import { StyleSheet } from 'react-native'

import { Stack, View } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import { TDoctorData } from '@app/models/doctor'
import { formatDoctor } from '@app/utils/doctor'
import { keyExtractor } from '@app/utils/list'
import { getMediaQuery } from '@app/utils/media-query'

import DoctorCard from '../doctor-card'

interface DoctorListProps extends Omit<FlashListProps<TDoctorData>, 'renderItem'> {}

const DoctorList = ({ ...props }: DoctorListProps) => {
  const { height } = getMediaQuery({ height: 133, full: true })

  const renderItem = ({ item }: { item: TDoctorData }) => <DoctorCard {...formatDoctor(item)} />

  const ItemSeparatorComponent = () => <Stack height={8} />

  return (
    <View minWidth={WINDOW_SIZE.width - 24 * 2} flex={1}>
      <FlashList
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

import { FlashList, FlashListProps } from '@shopify/flash-list'

import { StyleSheet } from 'react-native'

import { Link } from 'expo-router'

import { View, XStack } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import useMediaQuery from '@app/hooks/use-media-query'

import { TDoctorData } from '@app/models/doctor'
import { formatDoctor } from '@app/utils/doctor'
import { keyExtractor } from '@app/utils/list'

import DoctorCard from '../doctor-card'

const ItemSeparatorComponent = () => <XStack height={8} />

interface DoctorListProps extends Omit<FlashListProps<TDoctorData>, 'renderItem'> {
  page?: number
}

const DoctorList = ({ page = 1, ...props }: DoctorListProps) => {
  const { height } = useMediaQuery({ height: 133, full: true })

  const Wrapper = ({
    id,
    children,
  }: React.PropsWithChildren<{
    id: string
  }>) => (
    <Link testID="doctor-link" href={{ pathname: '/doctors/details/[id]', params: { id } }}>
      {children}
    </Link>
  )

  const renderItem = ({ item }: { item: TDoctorData }) => {
    return <DoctorCard {...formatDoctor(item)} wrapper={Wrapper} />
  }

  return (
    <View minWidth={WINDOW_SIZE.width - 24 * 2} flex={1}>
      <FlashList
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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

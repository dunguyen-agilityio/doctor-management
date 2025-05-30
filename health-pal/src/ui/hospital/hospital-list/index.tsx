import { FlashList, FlashListProps } from '@shopify/flash-list'

import { Hospital } from '@app/models/hospital'
import { keyExtractor } from '@app/utils/list'

import HospitalCard from '../hospital-card'

interface HospitalProps extends Omit<FlashListProps<Hospital>, 'renderItem'> {}

const HospitalList = ({ ...otherProps }: HospitalProps) => {
  const renderItem = ({ item }: { item: Hospital }) => {
    return <HospitalCard {...item} />
  }

  return (
    <FlashList
      {...otherProps}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  )
}

export default HospitalList

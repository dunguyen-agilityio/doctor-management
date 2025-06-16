import { Hospital } from '@/models/hospital'
import { keyExtractor } from '@/utils/list'
import { FlashList, FlashListProps } from '@shopify/flash-list'

import HospitalCard from '../hospital-card'

export interface HospitalProps extends Omit<FlashListProps<Hospital>, 'renderItem'> {
  renderItem?: FlashListProps<Hospital>['renderItem']
}

const HospitalList = ({ ...otherProps }: HospitalProps) => {
  const renderItem = ({ item }: { item: Hospital }) => <HospitalCard {...item} />

  return (
    <FlashList
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      testID="hospital-list"
      {...otherProps}
    />
  )
}

export default HospitalList

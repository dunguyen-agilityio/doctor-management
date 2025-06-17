import { forwardRef } from 'react'
import { View, ViewProps } from 'react-native'

const Carousel = forwardRef((props: any, ref) => {
  return <View testID="carousel">{props.renderItem({ item: props.data[0], index: 0 })}</View>
})

Carousel.displayName = 'Carousel'

export const Pagination = {
  Custom: ({ data, onPress, ...rest }: ViewProps & { data: any[]; onPress: () => void }) => (
    <View testID="pagination">
      {data.map((_, i) => (
        <View testID={`dot-${i}`} key={i} {...rest} />
      ))}
    </View>
  ),
}

export default Carousel

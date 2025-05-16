import { useRef } from 'react'
import { Text, View } from 'react-native'

import { useSharedValue } from 'react-native-reanimated'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel'

import { XStack, YStack } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import Item from './item'

const data = [...new Array(6).keys()]

const DoctorBanner = () => {
  const ref = useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    })
  }

  const width = WINDOW_SIZE.width < 342 ? WINDOW_SIZE.width : 342

  return (
    <XStack position="relative" justifyContent="center" alignItems="flex-end" h={163}>
      <YStack position="absolute" justifyContent="center" width={width}>
        <Carousel
          ref={ref}
          width={width}
          height={163}
          data={data}
          onProgressChange={progress}
          renderItem={({ item }) => <Item key={item} />}
        />
      </YStack>
      <XStack paddingBottom={6}>
        <Pagination.Custom
          progress={progress}
          data={data}
          dotStyle={{
            backgroundColor: '#fff',
            width: 6,
            height: 6,
            borderRadius: 50,
            opacity: 0.8,
          }}
          containerStyle={{ gap: 5 }}
          onPress={onPressPagination}
          activeDotStyle={{ backgroundColor: '#fff', width: 30, height: 6 }}
        />
      </XStack>
    </XStack>
  )
}

export default DoctorBanner

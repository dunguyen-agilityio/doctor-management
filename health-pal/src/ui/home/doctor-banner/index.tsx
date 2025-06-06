import { useRef } from 'react'

import { useSharedValue } from 'react-native-reanimated'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel'

import { XStack, YStack } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import { TDoctorBanner } from '@app/types/doctor'

import { DOCTOR_BANNER } from '@app/mocks/doctor'
import { getMediaQuery } from '@app/utils/media-query'

import DoctorBannerCard from './doctor-banner-card'

const DoctorBanner = () => {
  const ref = useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    })
  }

  const { height, width } = getMediaQuery({ height: 163, full: true })

  const renderItem = ({ item, index }: { item: TDoctorBanner; index: number }) => (
    <DoctorBannerCard {...item} key={index} width={width} height={height} />
  )

  return (
    <XStack position="relative" justifyContent="center" alignItems="flex-end" h={163}>
      <YStack position="absolute" justifyContent="center">
        <Carousel
          ref={ref}
          width={WINDOW_SIZE.width}
          height={height}
          data={DOCTOR_BANNER}
          onProgressChange={progress}
          renderItem={renderItem}
        />
      </YStack>
      <XStack paddingBottom={6}>
        <Pagination.Custom
          progress={progress}
          data={DOCTOR_BANNER}
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

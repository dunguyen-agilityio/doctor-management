import { Text, XStack, YStack } from '@app/components/common'

interface DoctorStatProps {
  title: string
  value: string | number
  icon: React.ReactNode
}

const DoctorStat = ({ title, value, icon }: DoctorStatProps) => {
  return (
    <YStack alignItems="center" gap={2}>
      <XStack
        justifyContent="center"
        alignItems="center"
        height={56}
        width={56}
        borderRadius={56}
        backgroundColor="$grey100">
        {icon}
      </XStack>
      <Text testID="value-text" size="medium" fontWeight="600" color="$grey600">
        {value}
      </Text>
      <Text size="small" color="$grey500" testID="title-text">
        {title}
      </Text>
    </YStack>
  )
}

export default DoctorStat

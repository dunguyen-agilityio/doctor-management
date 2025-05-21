import { Text, XStack, YStack } from '@theme'

const DoctorStat = ({
  title,
  value,
  icon,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
}) => {
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
      <Text size="medium" fontWeight="600" color="$grey600">
        {value}
      </Text>
      <Text size="small" color="$grey500">
        {title}
      </Text>
    </YStack>
  )
}

export default DoctorStat

import { Heading } from '@theme/heading'
import { XStack } from '@theme/stack'
import { Text } from '@theme/text'

interface SessionHeaderProps {
  title: string
}

const SessionHeader = ({ title }: SessionHeaderProps) => {
  return (
    <XStack justifyContent="space-between">
      <Heading>{title}</Heading>
      <Text>See all</Text>
    </XStack>
  )
}

export default SessionHeader

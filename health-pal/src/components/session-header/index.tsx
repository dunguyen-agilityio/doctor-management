import { Fragment } from 'react'

import { Heading } from '@theme/heading'
import { XStack } from '@theme/stack'
import { Text } from '@theme/text'

interface SessionHeaderProps {
  title: string
  seeAllWrapper?: (props: React.PropsWithChildren) => React.ReactNode
}

const SessionHeader = ({ title, seeAllWrapper: Wrapper = Fragment }: SessionHeaderProps) => {
  return (
    <XStack justifyContent="space-between" paddingHorizontal="$md">
      <Heading testID="heading">{title}</Heading>
      <Wrapper>
        <Text>See all</Text>
      </Wrapper>
    </XStack>
  )
}

export default SessionHeader

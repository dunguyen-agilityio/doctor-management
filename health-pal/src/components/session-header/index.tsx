import { Fragment } from 'react'

import { Heading, Text, XStack } from '@/components/common'

interface SessionHeaderProps {
  title: string
  seeAllWrapper?: (props: React.PropsWithChildren) => React.ReactNode
}

const SessionHeader = ({ title, seeAllWrapper: Wrapper = Fragment }: SessionHeaderProps) => {
  return (
    <XStack justifyContent="space-between" paddingHorizontal="$md">
      <Heading testID="heading">{title}</Heading>
      <Wrapper>
        <Text>See All</Text>
      </Wrapper>
    </XStack>
  )
}

export default SessionHeader

import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from 'rn-placeholder'

import { Card, CardProps, Separator, XStack } from 'tamagui'

const HospitalCardSkeleton = ({ ...props }: CardProps) => {
  return (
    <Card
      elevate
      bordered
      borderRadius="$2"
      elevation={3}
      shadowColor="$black"
      overflow="hidden"
      shadowOffset={{ width: 4, height: 4 }}
      {...props}>
      <Card.Header padding={0} position="relative">
        <PlaceholderMedia style={{ height: 120, width: '100%' }} />
      </Card.Header>

      <Card.Footer padding={12} paddingTop={8} gap="$sm" flexDirection="column">
        <Placeholder Animation={ShineOverlay} style={{ width: 60 }}>
          <PlaceholderLine height={18} width={60} />
        </Placeholder>

        <XStack alignItems="center" gap="$sm">
          <Placeholder Animation={ShineOverlay} style={{ width: 120 }}>
            <PlaceholderLine height={12} width={120} />
          </Placeholder>
        </XStack>

        <XStack alignItems="center" gap="$sm">
          <Placeholder Animation={ShineOverlay} style={{ width: 140 }}>
            <PlaceholderLine height={15} width={140} />
          </Placeholder>
        </XStack>

        <Separator backgroundColor="$grey200" />

        <XStack justifyContent="space-between">
          <XStack alignItems="center" gap="$sm">
            <Placeholder Animation={ShineOverlay} style={{ width: 90 }}>
              <PlaceholderMedia size={16} style={{ width: 90 }} />
            </Placeholder>
          </XStack>

          <XStack alignItems="center" gap="$sm">
            <Placeholder Animation={ShineOverlay} style={{ width: 90 }}>
              <PlaceholderMedia size={16} style={{ width: 90 }} />
            </Placeholder>
          </XStack>
        </XStack>
      </Card.Footer>
    </Card>
  )
}

export default HospitalCardSkeleton

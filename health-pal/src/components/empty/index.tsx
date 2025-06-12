import { Ban } from '@/icons'

import { StackProps } from 'tamagui'

import { Button, Heading, Text, YStack } from '@/components/common'

type EmptyStateProps = {
  title?: string
  description?: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
} & StackProps

const Empty = ({
  title = 'No Data',
  description,
  icon,
  actionLabel,
  onAction,
  ...props
}: EmptyStateProps) => {
  return (
    <YStack
      gap={8}
      alignItems="center"
      justifyContent="center"
      height={400}
      role="alert"
      {...props}>
      {icon || <Ban color="$gray10" />}
      <Heading size="extraLarge" fontWeight="600">
        {title}
      </Heading>
      {description && (
        <Text color="$grey900" textAlign="center" size="small">
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button width={250} onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </YStack>
  )
}

export default Empty

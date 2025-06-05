import { StackProps } from 'tamagui'

import { Button, Heading, Text, YStack } from '@app/components/common'

import { XCircle } from '@icons'

type ErrorStateProps = {
  title?: string
  message?: string
  onRetry?: () => void
} & StackProps

const ErrorState = ({
  title = 'Oops!',
  message = 'Something went wrong.',
  onRetry,
  ...props
}: ErrorStateProps) => {
  return (
    <YStack gap={12} alignItems="center" justifyContent="center" role="alert" flex={1} {...props}>
      <XCircle color="$red10" />
      <Heading size="extraLarge" fontWeight="600" color="$red">
        {title}
      </Heading>
      <Text color="$grey900" textAlign="center">
        {message}
      </Text>
      {onRetry && (
        <Button onPress={onRetry} accessibilityHint="Retries loading" aria-label="Retry">
          Retry
        </Button>
      )}
    </YStack>
  )
}

export default ErrorState

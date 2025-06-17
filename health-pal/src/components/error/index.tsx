import { XCircle } from '@/icons'

import { Stack, StackProps } from 'tamagui'

import { Button, Heading, Text, YStack } from '@/components/common'

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
    <YStack
      gap={22}
      alignItems="center"
      paddingHorizontal={48}
      justifyContent="center"
      role="alert"
      aria-label="Error state"
      {...props}>
      <Stack backgroundColor="$red10" borderRadius={80}>
        <XCircle color="$red10" />
      </Stack>
      <Heading size="extraLarge" fontWeight="600" color="$red">
        {title}
      </Heading>
      <Text color="$grey900" textAlign="center">
        {message}
      </Text>
      {onRetry && (
        <Button
          onPress={onRetry}
          accessibilityHint="Retries loading"
          width="100%"
          testID="retry-button"
          aria-label="Retry">
          Retry
        </Button>
      )}
    </YStack>
  )
}

export default ErrorState

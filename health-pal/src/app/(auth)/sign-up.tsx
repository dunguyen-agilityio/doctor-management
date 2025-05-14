import { SignupFormData } from '@app/types'
import SignupForm from '@app/ui/auth/signup-form'

import { Link } from 'expo-router'

import { XStack, YStack } from 'tamagui'

import { Button } from '@theme/button'
import { Heading } from '@theme/heading'
import { Text } from '@theme/text'

import Facebook from '@icons/facebook'
import Google from '@icons/google'

const SignUp = () => {
  const handleSignUp = async (data: SignupFormData) => {}

  return (
    <YStack flex={1} gap={23} paddingHorizontal={24} paddingTop={32}>
      <YStack alignItems="center" gap="$sm">
        <Heading size="extraLarge">Create Account</Heading>
        <Text size="small" color="$grey500">
          We are here to help you!
        </Text>
      </YStack>
      <SignupForm onSubmit={handleSignUp} />
      <XStack alignItems="center" gap="$md">
        <XStack borderColor="$grey200" borderWidth={1} h={1} flex={1} />
        <Text>or</Text>
        <XStack borderColor="$grey200" borderWidth={1} h={1} flex={1} />
      </XStack>

      <YStack gap={16}>
        <Button variant="outlined">
          <Google />
          Continue with Google
        </Button>
        <Button variant="outlined">
          <Facebook />
          Continue with Facebook
        </Button>
      </YStack>
      <XStack gap={2} justifyContent="center">
        <Text size="small">Do you have an account?</Text>
        <Link href="/login">
          <Text color="blue" size="small">
            Sign in
          </Text>
        </Link>
      </XStack>
    </YStack>
  )
}

export default SignUp

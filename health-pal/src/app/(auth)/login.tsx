import { useSession } from '@app/contexts/auth-context'
import { LoginFormData } from '@app/types'
import LoginForm from '@app/ui/auth/login-form'

import { Link, router } from 'expo-router'

import { XStack, YStack } from 'tamagui'

import { Button } from '@theme/button'
import { Heading } from '@theme/heading'
import { Text } from '@theme/text'

import Facebook from '@icons/facebook'
import Google from '@icons/google'

const SignIn = () => {
  const { signIn } = useSession()
  console.log('"first"', 'first')

  const handleSignIn = async (data: LoginFormData) => {
    signIn()
    router.replace('/')
  }

  return (
    <YStack flex={1} gap={23} paddingHorizontal={24} paddingTop={32}>
      <YStack alignItems="center" gap="$sm">
        <Heading size="extraLarge">Hi, Welcome back!</Heading>
        <Text size="small" color="$grey500">
          We are here to help you!
        </Text>
      </YStack>
      <LoginForm onSubmit={handleSignIn} />

      <XStack alignItems="center" gap="$md">
        <XStack borderColor="$grey200" borderWidth={1} h={1} flex={1} />
        <Text>or</Text>
        <XStack borderColor="$grey200" borderWidth={1} h={1} flex={1} />
      </XStack>

      <YStack gap={16}>
        <Button variant="outlined">
          <Google />
          Sign in with Google
        </Button>
        <Button variant="outlined">
          <Facebook />
          Sign in with Facebook
        </Button>
      </YStack>
      <YStack alignItems="center" gap={23}>
        <Link href="/">
          <Text color="blue" size="small">
            Forgot password?
          </Text>
        </Link>
        <XStack gap={2}>
          <Text size="small">Don't have an account yet?</Text>
          <Link href="/sign-up">
            <Text color="blue" size="small">
              Sign up
            </Text>
          </Link>
        </XStack>
      </YStack>
    </YStack>
  )
}

export default SignIn

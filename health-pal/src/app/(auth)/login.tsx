import { Link, Redirect, router } from 'expo-router'

import { useToastController } from '@tamagui/toast'

import { useAppLoading } from '@app/hooks'
import { useSession } from '@app/hooks/use-session'

import {
  ButtonWithUpcoming,
  FormKeyboardAvoidingView,
  Heading,
  Text,
  XStack,
  YStack,
} from '@app/components'

import { LoginForm } from '@app/ui/auth'

import { login } from '@app/services/auth'

import { Facebook, Google, Logo } from '@icons'

import { AuthCredentials } from '@app/types'

const SignIn = () => {
  const { signIn, session } = useSession()
  const setAppLoading = useAppLoading()
  const toast = useToastController()

  const handleSignIn = async (formData: AuthCredentials) => {
    setAppLoading(true)

    const { data, error } = await login(formData)

    if (data) {
      toast.show('Login Successful', {
        message: 'You are now logged in!',
        type: 'success',
        duration: 3000,
      })
      signIn(data)
      router.replace('/(app)/(tabs)')
    } else {
      toast.show('Login Failed', {
        message: error.message,
        type: 'error',
        duration: 3000,
      })
    }

    setAppLoading(false)
  }

  if (session && !session?.jwt) {
    return <Redirect href="/profile-info" />
  }

  return (
    <FormKeyboardAvoidingView>
      <YStack flex={1} gap={23} paddingHorizontal={24} paddingTop={32}>
        <Logo />
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
          <ButtonWithUpcoming variant="outlined">
            <Google />
            Continue with Google
          </ButtonWithUpcoming>
          <ButtonWithUpcoming variant="outlined">
            <Facebook />
            Continue with Facebook
          </ButtonWithUpcoming>
        </YStack>
        <YStack alignItems="center" gap={23}>
          <ButtonWithUpcoming variant="outlined" borderWidth={0}>
            <Text color="blue" size="small">
              Forgot password?
            </Text>
          </ButtonWithUpcoming>

          <XStack gap={2}>
            <Text size="small">Don&apos;t have an account yet?</Text>
            <Link href="/sign-up">
              <Text color="blue" size="small">
                Sign up
              </Text>
            </Link>
          </XStack>
        </YStack>
      </YStack>
    </FormKeyboardAvoidingView>
  )
}

export default SignIn

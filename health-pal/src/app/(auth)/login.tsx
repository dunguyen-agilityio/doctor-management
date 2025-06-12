import { Facebook, Google, Logo } from '@/icons'

import { Link, router } from 'expo-router'

import { useToastController } from '@tamagui/toast'

import { useAppLoading } from '@/hooks'
import { useSession } from '@/hooks/use-session'

import {
  ButtonWithUpcoming,
  FormKeyboardAvoidingView,
  Heading,
  Text,
  XStack,
  YStack,
} from '@/components'

import { LoginForm } from '@/ui/auth'

import { login } from '@/services/auth'

import { AuthCredentials } from '@/types'

const SignIn = () => {
  const { signIn } = useSession()
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

  return (
    <FormKeyboardAvoidingView
      aria-label="Sign in form"
      accessibilityHint="Sign in to your account"
      role="form">
      <YStack flex={1} gap={23} paddingHorizontal={24} paddingTop={32}>
        <Logo />
        <YStack alignItems="center" gap="$sm">
          <Heading size="extraLarge" aria-label="Welcome back">
            Hi, Welcome back!
          </Heading>
          <Text size="small" color="$grey500" aria-label="We are here to help you">
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
          <ButtonWithUpcoming
            variant="outlined"
            aria-label="Sign in with Google"
            accessibilityHint="Signs in using your Google account">
            <Google />
            Continue with Google
          </ButtonWithUpcoming>
          <ButtonWithUpcoming
            variant="outlined"
            aria-label="Sign in with Facebook"
            accessibilityHint="Signs in using your Facebook account">
            <Facebook />
            Continue with Facebook
          </ButtonWithUpcoming>
        </YStack>
        <YStack alignItems="center" gap={23}>
          <ButtonWithUpcoming
            variant="outlined"
            borderWidth={0}
            aria-label="Forgot password"
            accessibilityHint="Navigates to password recovery"
            paddingVertical={0}
            height={24}>
            <Text color="blue" size="small">
              Forgot password?
            </Text>
          </ButtonWithUpcoming>

          <XStack gap={2}>
            <Text size="small" aria-label="Don't have an account yet">
              Don&apos;t have an account yet?
            </Text>
            <Link
              href="/sign-up"
              aria-label="Sign up"
              accessibilityHint="Navigates to the sign up screen">
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

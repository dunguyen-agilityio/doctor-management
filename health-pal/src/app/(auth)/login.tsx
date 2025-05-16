import FormKeyboardAvoidingView from '@app/components/form-keyboard-avoiding-view'
import { useSession } from '@app/contexts/auth-context'
import useAppLoading from '@app/hooks/useAppLoading'
import { login } from '@app/services/auth'
import { AuthCredentials } from '@app/types'
import LoginForm from '@app/ui/auth/login-form'

import { Link, router } from 'expo-router'

import { Button, Heading, Text, XStack, YStack } from '@theme'

import Facebook from '@icons/facebook'
import Google from '@icons/google'
import Logo from '@icons/logo'

const SignIn = () => {
  const { signIn } = useSession()
  const setAppLoading = useAppLoading()

  const handleSignIn = async (formData: AuthCredentials) => {
    setAppLoading(true)

    const { data, error } = await login(formData)

    if (data) {
      signIn(data)
      router.replace('/(app)/(tabs)')
      return
    }

    setAppLoading(false)
    console.log('Show Error', error)
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
          <Text color="blue" size="small">
            Forgot password?
          </Text>

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

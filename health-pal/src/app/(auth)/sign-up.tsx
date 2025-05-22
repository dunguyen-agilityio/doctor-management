import { Link, router } from 'expo-router'

import { Heading, Text, XStack, YStack } from '@theme'

import { Facebook, Google } from '@icons'
import Logo from '@icons/logo'

import { ButtonWithUpcoming } from '@app/components'
import { useSession } from '@app/contexts'
import { User } from '@app/models/user'
import { SignupData } from '@app/types'
import { SignupForm } from '@app/ui/auth'

const SignUp = () => {
  const { setUser, session } = useSession()
  const handleSignUp = async (data: SignupData) => {
    setUser(data as unknown as User)
    router.navigate('/profile-info')
  }

  return (
    <YStack flex={1} gap={23} paddingHorizontal={24} paddingTop={32} scrollbarWidth="auto">
      <Logo />
      <YStack alignItems="center" gap="$sm">
        <Heading size="extraLarge">Create Account</Heading>
        <Text size="small" color="$grey500">
          We are here to help you!
        </Text>
      </YStack>
      <SignupForm onSubmit={handleSignUp} defaultValues={session?.user} />
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

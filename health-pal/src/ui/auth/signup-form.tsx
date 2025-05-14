import { Input } from '@app/components'
import { SignupFormData } from '@app/types'

import { YStack } from 'tamagui'

import { Button } from '@theme/button'

import { LockIcon, SmsIcon } from '@icons/index'
import User from '@icons/user'

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const handleSignup = async () => {}

  return (
    <YStack gap={24}>
      <YStack gap={20}>
        <Input leftIcon={User} placeholder="Your Name" />
        <Input leftIcon={SmsIcon} placeholder="Your Email" />
        <Input leftIcon={LockIcon} placeholder="Password" />
      </YStack>
      <Button onPress={handleSignup}>Create Account</Button>
    </YStack>
  )
}

export default SignupForm

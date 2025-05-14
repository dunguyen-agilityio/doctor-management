import { Input } from '@app/components'
import { LoginFormData } from '@app/types'

import { YStack } from 'tamagui'

import { Button } from '@theme/button'

import { LockIcon, SmsIcon } from '@icons'

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const handleLogin = async () => {
    onSubmit({ email: '', password: '' })
  }

  return (
    <YStack gap={24}>
      <YStack gap={20}>
        <Input leftIcon={SmsIcon} placeholder="Your Email" />
        <Input leftIcon={LockIcon} placeholder="Password" />
      </YStack>
      <Button onPress={handleLogin}>Sign in</Button>
    </YStack>
  )
}

export default LoginForm

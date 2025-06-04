import React, { useState } from 'react'

import { Eye, EyeOff } from '@tamagui/lucide-icons'

import { Button } from '@app/components/common/button'

import { LockIcon } from '@icons/index'

import { Input, InputProps } from '../common'

const PasswordInput = ({ ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const renderEye = ({ children, ...props }: React.PropsWithChildren) => (
    <Button unstyled onPress={togglePasswordVisibility} variant="icon" {...props}>
      {children}
    </Button>
  )

  return (
    <Input
      leftIcon={LockIcon}
      placeholder="Password"
      textContentType="password"
      secureTextEntry={!showPassword}
      rightIcon={showPassword ? EyeOff : Eye}
      rightButton={renderEye}
      {...props}
    />
  )
}

export default PasswordInput

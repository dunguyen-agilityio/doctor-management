import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from 'react-native'

import { ScrollView, YStack } from 'tamagui'

import { WINDOW_SIZE } from '@/constants'

const FormKeyboardAvoidingView = ({ children, ...props }: KeyboardAvoidingViewProps) => {
  return (
    <KeyboardAvoidingView
      {...props}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 50}>
      <YStack height={WINDOW_SIZE.height}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </YStack>
    </KeyboardAvoidingView>
  )
}

export default FormKeyboardAvoidingView

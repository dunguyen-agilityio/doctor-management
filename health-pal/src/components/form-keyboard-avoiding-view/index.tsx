import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from 'react-native'

import { ScrollView } from 'tamagui'

const FormKeyboardAvoidingView = ({ children, ...props }: KeyboardAvoidingViewProps) => {
  return (
    <KeyboardAvoidingView
      {...props}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 50}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default FormKeyboardAvoidingView

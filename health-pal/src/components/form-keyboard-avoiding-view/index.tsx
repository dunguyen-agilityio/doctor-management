import { KeyboardAvoidingView, Platform } from 'react-native'

import { ScrollView } from 'tamagui'

const FormKeyboardAvoidingView = ({ children }: React.PropsWithChildren) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default FormKeyboardAvoidingView

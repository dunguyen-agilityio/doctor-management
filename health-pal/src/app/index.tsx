import { Button, Heading, Text } from '@theme'
import { View } from 'tamagui'

// import { Button, Text, Heading } from '@app-theme'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text fontWeight="700" fontFamily="$heading">
        Hello Word!
      </Text>
      <Heading>Hello Word!</Heading>
      <Button full>Click me!</Button>
      <Button variant="outlined">Click me!</Button>
    </View>
  )
}

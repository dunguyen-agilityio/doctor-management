import { SvgProps } from 'react-native-svg'

import { Stack } from 'tamagui'

import { YStack } from '@theme/stack'
import { Text } from '@theme/text'

type TCategory = {
  icon: (props: SvgProps) => React.JSX.Element
  name: string
  value: string
  color: string
}

interface CategoryProps extends TCategory {
  onPress: (value: string) => void
}

const Category = ({ icon: Icon, name, onPress, value, color }: CategoryProps) => {
  return (
    <YStack gap={4}>
      <Stack
        h={62}
        w={62}
        padding={10}
        backgroundColor={color}
        borderRadius={8}
        justifyContent="center"
        alignItems="center">
        <Icon />
      </Stack>
      <Text size="extraSmall" fontWeight="700" numberOfLines={1} w={62}>
        {name}
      </Text>
    </YStack>
  )
}

export default Category

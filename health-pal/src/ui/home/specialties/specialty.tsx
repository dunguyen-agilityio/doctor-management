import { Link } from 'expo-router'
import { SvgProps } from 'react-native-svg'

import { Stack } from 'tamagui'

import { ROUTES } from '@/constants'

import { Text, YStack } from '@/components'

type TSpecialty = {
  icon: (props: SvgProps) => React.JSX.Element
  name: string
  value: string
  color: string
}

const Specialty = ({ icon: Icon, name, color, value }: TSpecialty) => {
  return (
    <Link
      href={{
        pathname: ROUTES.DOCTORS,
        params: { specialty: value },
      }}
      testID="specialty"
      tabIndex={0}
      aria-label={`View doctors specializing in ${name}`}
      accessibilityHint="Navigates to a list of doctors for this specialty"
      role="link">
      <YStack maxWidth={62} h={84} gap={4}>
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
    </Link>
  )
}

export default Specialty

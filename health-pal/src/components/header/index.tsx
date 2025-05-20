import { Button, TextProps, XStackProps } from 'tamagui'

import { Heading, XStack } from '@theme'

import { BackIcon } from '@icons/index'

interface HeaderProps extends XStackProps {
  title?: string
  titleStyle?: TextProps
  onBack?: () => void
}

const Header = ({ title, titleStyle, onBack, ...props }: HeaderProps) => {
  return (
    <XStack height={62} paddingBottom={24} paddingHorizontal={24} paddingTop={8} {...props}>
      {onBack && (
        <Button onPress={onBack} width={24} top="50%" transform={[{ translateY: '-50%' }]}>
          <BackIcon />
        </Button>
      )}
      <XStack flex={1} justifyContent="center">
        {title && (
          <Heading size="extraLarge" height={30} fontWeight="600" {...titleStyle}>
            {title}
          </Heading>
        )}
      </XStack>
    </XStack>
  )
}

export default Header

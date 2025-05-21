import { Button, TextProps, XStackProps } from 'tamagui'

import { Heading, XStack } from '@theme'

import { BackIcon } from '@icons/index'

interface HeaderProps extends XStackProps {
  title?: string
  titleStyle?: TextProps
  onBack?: () => void
}

const Header = ({
  title,
  titleStyle,
  onBack,
  children,
  ...props
}: React.PropsWithChildren<HeaderProps>) => {
  return (
    <XStack
      height={62}
      paddingBottom={24}
      paddingHorizontal={24}
      paddingTop={8}
      alignItems="center"
      {...props}>
      {onBack && (
        <Button onPress={onBack} width={24}>
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
      {children}
    </XStack>
  )
}

export default Header

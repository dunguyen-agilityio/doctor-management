import { TextProps, XStackProps } from 'tamagui'

import { Button, Heading, XStack } from '@app/components/common'

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
    <XStack height={62} position="relative" alignItems="center" justifyContent="center" {...props}>
      {onBack && (
        <Button
          left={24}
          top={31}
          transform={[{ translateY: '-50%' }]}
          zIndex={1000}
          position="absolute"
          variant="icon"
          paddingHorizontal={0}
          onPress={onBack}
          width={24}>
          <BackIcon />
        </Button>
      )}
      {title && (
        <Heading size="extraLarge" height={30} fontWeight="600" {...titleStyle}>
          {title}
        </Heading>
      )}
      {children}
    </XStack>
  )
}

export default Header

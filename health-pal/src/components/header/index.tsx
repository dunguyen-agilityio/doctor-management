import { BackIcon } from '@/icons/index'

import { TextProps, XStackProps } from 'tamagui'

import { Button, Heading, XStack } from '@/components/common'

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
          width={24}
          aria-label="Back button"
          accessibilityHint="Returns to the previous screen"
          role="button">
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

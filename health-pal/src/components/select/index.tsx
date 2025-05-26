import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import {
  Adapt,
  FontSizeTokens,
  Popover,
  Select as TamaguiSelect,
  SelectProps as TamaguiSelectProps,
  YStack,
  getFontSize,
} from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

import { Text } from '@theme/text'

interface SelectProps extends TamaguiSelectProps {
  items: { name: string }[]
  placeholder?: string
  errorMessage?: string
  onBlur?: () => void
  label?: string
}

const Select = ({
  items,
  errorMessage,
  onBlur,
  onValueChange,
  placeholder,
  label,
  ...props
}: SelectProps) => {
  const handleChange = (val: string) => {
    onValueChange?.(val)
    onBlur?.()
  }

  return (
    <YStack gap="$sm" flex={1}>
      <TamaguiSelect onValueChange={handleChange} disablePreventBodyScroll size="$1" {...props}>
        <TamaguiSelect.Trigger
          testID="trigger"
          iconAfter={ChevronDown}
          height={48}
          borderColor={errorMessage && 'red'}
          borderWidth={1}>
          <TamaguiSelect.Value placeholder={placeholder} color="$grey600" fontSize="$s" />
        </TamaguiSelect.Trigger>

        <Adapt when="maxMd" platform="touch">
          <Popover.Sheet native={!!props.native} snapPointsMode="constant" animation="quick">
            <Popover.Sheet.Frame backgroundColor="transparent">
              <Popover.Sheet.ScrollView maxHeight={200}>
                <Adapt.Contents />
              </Popover.Sheet.ScrollView>
            </Popover.Sheet.Frame>
            <Popover.Sheet.Overlay
              backgroundColor="$shadowColor"
              animation="200ms"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              testID="sheet-overlay"
            />
          </Popover.Sheet>
        </Adapt>

        <TamaguiSelect.Content zIndex={200000}>
          <TamaguiSelect.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3">
            <YStack zIndex={10}>
              <ChevronUp size={20} testID="chevron-up" />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', 'transparent']}
              borderRadius="$4"
            />
          </TamaguiSelect.ScrollUpButton>

          <TamaguiSelect.Viewport animation="quicker" animateOnly={['transform', 'opacity']}>
            <TamaguiSelect.Group
              maxHeight={200}
              backgroundColor="$grey50"
              padding={8}
              marginTop={48}
              borderRadius={12}
              boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px rgba(0, 0, 0, 0.05)">
              {label && (
                <TamaguiSelect.Label backgroundColor={'transparent'}>{label}</TamaguiSelect.Label>
              )}
              {items.map((item, i) => {
                return (
                  <TamaguiSelect.Item
                    backgroundColor={'transparent'}
                    index={i}
                    key={item.name}
                    value={item.name}>
                    <TamaguiSelect.ItemText>{item.name}</TamaguiSelect.ItemText>
                    <TamaguiSelect.ItemIndicator marginLeft="auto">
                      <Check size={16} testID="check" />
                    </TamaguiSelect.ItemIndicator>
                  </TamaguiSelect.Item>
                )
              })}
            </TamaguiSelect.Group>
            {/* Native gets an extra icon */}
            {props.native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={'$4'}
                pointerEvents="none">
                <ChevronDown
                  testID="chevron-down"
                  size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                />
              </YStack>
            )}
          </TamaguiSelect.Viewport>

          <TamaguiSelect.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3">
            <YStack zIndex={10} backgroundColor={'red'}>
              <ChevronDown size={20} testID="chevron-down" />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              borderRadius="$4"
            />
          </TamaguiSelect.ScrollDownButton>
        </TamaguiSelect.Content>
      </TamaguiSelect>
      {errorMessage && (
        <Text color="red" size="extraSmall">
          {errorMessage}
        </Text>
      )}
    </YStack>
  )
}

export default Select

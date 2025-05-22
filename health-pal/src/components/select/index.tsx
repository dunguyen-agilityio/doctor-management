import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import {
  Adapt,
  FontSizeTokens,
  Sheet,
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
    <YStack gap="$sm">
      <TamaguiSelect onValueChange={handleChange} disablePreventBodyScroll size="$1" {...props}>
        <TamaguiSelect.Trigger
          iconAfter={ChevronDown}
          height={48}
          borderColor={errorMessage && 'red'}
          borderWidth={1}>
          <TamaguiSelect.Value placeholder={placeholder} color="$grey600" fontSize="$s" />
        </TamaguiSelect.Trigger>

        <Adapt when="maxMd" platform="touch">
          <Sheet native={!!props.native} modal dismissOnSnapToBottom animation="medium">
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              backgroundColor="$shadowColor"
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <TamaguiSelect.Content zIndex={200000}>
          <TamaguiSelect.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3">
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', 'transparent']}
              borderRadius="$4"
            />
          </TamaguiSelect.ScrollUpButton>

          <TamaguiSelect.Viewport
            animation="quicker"
            animateOnly={['transform', 'opacity']}
            enterStyle={{ x: 0, y: -10 }}
            exitStyle={{ x: 0, y: 10 }}
            minWidth={200}>
            <TamaguiSelect.Group>
              {label && <TamaguiSelect.Label>{label}</TamaguiSelect.Label>}
              {items.map((item, i) => {
                return (
                  <TamaguiSelect.Item index={i} key={item.name} value={item.name}>
                    <TamaguiSelect.ItemText>{item.name}</TamaguiSelect.ItemText>
                    <TamaguiSelect.ItemIndicator marginLeft="auto">
                      <Check size={16} />
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
                <ChevronDown size={getFontSize((props.size as FontSizeTokens) ?? '$true')} />
              </YStack>
            )}
          </TamaguiSelect.Viewport>

          <TamaguiSelect.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3">
            <YStack zIndex={10}>
              <ChevronDown size={20} />
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

import { useMemo } from 'react'

import { Adapt, Select, SelectProps, YStack } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

import { Text } from '@app/components/common'

import { Check, ChevronDown, ChevronUp } from '@icons'

import SheetModal from '../sheet-modal'

interface CustomSelectProps extends SelectProps {
  items: { name: string }[]
  placeholder?: string
  errorMessage?: string
  accessibilityHint?: string
  accessibilityLabel?: string
}

const CustomSelect = ({
  items,
  errorMessage,
  placeholder,
  accessibilityHint,
  accessibilityLabel,
  ...props
}: CustomSelectProps) => {
  return (
    <YStack gap="$sm" flex={1}>
      <Select disablePreventBodyScroll {...props}>
        <Select.Trigger
          testID="trigger"
          iconAfter={ChevronDown}
          height={48}
          aria-label={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          borderColor={errorMessage && 'red'}
          borderWidth={1}
          role="combobox"
          borderRadius={8}>
          <Select.Value
            opacity={1}
            placeholder={placeholder}
            width="100%"
            color="$grey600"
            fontSize="$s"
          />
        </Select.Trigger>
        <Adapt when="maxMd" platform="touch">
          <SheetModal
            aria-label={`Select ${placeholder?.toLowerCase() || 'option'}`}
            accessibilityHint={`Choose from a list of ${placeholder?.toLowerCase() || 'options'}`}
            role="dialog">
            <Adapt.Contents />
          </SheetModal>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3">
            <YStack zIndex={10}>
              <ChevronUp width={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', 'transparent']}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport
            animation="quick"
            animateOnly={['transform', 'opacity']}
            enterStyle={{ x: 0, y: -10 }}
            exitStyle={{ x: 0, y: 10 }}
            minWidth={200}>
            <Select.Group>
              <Select.Label>{placeholder}</Select.Label>
              {useMemo(
                () =>
                  items.map((item, i) => {
                    return (
                      <Select.Item index={i} key={item.name} value={item.name}>
                        <Select.ItemText>{item.name}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check width={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  }),
                [items],
              )}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3">
            <YStack zIndex={10}>
              <ChevronDown width={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
      {errorMessage && (
        <Text color="red" size="extraSmall">
          {errorMessage}
        </Text>
      )}
    </YStack>
  )
}

export default CustomSelect

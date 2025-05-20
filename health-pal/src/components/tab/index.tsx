import { Separator, Tabs, TabsContentProps, TabsTabProps } from 'tamagui'

import { Heading, YStack } from '@theme'

export const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content flex={1} paddingTop={18} {...props}>
      {props.children}
    </Tabs.Content>
  )
}

export const TabsTab = ({ title, active }: { title: string; active: boolean }) => {
  return (
    <YStack height={40} justifyContent="space-between">
      <Heading
        size="medium"
        height={24}
        textTransform="capitalize"
        fontWeight="600"
        textAlign="center">
        {title}
      </Heading>
      {active && (
        <Separator
          borderTopWidth={3}
          borderTopColor="$primary"
          borderTopLeftRadius={50}
          borderTopRightRadius={50}
          padding={0}
        />
      )}
    </YStack>
  )
}

export const TAB_DEFAULT_PROPS = {
  h: 40,
  flex: 1,
  maxWidth: 86,
  paddingHorizontal: 0,
} as TabsTabProps

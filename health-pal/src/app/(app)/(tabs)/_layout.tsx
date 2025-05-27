import { BottomTabBarButtonProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import { Pressable, StyleSheet } from 'react-native'

import { Href, Tabs } from 'expo-router'

import { Stack } from 'tamagui'

import { XStack } from '@theme/stack'

import { NotificationIcon } from '@icons'

import Header from '@app/components/header'
import TabIcon from '@app/components/tab-icon'
import { withUpcomingFeature } from '@app/hocs/with-upcoming-feature'
import { TAB_ROUTES } from '@app/types/route'

const TITLES: Record<TAB_ROUTES, string> = {
  [TAB_ROUTES.FAVORITE]: 'Favorites',
  [TAB_ROUTES.BOOKINGS]: 'My Bookings',
  [TAB_ROUTES.PROFILE]: 'Profiles',
  [TAB_ROUTES.HOME]: '',
}

const NotificationUpcoming = withUpcomingFeature(NotificationIcon)

const renderHomeHeader = () => (
  <XStack height={46} justifyContent="space-between" alignItems="center" paddingHorizontal="$md">
    <Stack />
    <NotificationUpcoming />
  </XStack>
)

const renderBabBarButton = ({ children, onPress }: BottomTabBarButtonProps) => (
  <Pressable onPress={onPress}>{children}</Pressable>
)

type TabsProps = BottomTabNavigationOptions & {
  href?: Href | null
}

const TAB_OPTIONS: Record<TAB_ROUTES, TabsProps> = {
  [TAB_ROUTES.HOME]: {
    header: renderHomeHeader,
    headerShadowVisible: false,
    tabBarIcon: ({ focused }) => <TabIcon name={TAB_ROUTES.HOME} focused={focused} />,
  },
  [TAB_ROUTES.FAVORITE]: {
    tabBarIcon: ({ focused }) => <TabIcon name={TAB_ROUTES.FAVORITE} focused={focused} />,
  },
  [TAB_ROUTES.BOOKINGS]: {
    tabBarIcon: ({ focused }) => <TabIcon name={TAB_ROUTES.BOOKINGS} focused={focused} />,
  },
  [TAB_ROUTES.PROFILE]: {
    tabBarIcon: ({ focused }) => <TabIcon name={TAB_ROUTES.PROFILE} focused={focused} />,
  },
}

const styles = StyleSheet.create({
  tabBarStyle: { height: 76, paddingBottom: 0 },
  tabBarItemStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
})

const screenOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBarStyle,
  tabBarItemStyle: styles.tabBarItemStyle,
  tabBarButton: renderBabBarButton,
  header: ({ navigation, route }) => (
    <Header title={TITLES[route.name as TAB_ROUTES]} onBack={navigation.goBack} />
  ),
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name={TAB_ROUTES.HOME} options={TAB_OPTIONS[TAB_ROUTES.HOME]} />
      <Tabs.Screen name={TAB_ROUTES.FAVORITE} options={TAB_OPTIONS[TAB_ROUTES.FAVORITE]} />
      <Tabs.Screen name={TAB_ROUTES.BOOKINGS} options={TAB_OPTIONS[TAB_ROUTES.BOOKINGS]} />
      <Tabs.Screen name={TAB_ROUTES.PROFILE} options={TAB_OPTIONS[TAB_ROUTES.PROFILE]} />
    </Tabs>
  )
}

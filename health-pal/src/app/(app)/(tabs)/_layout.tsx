import { NotificationIcon } from '@/icons'
import { BottomTabBarButtonProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import { Pressable, StyleSheet } from 'react-native'

import { Href, Tabs } from 'expo-router'

import { Stack } from 'tamagui'

import { XStack } from '@/components/common'
import Header from '@/components/header'
import TabIcon from '@/components/tab-icon'

import { withUpcomingFeature } from '@/hocs/with-upcoming-feature'

import { TAB_ROUTES } from '@/types'

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
    tabBarIcon: ({ focused }) => (
      <TabIcon
        name={TAB_ROUTES.HOME}
        focused={focused}
        aria-label="Home tab"
        accessibilityHint="Navigates to the home screen with doctor search and specialties"
      />
    ),
  },
  [TAB_ROUTES.FAVORITE]: {
    tabBarIcon: ({ focused }) => (
      <TabIcon
        name={TAB_ROUTES.FAVORITE}
        focused={focused}
        aria-label="Favorites tab"
        accessibilityHint="Navigates to your favorite doctors and hospitals"
      />
    ),
  },
  [TAB_ROUTES.BOOKINGS]: {
    tabBarIcon: ({ focused }) => (
      <TabIcon
        name={TAB_ROUTES.BOOKINGS}
        focused={focused}
        aria-label="Bookings tab"
        accessibilityHint="Navigates to your upcoming and past bookings"
      />
    ),
  },
  [TAB_ROUTES.PROFILE]: {
    tabBarIcon: ({ focused }) => (
      <TabIcon
        name={TAB_ROUTES.PROFILE}
        focused={focused}
        aria-label="Profile tab"
        accessibilityHint="Navigates to your user profile and settings"
      />
    ),
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
  header: ({ route }) => <Header title={TITLES[route.name as TAB_ROUTES]} />,
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

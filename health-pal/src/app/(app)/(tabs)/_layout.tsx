import { withUpcomingFeature } from '@/hocs/with-upcoming-feature'
import { BottomTabBarButtonProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { Href, Tabs } from 'expo-router'
import { SvgProps } from 'react-native-svg'

import { Button, Stack } from 'tamagui'

import { XStack } from '@theme/stack'

import {
  CalendarFill,
  CalendarOutline,
  HeartFill,
  HeartOutline,
  HomeFill,
  HomeOutline,
  NotificationIcon,
  ProfileFill,
  ProfileOutline,
} from '@icons'

import Header from '@app/components/header'
import { useAppLoading } from '@app/hooks'

enum TABS {
  HOME = 'index',
  FAVORITE = 'favorite',
  BOOKINGS = 'bookings',
  PROFILE = 'profile',
}

const TITLES: Record<TABS, string> = {
  [TABS.FAVORITE]: 'Favorites',
  [TABS.BOOKINGS]: 'My Bookings',
  [TABS.PROFILE]: 'Profiles',
  [TABS.HOME]: '',
}

const NotifictionUpcoming = withUpcomingFeature(NotificationIcon)

const renderHomeHeader = () => (
  <XStack height={46} justifyContent="space-between" alignItems="center" paddingHorizontal="$md">
    <Stack />
    <NotifictionUpcoming />
  </XStack>
)

const renderBabBarButton = ({ children, onPress }: BottomTabBarButtonProps) => (
  <Pressable onPress={onPress}>{children}</Pressable>
)

type TabsProps = BottomTabNavigationOptions & {
  href?: Href | null
}

const TAB_OPTIONS: Record<TABS, TabsProps> = {
  [TABS.HOME]: {
    header: renderHomeHeader,
    headerShadowVisible: false,
    tabBarIcon: (props) => renderIcon(TABS.HOME, props),
  },
  [TABS.FAVORITE]: { tabBarIcon: (props) => renderIcon(TABS.FAVORITE, props) },
  [TABS.BOOKINGS]: {
    tabBarIcon: (props) => renderIcon(TABS.BOOKINGS, props),
  },
  [TABS.PROFILE]: { tabBarIcon: (props) => renderIcon(TABS.PROFILE, props) },
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
    <Header title={TITLES[route.name as TABS]} onBack={navigation.goBack} />
  ),
}

export default function TabLayout() {
  const setAppLoading = useAppLoading()

  useEffect(() => {
    setAppLoading(false)
  }, [setAppLoading])

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name={TABS.HOME} options={TAB_OPTIONS[TABS.HOME]} />
      <Tabs.Screen name={TABS.FAVORITE} options={TAB_OPTIONS[TABS.FAVORITE]} />
      <Tabs.Screen name={TABS.BOOKINGS} options={TAB_OPTIONS[TABS.BOOKINGS]} />
      <Tabs.Screen name={TABS.PROFILE} options={TAB_OPTIONS[TABS.PROFILE]} />
    </Tabs>
  )
}

type RouteTabIcon = {
  [Property in TABS as `${Lowercase<string & Property>}_true`]: (
    props: SvgProps,
  ) => React.JSX.Element
} & {
  [Property in TABS as `${Lowercase<string & Property>}_false`]: (
    props: SvgProps,
  ) => React.JSX.Element
}

const TAB_ICON = {
  [`${TABS.HOME}_true`]: HomeFill,
  [`${TABS.HOME}_false`]: HomeOutline,
  [`${TABS.PROFILE}_true`]: ProfileFill,
  [`${TABS.PROFILE}_false`]: ProfileOutline,
  [`${TABS.BOOKINGS}_true`]: CalendarFill,
  [`${TABS.BOOKINGS}_false`]: CalendarOutline,
  [`${TABS.FAVORITE}_true`]: HeartFill,
  [`${TABS.FAVORITE}_false`]: HeartOutline,
} satisfies RouteTabIcon

const renderIcon = (name: TABS, { focused }: { focused: boolean }) => {
  const Icon = TAB_ICON[`${name}_${focused}`]

  if (focused) {
    return (
      <Button
        backgroundColor="$grey100"
        height={48}
        width={48}
        borderRadius={36}
        alignItems="center"
        justifyContent="center">
        <Icon />
      </Button>
    )
  }

  return <Icon />
}

import { BottomTabBarButtonProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { Href, Link, Tabs } from 'expo-router'
import { SvgProps } from 'react-native-svg'

import { Stack } from 'tamagui'

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

enum TAB_ROUTES {
  HOME = 'index',
  FAVORITE = 'favorite',
  BOOKING = 'booking',
  PROFILE = 'profile',
}

const TITLES: Record<TAB_ROUTES, string> = {
  [TAB_ROUTES.FAVORITE]: 'Favorites',
  [TAB_ROUTES.BOOKING]: 'My Bookings',
  [TAB_ROUTES.PROFILE]: 'Profiles',
  [TAB_ROUTES.HOME]: '',
}

const renderHomeHeader = () => (
  <XStack height={46} justifyContent="space-between" alignItems="center" paddingHorizontal="$md">
    <Stack />
    <Link href={'/(app)/notification'}>
      <NotificationIcon />
    </Link>
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
    tabBarIcon: (props) => renderIcon(TAB_ROUTES.HOME, props),
  },
  [TAB_ROUTES.FAVORITE]: { tabBarIcon: (props) => renderIcon(TAB_ROUTES.FAVORITE, props) },
  [TAB_ROUTES.BOOKING]: {
    tabBarIcon: (props) => renderIcon(TAB_ROUTES.BOOKING, props),
  },
  [TAB_ROUTES.PROFILE]: { tabBarIcon: (props) => renderIcon(TAB_ROUTES.PROFILE, props) },
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
  header: ({ navigation, route: { name } }) => {
    const title = TITLES[name as TAB_ROUTES]
    return title ? <Header title={title} onBack={navigation.goBack} /> : null
  },
}

export default function TabLayout() {
  const setAppLoading = useAppLoading()

  useEffect(() => {
    setAppLoading(false)
  }, [setAppLoading])

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name={TAB_ROUTES.HOME} options={TAB_OPTIONS[TAB_ROUTES.HOME]} />
      <Tabs.Screen name={TAB_ROUTES.FAVORITE} options={TAB_OPTIONS[TAB_ROUTES.FAVORITE]} />
      <Tabs.Screen name={TAB_ROUTES.BOOKING} options={TAB_OPTIONS[TAB_ROUTES.BOOKING]} />
      <Tabs.Screen name={TAB_ROUTES.PROFILE} options={TAB_OPTIONS[TAB_ROUTES.PROFILE]} />
    </Tabs>
  )
}

type Getters = {
  [Property in TAB_ROUTES as `${Lowercase<string & Property>}_true`]: (
    props: SvgProps,
  ) => React.JSX.Element
} & {
  [Property in TAB_ROUTES as `${Lowercase<string & Property>}_false`]: (
    props: SvgProps,
  ) => React.JSX.Element
}

const TAB_ICON: Getters = {
  index_true: HomeFill,
  index_false: HomeOutline,
  profile_true: ProfileFill,
  profile_false: ProfileOutline,
  booking_true: CalendarFill,
  booking_false: CalendarOutline,
  favorite_true: HeartFill,
  favorite_false: HeartOutline,
}

const renderIcon = (name: TAB_ROUTES, { focused }: { focused: boolean }) => {
  const Icon = TAB_ICON[`${name}_${focused}`]
  if (focused) {
    return (
      <XStack
        backgroundColor="$grey100"
        height={48}
        width={48}
        borderRadius={36}
        alignItems="center"
        justifyContent="center">
        <Icon />
      </XStack>
    )
  }

  return <Icon />
}

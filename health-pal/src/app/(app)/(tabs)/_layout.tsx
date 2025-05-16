import useAppLoading from '@app/hooks/useAppLoading'
import { BottomTabBarButtonProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { NavigationState } from '@react-navigation/native'
import { Href, Link, ScreenProps, Tabs } from 'expo-router'
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

enum TABS {
  HOME = 'index',
  FAVORITE = 'favorite',
  BOOKING = 'booking',
  PROFILE = 'profile',
}

const renderHomeHeader = () => (
  <XStack height={46} justifyContent="space-between" alignItems="center" paddingHorizontal="$md">
    <Stack />
    <Link href={'/(app)/notification'}></Link>
    <NotificationIcon />
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
  [TABS.BOOKING]: { tabBarIcon: (props) => renderIcon(TABS.BOOKING, props) },
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
      <Tabs.Screen name={TABS.BOOKING} options={TAB_OPTIONS[TABS.BOOKING]} />
      <Tabs.Screen name={TABS.PROFILE} options={TAB_OPTIONS[TABS.PROFILE]} />
    </Tabs>
  )
}

type Getters = {
  [Property in TABS as `${Lowercase<string & Property>}_true`]: (
    props: SvgProps,
  ) => React.JSX.Element
} & {
  [Property in TABS as `${Lowercase<string & Property>}_false`]: (
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

const renderIcon = (name: TABS, { focused }: { focused: boolean }) => {
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

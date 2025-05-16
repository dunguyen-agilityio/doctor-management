import useAppLoading from '@app/hooks/useAppLoading'

import { useEffect } from 'react'
import { Pressable } from 'react-native'

import { Tabs } from 'expo-router'
import { SvgProps } from 'react-native-svg'

import { Button } from '@theme/button'
import { XStack } from '@theme/stack'

import {
  CalendarFill,
  CalendarOutline,
  HeartFill,
  HeartOutline,
  HomeFill,
  HomeOutline,
  ProfileFill,
  ProfileOutline,
} from '@icons'

export default function TabLayout() {
  const setAppLoading = useAppLoading()

  useEffect(() => {
    setAppLoading(false)
  }, [setAppLoading])

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 76, paddingBottom: 0 },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },
        tabBarButton: ({ children, onPress }) => (
          <Pressable onPress={onPress}>{children}</Pressable>
        ),
      }}>
      <Tabs.Screen
        name={TABS.HOME}
        options={{
          title: '',
          tabBarIcon: (props) => renderIcon(TABS.HOME, props),
        }}
      />
      <Tabs.Screen
        name={TABS.FAVORITE}
        options={{ title: '', tabBarIcon: (props) => renderIcon(TABS.FAVORITE, props) }}
      />
      <Tabs.Screen
        name={TABS.BOOKING}
        options={{ title: '', tabBarIcon: (props) => renderIcon(TABS.BOOKING, props) }}
      />

      <Tabs.Screen
        name={TABS.PROFILE}
        options={{ title: '', tabBarIcon: (props) => renderIcon(TABS.PROFILE, props) }}
      />
    </Tabs>
  )
}

enum TABS {
  HOME = 'index',
  FAVORITE = 'favorite',
  BOOKING = 'booking',
  PROFILE = 'profile',
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

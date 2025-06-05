import { memo } from 'react'

import { SvgProps } from 'react-native-svg'

import { Stack, StackProps } from 'tamagui'

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

import { TAB_ROUTES } from '@app/types/route'

import { tokens } from '@/tamagui.config'

const TAB_ICON = {
  [`${TAB_ROUTES.HOME}_true`]: HomeFill,
  [`${TAB_ROUTES.HOME}_false`]: HomeOutline,
  [`${TAB_ROUTES.PROFILE}_true`]: ProfileFill,
  [`${TAB_ROUTES.PROFILE}_false`]: ProfileOutline,
  [`${TAB_ROUTES.BOOKINGS}_true`]: CalendarFill,
  [`${TAB_ROUTES.BOOKINGS}_false`]: CalendarOutline,
  [`${TAB_ROUTES.FAVORITE}_true`]: HeartFill,
  [`${TAB_ROUTES.FAVORITE}_false`]: HeartOutline,
} satisfies RouteTabIcon

type RouteTabIcon = {
  [Property in TAB_ROUTES as `${Lowercase<string & Property>}_true`]: (
    props: SvgProps,
  ) => React.JSX.Element
} & {
  [Property in TAB_ROUTES as `${Lowercase<string & Property>}_false`]: (
    props: SvgProps,
  ) => React.JSX.Element
}

interface TabIconProps extends StackProps {
  focused: boolean
  name: TAB_ROUTES
}

const TabIcon = ({ focused, name, ...props }: TabIconProps) => {
  const Icon = TAB_ICON[`${name}_${focused}`]

  return (
    <Stack
      testID={`${name}-wrapper`}
      backgroundColor={focused ? '$grey100' : 'transparent'}
      height={48}
      width={48}
      padding={0}
      borderRadius={36}
      alignItems="center"
      justifyContent="center"
      role="button"
      {...props}>
      <Icon
        {...(focused && {
          stroke: tokens.color.grey400.val,
          fill: tokens.color.grey600.val,
        })}
        testID={`${name}-${focused ? 'fill' : 'outline'}`}
      />
    </Stack>
  )
}

export default memo(TabIcon)

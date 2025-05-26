import { memo } from 'react'

import { SvgProps } from 'react-native-svg'

import { Stack } from 'tamagui'

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

const TabIcon = ({ focused, name }: { focused: boolean; name: TAB_ROUTES }) => {
  const Icon = TAB_ICON[`${name}_${focused}`]

  if (focused) {
    return (
      <Stack
        testID={`${name}-wrapper`}
        backgroundColor="$grey100"
        height={48}
        width={48}
        borderRadius={36}
        alignItems="center"
        justifyContent="center">
        <Icon
          stroke={tokens.color.grey400.val}
          testID={`${name}-fill`}
          fill={tokens.color.grey600.val}
        />
      </Stack>
    )
  }

  return <Icon testID={`${name}-outline`} />
}

export default memo(TabIcon)

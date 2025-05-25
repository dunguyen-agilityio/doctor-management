import { withUpcomingFeature } from '@/hocs/with-upcoming-feature'

import { useRef } from 'react'

import { router } from 'expo-router'

import { Separator } from 'tamagui'

import { ListItem, Text, YStack } from '@theme'

import {
  HeartOutline,
  LogoutIcon,
  MessageQuestion,
  NotificationOutline,
  SecuritySafe,
  SettingIcon,
  UserEditIcon,
} from '@icons'

import { Upload } from '@app/components'
import { useSession } from '@app/contexts'
import { updateProfile } from '@app/services/auth'
import { TImage } from '@app/types/image'
import { ModalRef } from '@app/types/modal'
import LogoutModalContext from '@app/ui/profile/logout-modal-context'

const ListItemUpcoming = withUpcomingFeature(ListItem)

const Profile = () => {
  const logoutRef = useRef<ModalRef>(null)
  const { session, setUser } = useSession()

  const { name, username, email, avatar, id } = session?.user ?? {}
  const jwt = session?.jwt!

  const handleUpload = async (image: TImage) => {
    if (!session) return
    await updateProfile({ id: id!, avatar: image.id }, jwt)
    setUser({ ...session.user, avatar: image })
  }

  const handleLogout = () => {
    logoutRef.current?.open()
  }

  return (
    <YStack gap={16} flex={1} paddingHorizontal={24}>
      <YStack alignItems="center">
        <Upload preview={avatar?.url} onUpload={handleUpload} />
        <Text marginTop={12} size="medium" fontWeight="700">
          {name ?? username}
        </Text>
        <Text size="small" color="$grey500">
          {email}
        </Text>
      </YStack>
      <YStack flex={1}>
        <ListItem
          onPress={() => {
            router.navigate('/(auth)/profile-info?from=/(app)/(tabs)/profile')
          }}
          icon={UserEditIcon}
          title="Edit Profile"
          pressTheme
        />
        <Separator marginVertical={12} />
        <ListItemUpcoming icon={HeartOutline} title="Favorite" pressTheme />
        <Separator marginVertical={12} />
        <ListItemUpcoming icon={NotificationOutline} title="Notifications" pressTheme />
        <Separator marginVertical={12} />
        <ListItemUpcoming icon={SettingIcon} title="Settings" pressTheme />
        <Separator marginVertical={12} />
        <ListItemUpcoming icon={MessageQuestion} title="Help and Support" pressTheme />
        <Separator marginVertical={12} />
        <ListItemUpcoming icon={SecuritySafe} title="Terms and Conditions" pressTheme />
        <Separator marginVertical={12} />
        <ListItem icon={LogoutIcon} title="Log Out" onPress={handleLogout} pressTheme />
      </YStack>
      <LogoutModalContext ref={logoutRef} />
    </YStack>
  )
}

export default Profile

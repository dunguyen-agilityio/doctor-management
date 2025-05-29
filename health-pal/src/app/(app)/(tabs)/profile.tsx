import { useRef } from 'react'

import { router } from 'expo-router'

import { useToastController } from '@tamagui/toast'
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
import { withUpcomingFeature } from '@app/hocs/with-upcoming-feature'
import { updateProfile } from '@app/services/auth'
import { uploadToStrapi } from '@app/services/upload-image'
import { ModalRef } from '@app/types/modal'
import LogoutModal from '@app/ui/profile/logout-modal'

const ListItemUpcoming = withUpcomingFeature(ListItem)

const Profile = () => {
  const logoutRef = useRef<ModalRef>(null)
  const { session, setUser } = useSession()
  const toast = useToastController()

  const { name, username, email, avatar, id: userId } = session?.user ?? {}
  const jwt = session?.jwt!

  const handleUpload = async (imageUri: string) => {
    if (!session) return

    const { error, data } = await uploadToStrapi(imageUri, jwt)

    if (error) {
      toast.show('Upload Failed', {
        message: error.message,
        duration: 3000,
        type: 'error',
      })
      return
    }

    const { id, url } = data

    await updateProfile({ id: userId!, avatar: id }, jwt)
    setUser({ ...session.user, avatar: { id, url } })

    toast.show('Upload Successful', {
      message: 'Avatar updated successfully',
      duration: 3000,
      type: 'success',
    })
  }

  const handleLogout = () => {
    logoutRef.current?.open()
  }

  const handleNavigateFavorite = () => {
    router.navigate('/(app)/(tabs)/favorite')
  }

  const handleNavigateProfileInfo = () => {
    router.navigate('/(auth)/profile-info?from=profile')
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
        <ListItem onPress={handleNavigateProfileInfo} icon={UserEditIcon} title="Edit Profile" />
        <Separator marginVertical={12} />
        <ListItem onPress={handleNavigateFavorite} icon={HeartOutline} title="Favorite" />
        <Separator marginVertical={12} />
        <ListItemUpcoming icon={NotificationOutline} title="Notifications" />
        <Separator marginVertical={12} />
        <ListItemUpcoming icon={SettingIcon} title="Settings" />
        <Separator marginVertical={12} />
        <ListItemUpcoming icon={MessageQuestion} title="Help and Support" />
        <Separator marginVertical={12} />
        <ListItemUpcoming icon={SecuritySafe} title="Terms and Conditions" />
        <Separator marginVertical={12} />
        <ListItem icon={LogoutIcon} title="Log Out" onPress={handleLogout} />
      </YStack>
      <LogoutModal ref={logoutRef} />
    </YStack>
  )
}

export default Profile

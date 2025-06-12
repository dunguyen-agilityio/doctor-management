import {
  HeartOutline,
  LogoutIcon,
  MessageQuestion,
  NotificationOutline,
  SecuritySafe,
  SettingIcon,
  UserEditIcon,
} from '@/icons'

import { useRef } from 'react'

import { router } from 'expo-router'

import { useToastController } from '@tamagui/toast'
import { Separator } from 'tamagui'

import { useAppLoading } from '@/hooks'
import { useSession } from '@/hooks/use-session'

import { ListItem, Text, Upload, YStack } from '@/components'

import LogoutModal from '@/ui/profile/logout-modal'

import { updateProfile } from '@/services/auth'
import { uploadToStrapi } from '@/services/upload-image'

import { withUpcomingFeature } from '@/hocs/with-upcoming-feature'

import { ModalRef } from '@/types/modal'

const ListItemUpcoming = withUpcomingFeature(ListItem)

const Profile = () => {
  const logoutRef = useRef<ModalRef>(null)
  const { session, setUser } = useSession()
  const toast = useToastController()
  const setAppLoading = useAppLoading()

  const { name, email, avatar, id: userId } = session.user ?? {}

  const handleUpload = async (imageUri: string) => {
    if (!session) return
    setAppLoading(true)

    const { error, data } = await uploadToStrapi(imageUri)

    if (error) {
      toast.show('Upload Failed', {
        message: error.message,
        duration: 3000,
        type: 'error',
      })
      setAppLoading(false)
      return
    }

    const { id, url } = data

    await updateProfile({ id: userId!, avatar: id })
    setUser({ avatar: { id, url } })

    toast.show('Upload Successful', {
      message: 'Avatar updated successfully',
      duration: 3000,
      type: 'success',
    })
    setAppLoading(false)
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
        <Upload
          preview={avatar?.url}
          onUpload={handleUpload}
          aria-label="Upload profile picture"
          accessibilityHint="Upload profile picture"
          role="button"
        />
        <Text marginTop={12} size="medium" aria-label={name} fontWeight="700">
          {name}
        </Text>
        <Text size="small" aria-label={email} color="$grey500">
          {email}
        </Text>
      </YStack>
      <YStack flex={1}>
        <ListItem
          onPress={handleNavigateProfileInfo}
          icon={UserEditIcon}
          aria-label="Edit profile"
          title="Edit Profile"
          accessibilityHint="Navigates to the profile information screen"
          role="listitem"
        />
        <Separator marginVertical={12} />
        <ListItem
          onPress={handleNavigateFavorite}
          icon={HeartOutline}
          title="Favorite"
          aria-label="Favorites"
          accessibilityHint="Navigates to the favorite screen with doctors and hospitals"
          role="listitem"
        />
        <Separator marginVertical={12} />
        <ListItemUpcoming
          icon={NotificationOutline}
          title="Notifications"
          aria-label="Notifications"
          accessibilityHint="This feature is coming soon"
          role="listitem"
        />
        <Separator marginVertical={12} />
        <ListItemUpcoming
          icon={SettingIcon}
          title="Settings"
          aria-label="Settings"
          accessibilityHint="This feature is coming soon"
          role="listitem"
        />
        <Separator marginVertical={12} />
        <ListItemUpcoming
          icon={MessageQuestion}
          title="Help and Support"
          aria-label="Help and Support"
          accessibilityHint="This feature is coming soon"
          role="listitem"
        />
        <Separator marginVertical={12} />
        <ListItemUpcoming
          icon={SecuritySafe}
          title="Terms and Conditions"
          aria-label="Terms and Conditions"
          accessibilityHint="This feature is coming soon"
          role="listitem"
        />
        <Separator marginVertical={12} />
        <ListItem
          icon={LogoutIcon}
          title="Log Out"
          onPress={handleLogout}
          aria-label="Log out"
          role="listitem"
          accessibilityHint="Opens a dialog to confirm logging out"
        />
      </YStack>
      <LogoutModal ref={logoutRef} />
    </YStack>
  )
}

export default Profile

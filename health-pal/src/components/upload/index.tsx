import { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { CameraView, useCameraPermissions } from 'expo-camera'
import { Image, ImageProps } from 'expo-image'
import { CameraType, launchImageLibraryAsync } from 'expo-image-picker'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ImageMinus, RotateCcw } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { Dialog, Stack, View, XStack } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import { AvatarIcon, BackIcon, EditIcon } from '@icons'

import { useSession } from '@app/contexts'
import { useAppLoading } from '@app/hooks'
import { uploadToStrapi } from '@app/services/upload-image'
import { TImage } from '@app/types/image'

import { tokens } from '@/tamagui.config'

import AlertDialog from '../alert-dialog'

interface UploadProps extends ImageProps {
  preview?: string
  onUpload?: (image: TImage) => Promise<void>
}

const Upload = ({ preview, onUpload, ...other }: UploadProps) => {
  const [permission, requestPermission] = useCameraPermissions()
  const [open, setOpen] = useState(false)
  const ref = useRef<CameraView>(null)
  const [facing, setFacing] = useState<CameraType>(CameraType.back)
  const [image, setImage] = useState<string | null>(null)

  const setAppLoading = useAppLoading()
  const { session } = useSession()
  const toast = useToastController()

  const jwt = session?.jwt!

  useEffect(() => {
    requestPermission()
  }, [requestPermission])

  const handleUpload = async (imageUri: string) => {
    setOpen(false)
    setAppLoading(true)
    const { error, data } = await uploadToStrapi(imageUri, jwt!)

    if (error) {
      toast.show('Upload Failed', { message: error.message, duration: 3000, type: 'error' })
    } else {
      const { id, url } = data
      setImage(url)
      onUpload?.(data)
    }

    setAppLoading(false)
  }

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const asset = result.assets[0]
      setImage(asset.uri)
      await handleUpload(asset.uri)
      setOpen(false)
    }
  }

  const toggleFacing = () => {
    setFacing((prev) => (prev === CameraType.back ? CameraType.front : CameraType.back))
  }

  const takePicture = async () => {
    if (ref.current) {
      const photo = await ref.current.takePictureAsync()
      await handleUpload(photo.uri)
      setImage(photo.uri)
      setOpen(false)
    }
  }

  const handleBack = () => {
    setImage(null)
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  return (
    <Stack position="relative" height={202} width={202} alignItems="center" justifyContent="center">
      {!permission.granted && (
        <AlertDialog
          cancelable
          onConfirm={requestPermission}
          title="We need your permission to show the camera"
        />
      )}
      <Dialog modal open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild position="absolute" zIndex={1} right={24} bottom={27}>
          <EditIcon />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
          />

          <Dialog.Content
            backgroundColor="transparent"
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            justifyContent="space-between"
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}>
            <SafeAreaView
              style={{
                width: WINDOW_SIZE.width,
                height: WINDOW_SIZE.height,
                justifyContent: 'space-between',
                padding: 0,
              }}>
              <XStack
                backgroundColor="$white"
                height={50}
                alignItems="center"
                justifyContent="space-between"
                paddingHorizontal={20}>
                <Dialog.Close asChild>
                  <Pressable onPressIn={handleBack}>
                    <BackIcon />
                  </Pressable>
                </Dialog.Close>
              </XStack>

              <CameraView style={styles.camera} facing={facing} ref={ref} />

              <XStack
                alignItems="center"
                backgroundColor="$white"
                justifyContent="space-around"
                paddingVertical={10}>
                <Pressable onPress={pickImage}>
                  <ImageMinus size={32} color={tokens.color.primary.val} />
                </Pressable>

                <Pressable onPress={takePicture}>
                  {({ pressed }) => (
                    <Stack
                      w={65}
                      h={65}
                      backgroundColor="transparent"
                      borderWidth={5}
                      borderColor="$primary"
                      borderRadius={65}
                      alignItems="center"
                      justifyContent="center"
                      opacity={pressed ? 0.5 : 1}>
                      <Stack w={50} h={50} borderRadius={55} backgroundColor="$primary" />
                    </Stack>
                  )}
                </Pressable>

                <Pressable onPress={toggleFacing}>
                  <RotateCcw size={32} color={tokens.color.primary.val} />
                </Pressable>
              </XStack>
            </SafeAreaView>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

      {(image ?? preview) ? (
        <Image source={image ?? preview} style={styles.image} {...other} />
      ) : (
        <AvatarIcon />
      )}
    </Stack>
  )
}

export default Upload

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    maxHeight: 400,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  shutterBtn: {
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 300,
  },
})

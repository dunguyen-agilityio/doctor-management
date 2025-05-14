import { useRef, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { CameraView, useCameraPermissions } from 'expo-camera'
import { Image, ImageProps } from 'expo-image'
import { CameraType, ImagePickerAsset, launchImageLibraryAsync } from 'expo-image-picker'
import { createAssetAsync } from 'expo-media-library'

import { ImageMinus, RotateCcw } from '@tamagui/lucide-icons'
import { ButtonIcon, Dialog, Stack, View, XStack } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import { Button, Text } from '@theme'

import { AvatarIcon, BackIcon, EditIcon } from '@icons'

import { tokens } from '@/tamagui.config'

interface UploadProps extends ImageProps {
  preview?: string
  onUpload?: (file: File) => void
}

const Upload = ({ preview, ...other }: UploadProps) => {
  const [permission, requestPermission] = useCameraPermissions()
  const [open, setOpen] = useState(false)
  const ref = useRef<CameraView>(null)
  const [facing, setFacing] = useState<CameraType>(CameraType.back)
  const [image, setImage] = useState<ImagePickerAsset>()

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0])
      setOpen(false)
    }
  }

  const toggleFacing = () => {
    setFacing((prev) => (prev === CameraType.back ? CameraType.front : CameraType.back))
  }

  const takePicture = async () => {
    if (ref.current) {
      const photo = await ref.current.takePictureAsync()
      setImage(photo)
    }
  }

  const savePicture = async () => {
    if (image) {
      const asset = await createAssetAsync(image.uri)
      setImage(asset)
      setOpen(false)
    }
  }

  // TODO: will handler later
  const handleUpload = async () => {}

  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>grant permission</Button>
      </View>
    )
  }

  return (
    <Stack position="relative" height={202} width={202} alignItems="center" justifyContent="center">
      <Dialog modal open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild position="absolute" zIndex={1} right={24} bottom={27}>
          <EditIcon />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            backgroundColor="$shadow6"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quicker',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
          />

          <Dialog.Content
            bordered
            w={400}
            h={WINDOW_SIZE.height}
            backgroundColor="transparent"
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            justifyContent="space-between"
            animation={[
              'quicker',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4">
            <Dialog.Close asChild>
              <XStack
                backgroundColor="$white"
                height={50}
                alignItems="center"
                justifyContent="space-between"
                paddingHorizontal={20}>
                <ButtonIcon>
                  <BackIcon />
                </ButtonIcon>
                <Button variant="outlined" onPress={savePicture} disabled={!image}>
                  Save
                </Button>
              </XStack>
            </Dialog.Close>

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

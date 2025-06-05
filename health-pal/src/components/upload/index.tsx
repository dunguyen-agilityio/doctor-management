import { useRef, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { CameraView, useCameraPermissions } from 'expo-camera'
import { CameraType, launchImageLibraryAsync } from 'expo-image-picker'
import * as Linking from 'expo-linking'

import { Stack, StackProps, View, YStack } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

import { Button, XStack } from '@app/components/common'

import { AvatarIcon, BackIcon, EditIcon, ImageMinus, RotateCcw } from '@icons'

import { ModalRef } from '@app/types/modal'

import { tokens } from '@/tamagui.config'

import AlertDialog from '../alert-dialog'
import CloudinaryImage from '../cloudinary-image'

interface UploadProps extends StackProps {
  preview?: string
  onUpload?: (image: string) => Promise<void>
}

const Upload = ({ preview, onUpload, ...props }: UploadProps) => {
  const [permission, requestPermission] = useCameraPermissions()
  const ref = useRef<CameraView>(null)
  const [facing, setFacing] = useState<CameraType>(CameraType.back)
  const [image, setImage] = useState<string | null>(null)
  const permissionModalRef = useRef<ModalRef>(null)
  const cameraModalRef = useRef<ModalRef>(null)

  const handleUpload = (imageUri: string) => {
    cameraModalRef.current?.close()
    onUpload?.(imageUri)
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
      handleUpload(asset.uri)
    }
  }

  const toggleFacing = () => {
    setFacing((prev) => (prev === CameraType.back ? CameraType.front : CameraType.back))
  }

  const takePicture = async () => {
    if (!ref.current) return

    const photo = await ref.current.takePictureAsync()
    handleUpload(photo.uri)
    setImage(photo.uri)
  }

  const handleBack = () => {
    setImage(null)
    cameraModalRef.current?.close()
  }

  const handleOpenCamera = async () => {
    const response = await requestPermission()

    if (!response.granted) {
      permissionModalRef.current?.open()
      return
    }

    cameraModalRef.current?.open()
  }

  if (!permission) {
    return <View />
  }

  return (
    <Stack height={202}>
      {!permission.granted && (
        <AlertDialog
          ref={permissionModalRef}
          cancelable
          onConfirm={Linking.openSettings}
          title="Permission Required"
          description="Camera access is needed. Please enable it in your device settings."
        />
      )}
      <AlertDialog
        ref={cameraModalRef}
        contentProps={{
          width: WINDOW_SIZE.width,
          height: '100%',
          paddingTop: 32,
          paddingHorizontal: 8,
        }}
        trigger={
          <Stack
            height={202}
            width={202}
            alignItems="center"
            position="relative"
            justifyContent="center"
            alignSelf="center"
            zIndex={1}
            {...props}>
            <Stack w={170} h={170} borderRadius={300}>
              {(image ?? preview) ? (
                <CloudinaryImage source={{ uri: image ?? preview }} style={styles.image} />
              ) : (
                <AvatarIcon testID="avatar-icon" />
              )}
            </Stack>
            <Button
              variant="icon"
              position="absolute"
              right={34}
              padding={0}
              bottom={27}
              aria-label="Edit Image"
              onPress={handleOpenCamera}>
              <EditIcon />
            </Button>
          </Stack>
        }>
        <Button
          variant="icon"
          aria-label="Back"
          marginLeft={8}
          onPressIn={handleBack}
          testID="back-button">
          <BackIcon />
        </Button>

        <YStack flex={1} justifyContent="center">
          <CameraView style={styles.camera} facing={facing} ref={ref} />
        </YStack>
        <XStack
          alignItems="center"
          backgroundColor="$white"
          justifyContent="space-around"
          paddingVertical={10}>
          <Pressable aria-label="Pick Image from Gallery" onPress={pickImage}>
            <ImageMinus width={32} height={32} color={tokens.color.primary.val} />
          </Pressable>

          <Pressable aria-label="Take Picture" onPress={takePicture}>
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

          <Pressable aria-label="Toggle Camera Facing" onPress={toggleFacing}>
            <RotateCcw width={32} height={32} color={tokens.color.primary.val} />
          </Pressable>
        </XStack>
      </AlertDialog>
    </Stack>
  )
}

export default Upload

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    minHeight: 420,
    maxHeight: 640,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 300,
  },
})

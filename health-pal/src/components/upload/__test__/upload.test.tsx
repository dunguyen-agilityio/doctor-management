import { act, fireEvent, render } from '@utils-test'

import React from 'react'
import { Linking } from 'react-native'

import * as Camera from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'

import Upload from '..'

jest.mock('expo-camera', () => ({
  CameraView: jest.fn(({ ref, style, facing }) => null),
  useCameraPermissions: jest.fn(),
}))
jest.mock('expo-image-picker', () => ({
  ...jest.requireActual('expo-image-picker'),
  launchImageLibraryAsync: jest.fn(),
}))

describe('Upload component', () => {
  const mockOnUpload = jest.fn()
  const mockOnOpenCamera = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([{ granted: false }, jest.fn()])
  })

  it('renders empty view when permission is null', () => {
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([null, jest.fn()])
    const { queryByTestId } = render(<Upload />)
    expect(queryByTestId('avatar-icon')).toBeNull()
  })

  it('renders avatar icon when no image or preview is provided', () => {
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([{ granted: true }, jest.fn()])
    const { getByTestId } = render(<Upload />)
    expect(getByTestId('avatar-icon')).toBeTruthy()
  })

  it('renders CloudinaryImage when preview is provided', () => {
    const preview = 'https://example.com/image.jpg'
    const { getByTestId } = render(<Upload preview={preview} />)
    expect(getByTestId('cloudinary-image')).toBeTruthy()
  })

  it('opens permission modal when camera permission is not granted', async () => {
    const requestPermission = jest.fn().mockResolvedValue({ granted: false })
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: false },
      requestPermission,
    ])
    const { getByLabelText } = render(<Upload onOpenCamera={mockOnOpenCamera} />)

    await act(async () => {
      fireEvent.press(getByLabelText('Edit Image'))
    })

    expect(requestPermission).toHaveBeenCalled()
    expect(mockOnOpenCamera).toHaveBeenCalled()
  })

  it('opens camera modal when permission is granted', async () => {
    const requestPermission = jest.fn().mockResolvedValue({ granted: true })
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      requestPermission,
    ])
    const { getByLabelText } = render(<Upload onOpenCamera={mockOnOpenCamera} />)

    await act(async () => {
      fireEvent.press(getByLabelText('Edit Image'))
    })

    expect(requestPermission).toHaveBeenCalled()
    expect(mockOnOpenCamera).toHaveBeenCalled()
  })

  it('toggles camera facing when rotate button is pressed', async () => {
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      jest.fn().mockResolvedValue({ granted: true }),
    ])
    const { getByLabelText } = render(<Upload />)

    await act(async () => {
      fireEvent.press(getByLabelText('Edit Image'))
    })

    expect(Camera.CameraView).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ facing: 'back' }),
      undefined,
    )

    const rotateButton = getByLabelText('Toggle Camera Facing')
    await act(async () => {
      fireEvent.press(rotateButton)
    })

    expect(Camera.CameraView).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ facing: 'front' }),
      undefined,
    )
  })

  it('picks image from gallery and calls onUpload', async () => {
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      jest.fn().mockResolvedValue({ granted: true }),
    ])
    const mockImage = { canceled: false, assets: [{ uri: 'file://image.jpg' }] }
    ;(ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue(mockImage)

    const { getByLabelText } = render(<Upload onUpload={mockOnUpload} />)

    await act(async () => {
      fireEvent.press(getByLabelText('Edit Image'))
    })

    await act(async () => {
      fireEvent.press(getByLabelText('Pick Image from Gallery'))
    })

    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    expect(mockOnUpload).toHaveBeenCalledWith('file://image.jpg')
  })

  it('takes picture and calls onUpload', async () => {
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      jest.fn().mockResolvedValue({ granted: true }),
    ])
    const mockTakePicture = jest.fn().mockResolvedValue({ uri: 'file://photo.jpg' })
    ;(Camera.CameraView as unknown as jest.Mock).mockImplementation(({ ref }) => {
      ref.current = { takePictureAsync: mockTakePicture }
      return null
    })

    const { getByLabelText } = render(<Upload onUpload={mockOnUpload} />)

    await act(async () => {
      fireEvent.press(getByLabelText('Edit Image'))
    })

    await act(async () => {
      fireEvent.press(getByLabelText('Take Picture'))
    })

    expect(mockTakePicture).toHaveBeenCalled()
    expect(mockOnUpload).toHaveBeenCalledWith('file://photo.jpg')
  })

  it('handles back button press', async () => {
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      jest.fn().mockResolvedValue({ granted: true }),
    ])
    const { getByLabelText, getByTestId } = render(<Upload />)

    await act(async () => {
      fireEvent.press(getByLabelText('Edit Image'))
    })

    await act(async () => {
      fireEvent.press(getByTestId('back-button'))
    })

    expect(getByTestId('avatar-icon')).toBeTruthy()
  })

  it('calls Linking.openSettings when permission modal confirms', async () => {
    ;(Camera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: false },
      jest.fn().mockResolvedValue({ granted: false }),
    ])
    const { getByLabelText, getByTestId } = render(<Upload />)

    await act(async () => {
      fireEvent.press(getByLabelText('Edit Image'))
    })

    await act(async () => {
      fireEvent.press(getByTestId('confirm-button'))
    })

    expect(Linking.openSettings).toHaveBeenCalled()
  })
})

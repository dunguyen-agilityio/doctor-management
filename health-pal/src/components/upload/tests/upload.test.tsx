import { act, fireEvent, render, waitFor } from '@utils-test'

import React from 'react'

import * as expoCamera from 'expo-camera'
import * as imagePicker from 'expo-image-picker'

import { useToastController } from '@tamagui/toast'

import { useAppLoading } from '@app/hooks'
import { useSession } from '@app/hooks/use-session'

import { uploadToStrapi } from '@app/services/upload-image'

import Upload from '..'

// Mock modules
jest.mock('expo-camera', () => ({
  ...jest.requireActual('expo-camera'),
  useCameraPermissions: jest.fn(),
}))
jest.mock('expo-image-picker', () => ({
  ...jest.requireActual('expo-image-picker'),
  launchImageLibraryAsync: jest.fn(),
}))
jest.mock('@app/services/upload-image')
jest.mock('@tamagui/toast', () => ({
  ...jest.requireActual('@tamagui/toast'),
  useToastController: jest.fn(),
}))
jest.mock('@app/contexts', () => ({
  ...jest.requireActual('@app/contexts'),
  useSession: jest.fn(),
}))
jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useAppLoading: jest.fn(),
}))

describe('Upload component', () => {
  const mockRequestPermission = jest.fn()
  const mockShowToast = jest.fn()
  const mockSetAppLoading = jest.fn()
  const mockOnUpload = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(expoCamera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      mockRequestPermission,
    ])
    ;(useToastController as jest.Mock).mockReturnValue({
      show: mockShowToast,
    })
    ;(useAppLoading as jest.Mock).mockReturnValue(mockSetAppLoading)
    ;(useSession as jest.Mock).mockReturnValue({
      session: {
        jwt: 'fake-jwt-token',
      },
    })
  })

  it('renders preview image when provided', async () => {
    const { getByTestId } = render(<Upload preview="https://example.com/image.jpg" />)
    const image = getByTestId('expo-image')
    expect(image.props.source[0].uri).toBe('https://example.com/image.jpg')
  })

  it('renders AvatarIcon when no image or preview', () => {
    const { getByTestId } = render(<Upload />)
    expect(getByTestId('avatar-icon')).toBeTruthy()
  })

  it('requests camera permission on mount', () => {
    render(<Upload />)
    expect(mockRequestPermission).toHaveBeenCalled()
  })

  it('opens dialog when EditIcon pressed', async () => {
    const { getByLabelText, getByTestId } = render(<Upload />)
    const editBtn = getByLabelText('Edit Image')

    fireEvent.press(editBtn)
    await waitFor(() => {
      expect(getByTestId('back-button')).toBeTruthy()
    })
  })

  it('toggles camera facing when rotate pressed', () => {
    const { getByLabelText } = render(<Upload />)
    const editBtn = getByLabelText('Edit Image')
    fireEvent.press(editBtn)

    const toggleBtn = getByLabelText('Toggle Camera Facing')

    // No direct way to read camera type, just test toggle called without error
    fireEvent.press(toggleBtn)
  })

  it('calls onUpload when picking image from gallery', async () => {
    const imageUri = 'file://image.jpg'
    ;(imagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ uri: imageUri }],
    })
    ;(uploadToStrapi as jest.Mock).mockResolvedValue({
      error: null,
      data: { id: 1, url: imageUri },
    })

    const { getByLabelText } = render(<Upload onUpload={mockOnUpload} />)
    fireEvent.press(getByLabelText('Edit Image'))

    const pickBtn = getByLabelText('Pick Image from Gallery')
    fireEvent.press(pickBtn)

    await waitFor(() => {
      expect(uploadToStrapi).toHaveBeenCalledWith(imageUri, 'fake-jwt-token')
      expect(mockOnUpload).toHaveBeenCalledWith({ id: 1, url: imageUri })
    })
  })

  it.skip('takes picture and calls onUpload', async () => {
    const photoUri = 'file://photo.jpg'

    const mockTakePictureAsync = jest.fn().mockResolvedValue({ uri: photoUri })

    // Mock ref.current.takePictureAsync
    jest.spyOn(React, 'useRef').mockImplementation(
      () =>
        ({
          current: {
            takePictureAsync: mockTakePictureAsync,
          },
        }) as any,
    )
    ;(uploadToStrapi as jest.Mock).mockResolvedValue({
      error: null,
      data: { id: 2, url: photoUri },
    })

    const { getByLabelText } = render(<Upload onUpload={mockOnUpload} />)
    fireEvent.press(getByLabelText('Edit Image'))

    const takeBtn = getByLabelText('Take Picture')
    act(() => {
      fireEvent.press(takeBtn)
    })

    await waitFor(() => {
      expect(mockTakePictureAsync).toHaveBeenCalled()
      expect(uploadToStrapi).toHaveBeenCalledWith(photoUri, 'fake-jwt-token')
      expect(mockOnUpload).toHaveBeenCalledWith({ id: 2, url: photoUri })
    })
  })

  it('shows alert dialog if permission not granted', async () => {
    ;(expoCamera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: false },
      mockRequestPermission,
    ])

    const { getByText } = render(<Upload />)
    await waitFor(() => {
      expect(getByText('We need your permission to show the camera')).toBeTruthy()
    })
  })

  it('shows toast on upload error', async () => {
    const imageUri = 'file://image-error.jpg'
    ;(imagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ uri: imageUri }],
    })
    ;(uploadToStrapi as jest.Mock).mockResolvedValue({
      error: { message: 'Upload failed' },
      data: null,
    })

    const { getByLabelText } = render(<Upload />)
    fireEvent.press(getByLabelText('Edit Image'))

    fireEvent.press(getByLabelText('Pick Image from Gallery'))

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        'Upload Failed',
        expect.objectContaining({
          message: 'Upload failed',
          type: 'error',
        }),
      )
    })
  })
})

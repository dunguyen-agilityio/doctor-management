import { fireEvent, render, waitFor } from '@utils-test'

import { Keyboard } from 'react-native'

import { useCameraPermissions } from 'expo-camera'

import { debounce } from 'tamagui'

import { uploadToStrapi } from '@/services/upload-image'

import UserProfile from '..'

jest.mock('@/services/upload-image', () => ({
  uploadToStrapi: jest.fn(),
}))

const mockShow = jest.fn()

jest.mock('@tamagui/toast', () => ({
  ...jest.requireActual('@tamagui/toast'),
  useToastController: () => ({
    show: mockShow,
  }),
}))

jest.mock('tamagui', () => ({
  ...jest.requireActual('tamagui'),
  debounce: jest.fn(),
}))

jest.mock('expo-camera', () => ({
  CameraView: jest.fn(() => null),
  useCameraPermissions: jest.fn(),
}))

describe('User Profile', () => {
  beforeEach(() => {
    ;(useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: false },
      jest.fn().mockResolvedValue({
        granted: false,
      }),
    ])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders all input fields', () => {
    const { getByLabelText } = render(<UserProfile onSubmit={jest.fn()} editable />)

    expect(getByLabelText('Full name')).toBeTruthy()
    expect(getByLabelText('Nickname')).toBeTruthy()
    expect(getByLabelText('Email address')).toBeTruthy()
    expect(getByLabelText('Date of birth')).toBeTruthy()
    expect(getByLabelText('Gender')).toBeTruthy()
  })

  it('shows validation errors on blur if fields are empty', async () => {
    const { getByLabelText, getByText } = render(<UserProfile onSubmit={jest.fn()} editable />)

    fireEvent(getByLabelText('Full name'), 'onBlur')
    fireEvent(getByLabelText('Nickname'), 'onBlur')
    fireEvent(getByLabelText('Email address'), 'onBlur')

    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy()
      expect(getByText('Nickname is required')).toBeTruthy()
      expect(getByText('Email is required')).toBeTruthy()
    })
  })

  it('mock handle next field when submit', async () => {
    const mockHandle = jest.fn()
    ;(debounce as jest.Mock).mockReturnValue(mockHandle)
    const { getByLabelText } = render(<UserProfile onSubmit={jest.fn()} editable />)

    fireEvent(getByLabelText('Full name'), 'onSubmitEditing')
    fireEvent(getByLabelText('Nickname'), 'onSubmitEditing')
    fireEvent(getByLabelText('Email address'), 'onSubmitEditing')

    await waitFor(() => {
      expect(mockHandle).toHaveBeenNthCalledWith(1, { event: 'SUBMIT', next: 1 })
      expect(mockHandle).toHaveBeenNthCalledWith(2, { event: 'SUBMIT', next: 2 })
      expect(mockHandle).toHaveBeenNthCalledWith(3, { event: 'SUBMIT', next: 3 })
    })
  })

  it('submits valid form data', async () => {
    const mockSubmit = jest.fn().mockResolvedValue(undefined)

    const { getByLabelText, getByText } = render(<UserProfile onSubmit={mockSubmit} editable />)

    fireEvent.changeText(getByLabelText('Full name'), 'John Doe')
    fireEvent.changeText(getByLabelText('Nickname'), 'johndoe')
    fireEvent.changeText(getByLabelText('Email address'), 'john@example.com')
    fireEvent(getByLabelText('Date of birth'), 'onChangeValue', '2000-01-01')
    fireEvent(getByLabelText('Gender'), 'onValueChange', 'Male')

    fireEvent.press(getByText('Save'))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John Doe',
          nickname: 'johndoe',
          email: 'john@example.com',
          gender: 'Male',
          dateOfBirth: '2000-01-01',
        }),
      )
    })
  })

  it('handles avatar upload success', async () => {
    ;(useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      jest.fn().mockResolvedValue({
        granted: true,
      }),
    ])
    ;(uploadToStrapi as jest.Mock).mockResolvedValueOnce({
      data: { id: 1, url: 'https://cdn.com/avatar.jpg' },
    })

    Keyboard.isVisible = () => true

    const { getByLabelText } = render(<UserProfile onSubmit={jest.fn()} editable />)

    const uploadButton = getByLabelText('Upload profile picture')
    fireEvent.press(getByLabelText('Edit Image'))

    fireEvent(uploadButton, 'onUpload', 'mock-base64-img')

    await waitFor(() => {
      expect(uploadToStrapi).toHaveBeenCalledWith('mock-base64-img')
    })
  })

  it('handles avatar upload failed', async () => {
    ;(useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      jest.fn().mockResolvedValue({
        granted: true,
      }),
    ])
    ;(uploadToStrapi as jest.Mock).mockResolvedValueOnce({ error: { message: 'Failed to upload' } })

    const { getByLabelText } = render(<UserProfile onSubmit={jest.fn()} editable />)

    const uploadButton = getByLabelText('Upload profile picture')

    fireEvent(uploadButton, 'onUpload', 'mock-base64-img')

    await waitFor(() => {
      expect(mockShow).toHaveBeenCalledWith('Upload Failed', {
        duration: 3000,
        message: 'Failed to upload',
        type: 'error',
      })
    })
  })
})

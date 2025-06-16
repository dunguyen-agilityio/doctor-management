import { Platform } from 'react-native'

import * as FileSystem from 'expo-file-system'

import { uploadToStrapi } from '../upload-image'

jest.mock('expo-file-system', () => ({
  uploadAsync: jest.fn(),
  FileSystemUploadType: {
    MULTIPART: 'MULTIPART',
  },
}))

describe('uploadToStrapi', () => {
  const mockUri = 'file:///mock/path/image.jpg'
  const mockEndpoint = 'https://mock-api.com'

  beforeEach(() => {
    jest.resetModules()
    process.env.EXPO_PUBLIC_DEV_API_ENDPOINT = mockEndpoint
  })

  it('should call uploadAsync with correct arguments (Android)', async () => {
    Platform.OS = 'android'

    const mockResponse = {
      body: JSON.stringify([
        {
          url: '/uploads/image.jpg',
          id: 1,
          documentId: 'abc123',
          ext: '.jpg',
          name: 'image.jpg',
        },
      ]),
    }

    ;(FileSystem.uploadAsync as jest.Mock).mockResolvedValueOnce(mockResponse)

    const result = await uploadToStrapi(mockUri)

    expect(FileSystem.uploadAsync).toHaveBeenCalledWith(`${mockEndpoint}/upload`, mockUri, {
      headers: { Authorization: 'Bearer mock_token' },
      uploadType: 'MULTIPART',
      fieldName: 'files',
    })

    expect(result).toEqual({
      data: {
        url: '/uploads/image.jpg',
        id: 1,
        documentId: 'abc123',
        ext: '.jpg',
        name: 'image.jpg',
      },
      error: null,
    })
  })

  it('should adjust uri for iOS', async () => {
    Platform.OS = 'ios'

    const adjustedUri = '/mock/path/image.jpg'
    const mockResponse = {
      body: JSON.stringify([
        {
          url: '/uploads/image.jpg',
          id: 2,
          documentId: 'xyz789',
          ext: '.jpg',
          name: 'image.jpg',
        },
      ]),
    }

    ;(FileSystem.uploadAsync as jest.Mock).mockResolvedValueOnce(mockResponse)

    const result = await uploadToStrapi(mockUri)

    expect(FileSystem.uploadAsync).toHaveBeenCalledWith(
      `${mockEndpoint}/upload`,
      adjustedUri,
      expect.anything(),
    )

    expect(result.data?.id).toBe(2)
  })

  it('should handle invalid or missing response body', async () => {
    ;(FileSystem.uploadAsync as jest.Mock).mockResolvedValueOnce({ body: null })

    const result = await uploadToStrapi(mockUri)

    expect(result.error?.message).toMatch(/Upload failed/)
    expect(result.data).toBeNull()
  })

  it('should handle response with no URL', async () => {
    ;(FileSystem.uploadAsync as jest.Mock).mockResolvedValueOnce({
      body: JSON.stringify([{ id: 3, name: 'no-url.jpg' }]),
    })

    const result = await uploadToStrapi(mockUri)

    expect(result.error?.message).toMatch(/Uploaded image URL not found/)
    expect(result.data).toBeNull()
  })
})

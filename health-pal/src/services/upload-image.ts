import { Platform } from 'react-native'

import * as FileSystem from 'expo-file-system'

import { API_ENDPOINT } from '@/constants'

export const uploadToStrapi = async (imageUri: string) => {
  const jwt = process.env.EXPO_PUBLIC_APP_TOKEN ?? ''
  const adjustedUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri
  const response = await FileSystem.uploadAsync(`${API_ENDPOINT}/upload`, adjustedUri, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: 'files',
  })

  const data = response.body ? (JSON.parse(response.body) as StrapiImageResponse[]) : null

  if (!data || !Array.isArray(data) || data.length === 0) {
    return { error: { message: 'Upload failed or no data returned from Strapi' }, data: null }
  }

  if (data[0].url) {
    return { data: data[0], error: null }
  }

  return { error: { message: 'Uploaded image URL not found in response' }, data: null }
}

type StrapiImageResponse = {
  url: string
  id: number
  documentId: string
  ext: string
  name: string
}

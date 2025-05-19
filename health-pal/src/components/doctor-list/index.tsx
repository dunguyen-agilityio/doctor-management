import React from 'react'
import { Text } from 'react-native'

import { useQuery } from '@tanstack/react-query'
import { FlatList } from 'react-native-gesture-handler'

import { XStack } from '@theme'

import { Doctor, DoctorData } from '@app/models/doctor'
import { StrapiPagination } from '@app/types/strapi'

import LoadingIndicator from '../loading-indicator'

const ItemSeparatorComponent = () => <XStack height={8} />

const keyExtractor = (item: Doctor) => item.documentId

interface DoctorListProps {
  getDoctors: () => Promise<StrapiPagination<DoctorData>>
  renderItem: ({ item }: { item: DoctorData }) => React.JSX.Element
  queryKey: string[]
}

const DoctorList = ({ getDoctors, renderItem, queryKey }: DoctorListProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: getDoctors,
  })

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error || !data) {
    return <Text>{error?.message ?? 'Error'}</Text>
  }

  return (
    <FlatList
      style={{ paddingHorizontal: 24 }}
      data={data.data}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: 'white' }}
    />
  )
}

export default DoctorList

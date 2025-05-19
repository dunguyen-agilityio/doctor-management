import React from 'react'
import { Text, View } from 'react-native'

import { useLocalSearchParams } from 'expo-router'

const Details = () => {
  const params = useLocalSearchParams<{ id: string }>()

  return (
    <View>
      <Text>Details {params.id}</Text>
    </View>
  )
}

export default Details

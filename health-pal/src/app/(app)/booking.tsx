import React from 'react'
import { Text, View } from 'react-native'

import { useLocalSearchParams } from 'expo-router'

const Booking = () => {
  const params = useLocalSearchParams<{ id?: string }>()
  return (
    <View>
      <Text>Booking {params.id}</Text>
    </View>
  )
}

export default Booking

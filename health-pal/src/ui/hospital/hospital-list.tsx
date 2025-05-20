import React, { use } from 'react'
import { FlatListProps } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'

import { ClinicsContext } from '@app/contexts/clinic'
import { Clinic } from '@app/models/clinic'

interface HospitalProps extends Omit<FlatListProps<Clinic>, 'data'> {}

const keyExtractor = (item: Clinic) => item.documentId

const HospitalList = ({ ...otherProps }: HospitalProps) => {
  const clinicContext = use(ClinicsContext)

  return (
    <FlatList
      {...otherProps}
      data={clinicContext}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  )
}

export default HospitalList

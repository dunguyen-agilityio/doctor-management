import { Stack } from 'tamagui'

import { Text } from '@theme'

import { ClinicCard, LoadingIndicator } from '@app/components'
import { useSession } from '@app/contexts'
import useFavorite from '@app/hooks/use-favorite'
import { Clinic } from '@app/models/clinic'
import { FAVORITE_TYPES } from '@app/types/favorite'

import HospitalList from '../hospital/hospital-list'

const ItemSeparatorComponent = () => <Stack height={12} />

const renderItem = ({ item }: { item: Clinic }) => <ClinicCard px={24} h={256} full {...item} />

const ClinicFavorite = () => {
  const { session } = useSession()
  const { data, isLoading, error } = useFavorite<Clinic>(session?.jwt!, FAVORITE_TYPES.HOSPITAL)

  if (isLoading) return <LoadingIndicator />

  if (!data || error) return <Text>Error</Text>

  const { data: hospitals } = data

  return (
    <HospitalList
      data={hospitals}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
    />
  )
}

export default ClinicFavorite

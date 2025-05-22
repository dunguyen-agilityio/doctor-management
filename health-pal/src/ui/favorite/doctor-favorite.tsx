import { Text } from '@theme'

import DoctorCard from '@app/components/doctor-card'
import DoctorList from '@app/components/doctor-list'
import { useSession } from '@app/contexts'
import { useDoctorFavorite } from '@app/hooks/use-favorite'
import { DoctorData } from '@app/models/doctor'
import { TFavorite } from '@app/types/favorite'
import { formatDoctor } from '@app/utils/doctor'

const DoctorFavorite = () => {
  const { session } = useSession()
  const { data, isLoading, error } = useDoctorFavorite(session?.jwt!)

  const renderItem = ({ item }: { item: TFavorite<DoctorData> }) => {
    const { doctor, documentId } = item

    console.log('doctor', Object.keys(doctor))

    return <DoctorCard {...formatDoctor(doctor)} favoriteId={documentId} />
  }

  if (isLoading) return null

  if (error || !data) {
    return <Text>Error</Text>
  }

  return <DoctorList renderItem={renderItem} data={data.data.slice(0, 1)} />
}

export default DoctorFavorite

import { useQuery } from '@tanstack/react-query'

import { Text } from '@theme/text'

import ClinicList from '@app/components/clinic-list'
import LoadingIndicator from '@app/components/loading-indicator'
import { getHospitals } from '@app/services/hospital'

const NearbyMedicalCenters = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hospital'],
    queryFn: () =>
      getHospitals({
        pagination: { page: 1 },
      }),
  })

  if (isLoading) return <LoadingIndicator />

  if (error || !data) {
    return <Text>{error?.message ?? 'Error'}</Text>
  }

  return <ClinicList data={data.data} />
}

export default NearbyMedicalCenters

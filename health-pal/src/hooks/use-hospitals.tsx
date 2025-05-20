import { useQuery } from '@tanstack/react-query'

import { getHospitals } from '@app/services/hospital'

const useHospitals = () => {
  const queryResponse = useQuery({
    queryKey: ['hospitals'],
    queryFn: () => getHospitals(),
  })

  return queryResponse
}

export default useHospitals

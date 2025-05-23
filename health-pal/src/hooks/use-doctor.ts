import { useQuery } from '@tanstack/react-query'

import { getDoctor } from '@app/services/doctor'

const useDoctor = (docId: string) => {
  const queryResponse = useQuery({
    queryKey: ['doctor', docId],
    queryFn: () => getDoctor(docId),
  })

  return queryResponse
}

export default useDoctor

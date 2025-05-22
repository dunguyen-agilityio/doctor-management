import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@app/react-query.config'
import { getDoctor } from '@app/services/doctor'

const useDoctor = (docId: string) => {
  const queryResponse = useQuery({
    queryKey: [...QUERY_KEY.DOCTOR, docId],
    queryFn: () => getDoctor(docId),
  })

  return queryResponse
}

export default useDoctor

import { useQuery } from '@tanstack/react-query'

import { getFavorite } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

const useFavorite = <T>(jwt: string, type: FAVORITE_TYPES) => {
  const queryResponse = useQuery({
    queryKey: [`favorite-${type}`],
    queryFn: () => getFavorite<T>(type, jwt),
    placeholderData: (prevData) => prevData,
  })

  return queryResponse
}

export default useFavorite

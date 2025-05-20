import { LoadingIndicator } from '@app/components'
import { useSession } from '@app/contexts'
import { ClinicsContext } from '@app/contexts/clinic'
import useFavorite from '@app/hooks/use-favorite'
import { Clinic } from '@app/models/clinic'
import { FAVORITE_TYPES } from '@app/types/favorite'

const ClinicFavorite = ({ children }: React.PropsWithChildren) => {
  const { session } = useSession()
  const { data, isLoading, error } = useFavorite<Clinic>(session?.jwt!, FAVORITE_TYPES.HOSPITAL)
  return (
    <>
      {isLoading && <LoadingIndicator />}
      <ClinicsContext value={data?.data ?? []}>{children}</ClinicsContext>
    </>
  )
}

export default ClinicFavorite

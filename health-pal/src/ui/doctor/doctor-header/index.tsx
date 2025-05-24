import { Button } from 'tamagui'

import { APP_TITLES } from '@app/constants/route'

import Header from '@app/components/header'
import useDoctor from '@app/hooks/use-doctor'
import { useFavoritesStore } from '@app/stores/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'
import { APP_ROUTES } from '@app/types/route'
import { FavoriteButton } from '@app/ui/favorite'

const DoctorDetailHeader = ({ id, goBack }: { id: string; goBack: () => void }) => {
  const { data, error, isLoading } = useDoctor(id)
  const doctorName = data?.name!
  const doctorId = data?.id!
  const favoriteId = useFavoritesStore((state) => state.favoriteDoctors[doctorId])

  const renderIcon = () => {
    if (isLoading || error || !data) return null

    return (
      <FavoriteButton
        favoriteId={favoriteId}
        itemId={doctorId}
        itemName={doctorName}
        type={FAVORITE_TYPES.DOCTOR}
        size={20}
        disabledStyle={{ backgroundColor: '$shadow1' }}
      />
    )
  }

  return (
    <Header title={APP_TITLES[APP_ROUTES.DOCTOR_DETAILS]} onBack={goBack}>
      <Button position="relative">{renderIcon()}</Button>
    </Header>
  )
}

export default DoctorDetailHeader

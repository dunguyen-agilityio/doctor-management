import { use } from 'react'

import { APP_TITLES } from '@app/constants/route'

import Header from '@app/components/header'
import { FavoriteStateContext } from '@app/contexts/favorite'
import { useAddFavorite } from '@app/hooks/use-add-favorite'
import useDoctor from '@app/hooks/use-doctor'
import { useRemoveFavorite } from '@app/hooks/use-remove-favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'
import { APP_ROUTES } from '@app/types/route'
import { FavoriteButton } from '@app/ui/favorite'

const DoctorDetailHeader = ({ id, goBack }: { id: string; goBack: () => void }) => {
  const { data, error, isLoading, refetch } = useDoctor(id)
  const favoriteById = use(FavoriteStateContext)

  const doctorName = data?.name!
  const doctorId = data?.id!
  const favoriteId = favoriteById[doctorId]

  const { mutate: removeFavorite, isPending: removeFavPending } = useRemoveFavorite(
    FAVORITE_TYPES.DOCTOR,
    'itemName',
  )

  const { mutate: addFavorite, isPending: addFavPending } = useAddFavorite(
    FAVORITE_TYPES.DOCTOR,
    'itemName',
  )

  const disabled = !!removeFavPending || !!addFavPending

  const renderIcon = () => {
    if (isLoading || error || !data) return null

    const { id: itemId } = data

    const handleFavorite = () => {
      if (favoriteId) {
        removeFavorite(favoriteId)
      } else {
        addFavorite(itemId)
      }

      refetch()
    }

    return (
      <FavoriteButton
        itemId={doctorId}
        itemName={doctorName}
        type={FAVORITE_TYPES.DOCTOR}
        size={20}
        disabled={disabled}
        disabledStyle={{ backgroundColor: '$shadow1' }}
        onPress={handleFavorite}
      />
    )
  }

  return (
    <Header title={APP_TITLES[APP_ROUTES.DOCTOR_DETAILS]} onBack={goBack}>
      {renderIcon()}
    </Header>
  )
}

export default DoctorDetailHeader

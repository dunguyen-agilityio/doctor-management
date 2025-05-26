export const FavoriteQueryKey = {
  doctor: 'populate[doctor][populate][users_permissions_user][populate][avatar][fields]',
  specialty: 'populate[doctor][populate][specialty][fields]',
  hospital: 'populate[hospital][populate][image][fields]',
  address: 'populate[doctor][populate][clinic][fields]',
}

export const FavoriteMessages = {
  FAVORITE_ERROR: 'Failed to get favorite',
  FAVORITE_LIST_ERROR: 'Failed to get favorites list',
  FAVORITE_LIST_EMPTY: 'No favorites found',
  FAVORITE_LIST_EMPTY_SEARCH: 'No favorites found with this search term',
  FAVORITE_LIST_EMPTY_SPECIALTY: 'No favorites found in this specialty',
}

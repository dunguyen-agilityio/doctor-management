export const DOCTOR_QUERY_KEY = {
  hospital: 'populate[clinic][populate]',
  avatar: 'populate[users_permissions_user][populate][avatar][populate]',
  specialty: 'populate[specialty][fields]',
  query: 'filters[users_permissions_user][name][$containsi]',
  filterSpecialty: 'filters[specialty][name][$eqi]',
  address: 'populate[clinic][fields]',
}

export const DOCTOR_MESSAGE = {
  DOCTOR_ERROR: 'Failed to get doctor',
  DOCTOR_LIST_ERROR: 'Failed to get doctors list',
  DOCTOR_LIST_EMPTY: 'No doctors found',
  DOCTOR_LIST_EMPTY_SEARCH: 'No doctors found with this search term',
  DOCTOR_LIST_EMPTY_SPECIALTY: 'No doctors found in this specialty',
}

export const DoctorQueryKey = {
  hospital: 'populate[clinic][populate]',
  doctor: 'populate[users_permissions_user][populate]',
  specialty: 'populate[specialty][populate]',
  query: 'filters[users_permissions_user][name][$containsi]',
  filterSpecialty: 'filters[specialty][name][$eqi]',
}

export const DoctorMessages = {
  DOCTOR_ERROR: 'Failed to get doctor',
  DOCTOR_LIST_ERROR: 'Failed to get doctors list',
  DOCTOR_LIST_EMPTY: 'No doctors found',
  DOCTOR_LIST_EMPTY_SEARCH: 'No doctors found with this search term',
  DOCTOR_LIST_EMPTY_SPECIALTY: 'No doctors found in this specialty',
}

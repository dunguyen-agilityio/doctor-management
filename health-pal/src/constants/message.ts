export const VALIDATIONS_MESSAGE = {
  INVALID_EMAIL: 'Invalid email format',
  REQUIRED_EMAIL: 'Email is required',
  REQUIRED_PASSWORD: 'Password is required',
  REQUIRED_NAME: 'Name is required',
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  MIN: (field: string, length = 6) => `${field} must be at least ${length} characters`,
}

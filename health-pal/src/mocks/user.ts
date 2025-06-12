import { User } from '@/models/user'

export const MOCK_USER: User = {
  id: 1,
  name: 'John Doe',
  nickname: 'jdoe',
  email: 'jdoe@example.com',
  documentId: '123e4567-e89b-12d3-a456-426614174000',
  dateOfBirth: new Date('1990-01-01'),
  gender: true,
  avatar: {
    id: 1,
    url: 'https://example.com/avatar.jpg',
  },
  username: 'jdoe',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
}

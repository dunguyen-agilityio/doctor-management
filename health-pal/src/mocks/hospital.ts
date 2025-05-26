import { Hospital } from '@app/models/hospital'

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 1,
    documentId: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Sunrise Hospital',
    description: 'A premier healthcare facility offering top-tier services in Springfield.',
    address: '123 Main St, Springfield, USA',
    image: { id: 1, url: 'https://picsum.photos/200', alt: 'Sunrise Hospital' },
    rating: 4.2,
    doctors: [],
    reivewCouter: 300,
    reviews: [],
    type: 'Clinic',
  },
  {
    id: 2,
    documentId: '987fcdeb-12ab-34cd-5678-901234567890',
    name: 'Mercy Hospital',
    description: 'Leading medical center in Metropolis.',
    address: '456 Oak Ave, Metropolis, Canada',
    image: { id: 2, url: 'https://picsum.photos/201', alt: 'Mercy Hospital' },
    doctors: [],
    reivewCouter: 300,
    reviews: [],
    rating: 1,
    type: 'Hospital',
  },
]

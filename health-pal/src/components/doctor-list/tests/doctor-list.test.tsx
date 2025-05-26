import { render } from '@utils-test'

import { Stack } from 'tamagui'

import { MOCK_DOCTORS } from '@app/mocks/doctor'
import { TDoctorData } from '@app/models/doctor'

import DoctorList from '../'

describe('DoctorList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('matches snapshot with empty data', () => {
    const renderItem = ({ item }: { item: TDoctorData }) => (
      <Stack testID={`doctor-${item.documentId}`}>{item.name}</Stack>
    )
    const { toJSON } = render(<DoctorList data={[]} renderItem={renderItem} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot with custom renderItem', () => {
    const renderItem = ({ item }: { item: TDoctorData }) => (
      <Stack testID={`doctor-${item.documentId}`}>{item.name}</Stack>
    )
    const { toJSON } = render(<DoctorList data={MOCK_DOCTORS} renderItem={renderItem} />)
    expect(toJSON()).toMatchSnapshot()
  })
})

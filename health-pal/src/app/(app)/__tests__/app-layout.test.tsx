import { render } from '@utils-test'

import { Redirect } from 'expo-router'

import { View } from 'tamagui'

import AppLayout from '../_layout'

jest.mock('expo-router')

describe('<AppLayout />', () => {
  it('matches snapshot after loading', async () => {
    ;(Redirect as jest.Mock).mockReturnValue(<View />)
    const { toJSON } = render(<AppLayout />)
    expect(toJSON()).toMatchSnapshot()
  })
})

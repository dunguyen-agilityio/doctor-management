import { render } from '@utils-test'

import RootLayout from '../_layout'

jest.mock('@/services/auth', () => ({
  getProfile: jest.fn(() => Promise.resolve(null)),
}))

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
  setOptions: jest.fn(),
  hide: jest.fn(),
}))

jest.mock('expo-router', () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    usePathname: jest.fn().mockReturnValue('/'),
    useLocalSearchParams: () => ({}),
    Stack: ({ children }: { children: React.ReactNode }) => children,
    Slot: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('<RootLayout />', () => {
  it('matches snapshot after loading', async () => {
    const { toJSON } = render(<RootLayout />)

    expect(toJSON()).toMatchSnapshot()
  })
})

import { render } from '@utils-test'

import AuthLayout from '../_layout'

jest.mock('expo-router', () => {
  const Stack = ({ children }: { children: React.ReactNode }) => children
  Stack.Screen = ({ children }: { children: React.ReactNode }) => children
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    usePathname: jest.fn().mockReturnValue('/'),
    useLocalSearchParams: () => ({}),
    Stack,
    Slot: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('<AuthLayout />', () => {
  it('matches snapshot after loading', async () => {
    const { toJSON } = render(<AuthLayout />)

    expect(toJSON()).toMatchSnapshot()
  })
})

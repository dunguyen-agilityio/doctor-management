import { render, screen } from '@utils-test'

// Adjust path to your TabIcon component
import { TAB_ROUTES } from '@app/types/route'

import { tokens } from '@/tamagui.config'

// Adjust path to your tamagui.config.ts
import TabIcon from '.'

describe('TabIcon', () => {
  it('renders HomeOutline icon without Stack when not focused', () => {
    render(<TabIcon focused={false} name={TAB_ROUTES.HOME} />)
    expect(screen.getByTestId('index-outline')).toBeTruthy()
    expect(screen.queryByTestId('index-fill')).toBeNull()
    expect(screen.getByTestId('index-outline').parent?.type).not.toBe('Stack') // No Stack wrapper
  })

  it('renders ProfileFill icon with Stack when focused', () => {
    render(<TabIcon focused={true} name={TAB_ROUTES.PROFILE} />)
    const wrapper = screen.getByTestId('profile-wrapper')
    expect(wrapper).toBeTruthy()
    expect(wrapper).toHaveStyle({
      backgroundColor: tokens.color.grey100.val,
      height: 48,
      width: 48,
      alignItems: 'center',
      justifyContent: 'center',
    })
    expect(screen.getByTestId('profile-fill')).toHaveProp('stroke', tokens.color.grey400.val)
    expect(screen.getByTestId('profile-fill')).toHaveProp('fill', tokens.color.grey600.val)
  })

  it('renders ProfileOutline icon without Stack when not focused', () => {
    render(<TabIcon focused={false} name={TAB_ROUTES.PROFILE} />)
    expect(screen.getByTestId('profile-outline')).toBeTruthy()
    expect(screen.queryByTestId('profile-fill')).toBeNull()
    expect(screen.getByTestId('profile-outline').parent?.type).not.toBe('Stack') // No Stack wrapper
  })

  it('renders HeartOutline icon without Stack when not focused', () => {
    render(<TabIcon focused={false} name={TAB_ROUTES.FAVORITE} />)
    expect(screen.getByTestId('favorite-outline')).toBeTruthy()
    expect(screen.queryByTestId('favorite-fill')).toBeNull()
  })
})

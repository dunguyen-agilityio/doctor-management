import { render, screen } from '@utils-test'

// Adjust path
import { Text } from '@theme/text'

import { tokens } from '@/tamagui.config'

import DoctorStat from '.'

// Mock the icon prop
const mockIcon = <Text testID="mock-icon">mock-icon</Text>

describe('DoctorStat', () => {
  it('renders title, value, and icon with correct styles', () => {
    render(<DoctorStat title="Patients" value="100" icon={mockIcon} />)

    expect(screen.getByTestId('mock-icon')).toBeTruthy()

    const valueText = screen.getByTestId('value-text')
    expect(valueText).toHaveTextContent('100')
    expect(valueText).toHaveStyle({
      fontFamily: 'Inter_600SemiBold',
      color: tokens.color.grey600.val,
      fontSize: 16,
      lineHeight: 24,
    })

    const titleText = screen.getByTestId('title-text')
    expect(titleText).toHaveTextContent('Patients')
    expect(titleText).toHaveStyle({
      fontFamily: 'Inter_400Regular',
      color: tokens.color.grey500.val,
      fontSize: 14,
      lineHeight: 21,
    })
  })

  it('renders number value correctly', () => {
    render(<DoctorStat title="Patients" value={200} icon={mockIcon} />)
    expect(screen.getByTestId('value-text')).toHaveTextContent('200')
  })

  it('applies correct styles with empty title', () => {
    render(<DoctorStat title="" value="100" icon={mockIcon} />)
    expect(screen.getByTestId('title-text')).toHaveTextContent('')
    expect(screen.getByTestId('title-text')).toHaveStyle({
      fontFamily: 'Inter_400Regular',
      color: tokens.color.grey500.val,
      fontSize: 14,
      lineHeight: 21,
    })
  })
})

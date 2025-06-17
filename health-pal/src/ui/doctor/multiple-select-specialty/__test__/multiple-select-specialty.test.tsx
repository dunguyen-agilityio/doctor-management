import { fireEvent, render } from '@utils-test'

import { SPECIALTY_LIST } from '@/constants'

import MultipleSelectSpecialty from '..'

describe('MultipleSelectSpecialty', () => {
  const onChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all specialty chips including "All"', () => {
    const { getByText } = render(<MultipleSelectSpecialty onChange={onChange} values={['all']} />)

    expect(getByText('All')).toBeTruthy()

    SPECIALTY_LIST.forEach(({ name }) => {
      expect(getByText(name)).toBeTruthy()
    })
  })

  it('selects a specialty and deselects "All"', () => {
    const { getByText } = render(<MultipleSelectSpecialty onChange={onChange} values={['all']} />)

    fireEvent.press(getByText(SPECIALTY_LIST[0].name))

    expect(onChange).toHaveBeenCalledWith([SPECIALTY_LIST[0].value])
  })

  it('toggles a specialty off and resets to "All" if none selected', () => {
    const specialtyValue = SPECIALTY_LIST[0].value

    const { getByText } = render(
      <MultipleSelectSpecialty onChange={onChange} values={[specialtyValue]} />,
    )

    fireEvent.press(getByText(SPECIALTY_LIST[0].name))

    expect(onChange).toHaveBeenCalledWith(['all'])
  })

  it('selects "All" and overrides other values', () => {
    const specialtyValue = SPECIALTY_LIST[1].value

    const { getByText } = render(
      <MultipleSelectSpecialty onChange={onChange} values={[specialtyValue]} />,
    )

    fireEvent.press(getByText('All'))

    expect(onChange).toHaveBeenCalledWith(['all'])
  })

  it('adds another specialty without "All"', () => {
    const first = SPECIALTY_LIST[0].value
    const second = SPECIALTY_LIST[1].value

    const { getByText } = render(<MultipleSelectSpecialty onChange={onChange} values={[first]} />)

    fireEvent.press(getByText(SPECIALTY_LIST[1].name))

    expect(onChange).toHaveBeenCalledWith([first, second])
  })
})

import { render } from '@utils-test'

import { X } from '@tamagui/lucide-icons'

// Adjust path

import Empty from '../'

describe('Empty', () => {
  it('matches snapshot with default props', () => {
    const { toJSON } = render(<Empty />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot with custom title and description', () => {
    const { toJSON } = render(
      <Empty title="No Results" description="No items found matching your query." />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot with custom icon, action label, and onAction', () => {
    const onAction = jest.fn()
    const customIcon = <X testID="custom-icon" />
    const { toJSON } = render(
      <Empty
        title="Empty List"
        description="Add a new item to get started."
        icon={customIcon}
        actionLabel="Add Item"
        onAction={onAction}
      />,
    )
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot without description and action', () => {
    const { toJSON } = render(<Empty title="No Content" />)
    expect(toJSON()).toMatchSnapshot()
  })
})

import { render, screen } from '@utils-test'

import { tokens } from '@tamagui.config'
import { Tabs } from 'tamagui'

import { Heading, Text } from '@/components/common'

import { TabsContent, TabsTab } from '..'

const renderContent = (ele: React.ReactElement) =>
  render(
    <Tabs value="tab-1">
      <Tabs.List>
        <Tabs.Tab value="tab-1">
          <Text>Tab 1</Text>
        </Tabs.Tab>
        <Tabs.Tab value="tab-2">
          <Text>Tab 2</Text>
        </Tabs.Tab>
      </Tabs.List>
      {ele}
    </Tabs>,
  )

describe('TabsContent', () => {
  it('renders children correctly with default props', () => {
    renderContent(
      <TabsContent value="tab-1">
        <Heading testID="child">Test Content</Heading>
      </TabsContent>,
    )
    expect(screen.getByTestId('child')).toBeTruthy()
    expect(screen.getByText('Test Content')).toBeTruthy()
    expect(screen.getByTestId('tabs-content')).toHaveStyle({
      flex: 1,
      paddingTop: 18,
    })
  })

  it('applies custom props', () => {
    renderContent(<TabsContent value="tab-1" backgroundColor="$grey100" />)
    expect(screen.getByTestId('tabs-content')).toHaveStyle({
      flex: 1,
      paddingTop: 18,
      backgroundColor: tokens.color.grey100.val,
    })
  })
})

describe('TabsTab', () => {
  it('renders Heading with correct title and styles when active', () => {
    renderContent(<TabsTab title="Profile" active={true} />)
    const heading = screen.getByTestId('heading')
    expect(heading).toBeTruthy()
    expect(heading).toHaveTextContent('Profile')
    expect(heading).toHaveStyle({
      height: 24,
      textAlign: 'center',
    })
    expect(screen.getByTestId('separator')).toBeTruthy()
    expect(screen.getByTestId('separator')).toHaveStyle({
      borderTopWidth: 3,
      borderTopColor: tokens.color.primary.val,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    })
  })

  it('renders Heading with correct title and styles when not active', () => {
    renderContent(<TabsTab title="Profile" active={false} />)
    const heading = screen.getByTestId('heading')
    expect(heading).toBeTruthy()
    expect(heading).toHaveTextContent('Profile')
    expect(heading).toHaveStyle({
      height: 24,
      textAlign: 'center',
    })
    expect(screen.queryByTestId('separator')).toBeNull()
  })
})

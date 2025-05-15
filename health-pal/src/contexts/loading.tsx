import { AppLoadingDispatchContext } from '@app/contexts/app-loading'

import { memo, useMemo, useState } from 'react'

import { Dialog, Spinner } from 'tamagui'

import { WINDOW_SIZE } from '@app/constants'

const AppLoadingProvider = ({ children }: React.PropsWithChildren) => {
  const [loading, setLoading] = useState(false)

  const loadingContent = useMemo(
    () => (
      <Dialog modal open>
        <Dialog.Portal padding={0}>
          <Dialog.Overlay
            key="overlay"
            backgroundColor="$shadow2"
            animateOnly={['transform', 'opacity']}
            animation={[
              'fast',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ opacity: 0, scale: 0.95 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.Content
            padding={0}
            w={WINDOW_SIZE.width}
            h={WINDOW_SIZE.height}
            backgroundColor="transparent"
            animateOnly={['transform', 'opacity']}
            animation={[
              'fast',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}>
            <Spinner
              size="large"
              position="absolute"
              zIndex={10000}
              top="50%"
              left="50%"
              transform={[{ translateX: '-50%' }]}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    ),
    [],
  )

  return (
    <AppLoadingDispatchContext value={setLoading}>
      {loading && loadingContent}
      {children}
    </AppLoadingDispatchContext>
  )
}

export default memo(AppLoadingProvider)

import { YStack } from 'tamagui'

import { Heading } from '@theme/heading'
import { Text } from '@theme/text'

import { ShieldTick } from '@icons'

import LoadingIndicator from '@app/components/loading-indicator'
import Modal from '@app/components/modal'
import { ModalRef } from '@app/types/modal'

type Props = {
  ref?: React.Ref<ModalRef>
}

const CreateAccountSuccessModal = ({ ref }: Readonly<Props>) => {
  return (
    <Modal ref={ref}>
      <YStack alignItems="center" paddingHorizontal={42} gap={32} paddingVertical={32}>
        <YStack
          h={130}
          width={130}
          borderRadius={130}
          backgroundColor="$lightTeal"
          alignItems="center"
          justifyContent="center">
          <ShieldTick />
        </YStack>

        <Heading size="extraLarge" fontWeight="600">
          Congratulations!
        </Heading>

        <Text size="small" color="$gray10" textAlign="center">
          Your account is ready to use. You will be redirected to the Home Page in a few seconds…
        </Text>
        <LoadingIndicator />
      </YStack>
    </Modal>
  )
}

export default CreateAccountSuccessModal

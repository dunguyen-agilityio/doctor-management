import { ShieldTick } from '@/icons'

import { YStack } from 'tamagui'

import { Heading, Text } from '@/components/common'
import Modal from '@/components/common/modal'
import LoadingIndicator from '@/components/loading-indicator'

import { ModalRef } from '@/types/modal'

type Props = {
  ref?: React.Ref<ModalRef>
}

const CreateAccountSuccessModal = ({ ref }: Readonly<Props>) => {
  return (
    <Modal ref={ref} aria-label="Account created successfully">
      <YStack alignItems="center" paddingHorizontal={42} gap={20} paddingVertical={32}>
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
        <LoadingIndicator aria-label="Redirecting, please wait" marginTop={20} />
      </YStack>
    </Modal>
  )
}

export default CreateAccountSuccessModal

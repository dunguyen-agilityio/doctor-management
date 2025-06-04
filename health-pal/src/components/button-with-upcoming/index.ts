import { Button } from '@app/components/common'

import { withUpcomingFeature } from '@app/hocs/with-upcoming-feature'

const ButtonWithUpcoming = withUpcomingFeature(Button)

export default ButtonWithUpcoming

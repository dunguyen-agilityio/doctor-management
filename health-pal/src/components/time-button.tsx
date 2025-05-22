import { Button, ButtonProps } from '@theme'

import { formatTime } from '@app/utils/date'

interface TimeButtonProps extends ButtonProps {
  onSelect: (value: string) => void
  value: string
}

const TimeButton = ({ value, onSelect, ...props }: TimeButtonProps) => {
  return (
    <Button
      onPress={() => onSelect(value)}
      variant="secondary"
      borderRadius={8}
      backgroundColor="$grey50"
      disabledStyle={{ opacity: 0.85 }}
      width={110}
      {...props}>
      {formatTime(value)}
    </Button>
  )
}

export default TimeButton

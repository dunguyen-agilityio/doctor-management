import { useRef } from 'react'
import { TextInput } from 'react-native'

import { debounce } from 'tamagui'

type HandleParams = {
  event?: 'SUBMIT' | 'FOCUS'
  next?: number
}

export const useAutoFocusField = (): [
  React.RefObject<(TextInput | null)[]>,
  (params: HandleParams) => void,
] => {
  const inputRefs = useRef<(TextInput | null)[]>([])

  const handle = debounce(({ event = 'FOCUS', next = -1 }: HandleParams) => {
    if (event === 'SUBMIT' && next) {
      inputRefs.current[next]?.focus()
    }
  }, 100)

  return [inputRefs, handle]
}

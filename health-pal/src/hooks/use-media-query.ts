import { WINDOW_SIZE } from '@app/constants'

const useMediaQuery = ({
  w = 342,
  px = 24,
  h = 0,
  full,
}: {
  w?: number
  px?: number
  h?: number
  full?: boolean
}) => {
  const maxW = WINDOW_SIZE.width - px * 2
  const width = full ? maxW : w

  const height = full ? (width * h) / w : h

  return { width, height }
}

export default useMediaQuery

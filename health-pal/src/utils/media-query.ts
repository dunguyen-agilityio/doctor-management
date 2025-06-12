import { WINDOW_SIZE } from '@/constants'

export type MediaQuery = {
  width?: number
  height?: number
  px?: number
  full?: boolean
}

export const getMediaQuery = ({ width = 342, px = 24, height = 0, full }: MediaQuery) => {
  const maxW = WINDOW_SIZE.width - px * 2

  return {
    width: Math.round(full ? maxW : width),
    height: Math.round(full ? (width * height) / width : height),
  }
}

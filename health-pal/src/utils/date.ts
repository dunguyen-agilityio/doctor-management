export const formatTime = (time: string, separator = '.') => {
  const splitTime = time.split(':')

  return `${splitTime.slice(0, 2).join(separator)} ${parseInt(splitTime[0]) > 12 ? 'PM' : 'AM'}`
}

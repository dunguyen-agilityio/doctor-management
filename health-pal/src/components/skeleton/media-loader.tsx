import ContentLoader, { IContentLoaderProps, Rect } from 'react-content-loader/native'

interface MediaLoaderProps extends IContentLoaderProps {
  borderRadius: number
}
export const MediaLoader = ({
  width = 110,
  height = 110,
  borderRadius = 8,
  ...props
}: MediaLoaderProps) => (
  <ContentLoader
    speed={1.5}
    width={width}
    height={height}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <Rect x="0" y="0" rx={borderRadius} ry={borderRadius} width={width} height={height} />
  </ContentLoader>
)

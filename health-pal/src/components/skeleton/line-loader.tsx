import ContentLoader, { IContentLoaderProps, Rect } from 'react-content-loader/native'

interface LineLoaderProps extends IContentLoaderProps {
  borderRadius?: number
}

export const LineLoader = ({ width = 100, height = 14, borderRadius = 4 }: LineLoaderProps) => (
  <ContentLoader
    speed={2}
    width={width}
    height={height}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <Rect x="0" y="0" rx={borderRadius} ry={borderRadius} width={width} height={height} />
  </ContentLoader>
)

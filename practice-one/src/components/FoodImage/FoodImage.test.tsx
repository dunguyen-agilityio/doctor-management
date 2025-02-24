import { COLOR } from '@/constants';

import { render } from '@/utils/test-utils';

import { MOCK_FOODS } from '@/mocks/foods';

import FoodImage, { DEFAULT_IMAGE, FoodImageSize } from './index';

describe('FoodImage Component', () => {
  const { imgUrl, color } = MOCK_FOODS[0];
  const defaultProps = { imgUrl, color, type: FoodImageSize.large };

  it('renders correctly with given props', () => {
    const { getByTestId } = render(<FoodImage {...defaultProps} />);
    const image = getByTestId('image');

    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe(defaultProps.imgUrl);
  });

  it('renders fallback image when imgUrl is empty', () => {
    const { getByTestId } = render(<FoodImage imgUrl="" color="GREEN" />);
    const image = getByTestId('image');

    expect(image.props.source.uri).toBe(DEFAULT_IMAGE);
  });

  it('applies correct size styles based on type', () => {
    const { getByTestId } = render(<FoodImage {...defaultProps} />);
    const image = getByTestId('image');

    expect(image.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 140, height: 110 }),
      ]),
    );
  });

  it('defaults to primary color if color is invalid', () => {
    const { getByTestId } = render(
      <FoodImage imgUrl="" color="INVALID_COLOR" type={FoodImageSize.medium} />,
    );
    const layer1 = getByTestId('layer1');

    expect(layer1.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: COLOR.PRIMARY }),
      ]),
    );
  });
});

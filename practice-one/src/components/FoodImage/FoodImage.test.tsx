import { COLOR } from '@/constants';

import { render } from '@/utils/test-utils';

import { MOCK_FOOD_LIST } from '@/mocks/food';

import FoodImage, { DEFAULT_IMAGE, FoodImageSize } from './index';

describe('FoodImage Component', () => {
  const { imgUrl, color } = MOCK_FOOD_LIST[0];
  const defaultProps = { imgUrl, color, type: FoodImageSize.large };

  it('renders correctly with given props', () => {
    const { getByTestId } = render(<FoodImage {...defaultProps} />);
    const image = getByTestId('image');

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ uri: defaultProps.imgUrl }),
      ]),
    );
  });

  it('renders fallback image when imgUrl is empty', () => {
    const { getByTestId } = render(<FoodImage imgUrl="" color="GREEN" />);
    const image = getByTestId('image');

    expect(image.props.source).toEqual(
      expect.arrayContaining([expect.objectContaining({ uri: DEFAULT_IMAGE })]),
    );
  });

  it('applies correct size styles based on type', () => {
    const { getByTestId } = render(<FoodImage {...defaultProps} />);
    const image = getByTestId('image');

    expect(image.props.style).toEqual(
      expect.objectContaining({ width: 140, height: 110 }),
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

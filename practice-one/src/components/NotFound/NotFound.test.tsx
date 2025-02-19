import { Image } from 'react-native';

import { render } from '@/utils/test-utils';

import NotFound from './index';

describe('NotFound Component', () => {
  it('renders correctly with default props', () => {
    const tree = render(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom props', () => {
    const customTitle = 'Custom Title';
    const customDescription = 'Custom Description';
    const CustomImage = () => <Image testID="not-found-image" />;

    const { getByText, getByTestId } = render(
      <NotFound
        title={customTitle}
        description={customDescription}
        image={<CustomImage />}
      />,
    );

    // Check if the custom title, description, and image are rendered
    expect(getByText(customTitle)).toBeTruthy();
    expect(getByText(customDescription)).toBeTruthy();
    expect(getByTestId('not-found-image')).toBeTruthy();
  });

  it('renders the default image when no custom image is provided', () => {
    const { getByTestId } = render(<NotFound />);

    // Check if the default image is rendered
    const defaultImage = getByTestId('not-found-image');
    expect(defaultImage).toBeTruthy();
  });
});

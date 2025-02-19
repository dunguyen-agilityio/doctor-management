import Loading from '@/components/Loading';

import { render } from '@/utils/test-utils';

describe('Loading Component', () => {
  it('renders the Loading component correctly', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders the Logo inside the loading container', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});

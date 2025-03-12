import { render, screen } from '@testing-library/react-native';

import { TabParamsList } from '@/navigation';

// Adjust path
import { APP_ICONS, ROUTES } from '@/constants';

import TabIcon from './index';

describe('TabIcon', () => {
  // Helper to reduce repetition
  const renderTabIcon = (props: {
    focused: boolean;
    name: keyof TabParamsList;
  }) => render(<TabIcon {...props} />);

  it('renders favorite icon when focused', () => {
    renderTabIcon({ focused: true, name: ROUTES.FAVORITE });
    const image = screen.getByTestId('tab-icon-image');
    expect(image.props.source).toEqual(
      expect.arrayContaining([APP_ICONS.FAVORITE_FILL]),
    );
    expect(image.props.style).toMatchObject({ width: 32, height: 32 });
  });

  it('renders favorite icon when not focused', () => {
    renderTabIcon({ focused: false, name: ROUTES.FAVORITE });
    const image = screen.getByTestId('tab-icon-image');
    expect(image.props.source).toEqual(
      expect.arrayContaining([APP_ICONS.FAVORITE]),
    );
  });

  it('renders home icon when focused', () => {
    renderTabIcon({ focused: true, name: ROUTES.HOME });
    const image = screen.getByTestId('tab-icon-image');
    expect(image.props.source).toEqual(
      expect.arrayContaining([APP_ICONS.HOME_FILL]),
    );
  });

  it('renders search icon when not focused', () => {
    renderTabIcon({ focused: false, name: ROUTES.SEARCH });
    const image = screen.getByTestId('tab-icon-image');
    expect(image.props.source).toEqual(
      expect.arrayContaining([APP_ICONS.SEARCH_MENU]),
    );
  });

  it('returns null for unknown route', () => {
    renderTabIcon({ focused: true, name: 'Unknown' as keyof TabParamsList });
    expect(screen.queryByTestId('tab-icon-image')).toBeNull();
  });

  it('memoizes correctly with same props', () => {
    const { rerender } = renderTabIcon({
      focused: true,
      name: ROUTES.FAVORITE,
    });
    const firstRender = screen.getByTestId('tab-icon-image');
    rerender(<TabIcon focused={true} name={ROUTES.FAVORITE} />);
    const secondRender = screen.getByTestId('tab-icon-image');
    expect(firstRender).toBe(secondRender); // Same instance due to memo
  });

  it('re-renders when focused changes', () => {
    const { rerender } = renderTabIcon({
      focused: false,
      name: ROUTES.FAVORITE,
    });
    expect(screen.getByTestId('tab-icon-image').props.source).toEqual(
      expect.arrayContaining([APP_ICONS.FAVORITE]),
    );
    rerender(<TabIcon focused={true} name={ROUTES.FAVORITE} />);
    expect(screen.getByTestId('tab-icon-image').props.source).toEqual(
      expect.arrayContaining([APP_ICONS.FAVORITE_FILL]),
    );
  });
});

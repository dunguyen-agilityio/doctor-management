import React from 'react';

import { render } from '@testing-library/react-native';

import Loading from '@/components/Loading';

describe('Loading Component', () => {
  it('renders the Loading component correctly', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('loading-container')).toBeTruthy();
  });

  it('renders the Logo inside the loading container', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('loading-logo')).toBeTruthy();
  });
});

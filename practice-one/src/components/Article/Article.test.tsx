import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { MOCK_ARTICLES } from '@/mocks';

import Article from './index';

const mockProps = MOCK_ARTICLES[0];
const { name } = mockProps;

describe('Article Component', () => {
  it('renders the title correctly', () => {
    render(<Article {...mockProps} />);
    expect(screen.getByText(name)).toBeTruthy();
  });

  it('renders the article label with correct color', () => {
    const { getByText } = render(<Article {...mockProps} />);
    const articleText = getByText('Article');
    expect(articleText).toBeTruthy();
  });

  it('renders the button with correct text', () => {
    const { getByText } = render(<Article {...mockProps} />);
    expect(getByText('Read now')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(<Article {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

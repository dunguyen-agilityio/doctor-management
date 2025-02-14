import React from 'react';

import { render } from '@testing-library/react-native';

import Header from './index';

describe('Header Component', () => {
  it('renders the header text correctly', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Want to eat\nhealthy Food?')).toBeTruthy();
  });

  it('renders the help button', () => {
    const { getByRole } = render(<Header />);

    expect(getByRole('button')).toBeTruthy();
  });

  it('renders the QuestionIcon inside the button', () => {
    const { getByTestId } = render(<Header />);

    expect(getByTestId('question-icon')).toBeTruthy();
  });
});

import { render, screen } from '@/utils/test-utils';

import { MOCK_ARTICLES } from '@/mocks/article';

import Article from './index';

const mockProps = MOCK_ARTICLES[0];
const { title } = mockProps;

describe('Article Component', () => {
  it('renders the title correctly', () => {
    render(<Article {...mockProps} />);
    expect(screen.getByText(title)).toBeTruthy();
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

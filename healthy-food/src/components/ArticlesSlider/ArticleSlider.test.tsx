import { render } from '@testing-library/react-native';

import ArticleSlider from '@/components/ArticlesSlider';

import { MOCK_ARTICLES } from '@/mocks/article';

describe('ArticleSlider Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ArticleSlider articles={MOCK_ARTICLES} />);

    // Check if the container is rendered
    expect(getByTestId('article-slider')).toBeTruthy();
  });

  it('renders the correct number of articles', () => {
    const { queryAllByTestId } = render(
      <ArticleSlider articles={MOCK_ARTICLES} />,
    );
    // Ensure all articles are rendered
    expect(queryAllByTestId('article-item')).toHaveLength(MOCK_ARTICLES.length);
  });

  it('renders the pagination component', () => {
    const { getByTestId } = render(<ArticleSlider articles={MOCK_ARTICLES} />);

    // Check if pagination is present
    expect(getByTestId('pagination')).toBeTruthy();
  });
});

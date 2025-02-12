import { render } from '@testing-library/react-native';

import SearchInput from './';

describe('Component', () => {
  const view = render(<SearchInput onChangeQuery={jest.fn()} />);

  it('snapshot', () => {
    expect(view).toMatchSnapshot();
  });
});

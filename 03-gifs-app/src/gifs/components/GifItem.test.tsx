import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { GifItem } from './GifItem';
import type { Gif } from '../interfaces/gif.interface';

describe('GifItem', () => {
  test('should render the app correctly', () => {
    const gif: Gif = {
      id: '1',
      title: 'Test',
      url: 'ww.a.com',
      width: 1,
      height: 1,
    };

    const { container } = render(<GifItem gifItem={gif} />);
    expect(container).toMatchSnapshot();
  });
});

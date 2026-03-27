import { describe, expect, test } from 'vitest';
import type { Gif } from '../interfaces/gif.interface';
import { GifList } from './GifList';
import { render } from '@testing-library/react';

describe('GifList', () => {
  test('should render the app correctly', () => {
    const gifs: Gif[] = [
      {
        id: '1',
        title: 'Test',
        url: 'ww.a.com',
        width: 1,
        height: 1,
      },
    ];

    const { container } = render(<GifList gifs={gifs} />);
    expect(container).toMatchSnapshot();
  });
});

import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useGifs } from './useGifs';
import { act } from 'react';
import * as gifActions from '../actions/get-gifs-by-query.action';

describe('useGifs', () => {
  test('should return default values and method', () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousSearches.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handlePreviousSearchClicked).toBeDefined();
  });

  test('should return a list of gifs', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('goku');
    });
    expect(result.current.gifs.length).toBe(10);
  });

  test('should return when query is empty', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('');
    });
    expect(result.current.gifs.length).toBe(0);
  });

  test('should return when the query is in previousSearches', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('goku');
    });
    await act(async () => {
      await result.current.handleSearch('goku');
    });

    expect(result.current.previousSearches.length).toBe(1);
  });

  test('should return a list of gifs when handlePreviousSearchClicked is called', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handlePreviousSearchClicked('goku');
    });
    expect(result.current.gifs.length).toBe(10);
  });

  // test('should return a list of gifs from cache', async () => {
  //   const { result } = renderHook(() => useGifs());

  //   await act(async () => {
  //     await result.current.handlePreviousSearchClicked('goku');
  //   });

  //   expect(result.current.gifs.length).toBe(10);

  //   vi.spyOn(gifsAcions, 'getGifsByQuery').mockRejectedValue(
  //     new ErrorEvent('This is my custom error'),
  //   );

  //   await act(async () => {
  //     await result.current.handlePreviousSearchClicked('goku');
  //   });

  //   expect(result.current.gifs.length).toBe(10);
  // });

  test('should return a list of gifs from cache', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handlePreviousSearchClicked('goku');
    });

    expect(result.current.gifs.length).toBe(10);
    vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
      new Error('My error personalizado'),
    );

    await act(async () => {
      await result.current.handlePreviousSearchClicked('goku');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test('should return no more than 8 previous searches', async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch('Goku01');
      await result.current.handleSearch('Goku02');
      await result.current.handleSearch('Goku03');
      await result.current.handleSearch('Goku04');
      await result.current.handleSearch('Goku05');
      await result.current.handleSearch('Goku06');
      await result.current.handleSearch('Goku07');
      await result.current.handleSearch('Goku08');
      await result.current.handleSearch('Goku09');
      await result.current.handleSearch('Goku10');
    });

    console.log(result.current.previousSearches);

    expect(result.current.previousSearches.length).toBe(8);
    expect(result.current.previousSearches).toStrictEqual([
      'goku10',
      'goku09',
      'goku08',
      'goku07',
      'goku06',
      'goku05',
      'goku04',
      'goku03',
    ]);
  });
});

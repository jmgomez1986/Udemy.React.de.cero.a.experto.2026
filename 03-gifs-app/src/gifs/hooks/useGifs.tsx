import { useRef, useState } from 'react';
import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handlePreviousSearchClick = async (search: string) => {
    // if (gifsCache[search]) {
    //   setGifs(gifsCache[search]);
    //   return;
    // }

    if (gifsCache.current[search]) {
      setGifs(gifsCache.current[search]);
      return;
    }

    const gifs = await getGifsByQuery(search);
    setGifs(gifs);
  };

  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();

    if (query.length === 0) return;

    if (previousSearches.includes(query)) return;

    setPreviousSearches([query, ...previousSearches].splice(0, 8));

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);

    // gifsCache.[query] = gifs;

    gifsCache.current[query] = gifs;
  };

  return {
    gifs,
    previousSearches,
    handlePreviousSearchClick,
    handleSearch,
  };
};

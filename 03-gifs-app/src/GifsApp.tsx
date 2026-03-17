import { useState } from 'react';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { GifList } from './gifs/components/GifList';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';
import type { Gif } from './gifs/interfaces/gif.interface';

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const handlePreviousSearchClick = (search: string) => {
    console.log('Search clicked: ', search);
  };

  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();

    if (query.length === 0) return;

    if (previousSearches.includes(query)) return;

    setPreviousSearches([query, ...previousSearches].splice(0, 8));

    const gifs = await getGifsByQuery(query);
    console.log('Gifs: ', gifs);
    setGifs(gifs);
  };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Gifs App"
        subtitle="Encuentra los mejores gifs"
        description="Busca y comparte gifs de forma fácil"
      />

      {/* Search */}
      <SearchBar
        inputPlaceholder="Busca el gif que necesitas"
        buttonTitle="Buscar"
        onSearch={handleSearch}
      />

      {/* Búsquedas previas */}
      <PreviousSearches
        title="Búsquedas previas"
        previousSearches={previousSearches}
        onLabelClicked={handlePreviousSearchClick}
      />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
